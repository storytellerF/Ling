export class Field {
    constructor(type: any);
    type: any;
    id: number;
    accept(char: any, index: any, preRead: any): void;
}
/**
 * 读取到最后一个引号退出
 */
export class StringField extends Field {
    constructor();
    value: string;
    accept(char: any, index: any, preRead: any): AcceptResult;
}
/**
 * 读取到分隔符退出，并回退1 个字符，不会消耗
 */
export class NumberField extends Field {
    value: number;
    valueBuilder: string;
    /**
     * 如果输入dot，会处理成浮点数
     */
    dotCount: number;
    accept(char: any, index: any, preRead: any): AcceptResult;
}
/**
 * 不处理最开始的{，一般父节点识别到才会进入ObjField，便将其省略
 * 读取key 之后，全权交由{@link Node} 处理，然后等待返回
 */
export class ObjField extends Field {
    constructor();
    objList: any[];
    iterator: number;
    state: string;
    accept(char: any, index: any, preRead: any): AcceptResult;
}
export class BooleanField extends Field {
    value: any;
    accept(): void;
}
/**
 * 不处理最开始的[，一般父节点识别到才会进入ObjField，便将其省略
 * 包含的数据可能是一个field，也可能是一个node
 */
export class ArrayField extends Field {
    constructor();
    nodeList: any[];
    iterator: number;
    state: string;
    seporatorCount: number;
    accept(char: any, index: any, preRead: any): AcceptResult;
    /**
     * 返回新创建的元素是否被允许。通过数组中已经存在的类型进行判断
     * @param {*} newEle 新创建的元素。
     * @returns 返回是否可以添加到list
     */
    check(newEle: any, char: any, index: any): boolean;
}
export class ObjFieldState {
    /**
     * 在这个阶段允许存在分隔符。同时还需要遵守分隔符个数。
     */
    static get stateBefore(): string;
    /**
     * 开始读取真正的内容
     */
    static get waitReturn(): string;
    static get done(): string;
}
import { AcceptResult } from "./result.js";
