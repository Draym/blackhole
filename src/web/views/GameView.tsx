import {Component} from "react";
import GameNavbar from "./game/GameNavbar";
import GameLoading from "./game/GameLoading";
import Web3Utils from "../../blockchain/Web3Utils";
import {Button, Modal} from "react-bootstrap";
import {RouteComponentProps, withRouter} from "react-router-dom";
import GameBoard from "./game/GameBoard";
import ContractLoader from "../../blockchain/ContractLoader";
import {BlackHoleContract} from "../../blockchain/definition/BlackHoleContract";
import {NokaiContract} from "../../blockchain/definition/NokaiContract";
import {NokaiStatsContract} from "../../blockchain/definition/NokaiStatsContract";

interface GameViewProperties extends RouteComponentProps {
}

type GameViewState = {
    blackhole: BlackHoleContract | null,
    nokai: NokaiContract | null,
    nokaiStats: NokaiStatsContract | null,
    networkId: bigint | null,
    account: string | null,
    walletConnected: boolean,
    loading: boolean
}

class GameView extends Component<GameViewProperties, GameViewState> {
    constructor(props: GameViewProperties) {
        super(props)
        this.state = {
            blackhole: null,
            nokai: null,
            nokaiStats: null,
            networkId: null,
            account: null,
            walletConnected: false,
            loading: true
        }
        this.setupState = this.setupState.bind(this)
        this.loadBlockchainData = this.loadBlockchainData.bind(this)
        this.loadContracts = this.loadContracts.bind(this)
        this.listenNetworkChanges = this.listenNetworkChanges.bind(this)
        this.listenAccountChanges = this.listenAccountChanges.bind(this)
        this.loginMetamask = this.loginMetamask.bind(this)
        this.backToLobby = this.backToLobby.bind(this)
    }

    async componentDidMount() {
        const walletConnected = await Web3Utils.isMetamaskConnected()
        if (walletConnected) {
            await Web3Utils.loadMetamask()
            await this.setupState()
        } else {
            this.setState({loading: false})
        }
    }

    async setupState() {
        console.log("load data")
        await this.loadBlockchainData()
        await this.listenNetworkChanges()
        await this.listenAccountChanges()
    }

    async loadBlockchainData() {
        const account = await Web3Utils.getDefaultAccount()
        const networkId = await Web3Utils.getNetwork()

        console.log("load contract")
        await this.loadContracts()

        this.setState({account: account, loading: false, networkId: networkId, walletConnected: true})
    }

    async loadContracts() {
        const blackhole = await ContractLoader.instantiateBlackHole()
        const nokai = await ContractLoader.instantiateNokai()
        const nokaiStats = await ContractLoader.instantiateNokaiStats()

        this.setState({
            blackhole: blackhole,
            nokai: nokai,
            nokaiStats: nokaiStats
        })
    }

    async listenNetworkChanges() {
        console.log("##listen network change")
        Web3Utils.getEth().on('chainChanged', (chainId: bigint) => {
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
            await this.setupState()
        }
    }

    backToLobby = () => {
        this.props.history.push('/')
    }

    render() {

        let content

        if (this.state.loading) {
            content = <GameLoading/>
        } else if (!this.state.walletConnected) {
            content = <div>
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
        } else if (this.state.networkId != null && this.state.account != null && this.state.blackhole != null) {
            content = <div>
                <GameNavbar networkId={this.state.networkId} account={this.state.account}/>
                <div className="container-fluid mt-5">
                    <div className="row">
                        <div className="col-md-9">
                            <GameBoard blackhole={this.state.blackhole}/>
                        </div>
                        <div className="col-md-3">
                            <h1>Menu</h1>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-md-12">
                            <h2>some other UIs</h2>
                        </div>
                    </div>
                </div>
            </div>
        } else if (this.state.blackhole == null) {
            content = <div>
                <h3>Error: The game is not deployed on your selected network ({this.state.networkId}). Please select a supported network on your Metamask.</h3>
                <Button variant="secondary" onClick={this.backToLobby}>
                    Go Back
                </Button>
            </div>
        } else {
            content = <div>
                <h3>Error: unexpected error</h3>
                <Button variant="secondary" onClick={this.backToLobby}>
                    Quit Game
                </Button>
            </div>
        }

        return <div className="container-fluid mt-5">
            {content}
        </div>
    }
}

export default withRouter(GameView);