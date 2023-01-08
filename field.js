import { AcceptResult } from "./result.js"
import { Node, NodeState } from "./node.js"
class Field {
    constructor(type) {
        this.type = type
    }

    accept(char, index, preRead) {

    }
}

class StringField extends Field {
    value = ""
    constructor() {
        super("string")
    }
    accept(char, index, preRead) {

    }
}

class NumberField extends Field {
    value = 0
    valueBuilder = ""
    constructor() {
        super("number")
    }
    accept(char, index, preRead) {
        if (char === '}' || char === ',') {//end
            if (Number.isSafeInteger(this.valueBuilder)) {
                this.value = Number.parseInt(this.valueBuilder)
            } else {
                this.value = BigInt(this.valueBuilder)
            }
            return new AcceptResult(null, -1, true)
        }
        if (!(char >= '0' && char <= '9')) throw new Error("不可输入非数字" + char + " at " + index)
        this.valueBuilder = this.valueBuilder + char
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
    static get stateBefore() {
        return "before"
    }
    static get stateIn() {
        return "in"
    }
    static get stateOut() {
        return "out"
    }
}

class ObjField extends Field {
    objList = []
    iterator = 0
    state = ObjFieldState.stateBefore
    constructor() {
        super("object")
    }
    accept(char, index, preRead) {
        if (this.state == ObjFieldState.stateBefore) {
            if (char === '"') {//开始读取到key 了
                const node = new Node()
                node.keyState = NodeState.stateIn
                node.key = ""
                this.objList.push(node)
                this.state = ObjFieldState.stateIn
                return new AcceptResult(node)
            } else if (char === ',') {
                throw new Error()
            }
        } else if (this.state == ObjFieldState.stateIn) {
            if (char === ",") {
                this.state = ObjFieldState.stateBefore
            } else if (char === '}') {
                return new AcceptResult(null, 0, true)
            }
        }
    }
}

export {
    Field, StringField, NumberField, ObjField, BooleanField
}