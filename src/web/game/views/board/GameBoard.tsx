import "./game-board.scss";
import {Component} from "react";
import BlackHole from "../../../../api/BlackHole";
import {BlackHoleContract} from "../../../../blockchain/definition/BlackHoleContract";
import BoardCase from "./BoardCase";
import {Territory} from "../../../../blockchain/definition/data/Territory";
import MathUtils from "../../../../utils/MathUtils";
import {BoardPos} from "../../data/BoardPos";
import Web3Utils from "../../../../blockchain/Web3Utils";

class Canvas {
    width: number = 1400
    height: number = 750
    caseLength: bigint = BigInt(100)
}

class Camera {
    x: bigint
    y: bigint
    totalX: bigint
    totalY: bigint

    constructor(x: bigint, y: bigint, totalX: bigint, totalY: bigint) {
        this.x = x;
        this.y = y;
        this.totalX = totalX;
        this.totalY = totalY;
    }

    setX(x: bigint): Camera {
        this.x = x;
        return this
    }

    setY(y: bigint): Camera {
        this.y = y;
        return this
    }
}

class Board {
    casesX: bigint
    casesY: bigint
    total: bigint

    constructor(x: bigint, y: bigint) {
        this.casesX = x;
        this.casesY = y;
        this.total = x * y
    }
}

type CameraPos = {
    key: number,
    x: bigint,
    y: bigint,
    posX: number,
    posY: number,
    territory: Territory
}
type GameBoardProperties = {
    blackhole: BlackHoleContract
}

type GameBoardState = {
    loading: boolean,
    canvas: Canvas,
    camera: Camera,
    board: Board,
    boxSelected: BoardPos | null,
    boxFocused: BoardPos | null,
    positions: { [key: number]: Territory }
}

export default class GameBoard extends Component<GameBoardProperties, GameBoardState> {

    constructor(props: GameBoardProperties) {
        super(props)
        this.state = {
            loading: true,
            canvas: new Canvas(),
            camera: new Camera(BigInt(0), BigInt(0), BigInt(14), BigInt(11)),
            board: new Board(BigInt(0), BigInt(0)),
            positions: {},
            boxSelected: null,
            boxFocused: null
        }
        this.boxClicked = this.boxClicked.bind(this)
        this.boxUnSelect = this.boxUnSelect.bind(this)
        this.boxHover = this.boxHover.bind(this)
    }

