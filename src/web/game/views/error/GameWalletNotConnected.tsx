import {Component} from "react";
import {Button, Modal} from "react-bootstrap";

interface GameWalletNotConnectedProperties {
    backToLobby: () => any,
    loginMetamask: () => any
}

type GameWalletNotConnectedState = {
}

export default class GameWalletNotConnected extends Component<GameWalletNotConnectedProperties, GameWalletNotConnectedState> {
    render() {
        return <div>
            <Modal show={true} backdrop="static" keyboard={false} aria-labelledby="contained-modal-title-vcenter"
                   centered animation={false}>
                <Modal.Header closeButton={false}><Modal.Title>Metamask</Modal.Title></Modal.Header>
                <Modal.Body>
                    A connection to your Metamask wallet is required in order to play in BlackHole. We will use this
                    access to retrieve your NFT and tokens associated to the
                    linked account.
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={this.props.backToLobby}>
                        Quit Game
                    </Button>
                    <Button variant="primary" onClick={this.props.loginMetamask}>Login Metamask</Button>
                </Modal.Footer>
            </Modal>
        </div>
    }
}