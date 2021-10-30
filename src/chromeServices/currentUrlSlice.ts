import { createSlice } from "@reduxjs/toolkit";
import { createAsyncThunk } from "@reduxjs/toolkit";

import * as tabInfo from './lib/tabInfo';

export const getCurrentUrl = createAsyncThunk("chrome/getCurrentUrl", tabInfo.getCurrentURL);

interface CurrentUrlState {
  currentUrl: string;
  loading: boolean;
  error: object;
}

export const initialState = {
  currentUrl: "",
  loading: false,
  error: null,
} as CurrentUrlState

export const currentUrlSlice = createSlice({
  name: "currentUrl",
  initialState: initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getCurrentUrl.fulfilled, (state, action) => {
      state.currentUrl = action.payload;
      state.loading = false;
    })
    .addCase(getCurrentUrl.pending, (state) => {
      state.currentUrl = "Loading current URL";
      state.loading = true;
    })
    .addCase(getCurrentUrl.rejected, (state, action) =>{
      state.currentUrl = "";
      state.loading = false;
      state.error = action.error;
    })
  }
});

export default currentUrlSlice.reducer;