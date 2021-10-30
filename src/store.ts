import { configureStore } from '@reduxjs/toolkit'
import currentUrlSlice from './chromeServices/currentUrlSlice'
import siteCachesSlice from './web3/siteCachesSlice'

export const store = configureStore({
  reducer: {
    currentUrl: currentUrlSlice,
    siteCaches: siteCachesSlice,
  },
})

export type RootState = ReturnType<typeof store.getState>