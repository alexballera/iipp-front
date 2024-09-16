import { PayloadAction, createSlice } from '@reduxjs/toolkit'
import { ElasticSearchData, ElasticSearchDataIS } from 'src/@core/types'
import {
  ConceptoFacturacionDTO,
  conceptoFacturacionIS as conceptoFacturacion
} from '../domain/conceptoFacturacionModel'

const initialState = {
  conceptoFacturacion,
  conceptoFacturacionList: [conceptoFacturacion],
  conceptoFacturacionElastiSearch: ElasticSearchDataIS
}

export const conceptoFacturacionSlice = createSlice({
  name: 'conceptoFacturacionSlice',
  initialState,
  reducers: {
    setConceptoFacturacion: (state, action: PayloadAction<ConceptoFacturacionDTO>) => {
      state = {
        ...state,
        conceptoFacturacion: action.payload
      }

      return { ...state }
    },
    cleanConceptoFacturacion: state => {
      state = {
        ...state,
        conceptoFacturacion: initialState.conceptoFacturacion
      }

      return { ...state }
    },
    setConceptoFacturacionList: (state, action: PayloadAction<ConceptoFacturacionDTO[]>) => {
      state = {
        ...state,
        conceptoFacturacionList: action.payload
      }

      return { ...state }
    },
    cleanConceptoFacturacionList: state => {
      state = {
        ...state,
        conceptoFacturacionList: initialState.conceptoFacturacionList
      }

      return { ...state }
    },
    setConceptoFacturacionElastisearch: (
      state,
      action: PayloadAction<ElasticSearchData<ConceptoFacturacionDTO>>
    ) => {
      state = {
        ...state,
        conceptoFacturacionElastiSearch: action.payload
      }

      return { ...state }
    },
    cleanConceptoFacturacionElastiSearch: state => {
      state = {
        ...state,
        conceptoFacturacionElastiSearch: initialState.conceptoFacturacionElastiSearch
      }

      return { ...state }
    }
  }
})

export const {
  cleanConceptoFacturacion,
  cleanConceptoFacturacionElastiSearch,
  cleanConceptoFacturacionList,
  setConceptoFacturacion,
  setConceptoFacturacionElastisearch,
  setConceptoFacturacionList
} = conceptoFacturacionSlice.actions
export default conceptoFacturacionSlice.reducer
