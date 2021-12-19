import {Territory} from "./data/Territory";
import {NokaiPos} from "./data/NokaiPos";
import {Address, NokaiId} from "./types";
import {Contract} from "web3-eth-contract";
import NumberUtils from "../../utils/NumberUtils";

export interface SlotDiscovered {
    x: bigint,
    y: bigint,
    by: Address
}
export class SlotDiscovered {
    static parse(data: any): SlotDiscovered {
        return {
            x: NumberUtils.from(data.x),
            y: NumberUtils.from(data.y),
            by: data.by
        }
    }
}

export interface SlotConquered {
    x: bigint,
    y: bigint,
    previousOwner: Address,
    newOwner: Address
}
export class SlotConquered {
    static parse(data: any): SlotConquered {
        return {
            x: NumberUtils.from(data.x),
            y: NumberUtils.from(data.y),
            previousOwner: data.previousOwner,
            newOwner: data.newOwner
        }
    }
}
export interface SlotConqueredSearch {
    previousOwner: Address | null,
    newOwner: Address | null
}

export interface NokaiAssigned {
    x: bigint,
    y: bigint,
    nokaiId: NokaiId,
    owner: Address
}
export class NokaiAssigned {
    static parse(data: any): NokaiAssigned {
        return {
            x: NumberUtils.from(data.x),
            y: NumberUtils.from(data.y),
            nokaiId: NumberUtils.from(data.nokaiId),
            owner: data.owner
        }
    }
}
export interface NokaiAssignedSearch {
    nokai: NokaiId | null,
    owner: Address | null
}

export interface NokaiWithdrawn {
    nokaiId: NokaiId
}
export class NokaiWithdrawn {
    static parse(data: any): NokaiWithdrawn {
        return {
            nokaiId: NumberUtils.from(data.nokaiId),
        }
    }
}
export interface NokaiWithdrawnSearch {
    nokaiId: NokaiId
}

export interface NokaiMoved {
    fromX: bigint,
    fromY: bigint,
    toX: bigint,
    toY: bigint,
    nokaiId: NokaiId,
    owner: Address
}
export class NokaiMoved {
    static parse(data: any): NokaiMoved {
        return {
            fromX: NumberUtils.from(data.fromX),
            fromY: NumberUtils.from(data.fromY),
            toX: NumberUtils.from(data.toX),
            toY: NumberUtils.from(data.toY),
            nokaiId: NumberUtils.from(data.nokaiId),
            owner: data.owner
        }
    }
}
export interface NokaiMovedSearch {
    nokai: NokaiId | null,
    owner: Address | null
}

export interface TerritoryExtracted {
    x: bigint,
    y: bigint,
    by: Address
}
export class TerritoryExtracted {
    static parse(data: any): TerritoryExtracted {
        return {
            x: NumberUtils.from(data.x),
            y: NumberUtils.from(data.y),
            by: data.by
        }
    }
}

export interface ExtractorUpgraded {
    x: bigint,
    y: bigint,
    by: Address
    level: bigint
}
export class ExtractorUpgraded {
    static parse(data: any): ExtractorUpgraded {
        return {
            x: NumberUtils.from(data.x),
            y: NumberUtils.from(data.y),
            by: data.by,
            level: NumberUtils.from(data.level)
        }
    }
}

interface Methods {
    maxX: () => bigint,
    maxY: () => bigint,
    totalPos: () => bigint,
    nokaiAt: (x: bigint, y: bigint) => NokaiId,
    nokaiPos: (nokaiId: NokaiId) => NokaiPos,
    territoryCount: (user: Address) => bigint,
    extractorCostAt: (x: bigint, y: bigint) => bigint,
    get: (x: bigint, y: bigint) => Territory,
    getFor: (choices: bigint[]) => Territory[],
    getForRange: (from: bigint, to: bigint) => Territory[],
    getForBox: (startPos: bigint, endPos: bigint, startLine: bigint, endLine: bigint) => Territory[]
}

interface Events {
    SlotDiscovered: any,
    SlotConquered: any,
    NokaiMoved: any,
    NokaiAssigned: any,
    NokaiWithdrawn: any,
    TerritoryExtracted: any,
    ExtractorUpgraded: any
}

export interface BlackHoleContract extends Contract {
    methods: Methods
    events: Events
}