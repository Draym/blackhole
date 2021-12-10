import BlackHole from './contracts/BlackHole.json';
import Nokai from './contracts/Nokai.json';
import NokaiStats from './contracts/NokaiStats.json';
import Web3Utils from "./Web3Utils";
import {BlackHoleContract} from "./definition/BlackHoleContract";
import {NokaiContract} from "./definition/NokaiContract";
import {NokaiStatsContract} from "./definition/NokaiStatsContract";

declare let window: any;

export default class ContractLoader {

    static async instantiateBlackHole(): Promise<BlackHoleContract | null> {
        const networkId = await Web3Utils.getNetwork()
        // @ts-ignore
        const BlackHoleData = BlackHole.networks[networkId]
        if (BlackHoleData) {
            return new window.web3.eth.Contract(BlackHole.abi, BlackHoleData.address)
        } else {
            window.alert('BlackHole contract not deployed to detected network.')
            return null
        }
    }

    static async instantiateNokai(): Promise<NokaiContract | null> {
        console.log("load blackhole")
        const networkId = await Web3Utils.getNetwork()
        // @ts-ignore
        const NokaiData = Nokai.networks[networkId]
        if (NokaiData) {
            return new window.web3.eth.Contract(Nokai.abi, NokaiData.address)
        } else {
            window.alert('Nokai contract not deployed to detected network.')
            return null
        }
    }

    static async instantiateNokaiStats(): Promise<NokaiStatsContract | null> {
        const networkId = await Web3Utils.getNetwork()
        // @ts-ignore
        const NokaiStatsData = NokaiStats.networks[networkId]
        if (NokaiStatsData) {
            return new window.web3.eth.Contract(NokaiStats.abi, NokaiStatsData.address)
        } else {
            window.alert('NokaiStats contract not deployed to detected network.')
            return null
        }
    }

}