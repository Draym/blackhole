import React, {Component} from "react";
import {Address, NokaiId} from "../../../blockchain/definition/types";
import {NokaiContract} from "../../../blockchain/definition/NokaiContract";
import Nokai from "../../../game/Nokai";
import HttpUtils from "../../../utils/HttpUtils";
import {NokaiConfig} from "./data/NokaiConfig";
import {NfStorage} from "../../../utils/NftStorage";
import NokaiStats from "../../../game/NokaiStats";
import {NokaiStore} from "./store/NokaiStore";
import {NokaiStatsContract} from "../../../blockchain/definition/NokaiStatsContract";

type NokaiInventoryProperties = {
    nokai: NokaiContract,
    nokaiStats: NokaiStatsContract,
    account: Address,
    onClick: (nokaiId: NokaiId) => void
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
    }

    async componentDidMount() {
        NokaiStore.subscribe("NokaiInventory", this.nokaisUpdated)
        await this.loadNokais()
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

            NokaiStats.profiles(this.props.nokaiStats, nokaiIds).then(profiles => {
                const data: { [key: string]: {} } = {}
                profiles.forEach(profile => {
                    data[profile.nokaiId.toString()] = {profile: profile}
                })
                NokaiStore.batch(data)
            })

            nokaiIds.forEach(nokaiId => {
                HttpUtils.get(NfStorage.config + `/${nokaiId}.json`, (result: NokaiConfig) => {
                    NokaiStore.update(nokaiId, {nokaiId: nokaiId, imageUrl: NfStorage.img + `/${result.image}`, name: result.name})
                }, null)
            })
            this.setState({loading: false, ownedNokaiIds: nokaiIds})
        })
    }

    onNokaiClick(e: React.MouseEvent<HTMLImageElement>, nokaiId: NokaiId) {
        e.preventDefault()
        this.props.onClick(nokaiId)
    }

    render() {
        return <div>
            {!this.state.loading && NokaiStore.list(this.state.ownedNokaiIds).map((nokai, index) => {
                return <img className="nokai-profile-img" style={{border: "1px solid grey"}} src={nokai.imageUrl} alt="nokai" key={index} onClick={(e) => {
                    this.onNokaiClick(e, nokai.nokaiId)
                }}/>
            })
            }
        </div>
    }
}