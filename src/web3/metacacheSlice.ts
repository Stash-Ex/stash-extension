import React, { useEffect, useState } from "react";
import { Contract, Abi, number, uint256 } from "starknet";
import { useSelector } from "react-redux";

import METACACHE from "./abi/MetaCache.json";
import { RootState } from "../store";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { cachesAtLocation, getCache } from "./starknet/metacache.service";

const ADDRESS =
    "0x01fe1800f9d08e18cb1c321e33461fbed6ccfa769fc6957d3d611ba86da17d43";

export const getNumCaches = createAsyncThunk("metacache/getNumCaches",
    async (location: any, { getState }) => {
        const { metacache } = getState() as RootState;
        const getCachesAtLocation = cachesAtLocation(metacache.contract);

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
        const { metacache } = getState() as RootState;
        const loadCache = getCache(metacache.contract)
        // const res = await loadCache(location, <pagesizeloopindex>)
        const res = await loadCache("1", "0");
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
    cacheLoadPage: number;
    error: object;
}

const initialState = {
    contract: undefined,
    cacheCount: 0,
    caches: [],
    loading: false,
    cacheLoadPage: 0,
    error: null,
} as MetacacheState;

export const metacacheSlice = createSlice({
    name: "metacache",
    initialState,
    reducers: {
        createMetacache(state, action) {
            state.contract = new Contract(METACACHE as Abi[], ADDRESS, action.payload)
        }
    },
    extraReducers: builder => {
        builder
            .addCase(getNumCaches.fulfilled, (state, action) => {
                state.cacheCount = action.payload;
                state.cacheLoadPage = action.payload;
                state.loading = false;
            })
            .addCase(getNumCaches.pending, (state) => {
                state.loading = true;
            })
            .addCase(getNumCaches.rejected, (state, action) => {
                // state.caches = [];
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