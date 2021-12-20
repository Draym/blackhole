import "./game-board.scss";
import {Component} from "react";
import {Point} from "../../data/Point";
import {Territory} from "../../../../blockchain/definition/data/Territory";
import {BoardPos} from "../../data/BoardPos";
import {GameResourceImg} from "../../../../resources/images";
import MathUtils from "../../../../utils/MathUtils";
import {DragNokai} from "../../store/DragNokai";
import {NokaiStore} from "../../store/NokaiStore";
import Web3Utils from "../../../../blockchain/Web3Utils";

type TerritoryProperties = {
    className: string,
    x: bigint,
    y: bigint,
    posX: number,
    posY: number,
    size: number,
    index: bigint,
    territory: Territory,
    onClick: ((pos: BoardPos) => void) | null,
    onMouseOver: ((pos: BoardPos) => void) | null,
    onDragEnter: ((pos: BoardPos) => void) | null
}

type TerritoryState = {
    loading: boolean,
    onDragFocus: boolean
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
            onDragFocus: false
        }
    }

    componentDidMount() {
        this.setState({loading: false})
    }

    onMouseOver(event: any) {
        if (this.props.onMouseOver) {
            this.props.onMouseOver(new BoardPos(this.props.index, this.props.x, this.props.y, this.props.posX, this.props.posY));
        }
    }

    onDragEnter(event: any) {
        const position = new BoardPos(this.props.index, this.props.x, this.props.y, this.props.posX, this.props.posY)
        DragNokai.changePos(position)
        if (this.props.onDragEnter) {
            this.props.onDragEnter(position)
        }
        this.setState({onDragFocus: true})
    }

    onDragLeave(event: any) {
        this.setState({onDragFocus: false})
        if (!(event.relatedTarget == null || event.relatedTarget.tagName === 'polygon')) {
            DragNokai.resetPosition()
        }
    }


    onClick(event: any) {
        if (this.props.onClick) {
            this.props.onClick(new BoardPos(this.props.index, this.props.x, this.props.y, this.props.posX, this.props.posY));
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

    getResource(): { img: any, width: number, height: number } | null {
        if (this.props.territory.uxonium > 0) {
            return {
                img: GameResourceImg.UXONIUM,
                width: 50,
                height: 50
            }
        } else if (this.props.territory.darkMatter > 0) {
            return {
                img: GameResourceImg.DARK_MATTER,
                width: MathUtils.max(45 * Number(this.props.territory.darkMatter) / 100, 15),
                height: MathUtils.max(45 * Number(this.props.territory.darkMatter) / 100, 15)
            }
        } else if (this.props.territory.plasmaEnergy > 0) {
            return {
                img: GameResourceImg.PLASMA_ENERGY,
                width: MathUtils.max(45 * Number(this.props.territory.plasmaEnergy) / 100, 15),
                height: MathUtils.max(45 * Number(this.props.territory.plasmaEnergy) / 100, 151)
            }
        } else if (this.props.territory.voidEssence > 0) {
            return {
                img: GameResourceImg.VOID_ESSENCE,
                width: MathUtils.max(45 * Number(this.props.territory.voidEssence) / 100, 15),
                height: MathUtils.max(45 * Number(this.props.territory.voidEssence) / 100, 15)
            }
        } else {
            return null
        }
    }

    getTerritoryClassName(): string {
        const territoryOwned = (this.props.territory.owner !== Web3Utils.nullAddress() ? " territory-owned" : "")
        const territoryOwnedByCurrent = (this.props.territory.owner === Web3Utils.getDefaultAccount() ? " territory-owned-current" : "")
        return this.props.className + territoryOwned + territoryOwnedByCurrent
    }

    getDragClassName(): string {
        if (this.state.onDragFocus) {
            if (this.props.territory.nokaiId !== BigInt(0) ||
                (this.props.territory.owner !== Web3Utils.nullAddress() && this.props.territory.owner !== Web3Utils.getDefaultAccount())) {
                return " case-drag-focus-not-allowed"
            } else {
                return " case-drag-focus"
            }
        } else return ""
    }

    render() {
        const resource = this.getResource()
        const points = this.calculateCoordinates().map(point => `${point.x},${point.y}`).join(" ")
        const x = this.props.posX * this.props.size
        const y = (this.props.posY * this.props.size) - (BoardCase.spacing * this.props.posY)
        const nokai = this.props.territory.nokaiId !== BigInt(0) ? NokaiStore.get(this.props.territory.nokaiId) : null
        return <g className={'hexagon-group ' + this.getTerritoryClassName()}
                  onMouseOver={e => this.onMouseOver(e)}
                  onClick={e => this.onClick(e)}
                  onDragEnter={e => {
                      this.onDragEnter(e)
                  }}
                  onDragLeave={e => {
                      this.onDragLeave(e)
                  }}
        >
            <g className={"hexagon" + this.getDragClassName()}>
                <text x={x + 24}
                      y={y + 55}
                      fill="black">{Number(this.props.x)}_{Number(this.props.y)}</text>
                <polygon points={points}/>
                {resource != null && <image href={resource.img}
                                            height={resource.height} width={resource.width}
                                            x={x + (this.props.size / 2) - (resource.width / 2)}
                                            y={y + (this.props.size / 2) - (resource.height / 2)}/>}
                {nokai != null && <image href={nokai.imageUrl}
                                         height={40} width={40}
                                         x={x + (this.props.size / 2)}
                                         y={y + (this.props.size / 2)}/>}
            </g>
        </g>
    }
}