import {Component} from "react";
import {RouteComponentProps, withRouter} from "react-router-dom";

interface TutorialViewProperties extends RouteComponentProps {
}

type TutorialViewState = {
    loading: boolean
}

class TutorialView extends Component<TutorialViewProperties, TutorialViewState> {
    constructor(props: TutorialViewProperties) {
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
export default withRouter(TutorialView);