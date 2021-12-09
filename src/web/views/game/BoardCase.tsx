import {Component} from "react";
import {Point} from "./data/Point";
import {Territory} from "../../../blockchain/definition/data/Territory";
import {Position} from "./data/Position";

type TerritoryProperties = {
    className: string,
    x: bigint,
    y: bigint,
    posX: number,
    posY: number,
    size: number,
    index: bigint,
    territory: Territory,
    onClick: ((pos: Position) => void) | null,
    onMouseOver: ((pos: Position) => void) | null,
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

    onMouseOver(event: any) {
        if (this.props.onMouseOver) {
            this.props.onMouseOver(new Position(this.props.index, this.props.x, this.props.y, this.props.posX, this.props.posY));
        }
    }


    onClick(event: any) {
        if (this.props.onClick) {
            this.props.onClick(new Position(this.props.index, this.props.x, this.props.y, this.props.posX, this.props.posY));
        }
    }

    calculateCoordinates(): Point[] {
        return BoardCase.corners.map(point => {
            return new Point(
                (point.x * this.props.size / 100) + (this.props.posX * this.props.size),
                (point.y * this.props.size / 100) + (this.props.posY * this.props.size) - (BoardCase.spacing * this.props.posY)
            )
        })
    }

    render() {
        const points = this.calculateCoordinates().map(point => `${point.x},${point.y}`).join(" ")
        return <g className={'hexagon-group ' + this.props.className}
                  onMouseOver={e => this.onMouseOver(e)}
                  onClick={e => this.onClick(e)}>
            <g className="hexagon">
                <text x={this.props.posX * this.props.size + 24} y={(this.props.posY * this.props.size) - (BoardCase.spacing * this.props.posY) + 55}
                      fill="black">{Number(this.props.x)}_{Number(this.props.y)}</text>
                <polygon points={points}/>
            </g>
        </g>
    }
}