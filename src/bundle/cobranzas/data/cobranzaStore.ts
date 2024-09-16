import { PayloadAction, createSlice } from '@reduxjs/toolkit'
import { ElasticSearchData, ElasticSearchDataIS } from 'src/@core/types'
import { CobranzasDTO, cobranzasIS as cobranza } from '../domain/cobranzasModel'

const initialState = {
  cobranza,
  cobranzasList: [cobranza],
  cobranzasElastiSearch: ElasticSearchDataIS
}

export const cobranzaSlice = createSlice({
  name: 'cobranzaSlice',
  initialState,
  reducers: {
    setCobranza: (state, action: PayloadAction<CobranzasDTO>) => {
      state = {
        ...state,
        cobranza: action.payload
      }

      return { ...state }
    },
    cleanCobranza: state => {
      state = {
        ...state,
        cobranza: initialState.cobranza
      }

      return { ...state }
    },
    setCobranzasList: (state, action: PayloadAction<CobranzasDTO[]>) => {
      state = {
        ...state,
        cobranzasList: action.payload
      }

      return { ...state }
    },
    cleanCobranzasList: state => {
      state = {
        ...state,
        cobranzasList: initialState.cobranzasList
      }

      return { ...state }
    },
    setCobranzasElastisearch: (state, action: PayloadAction<ElasticSearchData<CobranzasDTO>>) => {
      state = {
        ...state,
        cobranzasElastiSearch: action.payload
      }

      return { ...state }
    },
    cleanCobranzasElastiSearch: state => {
      state = {
        ...state,
        cobranzasElastiSearch: initialState.cobranzasElastiSearch
      }

      return { ...state }
    }
  }
})

export const {
  cleanCobranza,
  cleanCobranzasElastiSearch,
  cleanCobranzasList,
  setCobranza,
  setCobranzasElastisearch,
  setCobranzasList
} = cobranzaSlice.actions
export default cobranzaSlice.reducer
