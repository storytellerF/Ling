/**
 * {"key": obj, "key1": true} 是一个object field。
 * "key": obj 是一个node
 * obj 与 true 是一个field
 */
import { Node } from "./node.js";
import { Field, ObjField, ArrayField, ObjFieldState } from "./field.js";

function parse(raw) {
  const jsonString = '"root":' + raw + "}";
  const readingStack = [];
  const rootObj = new ObjField();

  readingStack.push(rootObj);

  function preRead(start, end) {
    return jsonString.slice(start, end);
  }

  for (let index = 0; index < jsonString.length; index++) {
    const c = jsonString[index];
    const last = readingStack[readingStack.length - 1];

    //console.debug("read a char at", index, "is [", visibleChar(c), "] last", last);

    const result = last.accept(c, index, preRead);
    if (result != null) {
      const newNode = result.newNode;
      if (newNode != null) {
        readingStack.push(newNode);
      } else if (result.popCurrent) {
        readingStack.pop();
      }
      index += result.offset;
    }
  }

  console.assert(readingStack.length === 0);
  console.assert(rootObj.state == ObjFieldState.done);
  return composing(rootObj).root;
}
function composing(root) {
  /**
   * 存储的是从字符串读取出来的原始节点。
   */
  const workingStack = [root];
  const resultRoot = {}; //此对象与root.value 对应。最终输出结果
  /**
   * 从treeStack 获取parentNode，然后将结果添加到parentNode 中。
   * 存储的都是将来作为结果的数据。即存放结果的容器
   */
  const treeStack = [resultRoot];

  while (workingStack.length > 0) {
    //console.debug("待处理长度", workingStack.length, workingStack);

    const top = workingStack[workingStack.length - 1];
    const parentNode = treeStack[treeStack.length - 1];

    if (top instanceof ObjField) {
      //console.debug("obj progress", top.objList.length, top.iterator, top,)
      if (top.iterator < top.objList.length) {
        //遍历所有的对象，添加到栈中，等待处理
        const obj = top.objList[top.iterator++];
        //console.debug('child obj from objField', obj);
        workingStack.push(obj);
      } else {
        //所有子元素都遍历完成
        workingStack.pop();
        treeStack.pop();
      }
    } else if (top instanceof ArrayField) {
      //console.debug("array progress", top.nodeList.length, top.iterator, top,)
      if (top.iterator < top.nodeList.length) {
        const obj = top.nodeList[top.iterator++];
        //console.debug("child obj from arrayField", obj)
        workingStack.push(obj);
        if (obj instanceof ObjField) {
          const newObj = {};
          parentNode.push(newObj);
          treeStack.push(newObj);
        }
      } else {
        workingStack.pop();
        treeStack.pop();
      }
    } else if (top instanceof Node) {
      //从objField 中取出的。

      const topValue = top.value;
      const topKey = top.key;
      workingStack.pop(); //node “处理完毕”
      if (topValue instanceof ObjField) {
        //console.debug("obj field key :", topKey);
        const newObj = {}; //此对象与objFiled 对应。objField 对应的值存入的目的地
        parentNode[topKey] = newObj;
        treeStack.push(newObj);
        workingStack.push(topValue); //待处理
      } else if (topValue instanceof ArrayField) {
        //console.debug("array field key:", topKey);
        const newArray = [];
        parentNode[topKey] = newArray;
        treeStack.push(newArray);
        workingStack.push(topValue); //待处理
      } else {
        parentNode[topKey] = topValue.value;
      }
    } else if (top instanceof Field) {
      //非ArrayField 和ObjField 的Field，应该是数组中的Field
      console.assert(parentNode instanceof Array);
      parentNode.push(top.value);
      workingStack.pop();
    } else throw new Error("无法处理的类型", top);
  }

  return resultRoot;
}

function bigIntSerializer(key, value, other) {
  if (typeof value === "bigint") {
    return value.toString();
  }
  return other ? other(key, value) : value;
}

const stringify = function () {
  let other = arguments[1];
  return JSON.stringify(arguments[0], function (key, value) {
    return bigIntSerializer(key, value, other);
  });
};
export default {
  parse,
  stringify,
};
