import {Component} from "react";

type TerritoryProperties = {
    x: bigint,
    y: bigint
}

type TerritoryState = {
    loading: boolean
}

export default class BoardCase extends Component<TerritoryProperties, TerritoryState> {

    constructor(props: TerritoryProperties) {
        super(props)
        this.state = {
            loading: true
        }
    }

    componentDidMount() {
        this.setState({loading: false})
    }

    render() {
        const x = Number(this.props.x)
        const y = Number(this.props.y)
        let color = "pink"
        if (x % 2 === 0)
            color = "blue"
        if (y % 2 === 0 && x % 2 === 0)
            color = "red"
        return <ellipse cx={x * 100} cy={y * 100} rx="50" ry="50" fill={color}></ellipse>
    }
}