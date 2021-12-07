import {Component} from "react";

type MarketNavbarProperties = {}

type MarketNavbarState = {
    loading: boolean
}

export default class MarketNavbar extends Component<MarketNavbarProperties, MarketNavbarState> {
    constructor(props: MarketNavbarProperties) {
        super(props)
        this.state = {
            loading: true
        }
    }

    render() {
        return <div>
        </div>
    }
}