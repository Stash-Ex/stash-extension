import { configureStore } from '@reduxjs/toolkit'
import currentUrlSlice from './chromeServices/currentUrlSlice'
import metacacheSlice from './web3/metacacheSlice'
import starknetSlice from './web3/starknetSlice'

export const store = configureStore({
  reducer: {
    currentUrl: currentUrlSlice,
    starknet: starknetSlice,
    metacache: metacacheSlice,
  },
})

export type RootState = ReturnType<typeof store.getState>