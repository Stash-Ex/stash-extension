const dispatchEventAndWait = (
    event: CustomEvent,
    responseName: string,
    callback: (responseEvent: CustomEvent) => any,
    timeout: number
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

export const connectWallet = async (getAuthorization: boolean) => {
    const event = new CustomEvent('ARGENT_WALLET_REQ', { detail: { getAuthorization } });
    const starknetWallet = await dispatchEventAndWait(event, 'ARGENT_WALLET_RES', handleStarknetChange, 30000);
    return starknetWallet;
}
