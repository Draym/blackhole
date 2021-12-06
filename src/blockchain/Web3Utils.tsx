import Web3 from 'web3'

declare let window: any;

export default class Web3Utils {

    static async loadMetamask() {
        if (window.ethereum) {
            await window.ethereum.request({ method: 'eth_requestAccounts' })
            window.web3 = new Web3(window.ethereum)
            return true
        }
        else if (window.web3) {
            window.web3 = new Web3(window.web3.currentProvider)
            return true
        }
        else {
            window.alert('Non-Ethereum browser detected. You should consider trying MetaMask!')
            return false
        }
    }

    // @ts-ignore
    static getEth(): EthereumProvider | null {
        return window.ethereum
    }

    static async getNetwork(): Promise<number> {
        return window.web3.eth.net.getId()
    }

    static async getAccounts(): Promise<string[]> {
        return window.web3.eth.getAccounts()//window.ethereum.request({ method: 'eth_requestAccounts' })
    }

    static getDefaultAccount(): string | null {
        return window.web3.eth.defaultAccount
    }

    static setDefaultAccount(account: any) {
        window.web3.eth.defaultAccount = account
    }

    static encode(value: string): string {
       return window.web3.utils.fromAscii(value)
    }

    static nullAddress() {
        return '0x0000000000000000000000000000000000000000';
    }

    static nullBytes() {
        return '0x0000000000000000000000000000000000000000000000000000000000000000';
    }
}