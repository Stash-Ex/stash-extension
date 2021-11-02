import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

import * as siteUtils from "./lib/metaSiteUtils";

export const getSiteCaches = createAsyncThunk("web3/getSiteCaches", siteUtils.getSiteCaches);

export interface CacheState {
  id: string;
  prize: string;
  hints: Array<string>
}

export interface SiteCachesState {
  caches: Array<CacheState>;
  loading: boolean;
  error: object;
}

const initialState = {
  caches: [],
  loading: false,
  error: null
} as SiteCachesState;

export const siteCachesSlice = createSlice({
  name: "siteCaches",
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder.addCase(getSiteCaches.fulfilled, (state, action) => {
      state.caches = action.payload;
      state.loading = false;
    })
    .addCase(getSiteCaches.pending, (state) => {
      state.loading = true;
    })
    .addCase(getSiteCaches.rejected, (state, action) => {
      state.caches = [];
      state.loading = false;
      state.error = action.error;
    })
  }
})


export default siteCachesSlice.reducer;