import { shortString, hash, number, Provider, encode } from "starknet";
import { BigNumberish, toBN } from "starknet/dist/utils/number";


export const doesContractExist = async (address: string, provider: Provider) => {
    if (!isValidAddress(address)) return false;

    const { bytecode } = await provider.getCode(address)
    return bytecode.length > 0
}

export const isValidAddress = (address: string): boolean =>
    address && /^0x[0-9a-f]{1,64}$/.test(address)

export const formatAddress = (address: string) =>
    encode.addHexPrefix(encode.removeHexPrefix(address).padStart(64, "0"))

export const truncateAddress = (fullAddress: string) => {
    const address = formatAddress(fullAddress)

    const hex = address.slice(0, 2)
    const start = address.slice(2, 6)
    const end = address.slice(-4)
    return `${hex}${start}...${end}`
}

export const strToFelt = (text: string) => number.toBN(shortString.encodeShortString(text)).toString()

export const toNativeTokenAmount = (amount: BigNumberish, decimals: BigNumberish) =>
    toBN(amount).mul(toBN(10).pow(toBN(decimals))).toString()

export const fromNativeTokenAmount = (amount: BigNumberish, decimals: BigNumberish) => {
    try {
        return toBN(amount).div(toBN(10).pow(toBN(decimals))).toString()
    } catch (e) {
        return amount
    }
}

/**
 * Splits text into chunks `chunkSize` string.
 * 
 * @param text Text to split
 * @param chunkSize size of each chunk. default is 31 characters
 */
export const makeChunks = (text: string, chunkSize = 31): Array<string> => {
    if (text.length <= chunkSize) return [text]

    let chunks = [];
    for (var i = 0; i < text.length; i += chunkSize) {
        chunks.push(text.slice(i, i + chunkSize))
    }

    return chunks;
}

/**
 * Computes hash chain of keys prepended with number of keys and **in reverse**
 * Same method used when constructing hash to claim cache
 * 
 * https://github.com/starkware-libs/cairo-lang/blob/fc97bdd8322a7df043c87c371634b26c15ed6cee/src/starkware/cairo/common/hash_chain.cairo#L8
 * @param keys keys to be hashed
 */
export const computeHashChain = (keys: Array<string>): BigNumberish => {
    return [
        keys.length,
        ...keys.map(key => shortString.encodeShortString(key))
    ]
        .reverse()
        .reduce((x, y) => hash.pedersen([y, x]));
}