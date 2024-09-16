import { Avatar, Card, CardContent, CardHeader, Typography } from '@mui/material'
import { AccountTie } from 'mdi-material-ui'
import { ReactNode } from 'react'
import { primaryColor } from './UserThemeOptions'

// import { AccionEnum } from 'src/@core/enums'
// import { useAppContext } from '../context/AppContext'
// import { removeSlashesAndScores } from '../utils'

type FormLayoutPropsType = {
  title?: ReactNode | string
  children: ReactNode
}

const style = {
  title: {
    fontSize: '28px !important',
    fontWeight: 700
  },
  avatar: { bgcolor: primaryColor, width: 45, height: 45 },
  icon: { color: 'white' }
}
function FormLayout({ children, title }: FormLayoutPropsType) {
  const TitleComponent = () => (
    <Typography sx={style.title} variant='h5'>
      {title}
    </Typography>
  )

  const getIcon = () => {
    // if (accion === AccionEnum.CREAR_SOCIEDAD_GERENTE)
    //   return <AccountTie fontSize='large' sx={style.icon} />
    // if (accion === AccionEnum.CREAR_FCI) return <AccountTieHat fontSize='large' sx={style.icon} />
    // if (accion === AccionEnum.EDITAR_FCI) return <AccountTieHat fontSize='large' sx={style.icon} />
    // if (accion === AccionEnum.CREAR_CUOTAPARTISTA)
    //   return <AccountSupervisor fontSize='large' sx={style.icon} />
    // if (accion === AccionEnum.CREAR_CONDOMINIO) return <HomeCity fontSize='large' sx={style.icon} />

    return <AccountTie fontSize='large' sx={style.icon} />
  }

  return (
    <Card>
      <CardHeader
        avatar={
          <Avatar sx={style.avatar} aria-label='recipe'>
            {getIcon()}
          </Avatar>
        }
        title={title || <TitleComponent />}
      />
      <CardContent>{children}</CardContent>
    </Card>
  )
}
export default FormLayout
