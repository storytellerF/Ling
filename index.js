/**
 * {"key": obj, "key1": true} 是一个object field。
 * "key": obj 是一个node
 * obj 与 true 是一个field
 */
import { Node, NodeValueState, NodeKeyState } from "./node.js"
import { Field, NumberField, StringField, ObjField, BooleanField, ArrayField } from "./field.js";

function parse(jsonString) {
    const levelStack = []

    const root = new Node()
    root.key = "root"
    root.keyState = NodeKeyState.done
    root.valueState = NodeValueState.processing
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

    const invokeStack = [root.value]
    const resultRoot = {}//此对象与root.value 对应。最终输出结果
    const resultStack = [resultRoot]

    while (invokeStack.length > 0) {
        console.log("待处理长度", invokeStack.length, invokeStack);

        const top = invokeStack[invokeStack.length - 1]
        if (top instanceof ObjField) {
            console.log("obj progress", top.objList.length, top.iterator, top,)
            if (top.iterator < top.objList.length) {//遍历所有的对象，添加到栈中，等待处理
                const obj = top.objList[top.iterator++]
                console.log('child obj from objField', obj);
                invokeStack.push(obj)
            } else {
                invokeStack.pop()
                resultStack.pop()
            }
        }
        else if(top instanceof ArrayField) {
            console.log("array progress", top.nodeList.length, top.iterator, top,)
            if (top.iterator < top.nodeList.length) {
                const obj = top.nodeList[top.iterator++]
                console.log("child obj from arrayField", obj)
                invokeStack.push(obj)
            } else {
                invokeStack.pop()
                resultStack.pop()
            }
        } else if (top instanceof Node) {//从objField 中取出的。
            const parentNode = resultStack[resultStack.length - 1]
            const topValue = top.value
            const topKey = top.key
            invokeStack.pop()//node “处理完毕”
            if (topValue instanceof ObjField) {
                console.log("obj field key :", topKey);
                const newObj = {}//此对象与objFiled 对应。objField 对应的值存入的目的地
                parentNode[topKey] = newObj
                resultStack.push(newObj)
                invokeStack.push(topValue)//待处理
            } else if (topValue instanceof ArrayField) {
                console.log("array field key:", topKey);
                const newArray = []
                parentNode[topKey] = newArray
                resultStack.push(newArray)
                invokeStack.push(topValue)//待处理
            } else {
                parentNode[topKey] = topValue.value
            }
        } else if (top instanceof Field) {//非ArrayField 和ObjField 的Field，应该是数组中的Field
            const parentNode = resultStack[resultStack.length - 1]
            console.assert(parentNode instanceof Array)
            parentNode.push(top.value)
            invokeStack.pop()
        } else throw new Error("无法处理的类型", top)
    }

    return resultRoot
}
const stringify = JSON.stringify
export default {
    parse, stringify
}