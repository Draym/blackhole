import Web3Utils from "../../../blockchain/Web3Utils";
import {EventSubscriber} from "./EventSubscriber";

export default class MetamaskEventSubscriber implements EventSubscriber {
    onNetworkChange: (chainId: bigint) => any
    onAccountUpdate: (account: string | null) => any

    setup: boolean


    constructor(onNetworkChange: (chainId: bigint) => any, onAccountUpdate: (account: string | null) => any) {
        this.onNetworkChange = onNetworkChange
        this.onAccountUpdate = onAccountUpdate
        this.setup = false
        this.accountChanged = this.accountChanged.bind(this)
        this.networkChanged = this.networkChanged.bind(this)
    }

    subscribe(): any {
        console.log("##listen account change")
        Web3Utils.getEth().on('accountsChanged', this.accountChanged)
        console.log("##listen network change")
        Web3Utils.getEth().on('chainChanged', this.networkChanged)
        this.setup = true
    }

    unsubscribe(): any {
        console.log("##remove listener account change")
        Web3Utils.getEth().removeListener('accountsChanged', this.accountChanged)
        console.log("##remove listene network change")
        Web3Utils.getEth().removeListener('chainChanged', this.networkChanged)
        this.setup = false
    }

    isSetup(): boolean {
        return this.setup
    }

    private networkChanged(chainId: bigint) {
        this.onNetworkChange(chainId)
    }

    private accountChanged(accounts: string[]) {
        if (accounts.length === 0) {
            this.onAccountUpdate(null)
        } else {
            this.onAccountUpdate(accounts[0])
        }
    }
}