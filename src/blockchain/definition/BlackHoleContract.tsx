import {Territory} from "./data/Territory";
import {Position} from "./data/Position";
import {Address, NokaiId} from "./types";
import {Contract} from "web3-eth-contract";

export interface SlotDiscovered {
    x: number,
    y: number,
    by: Address
}

export interface SlotConquered {
    x: number,
    y: number,
    previousOwner: Address,
    newOwner: Address
}
export interface SlotConqueredSearch {
    previousOwner: Address | null,
    newOwner: Address | null
}

export interface NokaiMoved {
    fromX: number,
    fromY: number,
    toX: number,
    toY: number,
    nokaiId: NokaiId,
    owner: Address
}
export interface NokaiMovedSearch {
    nokai: NokaiId | null,
    owner: Address | null
}

export interface TerritoryExtracted {
    x: number,
    y: number,
    by: Address
}

export interface ExtractorUpgraded {
    x: number,
    y: number,
    by: Address
    level: number
}

interface Methods {
    nokaiAt: (x: number, y: number) => NokaiId,
    nokaiPos: (nokaiId: NokaiId) => Position,
    territoryCount: (user: Address) => number,
    extractorCostAt: (x: number, y: number) => number,
    get: (x: number, y: number) => Territory,
    getBlackHole: (from: number, to: number) => Territory[]
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