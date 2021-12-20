import NumberUtils from "../../../utils/NumberUtils";
import {NokaiId} from "../types";

export enum Rarity {
    Spirit,
    Champion,
    Overlord,
    Astral,
    Legend,
    God
}

export enum Technique {
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

export interface ProfileDTO {
    nokaiId: NokaiId,
    stats: Stats,
    currentHp: bigint,
    currentPa: bigint,
    dead: boolean,
    burned: boolean,
    lastHpSet: bigint,
    lastPaSet: bigint
}

export function parseProfileDTO(data: any): ProfileDTO {
    return {
        nokaiId: data.nokaiId,
        stats: {
            hp: NumberUtils.from(data.stats.hp),
            attack: NumberUtils.from(data.stats.attack),
            defense: NumberUtils.from(data.stats.defense),
            regen: NumberUtils.from(data.stats.regen),
            pa: NumberUtils.from(data.stats.pa),
            gradeValue: NumberUtils.from(data.stats.gradeValue),
            grade: data.stats.grade,
            technique1: data.stats.technique1,
            technique2: data.stats.technique2,
        },
        currentHp: NumberUtils.from(data.currentHp),
        currentPa: NumberUtils.from(data.currentPa),
        dead: data.dead,
        burned: data.burned,
        lastHpSet: NumberUtils.from(data.lastHpSet),
        lastPaSet:  NumberUtils.from(data.lastPaSet),
    }
}

export function parseProfile(data: any): Profile {
    return {
        stats: {
            hp: NumberUtils.from(data.stats.hp),
            attack: NumberUtils.from(data.stats.attack),
            defense: NumberUtils.from(data.stats.defense),
            regen: NumberUtils.from(data.stats.regen),
            pa: NumberUtils.from(data.stats.pa),
            gradeValue: NumberUtils.from(data.stats.gradeValue),
            grade: data.stats.grade,
            technique1: data.stats.technique1,
            technique2: data.stats.technique2,
        },
        currentHp: NumberUtils.from(data.currentHp),
        currentPa: NumberUtils.from(data.currentPa),
        dead: data.dead,
        burned: data.burned,
        lastHpSet: NumberUtils.from(data.lastHpSet),
        lastPaSet:  NumberUtils.from(data.lastPaSet),
    }
}