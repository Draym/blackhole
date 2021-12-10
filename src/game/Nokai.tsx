import {NokaiBorn, NokaiBornSearch, NokaiContract, NokaiUpgraded, NokaiUpgradedSearch, StatType} from "../blockchain/definition/NokaiContract";
import Lina from "../blockchain/Lina";
import {Address, NokaiId} from "../blockchain/definition/types";

export default class Nokai {

    static async setUri(contract: NokaiContract, baseUri: string) {
        await Lina.call(contract.methods.setUri(baseUri))
    }

    static async lockMint(contract: NokaiContract) {
        await Lina.call(contract.methods.lockMint())
    }

    static async unlockMint(contract: NokaiContract) {
        await Lina.call(contract.methods.unlockMint())
    }

    static async lockTransfer(contract: NokaiContract) {
        await Lina.call(contract.methods.lockTransfer())
    }

    static async unlockTransfer(contract: NokaiContract) {
        await Lina.call(contract.methods.unlockTransfer())
    }

    static async setup(contract: NokaiContract, nbGods: bigint) {
        await Lina.call(contract.methods.setup(nbGods))
    }

    static async absorb(contract: NokaiContract, nokaiId: NokaiId, targetId: NokaiId, upgradeChoice: StatType) {
        await Lina.call(contract.methods.absorb(nokaiId, targetId, upgradeChoice))
    }

    static async listFor(contract: NokaiContract, owner: Address): Promise<bigint[]> {
        return await Lina.call(contract.methods.listFor(owner))
    }

    static subscribeNokaiBorn(contract: NokaiContract, search: NokaiBornSearch, callback: (data: NokaiBorn) => any) {
        contract.events.NokaiBorn(search).on('data', callback)
    }

    static subscribeNokaiUpgraded(contract: NokaiContract, search: NokaiUpgradedSearch, callback: (data: NokaiUpgraded) => any) {
        contract.events.NokaiUpgraded(search).on('data', callback)
    }
}