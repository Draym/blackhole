import {Component} from "react";
import HomeLoading from "./home/HomeLoading";
import {Route, RouteComponentProps, Switch, withRouter} from "react-router-dom";
import Navbar from "./home/Navbar";
import TutorialView from "./home/TutorialView";
import {Button} from "react-bootstrap";

interface HomeViewProperties extends RouteComponentProps {
}

type HomeViewState = {
    loading: boolean
}

class HomeView extends Component<HomeViewProperties, HomeViewState> {
    constructor(props: HomeViewProperties) {
        super(props)
        this.state = {
            loading: true
        }
        this.launchGame = this.launchGame.bind(this)
    }

    componentDidMount() {
        this.setState({loading: false})
    }

    launchGame = () => {
        this.props.history.push('/play')
    }

    render() {
        let current = <div>
            <h2>Hello world!</h2>
            <Button variant="primary" onClick={this.launchGame}>
                Launch Game
            </Button>
        </div>

        if (this.state.loading) {
            return <HomeLoading/>
        } else {
            return <div>
                <Navbar/>
                <div className="container-fluid mt-5">
                    <Switch>
                        <Route path={"/tutorial"}>
                            <TutorialView/>
                        </Route>
                        <Route path={"/"}>
                            {current}
                        </Route>
                    </Switch>
                </div>
            </div>
        }
    }
}

export default withRouter(HomeView);