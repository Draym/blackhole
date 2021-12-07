import {Component} from "react";

type HomeLoadingProperties = {}

type HomeLoadingState = {}

export default class HomeLoading extends Component<HomeLoadingProperties, HomeLoadingState> {

    render() {
        return <div className="animated fadeIn pt-1 text-center">Loading...</div>
    }
}