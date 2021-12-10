import {
    NokaiDamaged,
    NokaiDamagedSearch,
    NokaiEmptyEnergy,
    NokaiEmptyEnergySearch,
    NokaiEnergized,
    NokaiEnergizedSearch,
    NokaiHealed,
    NokaiHealedSearch,
    NokaiKilled,
    NokaiKilledSearch,
    NokaiReborn,
    NokaiRebornSearch,
    NokaiStatsContract,
    Profile
} from "../blockchain/definition/NokaiStatsContract";
import Lina from "../blockchain/Lina";
import {NokaiId} from "../blockchain/definition/types";

export default class NokaiStats {

    static async profile(contract: NokaiStatsContract, nokaiId: NokaiId): Promise<Profile> {
        return await Lina.call(contract.methods.profile(nokaiId))
    }

    static subscribeNokaiDamaged(contract: NokaiStatsContract, search: NokaiDamagedSearch, callback: (data: NokaiDamaged) => any) {
        contract.events.NokaiDamaged(search).on('data', callback)
    }

    static subscribeNokaiKilled(contract: NokaiStatsContract, search: NokaiKilledSearch, callback: (data: NokaiKilled) => any) {
        contract.events.NokaiKilled(search).on('data', callback)
    }

    static subscribeNokaiReborn(contract: NokaiStatsContract, search: NokaiRebornSearch, callback: (data: NokaiReborn) => any) {
        contract.events.NokaiReborn(search).on('data', callback)
    }

    static subscribeNokaiHealed(contract: NokaiStatsContract, search: NokaiHealedSearch, callback: (data: NokaiHealed) => any) {
        contract.events.NokaiHealed(search).on('data', callback)
    }

    static subscribeNokaiEnergized(contract: NokaiStatsContract, search: NokaiEnergizedSearch, callback: (data: NokaiEnergized) => any) {
        contract.events.NokaiEnergized(search).on('data', callback)
    }

    static subscribeNokaiEmptyEnergy(contract: NokaiStatsContract, search: NokaiEmptyEnergySearch, callback: (data: NokaiEmptyEnergy) => any) {
        contract.events.NokaiEmptyEnergy(search).on('data', callback)
    }

}