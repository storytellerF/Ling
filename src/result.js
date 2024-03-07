export class AcceptResult {
    constructor(newNode, offset, popCurrent) {
        this.offset = offset | 0
        this.newNode = newNode
        this.popCurrent = popCurrent || false
    }
}