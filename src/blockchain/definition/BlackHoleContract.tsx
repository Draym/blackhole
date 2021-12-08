import {Territory} from "./data/Territory";
import {NokaiPos} from "./data/NokaiPos";
import {Address, NokaiId} from "./types";
import {Contract} from "web3-eth-contract";

export interface SlotDiscovered {
    x: bigint,
    y: bigint,
    by: Address
}

export interface SlotConquered {
    x: bigint,
    y: bigint,
    previousOwner: Address,
    newOwner: Address
}
export interface SlotConqueredSearch {
    previousOwner: Address | null,
    newOwner: Address | null
}

export interface NokaiMoved {
    fromX: bigint,
    fromY: bigint,
    toX: bigint,
    toY: bigint,
    nokaiId: NokaiId,
    owner: Address
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

export interface ExtractorUpgraded {
    x: bigint,
    y: bigint,
    by: Address
    level: bigint
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
    TerritoryExtracted: any,
    ExtractorUpgraded: any
}

export interface BlackHoleContract extends Contract {
    methods: Methods
    events: Events
}