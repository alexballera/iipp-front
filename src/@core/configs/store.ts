// ** Redux Imports
import { configureStore } from '@reduxjs/toolkit'
import { setupListeners } from '@reduxjs/toolkit/query/react'
import type { TypedUseSelectorHook } from 'react-redux'
import { useDispatch as useReduxDispatch, useSelector as useReduxSelector } from 'react-redux'

//** APIs */
import { clientesApi } from 'src/bundle/clientes/data/clientesApiService'
import { descargaArchivoApi } from 'src/bundle/shared/data/descargarArchivoApiService'
import { userApi } from 'src/bundle/user/data/userApiService'

//** Store Slices */'
import CLIENTES from 'src/bundle/clientes/data/clientesStore'
import USER from 'src/bundle/user/data/userStore'

const reducer = {
  USER,
  CLIENTES,
  [userApi.reducerPath]: userApi.reducer,
  [clientesApi.reducerPath]: clientesApi.reducer,
  [descargaArchivoApi.reducerPath]: descargaArchivoApi.reducer
}

const store = configureStore({
  reducer,
  devTools: process.env.NEXT_PUBLIC_ENV !== 'production',
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: false
    }).concat(userApi.middleware, clientesApi.middleware, descargaArchivoApi.middleware)
})

setupListeners(store.dispatch)

export type AppDispatch = typeof store.dispatch
export type RootState = ReturnType<typeof store.getState>
export const useSelector: TypedUseSelectorHook<RootState> = useReduxSelector
export const useDispatch: () => AppDispatch = useReduxDispatch
export default store
