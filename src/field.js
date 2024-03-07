import { AcceptResult } from "./result.js"
import { Node } from "./node.js"
import { isNumber, skip, visibleChar } from "./utils.js"
class Field {
    constructor(type) {
        this.type = type
        this.id = Date.now()
    }

    accept(char, index, preRead) {
        throw new Error("无法识别的内容 [" + visibleChar(char) + "] at " + index)
    }
}

/**
 * 读取到最后一个引号退出
 */
class StringField extends Field {
    value = ""
    constructor() {
        super("string")
    }
    accept(char, index, preRead) {
        if (char === '"') { //end
            return new AcceptResult(null, 0, true)
        }
        this.value += char
    }
}

/**
 * 读取到分隔符退出，并回退1 个字符，不会消耗
 */
class NumberField extends Field {
    value = 0
    valueBuilder = ""
    /**
     * 如果输入dot，会处理成浮点数
     */
    dotCount = 0
    constructor(char) {
        super("number")
        this.valueBuilder = "" + char
    }
    accept(char, index, preRead) {
        if (char === '}' || char === ',' || char === ']' || skip(char)) {//end
            if (this.dotCount > 0) {
                this.value = Number.parseFloat(this.valueBuilder)
            } else {
                const test = Number.parseInt(this.valueBuilder)

                if (Number.isSafeInteger(test)) {
                    this.value = test
                } else {
                    this.value = BigInt(this.valueBuilder)
                }
            }

            return new AcceptResult(null, -1, true)
        }
        if (char === '.') {
            if (this.dotCount == 0)
                this.dotCount++
            else throw new Error("已经是浮点数了 at " + index)
        } else if (!isNumber(char)) throw new Error("不可输入非数字" + visibleChar(char) + " at " + index + preRead(index, index + 10))
        this.valueBuilder += char
    }
}

class BooleanField extends Field {

    constructor(value) {
        super("boolean")
        this.value = value
    }
    accept() {
        throw new Error("boolean 不接受任何内容")
    }
}

class ObjFieldState {
    /**
     * 在这个阶段允许存在分隔符。同时还需要遵守分隔符个数。
     */
    static get stateBefore() {
        return "before"
    }
    /**
     * 开始读取真正的内容
     */
    static get waitReturn() {
        return "wait return"
    }
    static get done() {
        return "done"
    }
}

/**
 * 不处理最开始的{，一般父节点识别到才会进入ObjField，便将其省略
 * 读取key 之后，全权交由{@link Node} 处理，然后等待返回
 */
class ObjField extends Field {
    objList = []
    iterator = 0
    state = ObjFieldState.stateBefore
    constructor() {
        super("object")
    }
    accept(char, index, preRead) {
        if (this.state == ObjFieldState.stateBefore) {
            if (skip(char)) {//omit

            } else if (char === ',') {
                if (this.seporatorCount++ != 0) throw new Error("多余的分隔符, at " + index)
            } else if (char === '"') {//读取到key 了
                const node = new Node()
                node.startReadKey()//消耗一个引号，进入读取key 内容
                this.objList.push(node)
                this.state = ObjFieldState.waitReturn//等待node 处理完成
                return new AcceptResult(node)
            } else {
                super.accept(char, index)
            }
        } else if (this.state == ObjFieldState.waitReturn) {//node 处理完成
            if (skip(char)) {} 
            else if (char === ",") {
                this.state = ObjFieldState.stateBefore//继续读取
            } else if (char === '}') {
                this.state = ObjFieldState.done
                return new AcceptResult(null, 0, true)
            } else super.accept(char, index, preRead)
        } else {
            throw new Error("代码出现隐患")
        }
    }
}

class ArrayFieldState {
    /**
     * 在这个阶段允许存在分隔符，忽略空格。同时还需要遵守分隔符个数。
     * 如果出现无法处理的内容，认为遇到了真实内容，进入下一阶段。
     */
    static get stateBefore() {
        return "before"
    }
    /**
     * 开始读取真正的内容。但是还不知道类型是什么，读取到内容后，根据类型进入下一阶段
     */
    static get reading() {
        return "reading"
    }
    /**
     * 已确定类型，等待处理完成后返回到这里。然后把状态重置未stateBefore
     */
    static get waitReturn() {
        return "wait-return"
    }
}

/**
 * 不处理最开始的[，一般父节点识别到才会进入ObjField，便将其省略
 * 包含的数据可能是一个field，也可能是一个node
 */
class ArrayField extends Field {
    nodeList = []
    iterator = 0
    state = ArrayFieldState.stateBefore
    seporatorCount = 0
    constructor() {
        super("array")
    }

    accept(char, index, preRead) {
        if (this.state == ArrayFieldState.stateBefore) {
            if (char === ' ') {//omit

            } else if (char === ',') {
                if (this.seporatorCount++ != 0) throw new Error("多余的分隔符, at " + index)
            } else {//有可能是真正的内容
                this.state = ArrayFieldState.reading
                return new AcceptResult(null, -1)//回退一个字符。交由stateIn 处理
            }
        } else if (this.state == ArrayFieldState.reading) {
            if (skip(char)){//omit

            } else if (char === '"') {//数组数据是字符串
                const field = new StringField()
                this.check(field, char, index)
                this.nodeList.push(field)
                this.state = ArrayFieldState.waitReturn
                return new AcceptResult(field)
            } else if (char >= '0' && char <= '9') {//数组数据是整数
                const field = new NumberField()
                this.check(field, char, index)
                this.nodeList.push(field)
                this.state = ArrayFieldState.waitReturn
                field.valueBuilder = char
                return new AcceptResult(field)
            } else if (char === '{') {
                const field = new ObjField()
                this.check(field, char, index)
                this.nodeList.push(field)
                this.state = ArrayFieldState.waitReturn
                return new AcceptResult(field)
            } else if (char === '[') {
                const field = new ArrayField()//数据嵌套数组
                this.check(field, char, index)
                this.nodeList.push(field)
                this.state = ArrayField.waitReturn
                return new AcceptResult(field)
            } else super.accept(char, index)
        } else if (this.state === ArrayFieldState.waitReturn) {
            if (char === ",") {
                this.state = ArrayFieldState.stateBefore//读取下一个节点
            } else if (char === ']') {
                return new AcceptResult(null, 0, true)//结束
            }
        }
    }
    /**
     * 返回新创建的元素是否被允许。通过数组中已经存在的类型进行判断
     * @param {*} newEle 新创建的元素。
     * @returns 返回是否可以添加到list
     */
    check(newEle, char, index) {
        if (this.nodeList.length == 0) return true
        const last = this.nodeList[this.nodeList.length - 1]
        if (last.constructor != newEle.constructor) {
            throw new Error("数组中类型不一致" + char + " at " + index)
        }

    }
}

export {
    Field, StringField, NumberField, ObjField, BooleanField, ArrayField, ObjFieldState
}