import { getStarknet } from '@argent/get-starknet'

// Event listener
document.addEventListener('WALLET_PROXY', async function ({ detail }: CustomEvent) {
    // alert(JSON.stringify(e));
    console.log("RECEIVED EVENT IN SCRIPT")
    console.log(detail)

    const starknet = getStarknet({ showModal: true });
    const [account] = await starknet.enable();

    console.log("Called injected script Event Listener")
    console.log(JSON.stringify(starknet))
    console.log(JSON.stringify(account))

    document.dispatchEvent(new CustomEvent('STARKNET_WALLET_RESPONSE', {
        detail: { account }
    }));
});