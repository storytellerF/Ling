/**
 * 一个node 代表一个 "key": obj 的组合。同时这里的obj 也是一个 field。具体内容可以查看field.js
 * 父节点一定是ObjField。
 */
export class Node {
    /**
     * 一般来说都是一个字符串
     */
    key: any;
    keyState: string;
    /**
     * 一般来说是一个field。
     */
    value: any;
    valueState: string;
    seporatorCount: number;
    id: number;
    startReadKey(): void;
    invalidChar(char: any, index: any): void;
    accept(char: any, index: any, preRead: any): AcceptResult;
}
export class NodeValueState {
    static get stateBefore(): string;
    /**
     * 一般读取到分隔符之后，就会进入in 状态
     */
    static get processing(): string;
    /**
     * 确认了value 类型，进入accepted 状态
     */
    static get accepted(): string;
}
export class NodeKeyState {
    static get stateBefore(): string;
    /**
     * 遇到了第一个引号
     */
    static get started(): string;
    /**
     * 遇到了最后一个引号
     */
    static get done(): string;
}
import { AcceptResult } from "./result.js";
