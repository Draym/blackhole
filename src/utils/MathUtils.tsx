export default class MathUtils {
    static isEven(value: bigint): boolean {
        return value % BigInt(2) === BigInt(0)
    }
    static isEven2(value: number): boolean {
        return value % 2 === 0
    }

    static isNotEven(value: bigint): boolean {
        return value % BigInt(2) !== BigInt(0)
    }
    static isNotEven2(value: number): boolean {
        return value % 2 !== 0
    }
}