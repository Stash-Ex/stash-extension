import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { uint256, ProviderInterface, defaultProvider } from "starknet";
import { RootState } from "../store";
import { connectWallet } from "../walletProxy/events";
import { createMetacache } from "./metacacheSlice";

export const getStarknet = createAsyncThunk("web3/loadStarknet",
    async (getAuthorization: boolean, { dispatch, getState }) => {
        const { account } = await connectWallet(getAuthorization);
        console.log("Got starknet account: " + account)

        const { starknet } = getState() as RootState;
        dispatch(createMetacache(starknet.provider))

        return account
    }
);

export interface StarknetState {
    provider: ProviderInterface;
    account?: string;
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
                state.account = action.payload;
                state.loading = false;
            })
            .addCase(getStarknet.pending, (state) => {
                state.loading = true;
            })
            .addCase(getStarknet.rejected, (state, action) => {
                // state.caches = [];
                state.loading = false;
                state.error = action.error;
            })
    }
})


export default starknetSlice.reducer;