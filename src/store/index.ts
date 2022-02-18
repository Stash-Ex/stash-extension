import { configureStore } from '@reduxjs/toolkit'
import currentUrlSlice from '../chromeServices/currentUrlSlice'
import metacacheSlice from './metacacheSlice'
import starknetSlice from './starknetSlice'

export const store = configureStore({
  reducer: {
    currentUrl: currentUrlSlice,
    starknet: starknetSlice,
    metacache: metacacheSlice,
  },
})

export type AppState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch