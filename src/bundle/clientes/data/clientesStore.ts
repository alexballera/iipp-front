import { PayloadAction, createSlice } from '@reduxjs/toolkit'
import { ElasticSearchData, ElasticSearchDataIS } from 'src/@core/types'
import {
  ClienteDTO,
  ParametriaComercialDTO,
  clienteIS,
  parametriaIS
} from '../domain/clientesModel'

const initialState = {
  cliente: clienteIS,
  parametria: parametriaIS,
  clientesList: [clienteIS],
  clientesElasticSearch: ElasticSearchDataIS
}

export const clientesSlice = createSlice({
  name: 'clientesSlice',
  initialState,
  reducers: {
    setClientes: (state, action: PayloadAction<ClienteDTO[]>) => {
      state = {
        ...state,
        clientesList: action.payload
      }

      return { ...state }
    },
    cleanClientes: state => {
      state = {
        ...state,
        clientesList: initialState.clientesList
      }

      return { ...state }
    },
    setCliente: (state, action: PayloadAction<ClienteDTO>) => {
      state = {
        ...state,
        cliente: action.payload
      }

      return { ...state }
    },
    cleanCliente: state => {
      state = {
        ...state,
        cliente: initialState.cliente
      }

      return { ...state }
    },
    setClientesList: (state, action: PayloadAction<ClienteDTO[]>) => {
      state = {
        ...state,
        clientesList: action.payload
      }

      return { ...state }
    },
    cleanClientesList: state => {
      state = {
        ...state,
        clientesList: initialState.clientesList
      }

      return { ...state }
    },
    setClientesElasticSearch: (state, action: PayloadAction<ElasticSearchData<ClienteDTO>>) => {
      state = {
        ...state,
        clientesElasticSearch: action.payload
      }

      return { ...state }
    },
    cleanClientesElasticSearch: state => {
      state = {
        ...state,
        clientesElasticSearch: initialState.clientesElasticSearch
      }

      return { ...state }
    },
    setParametria: (state, action: PayloadAction<ParametriaComercialDTO>) => {
      state = {
        ...state,
        parametria: action.payload
      }

      return { ...state }
    },

    cleanParametria: state => {
      state = {
        ...state,
        parametria: initialState.parametria
      }

      return { ...state }
    }
  }
})

export const {
  setCliente,
  cleanCliente,
  setClientesList,
  cleanClientesList,
  setParametria,
  cleanParametria,
  setClientesElasticSearch,
  cleanClientesElasticSearch
} = clientesSlice.actions
export default clientesSlice.reducer
