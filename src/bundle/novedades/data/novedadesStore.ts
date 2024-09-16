import { PayloadAction, createSlice } from '@reduxjs/toolkit'
import { ElasticSearchData, ElasticSearchDataIS } from 'src/@core/types'
import { NovedadDTO, novedadIS as novedad } from '../domain/novedadesModel'

const initialState = {
  novedad,
  novedadesList: [novedad],
  novedadesElastiSearch: ElasticSearchDataIS
}

export const novedadSlice = createSlice({
  name: 'novedadSlice',
  initialState,
  reducers: {
    setNovedad: (state, action: PayloadAction<NovedadDTO>) => {
      state = {
        ...state,
        novedad: action.payload
      }

      return { ...state }
    },
    cleanNovedad: state => {
      state = {
        ...state,
        novedad: initialState.novedad
      }

      return { ...state }
    },
    setNovedadesList: (state, action: PayloadAction<NovedadDTO[]>) => {
      state = {
        ...state,
        novedadesList: action.payload
      }

      return { ...state }
    },
    cleanNovedadesList: state => {
      state = {
        ...state,
        novedadesList: initialState.novedadesList
      }

      return { ...state }
    },
    setNovedadesElastisearch: (state, action: PayloadAction<ElasticSearchData<NovedadDTO>>) => {
      state = {
        ...state,
        novedadesElastiSearch: action.payload
      }

      return { ...state }
    },
    cleanNovedadesElastiSearch: state => {
      state = {
        ...state,
        novedadesElastiSearch: initialState.novedadesElastiSearch
      }

      return { ...state }
    }
  }
})

export const {
  setNovedad,
  setNovedadesElastisearch,
  setNovedadesList,
  cleanNovedad,
  cleanNovedadesElastiSearch,
  cleanNovedadesList
} = novedadSlice.actions
export default novedadSlice.reducer
