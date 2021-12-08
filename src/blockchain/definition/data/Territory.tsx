import {Extractor} from "./Extractor";

export interface Territory {
    x: number,
    y: number,
    darkEnergy: number,
    darkMatter: number,
    plasmaEnergy: number,
    voidEssence: number,
    extractor: Extractor,
    nokai: number,
    owner: string,
    discovered: boolean
}