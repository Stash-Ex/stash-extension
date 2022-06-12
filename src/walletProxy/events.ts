import { AddTransactionResponse } from "starknet";

// convert a DOM dispatch-event-and-wait-for-another-event-response into a promise
const dispatchEventAndWait = (
    event: CustomEvent,
    responseName: string,
    callback: (responseEvent: CustomEvent) => any,
    timeout: number = 30000
): Promise<any> => {
    return new Promise((resolve, reject) => {
        const id = setTimeout(() => reject("Event timed out"), timeout);
        const listener = (responseEvent: CustomEvent) => {
            clearTimeout(id)
            document.removeEventListener(event.type, listener);
            return resolve(callback(responseEvent));
        }
        document.addEventListener(responseName, listener);
        document.dispatchEvent(event)
        console.log(`Dispatched event: ${JSON.stringify(event)}`)
    })
}

const handleStarknetChange = ({ detail }: CustomEvent) => {
    console.log("dispatch and wait event listener")
    console.log(JSON.stringify(detail))
    return detail
}

export const connectWalletRequest = async (getAuthorization: boolean) => {
    const event = new CustomEvent('ARGENT_WALLET_REQ', { detail: { getAuthorization } });
    const starknetWallet = await dispatchEventAndWait(event, 'ARGENT_WALLET_RES', handleStarknetChange);
    return starknetWallet;
}

export const invokeCreateStashRequest = async (args: any) => {
    const event = new CustomEvent('STASHPROTOCOL_CREATE_STASH_REQ', { detail: { ...args } });
    const submitResponse = await dispatchEventAndWait(event, 'STASHPROTOCOL_CREATE_STASH_RES', handleStarknetChange);
    return submitResponse;
}

export const invokeClaimStashRequest = async (args: any) => {
    const event = new CustomEvent('STASHPROTOCOL_CLAIM_STASH_REQ', { detail: { ...args } });
    const submitResponse = await dispatchEventAndWait(event, 'STASHPROTOCOL_CLAIM_STASH_RES', handleStarknetChange);
    return submitResponse;
}

export const tokenInvokeRequest = async (tokenAddress: string, method: string, args: any): Promise<AddTransactionResponse> => {
    const event = new CustomEvent('TOKEN_INVOKE_REQ', { detail: { tokenAddress, method, args } });
    const submitResponse = await dispatchEventAndWait(event, 'TOKEN_INVOKE_RES', handleStarknetChange);
    return submitResponse;
}
