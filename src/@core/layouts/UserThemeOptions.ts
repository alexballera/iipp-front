// ** MUI Imports
import { ThemeOptions } from '@mui/material'

// ** To use mode (light/dark), skin(default/bordered/semi-dark), direction(ltr/rtl), etc. for conditional styles, uncomment below line
import { useSettings } from 'src/@core/hooks/useSettings'

export const primaryColor = '#42A905'
export const secondaryColor = '#008AC9'
export const successColor = '#a7db48'
export const errorColor = '#FF8C90'
export const warningColor = '#ff9800'

const UserThemeOptions = (): ThemeOptions => {
  // ** To use mode (light/dark), skin(default/bordered/semi-dark), direction(ltr/rtl), etc. for conditional styles, uncomment below line
  const { settings } = useSettings()

  // ** To use mode (light/dark), skin(default/bordered/semi-dark), direction(ltr/rtl), etc. for conditional styles, uncomment below line
  const { mode, themeColor } = settings

  // ** To use core palette, uncomment the below line
  // const palette = corePalette(mode, skin, themeColor)

  // ** Vars
  const lightColor = '58, 53, 65'
  const darkColor = '231, 227, 252'
  const mainColor = mode === 'light' ? lightColor : darkColor

  const primaryGradient = () => {
    if (themeColor === 'primary') {
      return primaryColor
    } else if (themeColor === 'secondary') {
      return secondaryColor
    } else if (themeColor === 'success') {
      return successColor
    } else if (themeColor === 'error') {
      return errorColor
    } else if (themeColor === 'warning') {
      return warningColor
    } else {
      return '#3376C7'
    }
  }

  return {
    palette: {
      customColors: {
        dark: darkColor,
        main: mainColor,
        light: lightColor,
        darkBg: '#28243D',
        lightBg: '#F4F5FA',
        primaryGradient: primaryGradient(),
        bodyBg: mode === 'light' ? '#F4F5FA' : '#28243D', // Same as palette.background.default but doesn't consider bordered skin
        tableHeaderBg: mode === 'light' ? '#F9FAFC' : '#3D3759'
      },
      primary: {
        light: '#83D64A',
        main: primaryColor,
        dark: '#007300',
        contrastText: '#FFF'
      },
      secondary: {
        light: '#30B7ED',
        main: secondaryColor,
        dark: '#005994',
        contrastText: '#FFF'
      },
      success: {
        light: '#69E67C',
        main: '#3BD662',
        dark: '#2BB85C',
        contrastText: '#FFF'
      },
      error: {
        light: '#FF90A4',
        main: '#FF6B95',
        dark: '#DB4E84',
        contrastText: '#FFF'
      },
      warning: {
        light: '#EDED60',
        main: '#E2E22F',
        dark: '#C2C222',
        contrastText: '#FFF'
      },
      info: {
        light: '#6DCAFF',
        main: '#3DAEFF',
        dark: '#2C88DB',
        contrastText: '#FFF'
      }
    }
  }
}

export default UserThemeOptions
