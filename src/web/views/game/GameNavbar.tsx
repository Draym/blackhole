import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {Component} from "react";

type GameNavbarProperties = {
    networkId: bigint,
    account: string,
}

type GameNavbarState = {
    networkId: bigint,
    account: string,
    loading: boolean
}

export default class GameNavbar extends Component<GameNavbarProperties, GameNavbarState> {
    constructor(props: GameNavbarProperties) {
        super(props)
        this.state = {
            networkId: props.networkId,
            account: props.account,
            loading: true
        }
    }

    async componentDidMount() {
        this.setState({loading: false})
    }

    render() {
        return <nav className="navbar navbar-dark fixed-top bg-dark flex-md-nowrap p-0 shadow">
            <a
                className="navbar-brand col-sm-3 col-md-2 mr-0"
                href="https://github.com/Draym/blackhole"
                target="_blank"
                rel="noopener noreferrer"
            >
                <span><FontAwesomeIcon icon={['fab', "github"]}/> BlackHole Game</span>
            </a>
            <span style={{color: 'white'}}>network: {this.state.networkId}</span>
            <span className="me-3" style={{color: 'white'}}>account: {this.state.account}</span>
        </nav>
    }
}