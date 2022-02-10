import { getStarknet } from '@argent/get-starknet'

let getStarknetAttempts = 0

// retry getStarknet in case this extension loads before argent-x extension
const getStarknetWithRetry = async (getAuthorization = false) => {
    try {
        const starknet = getStarknet({ showModal: false });
        //@ts-ignore
        const isPreauthorized = await starknet.isPreauthorized()

        let account = null;
        if (getAuthorization || isPreauthorized) {
            [account] = await starknet.enable();
        }

        console.log("Called injected script Event Listener")
        console.log(JSON.stringify(starknet))
        console.log(JSON.stringify(account))

        getStarknetAttempts = 0
        document.dispatchEvent(new CustomEvent('ARGENT_WALLET_RES', {
            detail: { account }
        }));
    } catch (error) {
        if (getStarknetAttempts++ < 5) {
            console.log(`Found expected error getting starknet${error}. Retry #${getStarknetAttempts}`)
            setTimeout(getStarknetWithRetry, getStarknetAttempts * 1.5 * 1000)
        }
    }
}

// Event listener
document.addEventListener('ARGENT_WALLET_REQ', async function ({ detail }: CustomEvent) {
    console.log("RECEIVED EVENT IN SCRIPT")
    console.log(detail)
    await getStarknetWithRetry(detail.getAuthorization)
});
