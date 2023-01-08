import { AcceptResult } from "./result.js"
import { Field, NumberField, StringField, ObjField, BooleanField } from "./field.js"
class NodeState {
    static get stateBefore() {
        return "before"
    }
    /**
     * 一般读取到分隔符之后，就会进入in 状态
     */
    static get stateIn() {
        return "in"
    }
    static get stateOut() {
        return "out"
    }
}

/**
 * 一个node 代表一个 "key": obj 的组合。同时这里的obj 也是yige field。具体内容可以查看field.js
 */
class Node {
    /**
     * 一般来说都是一个字符串
     */
    key = undefined
    keyState = NodeState.stateBefore
    /**
     * 一般来说是一个field。
     */
    value = undefined
    valueState = NodeState.stateBefore
    //state = stateBefore
    seporatorCount = 0//node 中只能有一个分隔符“:”
    constructor() {
        this.id = Date.now()
    }

    accept(char, index, preRead) {
        console.log("current node id =", this.id, this.keyState, this.valueState, "accept", char, "at", index);
        if (this.keyState == NodeState.stateBefore) {//没有key
            if (char === '"') {
                this.keyState = NodeState.stateIn
                this.key = ""
            } else {
                throw new Error("invalid char " + char + " at " + index)
            }
        } else if (this.keyState == NodeState.stateIn) {//key 没有结束，接收的所有字符都作为key
            if (char === '"') {
                this.keyState = NodeState.stateOut
            } else {
                this.key = this.key + char
            }
        } else if (this.valueState == NodeState.stateBefore) {
            if (char === ':') {
                if (this.seporatorCount != 0) throw new Error("多余的分隔符 at " + index)
                else this.valueState = NodeState.stateIn
            } else if (char === ' ') {

            } else throw new Error("invalid char " + char + " at " + index)
        } else if (this.valueState == NodeState.stateIn) {
            if (char === ',') {
                if (this.seporatorCount != 0) throw new Error("多余的分隔符 at " + index)
                else this.seporatorCount++
            } else if (char === ' ') {//omit
            } else if (char === '"') {
                const field = new StringField()
                this.value = field
                this.valueState = NodeState.stateOut
                return new AcceptResult(field)
            } else if (char === '{') {
                const newNode = new ObjField()
                this.value = newNode
                this.valueState = NodeState.stateOut
                return new AcceptResult(newNode)
            } else if (char >= '0' && char <= '9') {
                const field = new NumberField()
                this.value = field
                this.valueState = NodeState.stateOut
                return new AcceptResult(field)
            } else if (char === 't') {
                const a = preRead(index, index + "true".length)
                if (a === "true") {
                    this.value = new BooleanField(true)
                } else throw new Error("false 而不是" + a + " at " + index)
                this.valueState = NodeState.stateOut
                return new AcceptResult(null, "true".length - 1, true)
            } else if (char === 'f') {
                const a = preRead(index, index + "false".length)
                if (a === "false") {
                    this.value = new BooleanField(false)
                } else throw new Error("false 而不是" + a + " at " + index)
                return new AcceptResult(null, "false".length - 1, true)
            } else  throw new Error("unknown char " + char + " at " + index)
        } else if (this.valueState == NodeState.stateOut) {
            return new AcceptResult(null, -1, true)
        }
        return new AcceptResult(null)
    }

}

export {
    Node, NodeState
}