import {Extractor} from "./Extractor";
import NumberUtils from "../../../utils/NumberUtils";

export interface Territory {
    x: bigint,
    y: bigint,
    darkEnergy: bigint,
    darkMatter: bigint,
    plasmaEnergy: bigint,
    voidEssence: bigint,
    extractor: Extractor,
    nokai: bigint,
    owner: string,
    discovered: boolean
}

export function parseTerritory(data: any): Territory {
    return {
        x: NumberUtils.from(data.x),
        y: NumberUtils.from(data.y),
        darkEnergy: NumberUtils.from(data.darkEnergy),
        darkMatter: NumberUtils.from(data.darkMatter),
        plasmaEnergy: NumberUtils.from(data.plasmaEnergy),
        voidEssence: NumberUtils.from(data.voidEssence),
        extractor: {
            level: NumberUtils.from(data.extractor.level),
            cost: NumberUtils.from(data.extractor.cost),
            lastExtract: NumberUtils.from(data.extractor.lastExtract),
        },
        nokai: NumberUtils.from(data.nokai),
        owner: data.owner,
        discovered: data.discovered
    }
}