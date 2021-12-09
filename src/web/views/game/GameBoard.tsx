import {Component} from "react";
import BlackHole from "../../../game/BlackHole";
import {BlackHoleContract} from "../../../blockchain/definition/BlackHoleContract";
import BoardCase from "./BoardCase";
import NumberUtils from "../../../utils/NumberUtils";
import {Territory} from "../../../blockchain/definition/data/Territory";

type GameBoardProperties = {
    blackhole: BlackHoleContract
}

type GameBoardState = {
    loading: boolean,
    cameraX: bigint,
    cameraY: bigint,
    caseLength: bigint,
    cameraMaxX: bigint,
    cameraMaxY: bigint,
    minX: bigint,
    minY: bigint
    maxX: bigint,
    maxY: bigint,
    positions: { [key: number]: Territory }
}

export default class GameBoard extends Component<GameBoardProperties, GameBoardState> {

    constructor(props: GameBoardProperties) {
        super(props)
        this.state = {
            loading: true,
            cameraX: BigInt(1),
            cameraY: BigInt(1),
            caseLength: BigInt(100),
            cameraMaxX: BigInt(14),
            cameraMaxY: BigInt(8),
            minX: BigInt(0),
            minY: BigInt(0),
            maxX: BigInt(0),
            maxY: BigInt(0),
            positions: {}
        }
    }

    async componentDidMount() {
        Promise.all([
            BlackHole.getMaxX(this.props.blackhole),
            BlackHole.getMaxY(this.props.blackhole)
        ]).then((values) => {
            this.setState({maxX: values[0], maxY: values[1]})

            this.drawCamera(BigInt(0), this.state.cameraMaxX + BigInt(1), BigInt(0), this.state.cameraMaxY + BigInt(5)).then(() => {
                this.setState({loading: false})
            })
        });

        document.addEventListener("keydown", this._handleKeyDown)
        document.addEventListener("keyup", this._handleKeyUp)
    }

    componentWillUnmount() {
        document.addEventListener("keydown", this._handleKeyDown)
        document.removeEventListener("keyup", this._handleKeyUp)
    }

    async drawCamera(startPos: bigint, endPos: bigint, startLine: bigint, endLine: bigint) {
        BlackHole.getTerritoryForBox(this.props.blackhole, startPos, endPos, startLine, endLine).then(territories => {
            let positions: { [key: number]: Territory } = {}
            territories.forEach((territory, index) => {
                const lineCount = endPos - startPos
                const lineIndex: bigint = (BigInt(index) / lineCount) + startLine
                const origin: bigint = (lineIndex * this.state.maxX) + startPos
                const pos: bigint = origin + (BigInt(index) % lineCount)
                console.log(lineIndex, origin, index, "_", pos, "=>", territory)
                positions[Number(pos)] = territory
            })
            this.setState({positions: {...this.state.positions, ...positions}})
        })
    }

    moveCameraX(value: number) {
        let posX: bigint = this.state.cameraX + BigInt(value)
        if (posX < 0) {
            posX = BigInt(0)
        }
        if (posX > this.state.maxX) {
            posX = this.state.maxX
        }
        this.setState({cameraX: posX})
        console.log(posX + this.state.cameraMaxX, posX + this.state.cameraMaxX + BigInt(1), this.state.cameraY, this.state.cameraY + this.state.cameraMaxY+ BigInt(5))
        if (posX + this.state.cameraMaxX + BigInt(1) < this.state.maxX) {
            this.drawCamera(posX + this.state.cameraMaxX, posX + this.state.cameraMaxX + BigInt(1), this.state.cameraY, this.state.cameraY + this.state.cameraMaxY + BigInt(5))
        }
    }

    moveCameraY(value: number) {
        let posY = this.state.cameraY + BigInt(value)
        if (posY < 0) {
            posY = BigInt(0)
        }
        if (posY > this.state.maxY) {
            posY = this.state.maxY
        }
        this.setState({cameraY: posY})
        console.log(this.state.cameraX, this.state.cameraX + this.state.cameraMaxX, posY + this.state.cameraMaxY, posY + this.state.cameraMaxY + BigInt(1))
        if (posY + this.state.cameraMaxY + BigInt(1) < this.state.maxY - this.state.cameraY) {
            this.drawCamera(this.state.cameraX, this.state.cameraX + this.state.cameraMaxX + BigInt(1), posY + this.state.cameraMaxY, posY + this.state.cameraMaxY + BigInt(1))
        }
    }

    _handleKeyUp = (event: { keyCode: number, preventDefault: any }) => {
        switch (event.keyCode) {
            case 40: // BOTTOM
                event.preventDefault()
                this.moveCameraY(1)
                break
            case 39: // RIGHT
                event.preventDefault()
                this.moveCameraX(1)
                break
            case 38: // TOP
                event.preventDefault()
                this.moveCameraY(-1)
                break
            case 37: // LEFT
                event.preventDefault()
                this.moveCameraX(-1)
                break
            default:
                break
        }
    }

    _handleKeyDown = (event: { keyCode: number, preventDefault: any }) => {
        switch (event.keyCode) {
            case 40: // BOTTOM
                event.preventDefault()
                break
            case 39: // RIGHT
                event.preventDefault()
                break
            case 38: // TOP
                event.preventDefault()
                break
            case 37: // LEFT
                event.preventDefault()
                break
            default:
                break
        }
    }

    private getCameraPosX(): number {
        return Number(this.state.cameraX * this.state.caseLength)
    }

    private getCameraPosY(): number {
        return Number(this.state.cameraY * this.state.caseLength)
    }

    private getCameraMaxX(): number {
        return Number(this.state.cameraMaxX * this.state.caseLength)
    }

    private getCameraMaxY(): number {
        return Number(this.state.cameraMaxY * this.state.caseLength)
    }


    render() {
        console.log("DRAW AGAIN")
        return <div>
            <h4>Camera [{Number(this.state.cameraX)}, {Number(this.state.cameraY)}] __ Map [{Number(this.state.maxX)}, {Number(this.state.maxY)}]</h4>
            <svg width={this.getCameraMaxX()} height={this.getCameraMaxY()}
                 viewBox={`${this.getCameraPosX()} ${this.getCameraPosY()} ${this.getCameraMaxX()} ${this.getCameraMaxY()}`} style={{border: "1px solid black", marginBottom: 20}}>

                {Object.keys(this.state.positions).map((key, i) => {
                    const index = NumberUtils.from(key)
                    return <BoardCase x={index % this.state.maxX} y={index / this.state.maxX} size={this.state.caseLength} key={i} onClick={null} onMouseEnter={null} onMouseLeave={null} onMouseOver={null}/>
                })
                }
            </svg>
        </div>
    }
}