import Lina from "../blockchain/Lina";
import {parseTerritory, Territory} from "../blockchain/definition/data/Territory";
import {
    BlackHoleContract,
    ExtractorUpgraded, NokaiAssigned, NokaiAssignedSearch,
    NokaiMoved,
    NokaiMovedSearch, NokaiWithdrawn, NokaiWithdrawnSearch,
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

    static subscribeSlotDiscovered(contract: BlackHoleContract, callback: (data: SlotDiscovered) => any): any {
        return contract.events.SlotDiscovered().on('data', (data: any) => {
            callback(SlotDiscovered.parse(data.returnValues))
        })
    }

    static subscribeSlotConquered(contract: BlackHoleContract, search: SlotConqueredSearch | null, callback: (data: SlotConquered) => any): any {
        return contract.events.SlotConquered(search).on('data', (data: any) => {
            callback(SlotConquered.parse(data.returnValues))
        })
    }

    static subscribeNokaiMoved(contract: BlackHoleContract, search: NokaiMovedSearch | null, callback: (data: NokaiMoved) => any): any {
        return contract.events.NokaiMoved(search).on('data', (data: any) => {
            callback(NokaiMoved.parse(data.returnValues))
        })
    }

    static subscribeNokaiAssigned(contract: BlackHoleContract, search: NokaiAssignedSearch | null, callback: (data: NokaiAssigned) => any): any {
        return contract.events.NokaiAssigned(search).on('data', (data: any) => {
            callback(NokaiAssigned.parse(data.returnValues))
        })
    }

    static subscribeNokaiWithdrawn(contract: BlackHoleContract, search: NokaiWithdrawnSearch | null, callback: (data: NokaiWithdrawn) => any): any {
        return contract.events.NokaiWithdrawn(search).on('data', (data: any) => {
            callback(NokaiWithdrawn.parse(data.returnValues))
        })
    }

    static subscribeTerritoryExtracted(contract: BlackHoleContract, callback: (data: TerritoryExtracted) => any): any {
        return contract.events.TerritoryExtracted().on('data', (data: any) => {
            callback(TerritoryExtracted.parse(data.returnValues))
        })
    }

    static subscribeExtractorUpgraded(contract: BlackHoleContract, callback: (data: ExtractorUpgraded) => any): any {
        return contract.events.ExtractorUpgraded().on('data', (data: any) => {
            callback(ExtractorUpgraded.parse(data.returnValues))
        })
    }
}