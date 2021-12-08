import {Component} from "react";
import BlackHole from "../../../game/BlackHole";
import {BlackHoleContract} from "../../../blockchain/definition/BlackHoleContract";

type GameBoardProperties = {
    blackhole: BlackHoleContract
}

type GameBoardState = {
    loading: boolean,
    cameraX: number,
    cameraY: number,
    minX: number,
    minY: number
    maxX: number,
    maxY: number
}

export default class GameBoard extends Component<GameBoardProperties, GameBoardState> {

    constructor(props: GameBoardProperties) {
        super(props)
        this.state = {
            loading: true,
            cameraX: -50,
            cameraY: -50,
            minX: -50,
            minY: -50,
            maxX: 500,
            maxY: 500
        }
    }

    async componentDidMount() {
        // BlackHole.getTerritory(this.props.blackhole, 0, 0).then(territory => {
        //     console.log("0,0: ", territory)
        // })
        // BlackHole.getTerritory(this.props.blackhole, 50, 50).then(territory => {
        //     console.log("50,50: ", territory)
        // })
        BlackHole.getBoard(this.props.blackhole, 0, 10).then(territories => {
            console.log("0 -> 10: ", territories)
        })
        this.setState({loading: false})
        document.addEventListener("keydown", this._handleKeyDown)
    }


    componentWillUnmount() {
        document.removeEventListener("keydown", this._handleKeyDown)
    }

    moveCameraX(value: number) {
        let posX = this.state.cameraX + value
        if (posX < this.state.minX) {
            posX = this.state.minX
        }
        if (posX > this.state.maxX) {
            posX = this.state.maxX
        }
        this.setState({cameraX: posX})
    }

    moveCameraY(value: number) {
        let posY = this.state.cameraY + value
        if (posY < this.state.minY) {
            posY = this.state.minY
        }
        if (posY > this.state.maxY) {
            posY = this.state.maxY
        }
        this.setState({cameraY: posY})
    }

    _handleKeyDown = (event: { keyCode: number, preventDefault: any }) => {
        switch (event.keyCode) {
            case 40: // BOTTOM
                event.preventDefault()
                this.moveCameraY(100)
                break
            case 39: // RIGHT
                event.preventDefault()
                this.moveCameraX(100)
                break
            case 38: // TOP
                event.preventDefault()
                this.moveCameraY(-100)
                break
            case 37: // LEFT
                event.preventDefault()
                this.moveCameraX(-100)
                break
            default:
                break
        }
    }

    render() {
        console.log("camera: ", this.state.cameraX, this.state.cameraY)
        return <svg width="1400" height="800" viewBox={`${this.state.cameraX} ${this.state.cameraY} 1400 800`} style={{border: "1px solid black", marginBottom: 20}}>
            <circle cx="-300" cy="0" r="2" fill="purple"/>
            <circle cx="400" cy="0" r="2" fill="purple"/>
            <circle cx="1200" cy="0" r="2" fill="purple"/>
            <circle cx="2500" cy="0" r="2" fill="green"/>
            <circle cx="3900" cy="0" r="2" fill="green"/>

            <ellipse cx="2000" cy="200" rx="50" ry="50" fill="pink"></ellipse>
            <ellipse cx="2500" cy="200" rx="50" ry="50" fill="pink"></ellipse>
            <ellipse cx="3900" cy="200" rx="50" ry="50" fill="pink"></ellipse>

            <ellipse cx="0" cy="0" rx="50" ry="50"></ellipse>
            <ellipse cx="0" cy="100" rx="50" ry="50" fill="blue"></ellipse>
            <ellipse cx="0" cy="200" rx="50" ry="50" fill="blue"></ellipse>
            <ellipse cx="0" cy="300" rx="50" ry="50" fill="blue"></ellipse>

            <ellipse cx="100" cy="100" rx="50" ry="50"></ellipse>
            <ellipse cx="200" cy="200" rx="50" ry="50"></ellipse>
            <ellipse cx="300" cy="300" rx="50" ry="50"></ellipse>
            <ellipse cx="400" cy="400" rx="50" ry="50"></ellipse>

            <circle cx="0" cy="0" r="2" fill="red"/>
            <circle cx="50" cy="50" r="2" fill="red"/>
            <circle cx="100" cy="100" r="2" fill="red"/>
            <circle cx="200" cy="200" r="2" fill="red"/>
            <circle cx="300" cy="300" r="2" fill="red"/>
        </svg>
    }
}