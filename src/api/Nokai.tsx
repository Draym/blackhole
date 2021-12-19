import {NokaiBorn, NokaiBornSearch, NokaiContract, NokaiUpgraded, NokaiUpgradedSearch, StatType} from "../blockchain/definition/NokaiContract";
import Lina from "../blockchain/Lina";
import {Address, NokaiId} from "../blockchain/definition/types";

export default class Nokai {

    static async setUri(contract: NokaiContract, baseUri: string) {
        await Lina.send(contract.methods.setUri(baseUri))
    }

    static async lockMint(contract: NokaiContract) {
        await Lina.send(contract.methods.lockMint())
    }

    static async unlockMint(contract: NokaiContract) {
        await Lina.send(contract.methods.unlockMint())
    }

    static async lockTransfer(contract: NokaiContract) {
        await Lina.send(contract.methods.lockTransfer())
    }

    static async unlockTransfer(contract: NokaiContract) {
        await Lina.send(contract.methods.unlockTransfer())
    }

    static async setup(contract: NokaiContract, nbGods: bigint) {
        await Lina.send(contract.methods.setup(nbGods))
    }

    static async absorb(contract: NokaiContract, nokaiId: NokaiId, targetId: NokaiId, upgradeChoice: StatType) {
        await Lina.send(contract.methods.absorb(nokaiId, targetId, upgradeChoice))
    }

    static async listFor(contract: NokaiContract, owner: Address): Promise<bigint[]> {
        return await Lina.call(contract.methods.listFor(owner))
    }

    static async tokenURI(contract: NokaiContract, nokaiId: NokaiId): Promise<string> {
        return await Lina.call(contract.methods.tokenURI(nokaiId))
    }

    static subscribeNokaiBorn(contract: NokaiContract, search: NokaiBornSearch, callback: (data: NokaiBorn) => any) {
        contract.events.NokaiBorn(search).on('data', (data: any) => {
            callback(data.returnValues)
        })
    }

    static subscribeNokaiUpgraded(contract: NokaiContract, search: NokaiUpgradedSearch, callback: (data: NokaiUpgraded) => any) {
        contract.events.NokaiUpgraded(search).on('data', (data: any) => {
            callback(data.returnValues)
        })
    }
}