// ** React Imports
import { ReactNode, createContext, useContext, useEffect, useState } from 'react'

// ** Next Import
import { useRouter } from 'next/router'

// ** MSAL
import { useIsAuthenticated, useMsal } from '@azure/msal-react'

// ** Config
import { loginRequest } from 'src/@core/configs/auth'

//** Store & Constants */
import { useDispatch } from 'src/@core/configs/store'
import { SessionStoroageKeysEnum, TokenEnum } from 'src/@core/enums'
import {
  ResponseMeMs,
  ResponsePhotoMeMs,
  callMsMeGraph,
  getUserPhoto
} from 'src/bundle/user/data/msGraphApiService'
import { getUser } from 'src/bundle/user/data/userApiService'
import { setUserData, setUserDataMeMs, setUserPhotoMeMs } from 'src/bundle/user/data/userStore'
import { AuthValuesType, UserDataIS, UserDataType } from 'src/bundle/user/domain/userModel'

// ** Defaults
const defaultProvider: AuthValuesType = {
  user: null,
  loading: true,
  logout: () => Promise.resolve(),
  setUser: () => null,
  setLoading: () => Boolean,
  isInitialized: false,
  setIsInitialized: () => Boolean
}

const UserContext = createContext(defaultProvider)

type Props = {
  children: ReactNode
}

const UserProvider = ({ children }: Props) => {
  // ** States
  const [loading, setLoading] = useState<boolean>(defaultProvider.loading)
  const [user, setUser] = useState<UserDataType | null>(defaultProvider.user)
  const [isInitialized, setIsInitialized] = useState<boolean>(defaultProvider.isInitialized)

  // ** Hooks
  const router = useRouter()
  const dispatch = useDispatch()
  const { instance, accounts } = useMsal()
  const isAuthenticated = useIsAuthenticated()

  useEffect(() => {
    if (isAuthenticated) {
      instance
        .acquireTokenSilent({
          ...loginRequest,
          account: accounts[0]
        })
        .then((authResponse: any) => {
          setIsInitialized(true)
          localStorage.setItem(TokenEnum.access_token, authResponse.accessToken)
          callMsMeGraph().then((response: ResponseMeMs | undefined) => {
            if (response) {
              sessionStorage.setItem(SessionStoroageKeysEnum.DATA_USUARIO_EXISTE, 'true')

              dispatch(setUserDataMeMs(response))
            }
          })
          getUserPhoto().then((response: ResponsePhotoMeMs | undefined) => {
            if (response) {
              dispatch(setUserPhotoMeMs(response))
            }
          })
          const usuario = dispatch(getUser.initiate())
          usuario.then((res: any) => {
            const { data } = res
            dispatch(setUserData(data))
            setUser(data)
          })
          usuario.unsubscribe
        })
        .catch((error: any) => {
          console.log('TOKEN_ERROR', error)

          localStorage.clear()
          instance
            .acquireTokenSilent({
              ...loginRequest,
              account: accounts[0]
            })
            .then((authResponse: any) => {
              setIsInitialized(true)
              localStorage.setItem(TokenEnum.access_token, authResponse.accessToken)
            })
        })
    }
  }, [isAuthenticated, dispatch, instance, accounts, router])

  const handleLogout = async () => {
    const allAccounts = instance.getAllAccounts()

    if (allAccounts.length > 0) {
      localStorage.clear()
      dispatch(setUserData(UserDataIS))
      await instance.logoutRedirect()
    } else {
      router.push('/')
    }
  }

  const values = {
    user,
    loading,
    setUser,
    setLoading,
    isInitialized,
    setIsInitialized,
    logout: handleLogout
  }

  return <UserContext.Provider value={values}>{children}</UserContext.Provider>
}
export const useUser = () => useContext(UserContext)
UserContext.displayName = 'MC-CUSTODIA User Context'
export { UserContext, UserProvider }
