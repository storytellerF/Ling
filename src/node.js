import { AcceptResult } from "./result.js"
import { NumberField, StringField, ObjField, BooleanField, ArrayField } from "./field.js"
import { isNumber, skip } from "./utils.js"
class NodeKeyState {
    static get stateBefore() {
        return 'before'
    }
    /**
     * 遇到了第一个引号
     */
    static get started() {
        return "started"
    }
    /**
     * 遇到了最后一个引号
     */
    static get done() {
        return 'done'
    }
}
class NodeValueState {
    static get stateBefore() {
        return "before"
    }
    /**
     * 一般读取到分隔符之后，就会进入in 状态
     */
    static get processing() {
        return "processing"
    }
    /**
     * 确认了value 类型，进入accepted 状态
     */
    static get accepted() {
        return "accepted"
    }
}

/**
 * 一个node 代表一个 "key": obj 的组合。同时这里的obj 也是一个 field。具体内容可以查看field.js
 * 父节点一定是ObjField。
 */
class Node {
    /**
     * 一般来说都是一个字符串
     */
    key = undefined
    keyState = NodeKeyState.stateBefore
    /**
     * 一般来说是一个field。
     */
    value = undefined
    valueState = NodeValueState.stateBefore
    //state = stateBefore
    seporatorCount = 0//node 中只能有一个分隔符“:”
    constructor() {
        this.id = Date.now()
    }

    startReadKey() {
        this.keyState = NodeKeyState.started
        this.key = ""
    }

    invalidChar(char, index) {
        throw new Error("invalid char " + char + " at " + index)
    }

    accept(char, index, preRead) {
        //console.debug("current node id =", this.id, this.keyState, this.valueState, "accept", char, "at", index);
        if (this.keyState == NodeKeyState.stateBefore) {//没有key
            if (skip(char)) {
                //omit
            } else if (char === '"') {
                this.startReadKey()
            } else this.invalidChar(char, index)
        } else if (this.keyState == NodeKeyState.started) {//key 没有结束，接收的所有字符都作为key
            if (char === '"') {
                this.keyState = NodeKeyState.done
            } else {
                this.key = this.key + char
            }
        } else if (this.valueState == NodeValueState.stateBefore) {
            if (char === ':') {
                if (this.seporatorCount != 0) throw new Error("多余的分隔符 at " + index)
                else this.valueState = NodeValueState.processing
            } else if (char === ' ') {//omit

            } else this.invalidChar(char, index)
        } else if (this.valueState == NodeValueState.processing) {//确认value 的类型，然后push 对应的field
            if (skip(char)) {//omit
            } else if (char === '"') {
                const field = new StringField()
                this.value = field
                this.valueState = NodeValueState.accepted
                return new AcceptResult(field)
            } else if (char === '{') {
                const newNode = new ObjField()
                this.value = newNode
                this.valueState = NodeValueState.accepted
                return new AcceptResult(newNode)
            } else if (isNumber(char)) {
                const field = new NumberField(char)
                this.value = field
                this.valueState = NodeValueState.accepted
                return new AcceptResult(field)
            } else if (char === 't') {
                const a = preRead(index, index + "true".length)
                if (a === "true") {
                    this.value = new BooleanField(true)
                } else throw new Error("false 而不是" + a + " at " + index)
                return new AcceptResult(null, "true".length - 1, true)//跳过后面的字符
            } else if (char === 'f') {
                const a = preRead(index, index + "false".length)
                if (a === "false") {
                    this.value = new BooleanField(false)
                } else throw new Error("false 而不是" + a + " at " + index)
                return new AcceptResult(null, "false".length - 1, true)//跳过后面的字符
            } else if (char === '[') {
                const field = new ArrayField()
                this.value = field
                this.valueState = NodeValueState.accepted
                return new AcceptResult(field)
            } else this.invalidChar(char, index)
        } else if (this.valueState == NodeValueState.accepted) {//从field 的读取回到node，value 读取完成，此node 可以结束了
            //通知ObjField 结束
            return new AcceptResult(null, -1, true)
        }
    }

}

export {
    Node, NodeValueState, NodeKeyState
}