import {Component} from "react";
import {Point} from "./data/Point";

type TerritoryProperties = {
    x: bigint,
    y: bigint,
    size: bigint,
    onClick: ((x: bigint, y: bigint) => void) | null,
    onMouseEnter: ((x: bigint, y: bigint) => void) | null,
    onMouseLeave: ((x: bigint, y: bigint) => void) | null,
    onMouseOver: ((x: bigint, y: bigint) => void) | null,
}

type TerritoryState = {
    loading: boolean,
    x: number,
    y: number,
    size: number,
}

export default class BoardCase extends Component<TerritoryProperties, TerritoryState> {

    static readonly spacing: number = 30
    static readonly corners: Point[] = [
        new Point(50, 0),
        new Point(100, BoardCase.spacing),
        new Point(100, 100 - BoardCase.spacing),
        new Point(50, 100),
        new Point(0, 100 - BoardCase.spacing),
        new Point(0, BoardCase.spacing),
    ]

    constructor(props: TerritoryProperties) {
        super(props)
        this.state = {
            loading: true,
            x: Number(props.x),
            y: Number(props.y),
            size: Number(props.size),
        }
    }

    componentDidMount() {
        this.setState({loading: false})
    }

    onMouseEnter(event: any) {
        if (this.props.onMouseEnter) {
            this.props.onMouseEnter(this.props.x, this.props.y);
        }
    }

    onMouseOver(event: any) {
        if (this.props.onMouseOver) {
            this.props.onMouseOver(this.props.x, this.props.y);
        }
    }

    onMouseLeave(event: any) {
        if (this.props.onMouseLeave) {
            this.props.onMouseLeave(this.props.x, this.props.y);
        }
    }

    onClick(event: any) {
        if (this.props.onClick) {
            this.props.onClick(this.props.x, this.props.y);
        }
    }

    calculateCoordinates(): Point[] {
        return BoardCase.corners.map(point => {
            let interval = (this.state.y % 2 === 1 ? 0.5 : 0)
           return new Point(
               (point.x * this.state.size / 100) + ((this.state.x + interval) * this.state.size),
               (point.y * this.state.size / 100) + (this.state.y* this.state.size) - (BoardCase.spacing * this.state.y)
        )
        })
    }

    render() {
        const x = this.state.x
        const y = this.state.y
        const points = this.calculateCoordinates().map( point => `${point.x},${point.y}`).join(" ")

        console.log(`points: [${x}, ${y}]`, points)
        return <g
            className={'hexagon-group'}
            onMouseEnter={e => this.onMouseEnter(e)}
            onMouseOver={e => this.onMouseOver(e)}
            onMouseLeave={e => this.onMouseLeave(e)}
            onClick={e => this.onClick(e)}>
            <g className="hexagon">
                <text fill="black">{this.state.x}, {this.state.y}</text>
                <polygon points={points}></polygon>
            </g>
        </g>
        //<ellipse cx={x * 100} cy={y * 100} rx="50" ry="50" fill={color}></ellipse>
        //<rect x={x * 100} y={y * 100} width="100" height="100" fill={color}></rect>
    }
}