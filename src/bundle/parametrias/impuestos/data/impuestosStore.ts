import { PayloadAction, createSlice } from '@reduxjs/toolkit'
import { ElasticSearchData, ElasticSearchDataIS } from 'src/@core/types'
import { ImpuestoDTO, ImpuestoIS } from '../domain/impuestosModel'

const initialState = {
  impuesto: ImpuestoIS,
  impuestosList: [ImpuestoIS],
  impuestosElasticSearch: ElasticSearchDataIS
}

export const impuestosSlice = createSlice({
  name: 'impuestosSlice',
  initialState,
  reducers: {
    setImpuesto: (state, action: PayloadAction<ImpuestoDTO>) => {
      state = {
        ...state,
        impuesto: action.payload
      }

      return { ...state }
    },
    cleanImpuesto: state => {
      state = {
        ...state,
        impuesto: initialState.impuesto
      }

      return { ...state }
    },
    setImpuestosList: (state, action: PayloadAction<ImpuestoDTO[]>) => {
      state = {
        ...state,
        impuestosList: action.payload
      }

      return { ...state }
    },
    cleanImpuestosList: state => {
      state = {
        ...state,
        impuestosList: initialState.impuestosList
      }

      return { ...state }
    },
    setImpuestosElasticSearch: (state, action: PayloadAction<ElasticSearchData<ImpuestoDTO>>) => {
      state = {
        ...state,
        impuestosElasticSearch: action.payload
      }

      return { ...state }
    },
    cleanImpuestosElasticSearch: state => {
      state = {
        ...state,
        impuestosElasticSearch: initialState.impuestosElasticSearch
      }

      return { ...state }
    }
  }
})

export const {
  cleanImpuesto,
  cleanImpuestosElasticSearch,
  cleanImpuestosList,
  setImpuesto,
  setImpuestosElasticSearch,
  setImpuestosList
} = impuestosSlice.actions
export default impuestosSlice.reducer
