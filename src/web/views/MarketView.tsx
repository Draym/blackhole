import {Component} from "react";
import {RouteComponentProps, withRouter} from "react-router-dom";

interface MarketViewProperties extends RouteComponentProps {
}

type MarketViewState = {
    loading: boolean
}

class MarketView extends Component<MarketViewProperties, MarketViewState> {
    constructor(props: MarketViewProperties) {
        super(props)
        this.state = {
            loading: true
        }
        this.backToLobby = this.backToLobby.bind(this);
    }

    backToLobby = () => {
        this.props.history.push('/')
    }

    render() {
        return <div>
        </div>
    }
}
export default withRouter(MarketView);