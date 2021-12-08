export default class NumberUtils {
    static from(value: any): bigint {
        return BigInt(parseInt(value.toString()))
    }
}