    async componentDidMount() {
        Promise.all([
            BlackHole.getMaxX(this.props.blackhole),
            BlackHole.getMaxY(this.props.blackhole)
        ]).then((values) => {
            this.setState({board: new Board(values[0], values[1])})

            this.loadDataForCamera(BigInt(0), this.state.camera.totalX + BigInt(1), BigInt(0), this.state.camera.totalY + BigInt(1)).then(() => {
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

    needQueryData(startPos: bigint, endPos: bigint, startLine: bigint, endLine: bigint): boolean {
        for (let y = startLine; y < endLine; y++) {
            for (let x = startPos; x < endPos; x++) {
                const key: number = Number(y * this.state.board.casesX + x)
                if (this.state.positions[key] === undefined) {
                    return true;
                }
            }
        }
        return false
    }

    async loadDataForCamera(startPos: bigint, endPos: bigint, startLine: bigint, endLine: bigint) {
        if (startPos > endPos) {
            let tmp = startPos
            startPos = endPos
            endPos = tmp
        }
        if (startLine > endLine) {
            let tmp = startLine
            startLine = endLine
            endLine = tmp
        }
        startPos = startPos >= BigInt(0) ? startPos : BigInt(0)
        startLine = startPos >= BigInt(0) ? startLine : BigInt(0)
        endPos = endPos < this.state.board.casesX ? endPos : this.state.board.casesX
        endLine = endLine < this.state.board.casesY ? endLine : this.state.board.casesY
        if (!this.needQueryData(startPos, endPos, startLine, endLine))
            return
        console.log("LOAD QUERY:", startPos, endPos, startLine, endLine)
        BlackHole.getTerritoryForBox(this.props.blackhole, startPos, endPos, startLine, endLine).then(territories => {
            let positions: { [key: number]: Territory } = {}
            territories.forEach((territory, index) => {
                const lineCount = endPos - startPos
                const lineIndex: bigint = (BigInt(index) / lineCount) + startLine
                const origin: bigint = (lineIndex * this.state.board.casesX) + startPos
                const pos: bigint = origin + (BigInt(index) % lineCount)
                positions[Number(pos)] = territory
            })
            //console.log("response:", positions)
            console.log("BOARD:", {...this.state.positions, ...positions})
            this.setState({positions: {...this.state.positions, ...positions}})
        })
    }

    moveCameraX(value: number) {
        let max = this.state.board.casesX - this.state.camera.totalX > BigInt(0) ? this.state.board.casesX - this.state.camera.totalX : BigInt(0)
        let posX: bigint = this.state.camera.x + BigInt(value)
        if (posX < 0) {
            posX = BigInt(0)
        }
        if (posX > max) {
            posX = max
        }
        this.setState({camera: this.state.camera.setX(posX)})
        if (posX + this.state.camera.totalX + BigInt(value) < max) {
            this.loadDataForCamera(posX + this.state.camera.totalX, posX + this.state.camera.totalX + BigInt(value), this.state.camera.y, this.state.camera.y + this.state.camera.totalY)
        }
    }

    moveCameraY(value: number) {
        let max = this.state.board.casesY - this.state.camera.totalY > BigInt(0) ? this.state.board.casesY - this.state.camera.totalY : BigInt(0)
        let posY: bigint = this.state.camera.y + BigInt(value)
        if (posY < 0) {
            posY = BigInt(0)
        }
        if (posY > max) {
            posY = max
        }
        this.setState({camera: this.state.camera.setY(posY)})
        if (posY + this.state.camera.totalY + BigInt(value) < max) {
            this.loadDataForCamera(this.state.camera.x, this.state.camera.x + this.state.camera.totalX, posY + this.state.camera.totalY, posY + this.state.camera.totalY + BigInt(value))
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

    private getCameraView(): CameraPos[] {
        const result: CameraPos[] = []
        const originX = this.state.camera.x === BigInt(0)
        const originY = this.state.camera.y === BigInt(0)

        const camX = originX ? this.state.camera.x : this.state.camera.x - BigInt(1)
        const camY = originY ? this.state.camera.y : this.state.camera.y - BigInt(1)
        let maxX = camX + this.state.camera.totalX + BigInt(1)
        let maxY = camY + this.state.camera.totalY + BigInt(1)

        maxX = maxX < this.state.board.casesX ? maxX : this.state.board.casesX
        maxY = maxY < this.state.board.casesY ? maxY : this.state.board.casesY

        for (let y = camY; y < maxY; y++) {
            for (let x = camX; x < maxX; x++) {

                const key: number = Number(y * this.state.board.casesX + x)

                //console.log(`[${key}] (${x}, ${y}): ${this.state.positions[key]}`)
                if (this.state.positions[key] !== undefined) {
                    const posY: number = Number(y - camY) - (originY ? 0 : 1)
                    const posX: number = Number(x - camX) - (originX ? 0 : 1)

                    let adjustX: number = 0
                    if (MathUtils.isNotEven2(posY) || MathUtils.isNotEven(this.state.camera.y))
                        adjustX = 0.5
                    if (MathUtils.isNotEven2(posY) && MathUtils.isNotEven(this.state.camera.y))
                        adjustX = 0

                    result.push({
                        key: key,
                        territory: this.state.positions[key],
                        posX: posX + adjustX,
                        posY: posY,
                        x: x,
                        y: y,
                    })
                }
            }
        }
        return result;
    }

    boxClicked(pos: BoardPos) {
        if (this.state.boxSelected?.index === pos.index) {
            this.boxUnSelect()
        } else {
            const territory = this.state.positions[Number(pos.index)]
            if (territory.nokaiId !== BigInt(0) && territory.owner === Web3Utils.getDefaultAccount()) {
                this.setState({boxSelected: pos})
            }
        }
    }

    boxUnSelect() {
        this.setState({boxSelected: null})
    }

    boxHover(pos: BoardPos) {
        this.setState({boxFocused: pos})
    }

    getClassName(index: bigint): string {
        if (this.state.boxSelected?.index === index) {
            return "box-selected"
        } else if (this.state.boxFocused?.index === index) {
            return "box-foxused"
        } else {
            return ""
        }
    }

    allowedDistanceForTarget(): boolean {
        if (this.state.boxSelected !== null && this.state.boxFocused !== null) {
            let diffX = this.state.boxSelected.posX - this.state.boxFocused.posX
            let diffY = this.state.boxSelected.posY - this.state.boxFocused.posY
            return diffX <= 1 && diffX >= -1 && diffY <= 1 && diffY >= -1
        }
        return false;
    }

    getPath(pos1: BoardPos, pos2: BoardPos): string {
        return `M${(pos1.posX * 100) + 50} ${(pos1.posY * 100) + 50 - (BoardCase.spacing * pos1.posY)} L${(pos2.posX * 100) + 50} ${(pos2.posY * 100) + 50 - (BoardCase.spacing * pos2.posY)}`
    }

    render() {
        return <div>
            <div className="row">
                <div className="col-md-9">
                    <h6>Camera [{Number(this.state.camera.x)}, {Number(this.state.camera.y)}] __ Map
                        [{Number(this.state.board.casesX)}, {Number(this.state.board.casesY)}]</h6>
                </div>
                <div className="col-md-3">
                    {this.state.boxFocused != null &&
                        <h6>Position [{Number(this.state.boxFocused.x)}, {Number(this.state.boxFocused.y)}]</h6>}
                </div>
            </div>
            <div className="row">
                <div className="col-md-12">
                    <svg width={this.state.canvas.width} height={this.state.canvas.height}
                         style={{border: "1px solid grey"}}>

                        {!this.state.loading && this.getCameraView().map((data, index) => {
                            return <BoardCase key={index} className={this.getClassName(BigInt(data.key))}
                                              index={BigInt(data.key)} x={data.x} y={data.y} posX={data.posX}
                                              posY={data.posY} size={Number(this.state.canvas.caseLength)}
                                              territory={data.territory}
                                              onClick={this.boxClicked}
                                              onMouseOver={this.boxHover}
                                              onDragEnter={null}/>
                        })
                        }

                        {this.allowedDistanceForTarget() &&
                            <path d={this.getPath(this.state.boxSelected!!, this.state.boxFocused!!)}/>
                        }
                    </svg>
                </div>
            </div>
        </div>
    }
}