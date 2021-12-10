import {Address, NokaiId} from "./types";
import {Contract} from "web3-eth-contract";

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

export interface NokaiBornSearch {
    nokaiId: NokaiId | null,
    owner: Address | null,
}

export interface NokaiUpgraded {
    nokaiId: NokaiId,
    owner: Address
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
}

interface Events {
    NokaiBorn: any,
    NokaiUpgraded: any,
}

export interface NokaiContract extends Contract {
    methods: Methods
    events: Events
}