import {Component} from "react";
import {Button} from "react-bootstrap";

interface GameWrongNetworkProperties {
    networkId: bigint | null,
    backToLobby: () => any
}

type GameWrongNetworkState = {
}

export default class GameWrongNetwork extends Component<GameWrongNetworkProperties, GameWrongNetworkState> {

    render() {
        return <div>
            <h3>Error: The game is not deployed on your selected network ({this.props.networkId}). Please select a
                supported network on your Metamask.</h3>
            <Button variant="secondary" onClick={this.props.backToLobby}>
                Go Back
            </Button>
        </div>
    }
}