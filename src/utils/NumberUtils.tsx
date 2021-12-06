export default class NumberUtils {
    static from(value: any): number {
        return parseInt(value.toString())
    }
}