/**
 * {"key": obj, "key1": true} 是一个object field。
 * "key": obj 是一个node
 * obj 与 true 是一个field
 */
import { Node, NodeValueState, NodeKeyState } from "./node.js"
import { Field, NumberField, StringField, ObjField, BooleanField, ArrayField } from "./field.js";
import { isNumber, skip, visibleChar } from "./utils.js";


function parse(jsonString) {
    const readingStack = []

    const root = new Node()
    root.key = "root"
    root.keyState = NodeKeyState.done
    root.valueState = NodeValueState.processing
    root.seporatorCount = 1//阻止多余的分隔符
    readingStack.push(root)

    function preRead(start, end) {
        return jsonString.slice(start, end)
    }

    for (let index = 0; index < jsonString.length; index++) {
        const c = jsonString[index]
        const last = readingStack[readingStack.length - 1]

        //console.log("read a char at", index, "is [", visibleChar(c), "] last", last);

        const result = last.accept(c, index, preRead)
        if (result != null) {
            const newNode = result.newNode
            if (newNode != null) {
                readingStack.push(newNode)
                //console.warn("push to", newNode)
            } else if (result.popCurrent) {
                const t = readingStack.pop()
                //console.warn("pop out", t)
            }
            index += result.offset
        }

    }
    console.log("root", root.value)
    console.log(readingStack.length);

    return composing(root)
    // return {}
}
function composing(root) {
    /**
     * 存储的是从字符串读取出来的原始节点。
     */
    const workingStack = [root]
    const resultRoot = {}//此对象与root.value 对应。最终输出结果
    /**
     * 从treeStack 获取parentNode，然后将结果添加到parentNode 中。
     * 存储的都是将来作为结果的数据。即存放结果的容器
     */
    const treeStack = [resultRoot]

    while (workingStack.length > 0) {
        console.log("待处理长度", workingStack.length, workingStack);

        const top = workingStack[workingStack.length - 1]
        const parentNode = treeStack[treeStack.length - 1]

        if (top instanceof ObjField) {
            console.log("obj progress", top.objList.length, top.iterator, top,)
            if (top.iterator < top.objList.length) {//遍历所有的对象，添加到栈中，等待处理
                const obj = top.objList[top.iterator++]
                console.log('child obj from objField', obj);
                workingStack.push(obj)
            } else {//所有子元素都遍历完成
                workingStack.pop()
                treeStack.pop()
            }
        } else if(top instanceof ArrayField) {
            console.log("array progress", top.nodeList.length, top.iterator, top,)
            if (top.iterator < top.nodeList.length) {
                const obj = top.nodeList[top.iterator++]
                console.log("child obj from arrayField", obj)
                workingStack.push(obj)
                if (obj instanceof ObjField) {
                    const newObj = {}
                    parentNode.push(newObj)
                    treeStack.push(newObj)
                }
            } else {
                workingStack.pop()
                treeStack.pop()
            }
        } else if (top instanceof Node) {//从objField 中取出的。

            const topValue = top.value
            const topKey = top.key
            workingStack.pop()//node “处理完毕”
            if (topValue instanceof ObjField) {
                console.log("obj field key :", topKey);
                const newObj = {}//此对象与objFiled 对应。objField 对应的值存入的目的地
                parentNode[topKey] = newObj
                treeStack.push(newObj)
                workingStack.push(topValue)//待处理
            } else if (topValue instanceof ArrayField) {
                console.log("array field key:", topKey);
                const newArray = []
                parentNode[topKey] = newArray
                treeStack.push(newArray)
                workingStack.push(topValue)//待处理
            } else {
                parentNode[topKey] = topValue.value
            }
        } else if (top instanceof Field) {//非ArrayField 和ObjField 的Field，应该是数组中的Field

            console.assert(parentNode instanceof Array)
            parentNode.push(top.value)
            workingStack.pop()
        } else throw new Error("无法处理的类型", top)
    }

    return resultRoot
}
const stringify = JSON.stringify
export default {
    parse, stringify
}