import { shortString, hash, number } from "starknet";
import { BigNumberish } from "starknet/dist/utils/number";

export const strToFelt = (text: string) => number.toBN(shortString.encodeShortString(text)).toString()
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