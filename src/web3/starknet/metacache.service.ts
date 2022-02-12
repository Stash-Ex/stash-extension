import { utils } from "ethers"
import { defaultProvider, stark, number, uint256, Contract } from "starknet"
import { CallContractResponse } from "starknet"
import { BigNumber } from "ethers"


export const cachesAtLocation = (
    contract: Contract
) => async (cacheLocation: string): Promise<number> => {
    const methodName = "cachesAtLocation";
    const res = await contract.call(methodName, { cacheLocation });
    return number.toBN(res?.numCaches || "0x0").toNumber();
}

export const getCache = (contract: Contract) => async (
    cacheLocation: string,
    cacheId: string
): Promise<any> => {
    const methodName = "getCache";
    const res = await contract.call(methodName, { cacheLocation, cacheId })
    const { cache } = res as any;
    return {
        location: cacheLocation,
        id: cacheId,
        token: cache?.token,
        amount: BigNumber.from(uint256.uint256ToBN(cache?.amount).toString()), // need to divide by token decimals!
        key: cache?.key,
        hint: cache?.hint,
        owner: cache?.owner,
        claimed: number.toBN(cache?.claimed) > 0,
    }
}