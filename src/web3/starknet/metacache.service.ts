import { number, uint256, Contract, shortString, ProviderInterface, Abi } from "starknet"
import { BigNumberish } from "starknet/dist/utils/number"
import { computeHashChain } from "./utils";

import METACACHE from "../abi/MetaCache.json";
import { CacheState } from "../../store/metacacheSlice";

export const ADDRESS = "0x01fe1800f9d08e18cb1c321e33461fbed6ccfa769fc6957d3d611ba86da17d43";

export const createMetacacheContract = (provider: ProviderInterface) =>
    new Contract(METACACHE as Abi[], ADDRESS, provider);

export const callCachesAtLocation = (
    contract: Contract
) => async (location: string): Promise<number> => {
    const locationFelt = shortString.encodeShortString(location);
    const res = await contract.call("cachesAtLocation", { locationFelt });
    return number.toBN(res?.numCaches || "0x0").toNumber();
}

export const callGetCache = (contract: Contract) => async (
    location: string,
    cacheId: string
): Promise<CacheState> => {
    const locationFelt = shortString.encodeShortString(location);
    const res = await contract.call("getCache", { location: locationFelt, cacheId })
    console.log("got getCache: " + JSON.stringify(res))
    const { cache } = res as any;
    return {
        location: location,
        id: cacheId,
        token: cache?.token,
        amount: uint256.uint256ToBN(cache?.amount).toString(),
        key: cache?.key,
        hint: cache?.hint ? shortString.decodeShortString(cache.hint) : "No Hints!",
        owner: cache?.owner,
        claimed: number.toBN(cache?.claimed) > 0,
    }
}

/**
 * Formats arguments and calls createCache contract function
 * `keys` are hashed prior to calling contract.
 * 
 * Requires that the contract has a Provider containing a Signer (only from injected script)
 * @param contract metacache contract instance
 * @returns wrapper function around metacache contract instance
 */
export const invokeCreateCache = (contract: Contract) => async (
    location: string,
    token: string,
    amount: BigNumberish,
    keys: Array<string>,
    hint: string
): Promise<any> => {
    const locationFelt = shortString.encodeShortString(location);
    const { low, high } = uint256.bnToUint256(amount);
    const key = computeHashChain(keys);
    // TODO: Upgrade to arbitrary length text
    // const hints = makeChunks(hint); 
    const hintFelt = shortString.encodeShortString(hint)

    const calldata = { locationFelt, token, low, high, key, hintFelt };
    console.log("Calling CreateCahe\nCalldata: " + JSON.stringify(calldata));
    const res = await contract.invoke("createCache", calldata);
    console.log("Called CreateCache\nResponse: " + JSON.stringify(res));
    return res;
}

/**
 * Invokes claimCache function on metacache contract 
 * 
 * Requires that the contract has a Provider containing a Signer (only from injected script)
 * @param contract 
 * @returns 
 */
export const invokeClaimCache = (contract: Contract) => async (
    location: string,
    id: BigNumberish,
    keys: Array<string>
): Promise<any> => {
    const locationFelt = shortString.encodeShortString(location);
    const keysFelts = keys.map(key => shortString.encodeShortString(key));
    const calldata = { location: locationFelt, id, keys: keysFelts }
    console.log("Invoking ClaimCache\nCalldata: " + JSON.stringify(calldata));
    const res = await contract.invoke("claimCache", calldata);
    console.log("Invoked ClaimCache\nResponse: " + JSON.stringify(res));
    return res;
}
