import { getStarknet } from '@argent/get-starknet'
import { createMetacacheContract, invokeCreateCache } from '../web3/starknet/metacache.service';

const sleep = (ms: number) => new Promise(r => setTimeout(r, ms));

// retry 
/**
 * Attempts to getStarknet with retries (in case this extension loads before argent-x extension)
 * 
 * @param getAuthorization whether or not to show the staknet modal
 * @param retries the number of attempts
 * @param sleepFactor the number of milliseconds * attemptNumber
 * @returns 
 */
const getStarknetWithRetry = async (getAuthorization = false, retries = 5, sleepFactor = 3000) => {
    let attempts = 0
    while (attempts++ < 5) {
        try {
            const starknet = getStarknet({ showModal: false });
            //@ts-ignore
            const isPreauthorized = await starknet.isPreauthorized()

            let account = null;
            if (getAuthorization || isPreauthorized) {
                [account] = await starknet.enable();
            }

            return account;
        } catch (error) {
            console.log(error);
            await sleep(attempts * 3000);
        }
    }
}

document.addEventListener('METACACHE_CREATE_CACHE_REQ', async ({ detail }: CustomEvent) => {
    console.log("METACACHE_CREATE_CACHE_REQ");

    const starknet = getStarknet({ showModal: true });
    await starknet.enable();

    if (starknet.signer) {
        const contract = createMetacacheContract(starknet.signer);
        const createCache = invokeCreateCache(contract);

        const { location, token, amount, keys, hint } = detail;
        const res = await createCache(location, token, amount, keys, hint);
        console.log("SCRIPT:CREATE_CACHE:" + JSON.stringify(res));
        document.dispatchEvent(new CustomEvent('METACACHE_CREATE_CACHE_RES', { detail: res }))
    }
})

// Event listener
document.addEventListener('ARGENT_WALLET_REQ', async ({ detail }: CustomEvent) => {
    console.log("ARGENT_WALLET_REQ: " + JSON.stringify(detail))

    const account = await getStarknetWithRetry(detail.getAuthorization);
    document.dispatchEvent(new CustomEvent('ARGENT_WALLET_RES', {
        detail: { account }
    }));
});
