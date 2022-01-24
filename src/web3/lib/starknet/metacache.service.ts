import { utils } from "ethers"
import { defaultProvider, stark, number, uint256 } from "starknet"
import { CallContractResponse } from "starknet"

export const metacacheAddressByNetwork = {
    "goerli-alpha":
        "0x01fe1800f9d08e18cb1c321e33461fbed6ccfa769fc6957d3d611ba86da17d43",
}

// export type PublicNetwork = keyof typeof metacacheAddressByNetwork
// export type Network = PublicNetwork | "localhost"

const cachesAtLocationSelector = stark.getSelectorFromName("cachesAtLocation")
const getCacheSelector = stark.getSelectorFromName("getCache")

function getUint256CalldataFromBN(bn: number.BigNumberish) {
    return { type: "struct" as const, ...uint256.bnToUint256(bn) }
}

export const cachesAtLocation = async (
    cacheLocation: string,
    network: keyof typeof metacacheAddressByNetwork
): Promise<CallContractResponse> => {
    return await defaultProvider.callContract({
        contract_address: metacacheAddressByNetwork[network], // to (metacache contract)
        entry_point_selector: cachesAtLocationSelector,
        calldata: [cacheLocation],
    })
}

export const getCache = async (
    cacheLocation: string,
    cacheId: string,
    network: keyof typeof metacacheAddressByNetwork
): Promise<CallContractResponse> => {
    return await defaultProvider.callContract({
        contract_address: metacacheAddressByNetwork[network],
        entry_point_selector: getCacheSelector,
        calldata: [cacheLocation, cacheId],
    })
}

export default {};
