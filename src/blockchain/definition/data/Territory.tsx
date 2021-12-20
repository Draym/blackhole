import {Extractor} from "./Extractor";
import NumberUtils from "../../../utils/NumberUtils";
import {Address, NokaiId} from "../types";
import Web3Utils from "../../Web3Utils";

export interface Territory {
    x: bigint,
    y: bigint,
    uxonium: bigint,
    darkMatter: bigint,
    plasmaEnergy: bigint,
    voidEssence: bigint,
    extractor: Extractor,
    nokaiId: NokaiId,
    owner: Address,
    discovered: boolean
}

export function parseTerritory(data: any): Territory {
    return {
        x: NumberUtils.from(data.x),
        y: NumberUtils.from(data.y),
        uxonium: NumberUtils.from(data.uxonium),
        darkMatter: NumberUtils.from(data.darkMatter),
        plasmaEnergy: NumberUtils.from(data.plasmaEnergy),
        voidEssence: NumberUtils.from(data.voidEssence),
        extractor: {
            level: NumberUtils.from(data.extractor.level),
            cost: NumberUtils.from(data.extractor.cost),
            lastExtract: NumberUtils.from(data.extractor.lastExtract),
        },
        nokaiId: NumberUtils.from(data.nokaiId),
        owner: Web3Utils.address(data.owner),
        discovered: data.discovered
    }
}