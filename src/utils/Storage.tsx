import {NokaiData} from "../web/game/data/NokaiData";

export default class Storage {
    private static nokaisKey = "blackhole-game$nokais"

    static setNokais(nokais: { [key: string]: NokaiData }) {
        localStorage.setItem(this.nokaisKey, NokaiData.stringify(nokais))
    }

    static getNokais(): { [key: string]: NokaiData } {
        const result = localStorage.getItem(this.nokaisKey)
        if (result == null || result === "") {
            return {}
        } else {
            return JSON.parse(result)
        }
    }
}