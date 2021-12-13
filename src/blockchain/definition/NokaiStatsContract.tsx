import {Contract} from "web3-eth-contract";
import {NokaiId} from "./types";
import {Profile, ProfileDTO} from "./data/NokaiProfile";

export interface NokaiDamaged {
    nokaiId: NokaiId,
    newHp: bigint
}

export interface NokaiDamagedSearch {
    nokaiId: NokaiId | null,
}

export interface NokaiKilled {
    nokaiId: NokaiId,
}

export interface NokaiKilledSearch {
    nokaiId: NokaiId | null,
}

export interface NokaiReborn {
    nokaiId: NokaiId,
}

export interface NokaiRebornSearch {
    nokaiId: NokaiId | null,
}

export interface NokaiHealed {
    nokaiId: NokaiId,
    amount: bigint
}

export interface NokaiHealedSearch {
    nokaiId: NokaiId | null,
}

export interface NokaiEnergized {
    nokaiId: NokaiId,
}

export interface NokaiEnergizedSearch {
    nokaiId: NokaiId | null,
}

export interface NokaiEmptyEnergy {
    nokaiId: NokaiId,
}

export interface NokaiEmptyEnergySearch {
    nokaiId: NokaiId | null,
}


interface Methods {
    profile: (nokaiId: NokaiId) => Profile
    profiles: (nokaiIds: NokaiId[]) => ProfileDTO[]
}

interface Events {
    NokaiDamaged: any,
    NokaiKilled: any,
    NokaiReborn: any,
    NokaiHealed: any,
    NokaiEnergized: any,
    NokaiEmptyEnergy: any
}

export interface NokaiStatsContract extends Contract {
    methods: Methods
    events: Events
}