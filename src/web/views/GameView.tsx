import {Component} from "react";
import GameNavbar from "./game/GameNavbar";
import GameLoading from "./game/GameLoading";
import Web3Utils from "../../blockchain/Web3Utils";
import {Button, Modal} from "react-bootstrap";
import {RouteComponentProps, withRouter} from "react-router-dom";

interface GameViewProperties extends RouteComponentProps {
}

type GameViewState = {
    networkId: number | null,
    account: string | null,
    walletConnected: boolean,
    loading: boolean
}

class GameView extends Component<GameViewProperties, GameViewState> {
    constructor(props: GameViewProperties) {
        super(props)
        this.state = {
            networkId: null,
            account: null,
            walletConnected: false,
            loading: true
        }
        this.loadData = this.loadData.bind(this);
        this.loadAccountsData = this.loadAccountsData.bind(this);
        this.listenNetworkChanges = this.listenNetworkChanges.bind(this);
        this.listenAccountChanges = this.listenAccountChanges.bind(this);
        this.loginMetamask = this.loginMetamask.bind(this);
        this.backToLobby = this.backToLobby.bind(this);
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
        console.log("load data")
        await this.loadAccountsData()
        await this.listenNetworkChanges()
        await this.listenAccountChanges()
    }

    async loadAccountsData() {
        const account = await Web3Utils.getDefaultAccount()
        const networkId = await Web3Utils.getNetwork()
        this.setState({account: account, loading: false, networkId: networkId, walletConnected: true})
    }

    async listenNetworkChanges() {
        console.log("##listen network change")
        Web3Utils.getEth().on('chainChanged', (chainId: number) => {
            console.log("network changed", chainId)
            this.setState({networkId: chainId})
        })
    }

    async listenAccountChanges() {
        console.log("##listen account change")
        Web3Utils.getEth().on('accountsChanged', (accounts: string[]) => {
            console.log("account changed", accounts[0])
            if (accounts.length === 0) {
                this.setState({account: null, walletConnected: false})
            } else {
                this.setState({account: accounts[0]})
            }
        })
    }

    async loginMetamask() {
        let metamaskLoaded = await Web3Utils.loadMetamask()
        if (metamaskLoaded) {
            console.log("trying load data")
            await this.loadData()
        }
    }

    backToLobby = () => {
        this.props.history.push('/')
    }

    render() {

        if (this.state.loading) {
            return <GameLoading/>
        } else if (!this.state.walletConnected) {
            return <div>
                <Modal show={true} backdrop="static" keyboard={false} aria-labelledby="contained-modal-title-vcenter" centered animation={false}>
                    <Modal.Header closeButton={false}><Modal.Title>Metamask</Modal.Title></Modal.Header>
                    <Modal.Body>
                        A connection to your Metamask wallet is required in order to play in BlackHole. We will use this access to retrieve your NFT and tokens associated to the
                        linked account.
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={this.backToLobby}>
                            Quit Game
                        </Button>
                        <Button variant="primary" onClick={this.loginMetamask}>Login Metamask</Button>
                    </Modal.Footer>
                </Modal>
            </div>
        } else if (this.state.networkId != null && this.state.account != null) {
            return <div>
                <GameNavbar networkId={this.state.networkId} account={this.state.account}/>
                <div className="container-fluid mt-5">
                    <span>hello game</span>
                </div>
            </div>
        } else {
            return <div>
                Error: Go back to home
                <Button variant="secondary" onClick={this.backToLobby}>
                    Quit Game
                </Button>
            </div>
        }
    }
}

export default withRouter(GameView);