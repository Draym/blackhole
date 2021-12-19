import {Component} from "react";
import {Button} from "react-bootstrap";

interface GameUnexpectedErrorProperties {
    backToLobby: () => any
}

type GameUnexpectedErrorState = {
}

export default class GameUnexpectedError extends Component<GameUnexpectedErrorProperties, GameUnexpectedErrorState> {
    render() {
        return <div>
            <h3>Error: unexpected error</h3>
            <Button variant="secondary" onClick={this.props.backToLobby}>
                Quit Game
            </Button>
        </div>
    }
}