import "./nokai-inventory.scss";
import React, {Component} from "react";
import {Address, NokaiId} from "../../../../blockchain/definition/types";
import {NokaiContract} from "../../../../blockchain/definition/NokaiContract";
import Nokai from "../../../../api/Nokai";
import HttpUtils from "../../../../utils/HttpUtils";
import {NokaiConfig} from "../../data/NokaiConfig";
import {NfStorage} from "../../../../utils/NftStorage";
import NokaiStats from "../../../../api/NokaiStats";
import {NokaiStore} from "../../store/NokaiStore";
import {NokaiStatsContract} from "../../../../blockchain/definition/NokaiStatsContract";

type NokaiInventoryProperties = {
    nokai: NokaiContract,
    nokaiStats: NokaiStatsContract,
    account: Address,
    onClicked: ((nokaiId: NokaiId) => void) | null,
    onDragged: ((nokaiId: NokaiId) => void) | null
}

type NokaiInventoryState = {
    nokaisUpdatedAt: number,
    ownedNokaiIds: NokaiId[],
    loading: boolean
}

export default class NokaiInventory extends Component<NokaiInventoryProperties, NokaiInventoryState> {
    constructor(props: NokaiInventoryProperties) {
        super(props)
        this.state = {
            nokaisUpdatedAt: Date.now(),
            ownedNokaiIds: [],
            loading: true
        }
        this.nokaisUpdated = this.nokaisUpdated.bind(this)
        this.onNokaiClick = this.onNokaiClick.bind(this)
        this.onNokaiDragEnd = this.onNokaiDragEnd.bind(this)
    }

    async componentDidMount() {
        NokaiStore.subscribe("NokaiInventory", this.nokaisUpdated)
        await this.loadNokais()
    }

    componentWillUnmount() {
        NokaiStore.unsubscribe("NokaiInventory")
    }

    async componentDidUpdate(prevProps: Readonly<NokaiInventoryProperties>, prevState: Readonly<NokaiInventoryState>, snapshot?: any) {
        if (this.props.account !== prevProps.account) {
            await this.loadNokais()
        }
    }

    nokaisUpdated(nokaiIds: NokaiId[]) {
        this.setState({nokaisUpdatedAt: Date.now()})
    }

    async loadNokais() {
        Nokai.listFor(this.props.nokai, this.props.account).then(nokaiIds => {
            const required = NokaiStore.missing(nokaiIds)

            if (required.length !== 0) {
                NokaiStats.profiles(this.props.nokaiStats, required).then(profiles => {
                    const data: { [key: string]: {} } = {}
                    profiles.forEach(profile => {
                        data[profile.nokaiId.toString()] = {profile: profile}
                    })
                    NokaiStore.batch(data)
                })

                required.forEach(nokaiId => {
                    HttpUtils.get(NfStorage.config + `/${nokaiId}.json`, (result: NokaiConfig) => {
                        NokaiStore.update(nokaiId, {
                            nokaiId: nokaiId,
                            imageUrl: NfStorage.img + `/${result.image}`,
                            name: result.name
                        })
                    }, null)
                })
            }
            this.setState({loading: false, ownedNokaiIds: nokaiIds})
        })
    }

    onNokaiClick(e: React.MouseEvent<HTMLImageElement>, nokaiId: NokaiId) {
        e.preventDefault()
        if (this.props.onClicked != null) {
            this.props.onClicked(nokaiId)
        }
    }

    onNokaiDragEnd(e: React.MouseEvent<HTMLImageElement>, nokaiId: NokaiId) {
        e.preventDefault()
        if (this.props.onDragged != null) {
            this.props.onDragged(nokaiId)
        }
    }

    render() {
        return <div>
            {!this.state.loading && NokaiStore.list(this.state.ownedNokaiIds).map((nokai, index) => {
                return <img className="nokai-img" alt="nokai" key={index}
                            style={{border: "1px solid grey"}}
                            src={nokai.imageUrl}
                            onClick={(e) => {
                                this.onNokaiClick(e, nokai.nokaiId)
                            }}
                            onDragEnd={e => {
                                this.onNokaiDragEnd(e, nokai.nokaiId)
                            }}
                />
            })
            }
        </div>
    }
}