import { connect } from '@argent/get-starknet'
import { createERC20Contract } from '../web3/starknet/erc20.service';
import { createStashProtocolContract, invokeClaimStash, invokeCreateStash } from '../web3/starknet/stashprotocol.service';

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

document.addEventListener('STASHPROTOCOL_CREATE_STASH_REQ', async ({ detail }: CustomEvent) => {
    console.log("STASHPROTOCOL_CREATE_STASH_REQ");

    const starknet = await connect({ showList: true });
    await starknet.enable();

    if (starknet.isConnected) {
        const contract = createStashProtocolContract(starknet.account);
        const createStash = invokeCreateStash(contract);

        const { location, token, amount, keys, hint } = detail;
        const res = await createStash(location, token, amount, keys, hint);
        console.log("SCRIPT:CREATE_STASH:" + JSON.stringify(res));
        document.dispatchEvent(new CustomEvent('STASHPROTOCOL_CREATE_STASH_RES', { detail: res }))
    }
})

document.addEventListener('STASHPROTOCOL_CLAIM_STASH_REQ', async ({ detail }: CustomEvent) => {
    console.log("STASHPROTOCOL_CLAIM_STASH_REQ");

    const starknet = await connect({ showList: true });
    await starknet.enable();

    if (starknet.isConnected) {
        const contract = createStashProtocolContract(starknet.account);
        const createStash = invokeClaimStash(contract);

        const { location, id, keys } = detail;
        const res = await createStash(location, id, keys);
        console.log("SCRIPT:CLAIM_STASH:" + JSON.stringify(res));
        document.dispatchEvent(new CustomEvent('STASHPROTOCOL_CLAIM_STASH_RES', { detail: res }))
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
