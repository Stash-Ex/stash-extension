import { Contract, shortString, uint256 } from "starknet";

import { AppState } from "../store";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { callCachesAtLocation, callGetCache, createMetacacheContract } from "../web3/starknet/metacache.service";
import { invokeCreateCacheRequest } from "../walletProxy/events";


export const getNumCaches = createAsyncThunk("metacache/getNumCaches",
    async (location: any, { getState }) => {
        const { metacache } = getState() as AppState;
        const getCachesAtLocation = callCachesAtLocation(metacache.contract);

        //TODO: remove constant location
        let numCaches = await getCachesAtLocation(shortString.encodeShortString(location));

        // populate dummy data
        if (numCaches === 0) {
            numCaches += await getCachesAtLocation("1");
        }

        chrome.runtime.sendMessage({
            message: "update_cache_count", data: numCaches.toString()
        });

        return numCaches
    }
);

export const loadCaches = createAsyncThunk("metacache/loadCaches",
    async (location: any, { getState }) => {
        const { metacache } = getState() as AppState;
        const loadCache = callGetCache(metacache.contract)

        const caches = [];
        let nextCache = metacache.cacheCount - metacache.caches.length - 1
        for (let cachesLoaded = 0; cachesLoaded < 5 && nextCache >= 0; cachesLoaded++, nextCache--) {
            try {
                const res = await loadCache(shortString.encodeShortString(location), nextCache.toString());
                caches.push(res);
            } catch (e) {
                console.log(e)
            }
        }

        // populate dummy data
        if (caches.length === 0) {
            const res = await loadCache("1", "0");
            caches.push(res);
        }

        return caches;
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
    caches: Array<CacheState>;
    loading: boolean;
    error: object;
}

const initialState = {
    contract: undefined,
    cacheCount: 0,
    caches: [],
    loading: false,
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
                state.caches = action.payload;
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