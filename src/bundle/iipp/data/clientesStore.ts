import { PayloadAction, createSlice } from '@reduxjs/toolkit'
import { ElasticSearchData, ElasticSearchDataIS } from 'src/@core/types'
import { ClienteDTO, clienteIS } from '../domain/clientesModel'

const initialState = {
  cliente: clienteIS,
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
    }
  }
})

export const {
  setCliente,
  cleanCliente,
  setClientesList,
  cleanClientesList,
  setClientesElasticSearch,
  cleanClientesElasticSearch
} = clientesSlice.actions
export default clientesSlice.reducer
