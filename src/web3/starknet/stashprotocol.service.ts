import { number, uint256, Contract, shortString, ProviderInterface, Abi, json } from "starknet"
import { BigNumberish } from "starknet/dist/utils/number"
import { buildHint, computeHashChain, makeChunks } from "./utils";

import STASH from "../abi/Stash.json";
import { StashState } from "../../store/stashprotocolSlice";

// export const STASH_ADDRESS = "0x01fe1800f9d08e18cb1c321e33461fbed6ccfa769fc6957d3d611ba86da17d43";
export const STASH_ADDRESS = "0x04a8e9b5b305568712a548c8be9cdf02f4ee53c81bd8e016785634253c094622"

export const createStashProtocolContract = (provider: ProviderInterface) =>
    new Contract(STASH as Abi, STASH_ADDRESS, provider);

export const callStashesAtLocation = (
    contract: Contract
) => async (location: string): Promise<number> => {
    const locationFelt = shortString.encodeShortString(location);
    const res = await contract.call("stashesAtLocation", [locationFelt]);
    console.log("callStashesAtLocation: ", json.stringify(res))
    return number.toBN(res?.numStashes || "0x0").toNumber();
}

export const callGetStash = (contract: Contract) => async (
    location: string,
    stashId: string
): Promise<StashState> => {
    const locationFelt = shortString.encodeShortString(location);
    const res = await contract.call("getStash", [locationFelt, stashId])
    console.log("got getStash: " + JSON.stringify(res))
    const { stash, hint } = res as any;
    console.log("Stash hint", json.stringify(hint))
    return {
        location: location,
        id: stashId,
        token: stash?.token ? number.toHex(stash.token) : "No token!",
        amount: uint256.uint256ToBN(stash?.amount).toString(),
        key: stash?.key ? number.toHex(stash.key) : "No key!",
        hint: buildHint(hint),
        owner: stash?.owner ? number.toHex(stash.owner) : "No owner!",
        claimed: number.toBN(stash?.claimed) > 0,
    }
}

/**
 * Formats arguments and calls createStash contract function
 * `keys` are hashed prior to calling contract.
 * 
 * Requires that the contract has a Provider containing a Signer (only from injected script)
 * @param contract stashprotocol contract instance
 * @returns wrapper function around stashprotocol contract instance
 */
export const invokeCreateStash = (contract: Contract) => async (
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
    const hints = makeChunks(hint);
    // const hintFelt = shortString.encodeShortString(hint)

    const calldata = [locationFelt, token, [low, high], key, hints];
    console.log("Calling CreateStash\nCalldata: " + JSON.stringify(calldata));
    const res = await contract.invoke("createStash", calldata);
    console.log("Called CreateStash\nResponse: " + JSON.stringify(res));
    return res;
}

/**
 * Invokes claimStash function on stashprotocol contract 
 * 
 * Requires that the contract has a Provider containing a Signer (only from injected script)
 * @param contract 
 * @returns 
 */
export const invokeClaimStash = (contract: Contract) => async (
    location: string,
    id: BigNumberish,
    keys: Array<string>
): Promise<any> => {
    const locationFelt = shortString.encodeShortString(location);
    const keysFelts = keys.map(key => shortString.encodeShortString(key));
    const calldata = [locationFelt, id, keysFelts]
    console.log("Invoking ClaimStash\nCalldata: " + JSON.stringify(calldata));
    const res = await contract.invoke("claimStash", calldata);
    console.log("Invoked ClaimStash\nResponse: " + JSON.stringify(res));
    return res;
}
