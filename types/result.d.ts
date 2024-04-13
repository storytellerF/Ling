export class AcceptResult {
    /**
     * 构造一个AcceptResult。如果当前存在newNode，popCurrent 会被忽略。
     * @param {object} newNode 写的节点
     * @param {number} offset 需要会退的字符数量
     * @param {number} popCurrent 是否需要把当前正在处理的节点弹出
     */
    constructor(newNode: object, offset: number, popCurrent: number);
    offset: number;
    newNode: any;
    popCurrent: number | boolean;
}
