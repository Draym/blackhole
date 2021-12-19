import {Contract} from "web3-eth-contract";
import {Address, NokaiId} from "./types";
import {PositionTarget} from "./data/PositionTarget";
import {Position} from "./data/Position";

interface Methods {
    migrateBattleLogic: (battleLogic: Address) => any,
    move: (fromX: bigint, fromY: bigint, target: PositionTarget) => any,
    conquer: (fromX: bigint, fromY: bigint, target: PositionTarget) => any,
    teleport: (fromX: bigint, fromY: bigint, toX: bigint, toY: bigint) => any,
    assignNokaiToBoard: (nokaiId: NokaiId, x: bigint, y: bigint) => any,
    
    upgradeExtractor: (x: bigint, y: bigint) => any,
    collectResources: (x: bigint, y: bigint) => any,
    collectResourcesBash: (positions: Position[]) => any
}

interface Events {
}

export interface GameManagerContract extends Contract {
    methods: Methods
    events: Events
}