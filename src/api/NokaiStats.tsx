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
    NokaiStatsContract
} from "../blockchain/definition/NokaiStatsContract";
import Lina from "../blockchain/Lina";
import {NokaiId} from "../blockchain/definition/types";
import {parseProfile, parseProfileDTO, Profile, ProfileDTO} from "../blockchain/definition/data/NokaiProfile";

export default class NokaiStats {

    static async profile(contract: NokaiStatsContract, nokaiId: NokaiId): Promise<Profile> {
        return parseProfile(await Lina.call(contract.methods.profile(nokaiId)))
    }

    static async profiles(contract: NokaiStatsContract, nokaiIds: NokaiId[]): Promise<ProfileDTO[]> {
        const data = await Lina.call(contract.methods.profiles(nokaiIds))
        return data.map((result: any) => {
            return parseProfileDTO(result)
        })
    }

    static subscribeNokaiDamaged(contract: NokaiStatsContract, search: NokaiDamagedSearch, callback: (data: NokaiDamaged) => any) {
        contract.events.NokaiDamaged(search).on('data', (data: any) => {
            callback(NokaiDamaged.parse(data.returnValues))
        })
    }

    static subscribeNokaiKilled(contract: NokaiStatsContract, search: NokaiKilledSearch, callback: (data: NokaiKilled) => any) {
        contract.events.NokaiKilled(search).on('data', (data: any) => {
            callback(NokaiKilled.parse(data.returnValues))
        })
    }

    static subscribeNokaiReborn(contract: NokaiStatsContract, search: NokaiRebornSearch, callback: (data: NokaiReborn) => any) {
        contract.events.NokaiReborn(search).on('data', (data: any) => {
            callback(NokaiReborn.parse(data.returnValues))
        })
    }

    static subscribeNokaiHealed(contract: NokaiStatsContract, search: NokaiHealedSearch, callback: (data: NokaiHealed) => any) {
        contract.events.NokaiHealed(search).on('data', (data: any) => {
            callback(NokaiHealed.parse(data.returnValues))
        })
    }

    static subscribeNokaiEnergized(contract: NokaiStatsContract, search: NokaiEnergizedSearch, callback: (data: NokaiEnergized) => any) {
        contract.events.NokaiEnergized(search).on('data', (data: any) => {
            callback(NokaiEnergized.parse(data.returnValues))
        })
    }

    static subscribeNokaiEmptyEnergy(contract: NokaiStatsContract, search: NokaiEmptyEnergySearch, callback: (data: NokaiEmptyEnergy) => any) {
        contract.events.NokaiEmptyEnergy(search).on('data', (data: any) => {
            callback(NokaiEmptyEnergy.parse(data.returnValues))
        })
    }

}