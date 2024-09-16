import { Dispatch, ReactNode, SetStateAction, createContext, useContext, useState } from 'react'
import { AccionesEnum } from 'src/@core/enums'
import { order } from 'src/bundle/shared/domain/order'

import { UserProvider } from './UserContext'

type AppProviderProps = {
  children: ReactNode
}

type AppContextTypes = {
  loading: boolean
  open: boolean
  openModal: boolean
  update: boolean
  create: boolean
  updated: boolean
  remove: boolean
  removed: boolean
  created: boolean
  accion: AccionesEnum | string
}

const initialState = {
  loading: false,
  open: false,
  openModal: false,
  create: false,
  created: false,
  update: false,
  updated: false,
  remove: false,
  removed: false,
  accion: ''
}

type AppStateTypes = {
  state: AppContextTypes
  setState: Dispatch<SetStateAction<AppContextTypes>>
  loading: boolean
  setLoading: Dispatch<SetStateAction<boolean>>
  selectionOrden?: order
  setSelectionOrden: Dispatch<SetStateAction<order | undefined>>
  openModal: boolean
  setOpenModal: Dispatch<SetStateAction<boolean>>
}

const AppContext = createContext({} as AppStateTypes)

export function AppProvider({ children }: AppProviderProps) {
  //** States */
  const [state, setState] = useState<AppContextTypes>(initialState)
  const [loading, setLoading] = useState<boolean>(false)
  const [openModal, setOpenModal] = useState<boolean>(false)
  const [selectionOrden, setSelectionOrden] = useState<order | undefined>()

  const values: AppStateTypes = {
    state,
    setState,
    openModal,
    setOpenModal,
    loading,
    setLoading,
    selectionOrden,
    setSelectionOrden
  }

  return (
    <AppContext.Provider value={{ ...values }}>
      <UserProvider>{children}</UserProvider>
    </AppContext.Provider>
  )
}

export const useAppContext = () => useContext(AppContext)
AppContext.displayName = 'MC-CUSTODIA App Context'
export default AppContext
