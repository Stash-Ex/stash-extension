import { Contract, Abi, uint256 } from "starknet";

import { AppState } from "../store";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { callCachesAtLocation, callGetCache, createMetacacheContract } from "../web3/starknet/metacache.service";
import { invokeCreateCacheRequest } from "../walletProxy/events";


export const getNumCaches = createAsyncThunk("metacache/getNumCaches",
    async (location: any, { getState }) => {
        const { metacache } = getState() as AppState;
        const getCachesAtLocation = callCachesAtLocation(metacache.contract);

        //TODO: remove constant location
        const numCaches = await getCachesAtLocation("1");

        chrome.runtime.sendMessage({
            message: "update_cache_count", data: numCaches.toString()
        });

        return numCaches
    }
);

export const loadCaches = createAsyncThunk("metacache/loadCaches",
    async (args: any, { getState }) => {
        const { location, pageSize } = args;
        const { metacache } = getState() as AppState;
        const loadCache = callGetCache(metacache.contract)
        // TODO: Load pageSize number of caches
        // const res = await loadCache(location, <pagesizeloopindex>)
        const res = await loadCache("1", "0");
        return res;
    }
)

export const createCache = createAsyncThunk("metacache/createCache",
    async (args: any) => {
        const res = await invokeCreateCacheRequest(args);
        console.log(res)
        return res;
    }
)

export interface CacheState {
    location: string;
    id: string;
    token: string;
    amount: uint256.Uint256;
    key: string;
    hint: string
    owner: string
    claimed: string
}

export interface MetacacheState {
    contract: Contract;
    cacheCount: number;
    caches: Array<Cache>;
    loading: boolean;
    unloadedCaches: number;
    error: object;
}

const initialState = {
    contract: undefined,
    cacheCount: 0,
    caches: [],
    loading: false,
    unloadedCaches: 0,
    error: null,
} as MetacacheState;

export const metacacheSlice = createSlice({
    name: "metacache",
    initialState,
    reducers: {
        createMetacache(state, action) {
            state.contract = createMetacacheContract(action.payload);
        }
    },
    extraReducers: builder => {
        builder
            .addCase(getNumCaches.fulfilled, (state, action) => {
                state.cacheCount = action.payload;
                state.unloadedCaches = action.payload;
                state.loading = false;
            })
            .addCase(getNumCaches.pending, (state) => {
                state.loading = true;
            })
            .addCase(getNumCaches.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error;
            })
            .addCase(loadCaches.fulfilled, (state, action) => {
                state.caches = [action.payload];
                state.loading = false;
            })
            .addCase(loadCaches.pending, (state) => {
                state.loading = true;
            })
            .addCase(loadCaches.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error;
            })


    }
})

export const { createMetacache } = metacacheSlice.actions;
export default metacacheSlice.reducer;