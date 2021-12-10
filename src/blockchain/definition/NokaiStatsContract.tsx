import {Contract} from "web3-eth-contract";
import {NokaiId} from "./types";

enum Rarity {
    Spirit,
    Champion,
    Overlord,
    Astral,
    Legend,
    God
}

enum Technique {
    SPECIALIST, // hit twice at 75%
    GUARDIAN, // block 40% dmg after defense
    GLUTTON, // steal 30% opponent's attack stat
    BUFFOON, // reduce opponent's attack and defence by 20%
    DESTROYER, // break 50% opponent's defense
    FOOL, // cancel opponent's passives
    DEADLY, // critical hit - deal +40% dmg
    AUTHORITY, // survive with 1hp if killed by lower class Nokai
    REVENGER, // hit twice at 100% on death
    MIMIC // copy opponent technique
}

export interface Stats {
    hp: bigint,
    attack: bigint,
    defense: bigint,
    regen: bigint,
    pa: bigint,
    gradeValue: bigint,
    grade: Rarity,
    technique1: Technique,
    technique2: Technique
}

export interface Profile {
    stats: Stats,
    currentHp: bigint,
    currentPa: bigint,
    dead: boolean,
    burned: boolean,
    lastHpSet: bigint,
    lastPaSet: bigint
}

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