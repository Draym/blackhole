import {NokaiId} from "../../../blockchain/definition/types";
import {Profile} from "../../../blockchain/definition/data/NokaiProfile";
import {NokaiPos} from "../../../blockchain/definition/data/NokaiPos";

export interface NokaiData {
    nokaiId: NokaiId
    nokaiPos: NokaiPos
    imageUrl: string
    name: string
    profile: Profile
}

export class NokaiData {
    static stringify(data: NokaiData | NokaiData[] | { [key: string]: NokaiData }): string {
        return JSON.stringify(data, (key, value) => typeof value === 'bigint' ? value.toString() : value)
    }
}