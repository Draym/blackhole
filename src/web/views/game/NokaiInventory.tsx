import {Component} from "react";
import {Address, NokaiId} from "../../../blockchain/definition/types";
import {NokaiContract} from "../../../blockchain/definition/NokaiContract";
import Nokai from "../../../game/Nokai";

class NokaiData {
    nokaiId: NokaiId
    imgUrl: URL

    constructor(nokaiId: NokaiId, imgUrl: URL) {
        this.nokaiId = nokaiId
        this.imgUrl = imgUrl
    }
}

type NokaiInventoryProperties = {
    nokai: NokaiContract,
    account: Address,
    onClick: (nokaiId: NokaiId) => void
}

type NokaiInventoryState = {
    nokais: NokaiData[]
    loading: boolean
}

export default class NokaiInventory extends Component<NokaiInventoryProperties, NokaiInventoryState> {
    constructor(props: NokaiInventoryProperties) {
        super(props)
        this.state = {
            nokais: [],
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
            this.setState({loading: false})
        })
    }

    render() {
        return <div>

        </div>
    }
}