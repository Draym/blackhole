import {BoardPos} from "../data/BoardPos";
import {NokaiId} from "../../../blockchain/definition/types";

export class DragData {
    nokaiId: NokaiId
    position: BoardPos

    constructor(nokaiId: NokaiId, position: BoardPos) {
        this.nokaiId = nokaiId
        this.position = position
    }
}

export class DragNokai {

    private static currentNokai: NokaiId | null = null
    private static currentPosition: BoardPos | null = null

    static nokaiDragged(nokaiId: NokaiId) {
        this.currentNokai = nokaiId
    }

    static changePos(position: BoardPos) {
        this.currentPosition = position
    }

    static resetPosition() {
        this.currentPosition = null
    }

    static reset() {
        this.resetPosition()
        this.currentNokai = null
    }

    static get(): DragData | null {
        if (this.currentNokai != null && this.currentPosition != null) {
            return new DragData(this.currentNokai, this.currentPosition)
        } else return null
    }
}