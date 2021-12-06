import Web3Utils from "./Web3Utils";

export default class Lina {

    static async call(method: any, data: object = {}) {
        return method.call({from: Lina.account(), ...data})
    }

    static async send(method: any, data: object = {}) {
        return method.send({from: Lina.account(), ...data})
    }

    static account() {
        return Web3Utils.getDefaultAccount()
    }
}