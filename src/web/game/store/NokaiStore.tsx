import {NokaiData} from "../data/NokaiData";
import {NokaiId} from "../../../blockchain/definition/types";
import Storage from "../../../utils/Storage";

export class NokaiStore {
    private static nokais: { [key: string]: NokaiData } = Storage.getNokais()
    private static subscribers: { [key: string]: (nokaiIds: NokaiId[]) => any } = {}

    static subscribe(id: string, callback: (nokaiIds: NokaiId[]) => any) {
        this.subscribers[id] = callback
    }

    static unsubscribe(id: string) {
        delete this.subscribers[id]
    }

    static get(nokaiId: NokaiId): NokaiData | null {
        const nokai = this.nokais[nokaiId.toString()]
        if (nokai === undefined) {
            return null
        }
        return nokai
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

    static missing(ids: NokaiId[]): NokaiId[] {
        const result: NokaiId[] = []
        ids.forEach(nokaiId => {
            if (this.nokais[nokaiId.toString()] === undefined || this.nokais[nokaiId.toString()] == null) {
                result.push(nokaiId)
            }
        })
        return result
    }

    static hasDiff(nokaiId: NokaiId, data: any): boolean {
        const nokai = this.nokais[nokaiId.toString()]
        return NokaiData.stringify(nokai) === NokaiData.stringify(data)
        // (data.nokaiId === undefined && nokai.nokaiId !== data.nokaiId) ||
        //     (data.imageUrl === undefined && nokai.imageUrl !== data.imageUrl) ||
        //     (data.name === undefined && nokai.name !== data.name) ||
        //     (data.profile === undefined && nokai.profile !== data.profile)
    }

    static diff(data: { [key: string]: {} }): { [key: string]: {} } {
        const result: { [key: string]: {} } = {}
        Object.keys(data).forEach(nokaiId => {
            const nokai = this.nokais[nokaiId]
            const newData = data[nokaiId]

            if (nokai === undefined || nokai == null || this.hasDiff(BigInt(nokaiId), newData)) {
                result[nokaiId] = data[nokaiId]
            }
        })
        return result
    }

    static update(nokaiId: NokaiId, data: {}) {
        this.nokais[nokaiId.toString()] = {...this.nokais[nokaiId.toString()], ...data}
        Object.keys(this.subscribers).forEach(subscriber => {
            this.subscribers[subscriber]([nokaiId])
        })
        Storage.setNokais(this.nokais)
    }

    static batch(data: { [key: string]: {} }) {
        Object.keys(data).forEach(nokaiId => {
            this.nokais[nokaiId] = {...this.nokais[nokaiId], ...data[nokaiId]}
        })
        Object.keys(this.subscribers).forEach(subscriber => {
            this.subscribers[subscriber](Object.keys(data).map(id => BigInt(id)))
        })
        Storage.setNokais(this.nokais)
    }
}