import {Component} from "react";
import {Address, NokaiId} from "../../../blockchain/definition/types";
import {NokaiContract} from "../../../blockchain/definition/NokaiContract";
import Nokai from "../../../game/Nokai";
import HttpUtils from "../../../utils/HttpUtils";
import {NokaiConfig} from "./data/NokaiConfig";
import {NfStorage} from "../../../utils/NftStorage";

class NokaiData {
    nokaiId: NokaiId
    imageUrl: URL
    name: string

    constructor(nokaiId: NokaiId, imageUrl: URL, name: string) {
        this.nokaiId = nokaiId
        this.imageUrl = imageUrl
        this.name = name
    }
}

type NokaiInventoryProperties = {
    nokai: NokaiContract,
    account: Address,
    onClick: (nokaiId: NokaiId) => void
}

type NokaiInventoryState = {
    nokais: { [key: string]: NokaiData }
    loading: boolean
}

export default class NokaiInventory extends Component<NokaiInventoryProperties, NokaiInventoryState> {
    constructor(props: NokaiInventoryProperties) {
        super(props)
        this.state = {
            nokais: {},
            loading: true
        }
    }

    async componentDidMount() {
        await this.loadNokais()
    }

    async componentDidUpdate(prevProps: Readonly<NokaiInventoryProperties>, prevState: Readonly<NokaiInventoryState>, snapshot?: any) {
        if (this.props.account !== prevProps.account) {
            await this.loadNokais()
        }
    }

    async loadNokais() {
        Nokai.listFor(this.props.nokai, this.props.account).then(nokaiIds => {
            console.log("nokais: ", nokaiIds)

            nokaiIds.forEach(nokaiId => {
                HttpUtils.get(NfStorage.config + `/${nokaiId}.json`, (result: NokaiConfig) => {
                    const nokais = this.state.nokais
                    nokais[nokaiId.toString()] = new NokaiData(nokaiId, new URL(NfStorage.img + `/${result.image}`), result.name)
                    this.setState({nokais: nokais})
                }, null)
            })
            this.setState({loading: false})
        })
    }

    render() {
        return <div>
            {!this.state.loading && Object.keys(this.state.nokais).map((key, index) => {
                return <img style={{border: "1px solid grey"}} src={this.state.nokais[key].imageUrl.toString()} alt="nokai" key={index}/>
            })
            }
        </div>
    }
}