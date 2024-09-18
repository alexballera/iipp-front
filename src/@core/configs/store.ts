// ** Redux Imports
import { configureStore } from '@reduxjs/toolkit'
import { setupListeners } from '@reduxjs/toolkit/query/react'
import type { TypedUseSelectorHook } from 'react-redux'
import { useDispatch as useReduxDispatch, useSelector as useReduxSelector } from 'react-redux'

//** APIs */
import { iippApi } from 'src/bundle/iipp/data/iippApiService'
import { descargaArchivoApi } from 'src/bundle/shared/data/descargarArchivoApiService'
import { userApi } from 'src/bundle/user/data/userApiService'

//** Store Slices */'
import IIPP from 'src/bundle/iipp/data/iippStore'
import USER from 'src/bundle/user/data/userStore'

const reducer = {
  USER,
  IIPP,
  [userApi.reducerPath]: userApi.reducer,
  [iippApi.reducerPath]: iippApi.reducer,
  [descargaArchivoApi.reducerPath]: descargaArchivoApi.reducer
}

const store = configureStore({
  reducer,
  devTools: process.env.NEXT_PUBLIC_ENV !== 'production',
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: false
    }).concat(userApi.middleware, iippApi.middleware, descargaArchivoApi.middleware)
})

setupListeners(store.dispatch)

export type AppDispatch = typeof store.dispatch
export type RootState = ReturnType<typeof store.getState>
export const useSelector: TypedUseSelectorHook<RootState> = useReduxSelector
export const useDispatch: () => AppDispatch = useReduxDispatch
export default store
