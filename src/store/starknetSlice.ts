import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { AnyKindOfDictionary } from "lodash";
import { ProviderInterface, defaultProvider } from "starknet";
import { AppState } from "../store";
import { connectWalletRequest } from "../walletProxy/events";
import { createMetacache } from "./metacacheSlice";

export const getStarknet = createAsyncThunk("web3/loadStarknet",
    async (getAuthorization: boolean, { dispatch, getState }) => {
        const { account } = await connectWalletRequest(getAuthorization);
        console.log("Got starknet account: " + account)

        //TODO: Return starknet provider info from Argent and create here 
        const { starknet } = getState() as AppState;
        dispatch(createMetacache(starknet.provider));
        dispatch(getLatestStarknetBlock("dummy_arg"))

        // clear prior blockhash intervals, if any
        if (starknet.blockHashRefreshId) {
            clearInterval(starknet.blockHashRefreshId)
        }

        // refresh block every 5 seconds.
        const intervalId = setInterval(() => dispatch(getLatestStarknetBlock("dummy_arg")), 5000);
        return { account, intervalId }
    }
);

const getLatestStarknetBlock = createAsyncThunk("web3/getLatestStarknetBlock",
    async (args: AnyKindOfDictionary, { dispatch, getState }) => {
        const { starknet } = getState() as AppState;
        const { block_hash } = await starknet.provider.getBlock();

        return block_hash;
    }
)

export interface StarknetState {
    provider: ProviderInterface;
    account?: string;
    blockHashRefreshId?: NodeJS.Timeout;
    blockHash?: string;
    loading: boolean;
    error: object;
}

const initialState = {
    provider: defaultProvider,
    loading: false,
    error: null
} as StarknetState;

export const starknetSlice = createSlice({
    name: "starknet",
    initialState,
    reducers: {},
    extraReducers: builder => {
        builder
            .addCase(getStarknet.fulfilled, (state, action) => {
                state.account = action.payload.account;
                state.blockHashRefreshId = action.payload.intervalId;
                state.loading = false;
            })
            .addCase(getStarknet.pending, (state) => {
                state.loading = true;
            })
            .addCase(getStarknet.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error;
            })
            .addCase(getLatestStarknetBlock.fulfilled, (state, action) => {
                state.blockHash = action.payload;
            })
    }
})


export default starknetSlice.reducer;