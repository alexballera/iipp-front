// ** Redux Imports
import { configureStore } from '@reduxjs/toolkit'
import { setupListeners } from '@reduxjs/toolkit/query/react'
import type { TypedUseSelectorHook } from 'react-redux'
import { useDispatch as useReduxDispatch, useSelector as useReduxSelector } from 'react-redux'

//** APIs */
import { cobranzasApi } from 'src/bundle/cobranzas/data/cobranzasApiService'
import { facturacionApi } from 'src/bundle/facturacion/data/facturacionApiService'
import { novedadesApi } from 'src/bundle/novedades/data/novedadesApiService'
import { clientesApi } from 'src/bundle/parametrias/clientes/data/clientesApiService'
import { conceptoFacturacionApi } from 'src/bundle/parametrias/concepto-facturacion/data/conceptoFacturacionApiService'
import { impuestosApi } from 'src/bundle/parametrias/impuestos/data/impuestosApiService'
import { operacionApi } from 'src/bundle/parametrias/operaciones/data/operacionesApiService'
import { productosApi } from 'src/bundle/parametrias/productos/data/productosApiService'
import { saldosClientesApi } from 'src/bundle/saldos-clientes/data/saldosClientesApiService'
import { descargaArchivoApi } from 'src/bundle/shared/data/descargarArchivoApiService'
import { userApi } from 'src/bundle/user/data/userApiService'

//** Store Slices */'
import COBRANZAS from 'src/bundle/cobranzas/data/cobranzaStore'
import FACTURACION from 'src/bundle/facturacion/data/facturacionStore'
import NOVEDADES from 'src/bundle/novedades/data/novedadesStore'
import CLIENTES from 'src/bundle/parametrias/clientes/data/clientesStore'
import CONCEPTO_FACTURACION from 'src/bundle/parametrias/concepto-facturacion/data/conceptoFacturacionStore'
import IMPUESTOS from 'src/bundle/parametrias/impuestos/data/impuestosStore'
import OPERACIONES from 'src/bundle/parametrias/operaciones/data/operacionesStore'
import PRODUCTOS from 'src/bundle/parametrias/productos/data/productosStore'
import SALDOS_CLIENTES from 'src/bundle/saldos-clientes/data/saldosClientesStore'
import USER from 'src/bundle/user/data/userStore'

const reducer = {
  USER,
  CLIENTES,
  SALDOS_CLIENTES,
  CONCEPTO_FACTURACION,
  FACTURACION,
  COBRANZAS,
  NOVEDADES,
  PRODUCTOS,
  OPERACIONES,
  IMPUESTOS,
  [userApi.reducerPath]: userApi.reducer,
  [clientesApi.reducerPath]: clientesApi.reducer,
  [saldosClientesApi.reducerPath]: saldosClientesApi.reducer,
  [facturacionApi.reducerPath]: facturacionApi.reducer,
  [conceptoFacturacionApi.reducerPath]: conceptoFacturacionApi.reducer,
  [productosApi.reducerPath]: productosApi.reducer,
  [cobranzasApi.reducerPath]: cobranzasApi.reducer,
  [novedadesApi.reducerPath]: novedadesApi.reducer,
  [operacionApi.reducerPath]: operacionApi.reducer,
  [descargaArchivoApi.reducerPath]: descargaArchivoApi.reducer,
  [impuestosApi.reducerPath]: impuestosApi.reducer
}

const store = configureStore({
  reducer,
  devTools: process.env.NEXT_PUBLIC_ENV !== 'production',
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: false
    }).concat(
      userApi.middleware,
      clientesApi.middleware,
      saldosClientesApi.middleware,
      facturacionApi.middleware,
      conceptoFacturacionApi.middleware,
      productosApi.middleware,
      cobranzasApi.middleware,
      novedadesApi.middleware,
      operacionApi.middleware,
      descargaArchivoApi.middleware,
      impuestosApi.middleware
    )
})

setupListeners(store.dispatch)

export type AppDispatch = typeof store.dispatch
export type RootState = ReturnType<typeof store.getState>
export const useSelector: TypedUseSelectorHook<RootState> = useReduxSelector
export const useDispatch: () => AppDispatch = useReduxDispatch
export default store
