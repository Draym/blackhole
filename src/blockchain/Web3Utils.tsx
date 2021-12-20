import Web3 from 'web3'
import detectEthereumProvider from '@metamask/detect-provider';
import {Address} from "./definition/types";

declare let window: any;

export default class Web3Utils {

    static async loadMetamask() {
        if (window.ethereum) {
            const accounts = await window.ethereum.request({method: 'eth_requestAccounts'})
            window.web3 = new Web3(window.ethereum)
            window.ethereum.defaultAccount = accounts[0]
            window.ethereum.on('accountsChanged', (accounts: string[]) => {
                window.ethereum.defaultAccount = accounts[0]
            })
            return true
        }
            // else if (window.web3) {
            //     window.web3 = new Web3(window.web3.currentProvider)
            //     return true
        // }
        else {
            window.alert('Non-Ethereum browser detected. You should consider trying MetaMask!')
            return false
        }
    }

    static async isMetamaskInstalled() {
        const provider = await detectEthereumProvider();
        return !!provider;
    }

    static async isMetamaskConnected() {
        const provider = await detectEthereumProvider()

        if (provider) {
            console.log('Metamask successfully detected!');
            const result = await window.ethereum.request({method: 'eth_accounts'})
            return result.length > 0
        } else {
            console.log('Metamask is not installed!');
            return false
        }
    }

    // @ts-ignore
    static getEth(): EthereumProvider | null {
        return window.ethereum
    }

    static async getNetwork(): Promise<bigint> {
        console.log("get network")
        return window.web3.eth.net.getId()
    }

    static async getAccounts(): Promise<Address[]> {
        return await window.ethereum.request({method: 'eth_accounts'})
    }

    static getDefaultAccount(): Address | null {
        try {
            return window.ethereum.defaultAccount.toLowerCase()
        } catch (e) {
            return null
        }
    }

    static address(value: Address): Address {
        return value.toLowerCase()
    }

    static isDefaultAccount(address: Address): boolean {
        return this.getDefaultAccount() === address.toLowerCase()
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