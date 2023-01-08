/**
 * {"key": obj, "key1": true} 是一个object field。
 * "key": obj 是一个node
 * obj 与 true 是一个field
 */
import { Node, NodeState } from "./node.js"
import { Field, NumberField, StringField, ObjField, BooleanField } from "./field.js";

const jsonString = "{\"id\": 1610942076946493412, \"offered\": true}"
const levelStack = []

const root = new Node()
root.key = "root"
root.keyState = NodeState.stateOut
root.seporatorCount = 1//阻止多余的分隔符
root.valueState = NodeState.stateIn
levelStack.push(root)

function preRead(start, end) {
    return jsonString.slice(start, end)
}

for (let index = 0; index < jsonString.length; index++) {
    const c = jsonString[index]
    const last = levelStack[levelStack.length - 1]

    console.log("read a char at", index, "is [", c, "] last", last);

    const result = last.accept(c, index, preRead)
    if (result != null) {
        const newNode = result.newNode
        if (newNode != null) {
            levelStack.push(newNode)
            console.warn("push to", newNode)
        } else if (result.popCurrent) {
            const t = levelStack.pop()
            console.warn("pop out", t)
        }
        index += result.offset
    }

}
console.log("root", root.value)

const pre = [root.value]
const r = {}
const resultStack = [r]
let i = 0

while (pre.length > 0) {
    i++
    if (i > 5) break
    const top = pre[pre.length - 1]
    if (top instanceof ObjField) {
        console.log(top, top.objList.length, top.iterator)
        if (top.iterator < top.objList.length) {
            const obj = top.objList[top.iterator++]
            console.log('obj', obj);
            pre.push(obj)
        } else {
            pre.pop()
        }

    } else if (top instanceof Node) {
        const c = resultStack[resultStack.length - 1]
        if (top.value instanceof NumberField) {
            c[top.key] = top.value.value
        } else if (top.value instanceof BooleanField) {
            c[top.key] = top.value.value
        }
        pre.pop()
    }
}

console.log(r)