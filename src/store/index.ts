import { configureStore } from '@reduxjs/toolkit'
import currentUrlSlice from '../chromeServices/currentUrlSlice'
import stashprotocolSlice from './stashprotocolSlice'
import starknetSlice from './starknetSlice'

export const store = configureStore({
  reducer: {
    currentUrl: currentUrlSlice,
    starknet: starknetSlice,
    stashprotocol: stashprotocolSlice,
  },
})

export type AppState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch