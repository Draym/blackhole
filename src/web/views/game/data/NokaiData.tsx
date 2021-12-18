import {NokaiId} from "../../../../blockchain/definition/types";
import {Profile} from "../../../../blockchain/definition/data/NokaiProfile";

export interface NokaiData {
    nokaiId: NokaiId
    imageUrl: string
    name: string
    profile: Profile
}

export class NokaiData {
    static stringify(data: NokaiData | NokaiData[] | { [key: string]: NokaiData }): string {
        return JSON.stringify(data, (key, value) => typeof value === 'bigint' ? value.toString() : value)
    }
}