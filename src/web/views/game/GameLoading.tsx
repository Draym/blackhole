import {Component} from "react";

type GameLoadingProperties = {}

type GameLoadingState = {}

export default class GameLoading extends Component<GameLoadingProperties, GameLoadingState> {

    render() {
        return <div className="animated fadeIn pt-1 text-center">Loading...</div>
    }
}