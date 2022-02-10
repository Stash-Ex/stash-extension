import { configureStore } from '@reduxjs/toolkit'
import currentUrlSlice from './chromeServices/currentUrlSlice'
import siteCachesSlice from './web3/siteCachesSlice'
import starknetSlice from './web3/starknetSlice'

export const store = configureStore({
  reducer: {
    currentUrl: currentUrlSlice,
    siteCaches: siteCachesSlice,
    starknet: starknetSlice,
  },
})

export type RootState = ReturnType<typeof store.getState>