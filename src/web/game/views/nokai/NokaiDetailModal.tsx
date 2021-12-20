import "./nokai-detail.scss";
import {Component} from "react";
import {Modal} from "react-bootstrap";
import {NokaiId} from "../../../../blockchain/definition/types";
import {NokaiStore} from "../../store/NokaiStore";
import {Rarity} from "../../../../blockchain/definition/data/NokaiProfile";

interface NokaiDetailModalProperties {
    nokaiId: NokaiId,
    onExit: () => any
}

type NokaiDetailModalState = {}

export default class NokaiDetailModal extends Component<NokaiDetailModalProperties, NokaiDetailModalState> {
    render() {
        const nokai = NokaiStore.get(this.props.nokaiId)
        if (nokai != null) {
            return <div>
                <Modal className="nokai-profile-modal"
                       show={true}
                       aria-labelledby="contained-modal-title-vcenter"
                       keyboard={true}
                       centered animation={false}
                       onExit={this.props.onExit}
                       onHide={this.props.onExit}
                >
                    <Modal.Body>
                        <div className="row">
                            <div className="col-md-3">
                                <img src={nokai.imageUrl} alt="nokai"/>
                            </div>
                            <div className="col-md-9">
                                <div className="row">
                                    <h3>{nokai.name}</h3>
                                </div>
                                <div className="row">
                                    <h5>Rank: {Rarity[nokai.profile.stats.grade]}</h5>
                                </div>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-md-4">
                                <div className="row">
                                    <h5>Stats</h5>
                                    <h5>Health: {nokai.profile.currentHp}</h5>
                                    <h5>Energy: {nokai.profile.currentPa}</h5>
                                </div>
                                <div className="row">
                                    <h5>Status: {nokai.profile.burned ? "Burned" : (nokai.profile.dead ? " Dead" : "Alive")}</h5>
                                </div>
                            </div>
                            <div className="col-md-4">
                                <h5>Profile</h5>
                                <h5>Health: {nokai.profile.stats.hp}</h5>
                                <h5>Attack: {nokai.profile.stats.attack}</h5>
                                <h5>Defense: {nokai.profile.stats.defense}</h5>
                                <h5>Regen: {nokai.profile.stats.regen}</h5>
                                <h5>Energy: {nokai.profile.stats.pa}</h5>
                            </div>
                        </div>
                    </Modal.Body>
                </Modal>
            </div>
        } else return <div/>
    }
}