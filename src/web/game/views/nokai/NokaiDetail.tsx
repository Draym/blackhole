import {NokaiId} from "../../../../blockchain/definition/types";
import {Component} from "react";

interface NokaiDetailProperties {
    nokaiId: NokaiId
}

type NokaiDetailState = {
    loading: boolean
}

export default class NokaiDetail extends Component<NokaiDetailProperties, NokaiDetailState> {
    constructor(props: NokaiDetailProperties) {
        super(props)
        this.state = {
            loading: true
        }
    }

    render() {
        return <div></div>
    }
}