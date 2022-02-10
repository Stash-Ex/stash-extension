import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { uint256, ProviderInterface, defaultProvider } from "starknet";
import { connectWallet } from "../walletProxy/events";

export const getStarknet = createAsyncThunk("web3/loadStarknet",
    async (getAuthorization: boolean) => {
        const { account } = await connectWallet(getAuthorization);
        console.log("Got starknet account: " + account)
        return account
    }
);

export interface StarknetState {
    provider: ProviderInterface;
    account?: string;
    isConnected: boolean;
    loading: boolean;
    error: object;
}

const initialState = {
    provider: defaultProvider,
    isConnected: false,
    loading: false,
    error: null
} as StarknetState;

export const starknetSlice = createSlice({
    name: "starknet",
    initialState,
    reducers: {},
    extraReducers: builder => {
        builder.addCase(getStarknet.fulfilled, (state, action) => {
            state.account = action.payload;
            state.isConnected = action.payload?.length > 0
            state.loading = false;
        })
            .addCase(getStarknet.pending, (state) => {
                state.loading = true;
            })
            .addCase(getStarknet.rejected, (state, action) => {
                // state.caches = [];
                state.loading = false;
                state.isConnected = false;
                state.error = action.error;
            })
    }
})


export default starknetSlice.reducer;