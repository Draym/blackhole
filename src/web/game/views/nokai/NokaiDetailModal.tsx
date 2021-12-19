import "./nokai-detail.scss";
import {Component} from "react";
import {Modal} from "react-bootstrap";
import {NokaiId} from "../../../../blockchain/definition/types";
import {NokaiStore} from "../../store/NokaiStore";

interface NokaiDetailModalProperties {
    nokaiId: NokaiId
}

type NokaiDetailModalState = {
}

export default class NokaiDetailModal extends Component<NokaiDetailModalProperties, NokaiDetailModalState> {
    render() {
        const nokai = NokaiStore.get(this.props.nokaiId)
        return <div>
            <Modal className="nokai-profile-modal"
                   show={true} keyboard={false}
                   aria-labelledby="contained-modal-title-vcenter"
                   centered animation={false}>
                <Modal.Header><Modal.Title>Nokai: {nokai.name}</Modal.Title></Modal.Header>
                <Modal.Body>
                    Nokai profile
                </Modal.Body>
            </Modal>
        </div>
    }
}