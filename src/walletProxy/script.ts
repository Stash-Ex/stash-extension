import { connect } from '@argent/get-starknet'
import { createERC20Contract } from '../web3/starknet/erc20.service';
import { createMetacacheContract, invokeClaimCache, invokeCreateCache } from '../web3/starknet/metacache.service';

const sleep = (ms: number) => new Promise(r => setTimeout(r, ms));


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
    while (attempts++ < retries) {
        try {
            const starknet = await connect({ showList: getAuthorization });

            await starknet?.enable();

            console.log("Starknet: ", starknet);

            if (starknet?.isConnected) {
                console.log("connected")
                return starknet.account.address;
            } else {
                console.log("not connected")
                return ""
            }
        } catch (error) {
            console.log("Error #" + attempts + " " + error);
            await sleep(attempts * sleepFactor);
        }
    }
}

document.addEventListener('METACACHE_CREATE_CACHE_REQ', async ({ detail }: CustomEvent) => {
    console.log("METACACHE_CREATE_CACHE_REQ");

    const starknet = await connect({ showList: true });
    await starknet.enable();

    if (starknet.isConnected) {
        const contract = createMetacacheContract(starknet.account);
        const createCache = invokeCreateCache(contract);

        const { location, token, amount, keys, hint } = detail;
        const res = await createCache(location, token, amount, keys, hint);
        console.log("SCRIPT:CREATE_CACHE:" + JSON.stringify(res));
        document.dispatchEvent(new CustomEvent('METACACHE_CREATE_CACHE_RES', { detail: res }))
    }
})

document.addEventListener('METACACHE_CLAIM_CACHE_REQ', async ({ detail }: CustomEvent) => {
    console.log("METACACHE_CLAIM_CACHE_REQ");

    const starknet = await connect({ showList: true });
    await starknet.enable();

    if (starknet.isConnected) {
        const contract = createMetacacheContract(starknet.account);
        const createCache = invokeClaimCache(contract);

        const { location, id, keys } = detail;
        const res = await createCache(location, id, keys);
        console.log("SCRIPT:CLAIM_CACHE:" + JSON.stringify(res));
        document.dispatchEvent(new CustomEvent('METACACHE_CLAIM_CACHE_RES', { detail: res }))
    }
})

document.addEventListener("TOKEN_INVOKE_REQ", async ({ detail }: CustomEvent) => {
    console.log("TOKEN_INVOKE_REQUEST");

    const starknet = await connect({ showList: true });
    await starknet.enable();

    if (starknet.isConnected) {
        const { tokenAddress, method, args } = detail;
        console.log(`Invoking token stuff: ${tokenAddress}, ${method}, ${JSON.stringify(args)}`)
        const tokenContract = createERC20Contract(tokenAddress, starknet.account);
        const res = await tokenContract.invoke(method, args)
        console.log("SCRIPT:TOKEN_INVOKE:" + JSON.stringify(res));
        document.dispatchEvent(new CustomEvent('TOKEN_INVOKE_RES', { detail: res }))
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
