// ** React Imports
import { Fragment, SyntheticEvent, useState } from 'react'

// ** Next Import
import { useRouter } from 'next/router'

// ** MUI Imports
import Avatar from '@mui/material/Avatar'
import Badge from '@mui/material/Badge'
import Box from '@mui/material/Box'
import Divider from '@mui/material/Divider'
import Menu from '@mui/material/Menu'
import Typography from '@mui/material/Typography'
import { styled } from '@mui/material/styles'

// ** Type Imports
import { AuthenticatedTemplate } from '@azure/msal-react'
import { MenuItem } from '@mui/material'
import { LogoutVariant } from 'mdi-material-ui'
import { useSelector } from 'src/@core/configs/store'
import { useUser } from 'src/@core/context/UserContext'
import { Settings } from 'src/@core/context/settingsContext'

interface Props {
  settings: Settings
}

// ** Styled Components
const BadgeContentSpan = styled('span')(({ theme }) => ({
  width: 8,
  height: 8,
  borderRadius: '50%',
  backgroundColor: theme.palette.success.main,
  boxShadow: `0 0 0 2px ${theme.palette.background.paper}`
}))

const UserDropdown = (props: Props) => {
  // ** Props
  const { settings } = props

  // ** States
  const [anchorEl, setAnchorEl] = useState<Element | null>(null)
  const {
    USER: { userDataMeMs, userPictureMeMs }
  } = useSelector((state: any) => state)

  // ** Hooks
  const router = useRouter()
  const { logout } = useUser()

  // ** Vars
  const { direction } = settings

  const handleDropdownOpen = (event: SyntheticEvent) => {
    setAnchorEl(event.currentTarget)
  }

  const handleDropdownClose = (url?: string) => {
    if (url) {
      router.push(url)
    }

    setAnchorEl(null)
  }

  const handleLogout = () => {
    handleDropdownClose()
    logout()
  }

  return (
    <Fragment>
      <Badge
        overlap='circular'
        onClick={handleDropdownOpen}
        sx={{ ml: 2, cursor: 'pointer' }}
        badgeContent={<BadgeContentSpan />}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'right'
        }}
      >
        <Avatar
          alt={userDataMeMs.displayName}
          onClick={handleDropdownOpen}
          sx={{ width: 40, height: 40 }}
          src={userPictureMeMs.photo || '/images/avatars/default.png'}
        />
      </Badge>
      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={() => handleDropdownClose()}
        sx={{ '& .MuiMenu-paper': { width: 230, mt: 4 } }}
        anchorOrigin={{ vertical: 'bottom', horizontal: direction === 'ltr' ? 'right' : 'left' }}
        transformOrigin={{ vertical: 'top', horizontal: direction === 'ltr' ? 'right' : 'left' }}
      >
        <Box sx={{ pt: 2, pb: 3, px: 4 }}>
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <Badge
              overlap='circular'
              badgeContent={<BadgeContentSpan />}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'right'
              }}
            >
              <Avatar
                alt={userDataMeMs.displayName || 'Nombre usuario'}
                src={userPictureMeMs.photo || '/images/avatars/default.png'}
                sx={{ width: '2.5rem', height: '2.5rem' }}
              />
            </Badge>
            <Box sx={{ display: 'flex', ml: 3, alignItems: 'flex-start', flexDirection: 'column' }}>
              <Typography sx={{ fontWeight: 600 }}>
                {userDataMeMs.displayName || 'Nombre usuario'}
              </Typography>
              <Typography variant='body2' sx={{ fontSize: '0.8rem', color: 'text.disabled' }}>
                {userDataMeMs.jobTitle || 'Role'}
              </Typography>
            </Box>
          </Box>
        </Box>
        <AuthenticatedTemplate>
          {userDataMeMs.displayName ? (
            <>
              <Divider />
              {/* <MenuItem sx={{ py: 2 }} onClick={() => handleDropdownClose(PERFIL_ROUTE)}>
                <AccountSettings sx={{ mr: 2, fontSize: '1.375rem', color: 'text.secondary' }} />
                Ajustes
              </MenuItem>
              <Divider /> */}
              <MenuItem sx={{ py: 2 }} onClick={handleLogout}>
                <LogoutVariant sx={{ mr: 2, fontSize: '1.375rem', color: 'text.secondary' }} />
                Cerrar sesión
              </MenuItem>
            </>
          ) : (
            <></>
          )}
          <Typography sx={{ fontSize: '0.6rem', color: 'text.disabled' }} align={'center'}>
            Version: {process.env.NEXT_PUBLIC_OWNER_DEPLOY}@
            {process.env.NEXT_PUBLIC_DATETIME_DEPLOY}
          </Typography>
        </AuthenticatedTemplate>
      </Menu>
    </Fragment>
  )
}

export default UserDropdown
