import BlackHole from './contracts/BlackHole.json';
import Web3Utils from "./Web3Utils";

declare let window: any;

export default class ContractLoader {

    static async instantiateBlackHole() {
        const networkId = await Web3Utils.getNetwork()
        console.log("network", networkId)
        // @ts-ignore
        const BlackHoleData = BlackHole.networks[networkId]
        console.log("BlackHoleData", BlackHoleData)
        if (BlackHoleData) {
            return new window.web3.eth.Contract(BlackHole.abi, BlackHoleData.address)
        } else {
            window.alert('BlackHole contract not deployed to detected network.')
            return null
        }
    }

}