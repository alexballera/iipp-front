// ** Next Imports
import type { NextPage } from 'next'
import type { AppProps } from 'next/app'
import Head from 'next/head'
import { Router } from 'next/router'

// ** Azure imports
import { MsalProvider } from '@azure/msal-react'

// ** Loader Import
import NProgress from 'nprogress'

// ** Emotion Imports
import type { EmotionCache } from '@emotion/cache'
import { CacheProvider } from '@emotion/react'

// ** Config Imports
import themeConfig from 'src/@core/configs/themeConfig'

// ** Third Party Import
import { Toaster } from 'react-hot-toast'

// ** Component Imports
import WindowWrapper from 'src/@core/components/window-wrapper'
import ThemeComponent from 'src/@core/theme/ThemeComponent'

// ** Contexts
import { SettingsConsumer, SettingsProvider } from 'src/@core/context/settingsContext'

// ** Styled Components
import ReactHotToast from 'src/@core/styles/libs/react-hot-toast'

// ** Utils Imports
import { createEmotionCache } from 'src/@core/utils'

// ** React Perfect Scrollbar Style
import 'react-perfect-scrollbar/dist/css/styles.css'

// ** Global css styles
import 'react-date-range/dist/styles.css'; // main style file
import 'react-date-range/dist/theme/default.css'; // theme css file
import '../@core/styles/globals.scss'

//** Store */
import { Provider } from 'react-redux'
import store from 'src/@core/configs/store'

import { PublicClientApplication } from '@azure/msal-browser'
import { StrictMode } from 'react'
import { msalConfig } from 'src/@core/configs/auth'
import { AppProvider } from 'src/@core/context/AppContext'
import UserLayout from 'src/@core/layouts/UserLayout'

// ** Extend App Props with Emotion
type ExtendedAppProps = AppProps & {
  Component: NextPage
  emotionCache: EmotionCache
}

const clientSideEmotionCache = createEmotionCache() // Azure AD Application

export const msalInstance = new PublicClientApplication(msalConfig)

const accounts = msalInstance.getAllAccounts()
if (accounts.length > 0) {
  msalInstance.setActiveAccount(accounts[0])
}

// ** Pace Loader
if (themeConfig.routingLoader) {
  Router.events.on('routeChangeStart', () => {
    NProgress.start()
  })
  Router.events.on('routeChangeError', () => {
    NProgress.done()
  })
  Router.events.on('routeChangeComplete', () => {
    NProgress.done()
  })
}

// ** Configure JSS & ClassName
const App = (props: ExtendedAppProps) => {
  const { Component, emotionCache = clientSideEmotionCache, pageProps } = props

  // Variables
  const getLayout = Component.getLayout ?? (page => <UserLayout>{page}</UserLayout>)

  const setConfig = Component.setConfig ?? undefined

  return (
    <StrictMode>
      <Provider store={store}>
        <CacheProvider value={emotionCache}>
          <Head>
            <title>{`${themeConfig.templateName}`}</title>
            <meta name='description' content={`${themeConfig.templateName}`} />
            <meta
              name='keywords'
              content='COMAFI, Sociedad de Gerentes, Fondos Comunes de Inversión, Intrucciones Permanentes'
            />
            <meta
              name='viewport'
              content='minimum-scale=1, initial-scale=1, width=device-width, shrink-to-fit=no, user-scalable=no, viewport-fit=cover'
            />
          </Head>

          <SettingsProvider {...(setConfig ? { pageSettings: setConfig() } : {})}>
            <SettingsConsumer>
              {({ settings }) => {
                return (
                  <MsalProvider instance={msalInstance}>
                    <ThemeComponent settings={settings}>
                      <AppProvider>
                        <WindowWrapper>{getLayout(<Component {...pageProps} />)}</WindowWrapper>
                        <ReactHotToast>
                          <Toaster
                            position={settings.toastPosition}
                            toastOptions={{ className: 'react-hot-toast' }}
                          />
                        </ReactHotToast>
                      </AppProvider>
                    </ThemeComponent>
                  </MsalProvider>
                )
              }}
            </SettingsConsumer>
          </SettingsProvider>
        </CacheProvider>
      </Provider>
    </StrictMode>
  )
}

export default App
