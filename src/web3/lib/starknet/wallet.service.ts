import { defaultProvider, stark } from 'starknet';

// import { Network } from "./metacache.service"
const { getSelectorFromName } = stark;

export const isWalletConnected = (): boolean => !!defaultProvider

// export const connectWallet = async () => {

//     console.log("Connecting to starknet")
//     console.log('const IS_BROWSER = typeof window !== "undefined"\t', typeof window !== "undefined")
//     console.log(globalThis)
//     return await getStarknet({ showModal: true }).enable()
// }

export const walletAddress = async (): Promise<string | undefined> => {
    try {
        const response = await defaultProvider.getContractAddresses()
        console.log(JSON.stringify(response))
        return response.Starknet
    } catch { }
}

export const networkId = () => {
    try {
        const { baseUrl } = defaultProvider
        if (baseUrl.includes("alpha-mainnet.starknet.io")) {
            return "mainnet-alpha"
        } else if (baseUrl.includes("alpha4.starknet.io")) {
            return "goerli-alpha"
        } else if (baseUrl.match(/^https?:\/\/localhost.*/)) {
            return "localhost"
        }
    } catch { }
}

// export const addToken = async (address: string): Promise<void> => {
//     await defaultProvider. request({
//         type: "wallet_watchAsset",
//         params: {
//             type: "ERC20",
//             options: {
//                 address,
//             },
//         },
//     })
// }

export const getExplorerUrlBase = (): string | undefined => {
    if (networkId() === "mainnet-alpha") {
        return "https://voyager.online"
    } else if (networkId() === "goerli-alpha") {
        return "https://goerli.voyager.online"
    }
}

export const networkUrl = (): string | undefined => {
    try {
        return defaultProvider.baseUrl
    } catch { }
}

// export const signMessage = async (message: string) => {
//     const starknet = getStarknet()
//     await starknet.enable()

//     // checks that enable succeeded
//     if (starknet.isConnected === false)
//         throw Error("starknet wallet not connected")
//     if (!shortString.isShortString(message)) {
//         throw Error("message must be a short string")
//     }

//     return defaultProvider.signMessage({
//         domain: {
//             name: "Example DApp",
//             chainId: networkId() === "mainnet-alpha" ? "SN_MAIN" : "SN_GOERLI",
//             version: "0.0.1",
//         },
//         types: {
//             StarkNetDomain: [
//                 { name: "name", type: "felt" },
//                 { name: "chainId", type: "felt" },
//                 { name: "version", type: "felt" },
//             ],
//             Message: [{ name: "message", type: "felt" }],
//         },
//         primaryType: "Message",
//         message: {
//             message,
//         },
//     })
// }

export const waitForTransaction = async (hash: string) =>
    await defaultProvider.waitForTx(hash)

// export const addWalletChangeListener = async (
//     handleEvent: (accounts: string[]) => void,
// ) => {
//     getStarknet().on("accountsChanged", handleEvent)
// }