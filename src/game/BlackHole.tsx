import Lina from "../blockchain/Lina";
import {Territory} from "../blockchain/definition/data/Territory";
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
import {Position} from "../blockchain/definition/data/Position";

export default class BlackHole {

    static async getBoard(contract: BlackHoleContract, from: number, to: number): Promise<Territory[]> {
        console.log("methods: ", contract.methods)
        return await Lina.call(contract.methods.getBlackHole(from, to))
    }

    static async getTerritory(contract: BlackHoleContract, postX: number, posY: number): Promise<Territory> {
        return await Lina.call(contract.methods.get(postX, posY))
    }

    static async getExtractorCostAt(contract: BlackHoleContract, postX: number, posY: number): Promise<number> {
        return await Lina.call(contract.methods.extractorCostAt(postX, posY))
    }

    static async countTerritoryFor(contract: BlackHoleContract, user: Address): Promise<number> {
        return await Lina.call(contract.methods.territoryCount(user))
    }

    static async getNokaiPos(contract: BlackHoleContract, nokaiId: NokaiId): Promise<Position> {
        return await Lina.call(contract.methods.nokaiPos(nokaiId))
    }

    static async getNokaiAt(contract: BlackHoleContract, postX: number, posY: number): Promise<NokaiId> {
        return await Lina.call(contract.methods.nokaiAt(postX, posY))
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