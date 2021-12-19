import {Contract} from "web3-eth-contract";
import {NokaiId} from "./types";
import {Profile, ProfileDTO} from "./data/NokaiProfile";
import NumberUtils from "../../utils/NumberUtils";

export interface NokaiDamaged {
    nokaiId: NokaiId,
    newHp: bigint
}

export class NokaiDamaged {
    static parse(data: any): NokaiDamaged {
        return {
            nokaiId: NumberUtils.from(data.nokaiId),
            newHp: NumberUtils.from(data.newHp)
        }
    }
}

export interface NokaiDamagedSearch {
    nokaiId: NokaiId | null,
}

export interface NokaiKilled {
    nokaiId: NokaiId,
}

export class NokaiKilled {
    static parse(data: any): NokaiKilled {
        return {
            nokaiId: NumberUtils.from(data.nokaiId)
        }
    }
}

export interface NokaiKilledSearch {
    nokaiId: NokaiId | null,
}

export interface NokaiReborn {
    nokaiId: NokaiId,
}

export class NokaiReborn {
    static parse(data: any): NokaiReborn {
        return {
            nokaiId: NumberUtils.from(data.nokaiId)
        }
    }
}

export interface NokaiRebornSearch {
    nokaiId: NokaiId | null,
}

export interface NokaiHealed {
    nokaiId: NokaiId,
    amount: bigint
}

export class NokaiHealed {
    static parse(data: any): NokaiHealed {
        return {
            nokaiId: NumberUtils.from(data.nokaiId),
            amount: NumberUtils.from(data.amount)
        }
    }
}

export interface NokaiHealedSearch {
    nokaiId: NokaiId | null,
}

export interface NokaiEnergized {
    nokaiId: NokaiId,
}

export class NokaiEnergized {
    static parse(data: any): NokaiEnergized {
        return {
            nokaiId: NumberUtils.from(data.nokaiId)
        }
    }
}

export interface NokaiEnergizedSearch {
    nokaiId: NokaiId | null,
}

export interface NokaiEmptyEnergy {
    nokaiId: NokaiId,
}

export class NokaiEmptyEnergy {
    static parse(data: any): NokaiEmptyEnergy {
        return {
            nokaiId: NumberUtils.from(data.nokaiId)
        }
    }
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