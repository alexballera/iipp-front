import { PayloadAction, createSlice } from '@reduxjs/toolkit'
import { ElasticSearchData, ElasticSearchDataIS } from 'src/@core/types'
import {
  ClienteDTO,
  ParametriaComercialDTO,
  clienteIS,
  parametriaIS
} from '../domain/iippModel'

const initialState = {
  iipp: clienteIS,
  parametria: parametriaIS,
  iippList: [clienteIS],
  iippElasticSearch: ElasticSearchDataIS
}

export const iippSlice = createSlice({
  name: 'iippSlice',
  initialState,
  reducers: {
    setIippList: (state, action: PayloadAction<ClienteDTO[]>) => {
      state = {
        ...state,
        iippList: action.payload
      }

      return { ...state }
    },
    cleanIppList: state => {
      state = {
        ...state,
        iippList: initialState.iippList
      }

      return { ...state }
    },
    setIipp: (state, action: PayloadAction<ClienteDTO>) => {
      state = {
        ...state,
        iipp: action.payload
      }

      return { ...state }
    },
    cleanIipp: state => {
      state = {
        ...state,
        iipp: initialState.iipp
      }

      return { ...state }
    },
    setIippElasticSearch: (state, action: PayloadAction<ElasticSearchData<ClienteDTO>>) => {
      state = {
        ...state,
        iippElasticSearch: action.payload
      }

      return { ...state }
    },
    cleanIippElasticSearch: state => {
      state = {
        ...state,
        iippElasticSearch: initialState.iippElasticSearch
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
  cleanIipp,
  cleanIippElasticSearch,
  cleanIppList,
  cleanParametria,
  setIipp,
  setIippElasticSearch,
  setIippList,
  setParametria
} = iippSlice.actions
export default iippSlice.reducer
