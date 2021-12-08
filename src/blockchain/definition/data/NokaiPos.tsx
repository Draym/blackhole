import NumberUtils from "../../../utils/NumberUtils";

export interface NokaiPos {
    onBoard: boolean,
    x: bigint,
    y: bigint
}

export function parseNokaiPos(data: any): NokaiPos {
    return {
        onBoard: data.onBoard,
        x: NumberUtils.from(data.x),
        y: NumberUtils.from(data.y)
    }
}