// ** React Imports

import { ReactNode } from 'react'

// ** MUI Imports

import { Theme } from '@mui/material/styles'
import useMediaQuery from '@mui/material/useMediaQuery'

// ** Layout Imports
// !Do not remove this Layout import
import Layout from 'src/@core/layouts/Layout'

// ** Navigation Imports

import HorizontalNavItems from 'src/@core/navigation/horizontal'
import VerticalNavItems from 'src/@core/navigation/vertical'

import HorizontalAppBarContent from './components/horizontal/AppBarContent'
import VerticalAppBarContent from './components/vertical/AppBarContent'

// ** Hook Import

import { useSettings } from 'src/@core/hooks/useSettings'

import { loginRequest } from 'src/@core/configs/auth'

import { InteractionType } from '@azure/msal-browser'
import { MsalAuthenticationTemplate } from '@azure/msal-react'
import AuthErrorComponent from 'src/@core/components/AuthErrorComponent/AuthErrorComponent'
import AuthLoadingComponent from 'src/@core/components/AuthLoadingComponent/AuthLoadingComponent'

interface Props {
  children: ReactNode
}

const UserLayout = ({ children }: Props) => {
  // ** Hooks

  const { settings, saveSettings } = useSettings()

  const hidden = useMediaQuery((theme: Theme) => theme.breakpoints.down('lg'))

  const request = {
    ...loginRequest
  }

  return (
    <MsalAuthenticationTemplate
      interactionType={InteractionType.Redirect}
      authenticationRequest={request}
      errorComponent={AuthErrorComponent}
      loadingComponent={AuthLoadingComponent}
    >
      <Layout
        hidden={hidden}
        settings={settings}
        saveSettings={saveSettings}
        {...(settings.layout === 'horizontal'
          ? {
              // ** Navigation Items

              horizontalNavItems: HorizontalNavItems(),

              // ** AppBar Content

              horizontalAppBarContent: () => (
                <HorizontalAppBarContent settings={settings} saveSettings={saveSettings} />
              )
            }
          : {
              // ** Navigation Items

              verticalNavItems: VerticalNavItems(),

              // ** AppBar Content

              verticalAppBarContent: props => (
                <VerticalAppBarContent
                  hidden={hidden}
                  settings={settings}
                  saveSettings={saveSettings}
                  toggleNavVisibility={props.toggleNavVisibility}
                />
              )
            })}
      >
        {children}
      </Layout>
    </MsalAuthenticationTemplate>
  )
}

export default UserLayout
