import { PayloadAction, createSlice } from '@reduxjs/toolkit'
import { ElasticSearchData, ElasticSearchDataIS } from 'src/@core/types'
import { ClienteDTO, clienteIS } from '../domain/iippModel'

const initialState = {
  iipp: clienteIS,
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
    }
  }
})

export const {
  cleanIipp,
  cleanIippElasticSearch,
  cleanIppList,
  setIipp,
  setIippElasticSearch,
  setIippList
} = iippSlice.actions
export default iippSlice.reducer
