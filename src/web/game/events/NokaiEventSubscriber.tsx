import {EventSubscriber} from "./EventSubscriber";
import {
    BlackHoleContract,
    NokaiAssigned,
    NokaiMoved,
    NokaiWithdrawn
} from "../../../blockchain/definition/BlackHoleContract";
import BlackHole from "../../../api/BlackHole";
import {NokaiStore} from "../store/NokaiStore";

export default class NokaiEventSubscriber implements EventSubscriber {

    subscribers: any[]
    blackhole: BlackHoleContract
    setup: boolean

    constructor(blackhole: BlackHoleContract) {
        this.subscribers = []
        this.blackhole = blackhole
        this.setup = false
    }

    isSetup(): boolean {
        return this.setup
    }

    subscribe(): any {
        console.log("Subscribe contract events")
        this.subscribers.push(BlackHole.subscribeNokaiAssigned(this.blackhole,
            null,
            (data: NokaiAssigned) => {
            console.log("assign nokai: ", data)
                NokaiStore.update(data.nokaiId, {nokaiPos: {onBoard: true, x: data.x, y: data.y}})
            }))
        this.subscribers.push(BlackHole.subscribeNokaiWithdrawn(this.blackhole,
            null,
            (data: NokaiWithdrawn) => {
                NokaiStore.update(data.nokaiId, {nokaiPos: {onBoard: false, x: 0, y: 0}})
            }))
        this.subscribers.push(BlackHole.subscribeNokaiMoved(this.blackhole,
            null,
            (data: NokaiMoved) => {
                NokaiStore.update(data.nokaiId, {nokaiPos: {onBoard: true, x: data.toX, y: data.toY}})
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