import {EventSubscriber} from "./EventSubscriber";
import {
    BlackHoleContract,
    NokaiAssigned,
    NokaiMoved,
    NokaiWithdrawn
} from "../../../blockchain/definition/BlackHoleContract";
import BlackHole from "../../../api/BlackHole";
import {NokaiStore} from "../store/NokaiStore";
import {NokaiId} from "../../../blockchain/definition/types";
import {NokaiPos} from "../../../blockchain/definition/data/NokaiPos";

export default class BlackholeEventSubscriber implements EventSubscriber {

    onNokaiPositionUpdate: (nokaiId: NokaiId, newPos: NokaiPos | null) => any

    subscribers: any[]
    blackhole: BlackHoleContract
    setup: boolean

    constructor(blackhole: BlackHoleContract, onNokaiPositionUpdate: (nokaiId: NokaiId, newPos: NokaiPos | null) => any) {
        this.subscribers = []
        this.blackhole = blackhole
        this.setup = false
        this.onNokaiPositionUpdate = onNokaiPositionUpdate
    }

    isSetup(): boolean {
        return this.setup
    }

    subscribe(): any {
        console.log("Subscribe contract events")
        this.subscribers.push(BlackHole.subscribeNokaiAssigned(this.blackhole,
            null,
            (data: NokaiAssigned) => {
                const pos = {onBoard: true, x: data.x, y: data.y}
                NokaiStore.update(data.nokaiId, {nokaiPos: pos})
                this.onNokaiPositionUpdate(data.nokaiId, pos)
            }))
        this.subscribers.push(BlackHole.subscribeNokaiWithdrawn(this.blackhole,
            null,
            (data: NokaiWithdrawn) => {
                NokaiStore.update(data.nokaiId, {nokaiPos: {onBoard: false, x: BigInt(0), y: BigInt(0)}})
                this.onNokaiPositionUpdate(data.nokaiId, null)
            }))
        this.subscribers.push(BlackHole.subscribeNokaiMoved(this.blackhole,
            null,
            (data: NokaiMoved) => {
                const pos = {onBoard: true, x: data.toX, y: data.toY}
                NokaiStore.update(data.nokaiId, {nokaiPos: pos})
                this.onNokaiPositionUpdate(data.nokaiId, pos)
            }))

        this.setup = true
    }

    unsubscribe(): any {
        console.log("Unsubscribe contract events")
        this.subscribers.forEach(subscriber => {
            subscriber.unsubscribe()
        })
        this.setup = false
    }
}