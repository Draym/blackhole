import Lina from "../blockchain/Lina";
import {GameManagerContract} from "../blockchain/definition/GameManagerContract";
import {Address, NokaiId} from "../blockchain/definition/types";
import {PositionTarget} from "../blockchain/definition/data/PositionTarget";
import {Position} from "../blockchain/definition/data/Position";

export default class GameManager {
    static async migrateBattleLogic(contract: GameManagerContract, battleLogic: Address) {
        await Lina.call(contract.methods.migrateBattleLogic(battleLogic))
    }

    static async move(contract: GameManagerContract, fromX: bigint, fromY: bigint, target: PositionTarget) {
        await Lina.call(contract.methods.move(fromX, fromY, target))
    }

    static async conquer(contract: GameManagerContract, fromX: bigint, fromY: bigint, target: PositionTarget) {
        await Lina.call(contract.methods.conquer(fromX, fromY, target))
    }

    static async teleport(contract: GameManagerContract, fromX: bigint, fromY: bigint, toX: bigint, toY: bigint) {
        await Lina.call(contract.methods.teleport(fromX, fromY, toX, toY))
    }

    static async assignNokaiToBoard(contract: GameManagerContract, nokaiId: NokaiId, x: bigint, y: bigint) {
        await Lina.call(contract.methods.assignNokaiToBoard(nokaiId, x, y))
    }

    static async upgradeExtractor(contract: GameManagerContract, x: bigint, y: bigint) {
        await Lina.call(contract.methods.upgradeExtractor(x, y))
    }

    static async collectResources(contract: GameManagerContract, positions: Position[]) {
        if (positions.length === 1) {
            await Lina.call(contract.methods.collectResources(positions[0].x, positions[0].y))
        } else if (positions.length > 0) {
            await Lina.call(contract.methods.collectResourcesBash(positions))
        }
    }
}