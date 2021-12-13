import {NokaiData} from "../data/NokaiData";
import {NokaiId} from "../../../../blockchain/definition/types";

export class NokaiStore {
    private static nokais: { [key: string]: NokaiData } = {}
    private static subscribers: { [key: string]: (nokaiIds: NokaiId[]) => any } = {}

    static subscribe(id: string, callback: (nokaiIds: NokaiId[]) => any) {
        this.subscribers[id] = callback
    }

    static get(nokaiId: NokaiId): NokaiData {
        return this.nokais[nokaiId.toString()]
    }

    static list(nokaiIds: NokaiId[]): NokaiData[] {
        let nokais: NokaiData[] = []
        nokaiIds.forEach(nokaiId => {
            let nokai = this.nokais[nokaiId.toString()]
            if (nokai !== undefined) {
                nokais.push(nokai)
            }
        })
        return nokais
    }

    static mapping(nokaiIds: NokaiId[]): { [key: string]: NokaiData } {
        let nokais: { [key: string]: NokaiData } = {}
        nokaiIds.forEach(nokaiId => {
            let nokai = this.nokais[nokaiId.toString()]
            if (nokai !== undefined) {
                nokais[nokaiId.toString()] = nokai
            }
        })
        return nokais
    }

    static update(nokaiId: NokaiId, data: {}) {
        this.nokais[nokaiId.toString()] = {...this.nokais[nokaiId.toString()], ...data}
        Object.keys(this.subscribers).forEach(subscriber => {
            this.subscribers[subscriber]([nokaiId])
        })
    }

    static batch(data: { [key: string]: {} }) {
        Object.keys(data).forEach(nokaiId => {
            this.nokais[nokaiId] = {...this.nokais[nokaiId], ...data[nokaiId]}
        })
        Object.keys(this.subscribers).forEach(subscriber => {
            this.subscribers[subscriber](Object.keys(data).map(id => BigInt(id)))
        })
    }
}