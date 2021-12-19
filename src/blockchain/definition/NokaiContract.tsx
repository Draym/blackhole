import {Address, NokaiId} from "./types";
import {Contract} from "web3-eth-contract";
import NumberUtils from "../../utils/NumberUtils";

export enum StatType {
    HP,
    ATTACK,
    DEFENSE,
    REGEN,
    PA
}

export interface NokaiBorn {
    nokaiId: NokaiId,
    owner: Address
}

export class NokaiBorn {
    static parse(data: any): NokaiBorn {
        return {
            nokaiId: NumberUtils.from(data.nokaiId),
            owner: data.owner
        }
    }
}

export interface NokaiBornSearch {
    nokaiId: NokaiId | null,
    owner: Address | null,
}

export interface NokaiUpgraded {
    nokaiId: NokaiId,
    owner: Address
}

export class NokaiUpgraded {
    static parse(data: any): NokaiUpgraded {
        return {
            nokaiId: NumberUtils.from(data.nokaiId),
            owner: data.owner
        }
    }
}

export interface NokaiUpgradedSearch {
    nokaiId: NokaiId | null,
    owner: Address | null
}

interface Methods {
    /* ADMIN */
    setUri: (baseUri: string) => any,
    lockMint: () => any,
    unlockMint: () => any,
    lockTransfer: () => any,
    unlockTransfer: () => any,
    setup: (nbGods: bigint) => bigint,
    /* PLAYER */
    absorb: (nokaiId: NokaiId, targetId: NokaiId, upgradeChoice: StatType) => any,
    listFor: (owner: Address) => bigint[]
    tokenURI: (nokaiId: NokaiId) => string
}

interface Events {
    NokaiBorn: any,
    NokaiUpgraded: any,
}

export interface NokaiContract extends Contract {
    methods: Methods
    events: Events
}