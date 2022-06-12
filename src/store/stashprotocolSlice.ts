import { Contract, uint256 } from "starknet";

import { AppState } from ".";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { callStashesAtLocation, callGetStash, createStashProtocolContract } from "../web3/starknet/stashprotocol.service";
import { invokeClaimStashRequest, invokeCreateStashRequest } from "../walletProxy/events";


export const getNumStashes = createAsyncThunk("stashprotocol/getNumStashes",
    async (location: any, { getState }) => {
        const { stashprotocol } = getState() as AppState;
        const getStashesAtLocation = callStashesAtLocation(stashprotocol.contract);

        //TODO: remove constant location
        let numStashes = await getStashesAtLocation(location);

        // populate dummy data
        if (numStashes === 0) {
            numStashes += await getStashesAtLocation("1");
        }

        chrome.runtime.sendMessage({
            message: "update_stash_count", data: numStashes.toString()
        });

        console.log("returning getNumStashes: ", numStashes)
        return numStashes
    }
);

export const loadStashes = createAsyncThunk("stashprotocol/loadStashes",
    async (location: any, { getState }) => {
        const { stashprotocol } = getState() as AppState;
        const loadStash = callGetStash(stashprotocol.contract)

        const stashes = [];
        let nextStash = stashprotocol.stashCount - stashprotocol.stashes.length - 1
        for (let stashesLoaded = 0; stashesLoaded < 5 && nextStash >= 0; stashesLoaded++, nextStash--) {
            try {
                const res = await loadStash(location, nextStash.toString());
                console.log("Got stash: ", JSON.stringify(res))
                stashes.push(res);
            } catch (e) {
                console.log(e)
            }
        }

        // populate dummy data
        if (stashes.length === 0) {
            const res = await loadStash("1", "0");
            stashes.push(res);
        }

        console.log("Returning loadStashs: ", stashes.length)
        return stashes;
    }
)

export const createStash = createAsyncThunk("stashprotocol/createStash",
    async (args: any) => {
        const res = await invokeCreateStashRequest(args);
        console.log(res)
        return res;
    }
)

export const claimStash = createAsyncThunk("stashprotocol/claimStash",
    async (args: any) => {
        const res = await invokeClaimStashRequest(args);
        console.log(res)
        return res;
    }
)

export interface StashState {
    location: string;
    id: string;
    token: string;
    amount: uint256.Uint256;
    key: string;
    hint: string;
    owner: string;
    claimed: boolean;
}

export interface StashProtocolState {
    contract: Contract;
    stashCount: number;
    stashes: Array<StashState>;
    loading: boolean;
    error: object;
}

const initialState = {
    contract: undefined,
    stashCount: 0,
    stashes: [],
    loading: false,
    error: null,
} as StashProtocolState;

export const stashprotocolSlice = createSlice({
    name: "stashprotocol",
    initialState,
    reducers: {
        createStashProtocol(state, action) {
            state.contract = createStashProtocolContract(action.payload);
        }
    },
    extraReducers: builder => {
        builder
            .addCase(getNumStashes.fulfilled, (state, action) => {
                state.stashCount = action.payload;
                state.loading = false;
            })
            .addCase(getNumStashes.pending, (state) => {
                state.loading = true;
            })
            .addCase(getNumStashes.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error;
            })
            .addCase(loadStashes.fulfilled, (state, action) => {
                state.stashes = action.payload;
                state.loading = false;
            })
            .addCase(loadStashes.pending, (state) => {
                state.loading = true;
            })
            .addCase(loadStashes.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error;
            })


    }
})

export const { createStashProtocol } = stashprotocolSlice.actions;
export default stashprotocolSlice.reducer;