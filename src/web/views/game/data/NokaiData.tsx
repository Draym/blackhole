import {NokaiId} from "../../../../blockchain/definition/types";
import {Profile} from "../../../../blockchain/definition/data/NokaiProfile";

export interface NokaiData {
    nokaiId: NokaiId
    imageUrl: string
    name: string
    profile: Profile
}