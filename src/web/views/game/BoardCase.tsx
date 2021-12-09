import {Component} from "react";
import {Point} from "./data/Point";
import {Territory} from "../../../blockchain/definition/data/Territory";

type TerritoryProperties = {
    x: bigint,
    y: bigint,
    posX: number,
    posY: number,
    size: number,
    index: bigint,
    territory: Territory,
    onClick: ((index: bigint) => void) | null,
    onMouseEnter: ((index: bigint) => void) | null,
    onMouseLeave: ((index: bigint) => void) | null,
    onMouseOver: ((index: bigint) => void) | null,
}

type TerritoryState = {
    loading: boolean,
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
        }
    }

    componentDidMount() {
        this.setState({loading: false})
    }

    onMouseEnter(event: any) {
        if (this.props.onMouseEnter) {
            this.props.onMouseEnter(this.props.index);
        }
    }

    onMouseOver(event: any) {
        if (this.props.onMouseOver) {
            this.props.onMouseOver(this.props.index);
        }
    }

    onMouseLeave(event: any) {
        if (this.props.onMouseLeave) {
            this.props.onMouseLeave(this.props.index);
        }
    }

    onClick(event: any) {
        if (this.props.onClick) {
            this.props.onClick(this.props.index);
        }
    }

    calculateCoordinates(): Point[] {
        return BoardCase.corners.map(point => {
           return new Point(
               (point.x * this.props.size / 100) + (this.props.posX  * this.props.size),
               (point.y * this.props.size / 100) + (this.props.posY * this.props.size) - (BoardCase.spacing * this.props.posY)
        )
        })
    }

    render() {
        const points = this.calculateCoordinates().map( point => `${point.x},${point.y}`).join(" ")
        return <g className={'hexagon-group'}
            onMouseEnter={e => this.onMouseEnter(e)}
            onMouseOver={e => this.onMouseOver(e)}
            onMouseLeave={e => this.onMouseLeave(e)}
            onClick={e => this.onClick(e)}>
            <g className="hexagon">
                <text x={this.props.posX * this.props.size + 24} y={(this.props.posY * this.props.size) - (BoardCase.spacing * this.props.posY) + 55} fill="black">{Number(this.props.x)}_{Number(this.props.y)}</text>
                <polygon points={points}/>
            </g>
        </g>
    }
}