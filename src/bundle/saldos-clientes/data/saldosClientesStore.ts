import { PayloadAction, createSlice } from '@reduxjs/toolkit'
import { ElasticSearchData, ElasticSearchDataIS } from 'src/@core/types'
import { SaldosClienteDTO, saldosClienteIS as saldo } from '../domain/saldosClientesModel'

const initialState = {
  saldo,
  saldosList: [saldo],
  saldosElastiSearch: ElasticSearchDataIS
}

export const saldosSlice = createSlice({
  name: 'novedadSlice',
  initialState,
  reducers: {
    setSaldo: (state, action: PayloadAction<SaldosClienteDTO>) => {
      state = {
        ...state,
        saldo: action.payload
      }

      return { ...state }
    },
    cleanSaldo: state => {
      state = {
        ...state,
        saldo: initialState.saldo
      }

      return { ...state }
    },
    setSaldosList: (state, action: PayloadAction<SaldosClienteDTO[]>) => {
      state = {
        ...state,
        saldosList: action.payload
      }

      return { ...state }
    },
    cleanSaldosList: state => {
      state = {
        ...state,
        saldosList: initialState.saldosList
      }

      return { ...state }
    },
    setSaldosElastisearch: (state, action: PayloadAction<ElasticSearchData<SaldosClienteDTO>>) => {
      state = {
        ...state,
        saldosElastiSearch: action.payload
      }

      return { ...state }
    },
    cleanSaldosElastiSearch: state => {
      state = {
        ...state,
        saldosElastiSearch: initialState.saldosElastiSearch
      }

      return { ...state }
    }
  }
})

export const {
  setSaldo,
  cleanSaldo,
  setSaldosList,
  cleanSaldosList,
  setSaldosElastisearch,
  cleanSaldosElastiSearch
} = saldosSlice.actions
export default saldosSlice.reducer
