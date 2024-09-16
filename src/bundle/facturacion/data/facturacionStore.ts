import { PayloadAction, createSlice } from '@reduxjs/toolkit'
import { ElasticSearchData, ElasticSearchDataIS } from 'src/@core/types'
import { NotaDTO, NotaIS as nota } from 'src/bundle/facturacion/domain'

const initialState = {
  nota,
  notaList: [nota],
  notaElasticSearch: ElasticSearchDataIS
}

export const FacturacionSlice = createSlice({
  name: 'FacturacionSlice',
  initialState,
  reducers: {
    setNota: (state, action: PayloadAction<NotaDTO>) => {
      state = {
        ...state,
        nota: action.payload
      }

      return { ...state }
    },
    cleanNota: state => {
      state = {
        ...state,
        nota: initialState.nota
      }

      return { ...state }
    },
    setNotaElasticSearch: (state, action: PayloadAction<ElasticSearchData<NotaDTO>>) => {
      state = {
        ...state,
        notaElasticSearch: action.payload
      }

      return { ...state }
    },
    cleanNotaElasticSearch: state => {
      state = {
        ...state,
        notaElasticSearch: initialState.notaElasticSearch
      }

      return { ...state }
    }
  }
})

export const { cleanNota, cleanNotaElasticSearch, setNota, setNotaElasticSearch } =
  FacturacionSlice.actions
export default FacturacionSlice.reducer
