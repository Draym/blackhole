import './App.scss';
import {Component} from "react";
import {BrowserRouter, Route, Switch} from "react-router-dom";
import GameView from "./web/views/GameView";
import HomeView from "./web/views/HomeView";
import MarketView from "./web/views/MarketView";

import {library} from '@fortawesome/fontawesome-svg-core'
import {faGithub, faLinkedinIn} from '@fortawesome/free-brands-svg-icons';

library.add(faGithub, faLinkedinIn);

const routerBaseName = process.env.PUBLIC_URL;

interface AppProperties {
}

interface AppState {
}

export default class App extends Component<AppProperties, AppState> {

    render() {
        return <div className="App">
            <main role="main">
                <BrowserRouter basename={routerBaseName}>
                    <Switch>
                        <Route path={"/play"}>
                            <GameView/>
                        </Route>
                        <Route path={"/market"}>
                            <MarketView/>
                        </Route>
                        <Route path={"/"}>
                            <HomeView/>
                        </Route>
                    </Switch>
                </BrowserRouter>
            </main>
        </div>
    }
}