/**
 * {"key": obj, "key1": true} 是一个object field。
 * "key": obj 是一个node
 * obj 与 true 是一个field
 */
import { Node, NodeValueState, NodeKeyState } from "./node.js"
import { Field, NumberField, StringField, ObjField, BooleanField } from "./field.js";

const jsonString = "{\"id\": 1610942076946493412, \"offered\": true, \"group\": {\"name\": \"jn\", \"address\": \"hello world\"}}"
const levelStack = []

const root = new Node()
root.key = "root"
root.keyState = NodeKeyState.stateDone
root.valueState = NodeValueState.stateIn
root.seporatorCount = 1//阻止多余的分隔符
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
console.log(levelStack.length);

const pre = [root.value]
const resultRoot = {}
const resultStack = [resultRoot]
let i = 0

while (pre.length > 0) {
    i++
    if (i > 10) break
    const top = pre[pre.length - 1]
    if (top instanceof ObjField) {
        console.log(top.objList.length, top.iterator, top, )
        if (top.iterator < top.objList.length) {
            const obj = top.objList[top.iterator++]
            console.log('obj from objField', obj);
            pre.push(obj)
        } else {
            pre.pop()
            resultStack.pop()
        }

    } else if (top instanceof Node) {
        const c = resultStack[resultStack.length - 1]
        const topValue = top.value
        const topKey = top.key
        if (topValue instanceof ObjField) {
            console.log("key :", topKey, "is obj field");
            const o = {}
            c[topKey] = o
            resultStack.push(o)
            pre.push(topValue)
        } else {
            c[topKey] = topValue.value
            pre.pop()
        }
    }
}

console.log(resultRoot)
console.log(JSON.parse(jsonString));