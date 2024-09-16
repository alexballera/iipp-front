import { PayloadAction, createSlice } from '@reduxjs/toolkit'
import { ElasticSearchData, ElasticSearchDataIS } from 'src/@core/types'
import { OperacionesDTO, operacionesIS } from '../domain/operacionesModel'

const initialState = {
  operacion: operacionesIS,
  operacionesList: [operacionesIS],
  operacionesElasticSearch: ElasticSearchDataIS
}

export const operacionesSlice = createSlice({
  name: 'operacionesSlice',
  initialState,
  reducers: {
    setOperaciones: (state, action: PayloadAction<OperacionesDTO[]>) => {
      state = {
        ...state,
        operacionesList: action.payload
      }

      return { ...state }
    },
    cleanOperaciones: state => {
      state = {
        ...state,
        operacionesList: initialState.operacionesList
      }

      return { ...state }
    },
    setOperacion: (state, action: PayloadAction<OperacionesDTO>) => {
      state = {
        ...state,
        operacion: action.payload
      }

      return { ...state }
    },
    cleanOperacion: state => {
      state = {
        ...state,
        operacion: initialState.operacion
      }

      return { ...state }
    },
    setOperacionesList: (state, action: PayloadAction<OperacionesDTO[]>) => {
      state = {
        ...state,
        operacionesList: action.payload
      }

      return { ...state }
    },
    cleanOperacionesList: state => {
      state = {
        ...state,
        operacionesList: initialState.operacionesList
      }

      return { ...state }
    },
    setOperacionesElasticSearch: (
      state,
      action: PayloadAction<ElasticSearchData<OperacionesDTO>>
    ) => {
      state = {
        ...state,
        operacionesElasticSearch: action.payload
      }

      return { ...state }
    },
    cleanOperacionesElasticSearch: state => {
      state = {
        ...state,
        operacionesElasticSearch: initialState.operacionesElasticSearch
      }

      return { ...state }
    }
  }
})

export const {
  setOperacion,
  cleanOperacion,
  setOperaciones,
  cleanOperaciones,
  setOperacionesElasticSearch,
  cleanOperacionesElasticSearch,
  setOperacionesList,
  cleanOperacionesList
} = operacionesSlice.actions
export default operacionesSlice.reducer
