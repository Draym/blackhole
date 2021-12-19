import Lina from "../blockchain/Lina";
import {parseTerritory, Territory} from "../blockchain/definition/data/Territory";
import {
    BlackHoleContract,
    ExtractorUpgraded,
    NokaiMoved,
    NokaiMovedSearch,
    SlotConquered,
    SlotConqueredSearch,
    SlotDiscovered,
    TerritoryExtracted
} from "../blockchain/definition/BlackHoleContract";
import {Address, NokaiId} from "../blockchain/definition/types";
import {NokaiPos, parseNokaiPos} from "../blockchain/definition/data/NokaiPos";
import NumberUtils from "../utils/NumberUtils";

export default class BlackHole {

    static async getMaxX(contract: BlackHoleContract): Promise<bigint> {
        return NumberUtils.from(await Lina.call(contract.methods.maxX()))
    }

    static async getMaxY(contract: BlackHoleContract): Promise<bigint> {
        return NumberUtils.from(await Lina.call(contract.methods.maxY()))
    }

    static async getTotalPos(contract: BlackHoleContract): Promise<bigint> {
        return NumberUtils.from(await Lina.call(contract.methods.totalPos()))
    }

    static async getTerritoryFor(contract: BlackHoleContract, choices: bigint[]): Promise<Territory[]> {
        const data = await Lina.call(contract.methods.getFor(choices))

        return data.map((result: any) => {
            return parseTerritory(result)
        })
    }
    static async getTerritoryForRange(contract: BlackHoleContract, from: bigint, to: bigint): Promise<Territory[]> {
        const data = await Lina.call(contract.methods.getForRange(from, to))

        return data.map((result: any) => {
            return parseTerritory(result)
        })
    }

    static async getTerritoryForBox(contract: BlackHoleContract, startPos: bigint, endPos: bigint, startLine: bigint, endLine: bigint): Promise<Territory[]> {
        const data = await Lina.call(contract.methods.getForBox(startPos, endPos, startLine, endLine))

        return data.map((result: any) => {
            return parseTerritory(result)
        })
    }


    static async getTerritory(contract: BlackHoleContract, postX: bigint, posY: bigint): Promise<Territory> {
        return parseTerritory(await Lina.call(contract.methods.get(postX, posY)))
    }

    static async getExtractorCostAt(contract: BlackHoleContract, postX: bigint, posY: bigint): Promise<bigint> {
        return NumberUtils.from(await Lina.call(contract.methods.extractorCostAt(postX, posY)))
    }

    static async countTerritoryFor(contract: BlackHoleContract, user: Address): Promise<bigint> {
        return NumberUtils.from(await Lina.call(contract.methods.territoryCount(user)))
    }

    static async getNokaiPos(contract: BlackHoleContract, nokaiId: NokaiId): Promise<NokaiPos> {
        return parseNokaiPos(await Lina.call(contract.methods.nokaiPos(nokaiId)))
    }

    static async getNokaiAt(contract: BlackHoleContract, postX: bigint, posY: bigint): Promise<NokaiId> {
        return NumberUtils.from(await Lina.call(contract.methods.nokaiAt(postX, posY)))
    }

    static subscribeSlotDiscovered(contract: BlackHoleContract, callback: (data: SlotDiscovered) => any) {
        contract.events.SlotDiscovered().on('data', callback)
    }

    static subscribeSlotConquered(contract: BlackHoleContract, search: SlotConqueredSearch, callback: (data: SlotConquered) => any) {
        contract.events.SlotConquered(search).on('data', callback)
    }

    static subscribeNokaiMoved(contract: BlackHoleContract, search: NokaiMovedSearch, callback: (data: NokaiMoved) => any) {
        contract.events.NokaiMoved(search).on('data', callback)
    }

    static subscribeTerritoryExtracted(contract: BlackHoleContract, callback: (data: TerritoryExtracted) => any) {
        contract.events.TerritoryExtracted().on('data', callback)
    }

    static subscribeExtractorUpgraded(contract: BlackHoleContract, callback: (data: ExtractorUpgraded) => any) {
        contract.events.ExtractorUpgraded().on('data', callback)
    }
}