export class BoardPos {
    index: bigint
    x: bigint
    y: bigint
    posX: number
    posY: number

    constructor(index: bigint, x: bigint, y: bigint, posX: number, posY: number) {
        this.index = index
        this.x = x
        this.y = y
        this.posX = posX
        this.posY = posY
    }

}