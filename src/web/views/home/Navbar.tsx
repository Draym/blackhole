import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {Component} from "react";
import Web3Utils from "../../../blockchain/Web3Utils";

type NavbarProperties = {}

type NavbarState = {
    walletConnected: boolean,
    account: string | null,
    loading: boolean
}

export default class Navbar extends Component<NavbarProperties, NavbarState> {
    constructor(props: NavbarProperties) {
        super(props)
        this.state = {
            walletConnected: false,
            account: null,
            loading: true
        }
    }

    async componentDidMount() {
        const walletConnected = await Web3Utils.isMetamaskConnected()
        if (walletConnected) {
            await Web3Utils.loadMetamask()
            await this.loadData()
        } else {
            this.setState({loading: false})
        }
    }

    async loadData() {
        await this.loadAccountsData()
        await this.listenAccountChanges()
    }

    async loadAccountsData() {
        const account = await Web3Utils.getDefaultAccount()
        this.setState({account: account, loading: false, walletConnected: true})
    }

    async listenAccountChanges() {
        console.log("##listen account change")
        Web3Utils.getEth().on('accountsChanged', (accounts: string[]) => {
            console.log("account changed", accounts[0])
            this.setState({account: accounts[0]})
        })
    }

    async loginMetamask() {
        let metamaskLoaded = await Web3Utils.loadMetamask()
        if (metamaskLoaded) {
            await this.loadData()
        }
    }

    render() {
        return <nav className="navbar navbar-dark fixed-top bg-dark flex-md-nowrap p-0 shadow">
            <a
                className="navbar-brand col-sm-3 col-md-2 mr-0"
                href="https://github.com/Draym/blackhole"
                target="_blank"
                rel="noopener noreferrer"
            >
                <span><FontAwesomeIcon icon={['fab', "github"]}/> Game Contracts</span>
            </a>

            {this.state.walletConnected && this.state.account != null && <span style={{color: 'white'}}>{this.state.account}</span>}

            {!this.state.loading && !this.state.walletConnected && <button onClick={this.loginMetamask}>Connect Metamask</button>}
        </nav>
    }
}