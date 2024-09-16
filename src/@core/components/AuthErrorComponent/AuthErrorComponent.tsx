import { AuthError } from '@azure/msal-browser'
import { useMsal } from '@azure/msal-react'
import { Button, Grid, Typography } from '@mui/material'
import { loginRequest } from 'src/@core/configs/auth'

type AuthErrorProps = {
  error: AuthError | null
}

const AuthErrorComponent = ({ error }: AuthErrorProps) => {
  console.error('AUTHENTICATION_ERROR', { error })

  const { instance } = useMsal()

  const handleAttemptLoginAgain = async () => {
    await instance.loginRedirect(loginRequest)
  }

  return (
    <Grid container direction='column' justifyContent='center' alignItems='center'>
      <Grid item xs={8} sx={{ mt: 8, justifyContent: 'center', alignItems: 'center' }}>
        <Typography variant='h5' sx={{ color: theme => theme.palette.error.main }}>
          Ha ocurrido un error al iniciar sesión
        </Typography>
        <Typography variant='subtitle1' sx={{ mt: 2 }}>
          *Revisar la consola del navegador para más información
        </Typography>
      </Grid>
      <Grid container justifyContent='center' sx={{ mt: 8 }}>
        <Button variant='contained' onClick={handleAttemptLoginAgain} sx={{ mt: 3 }}>
          Reintentar inicio de sesión
        </Button>
      </Grid>
    </Grid>
  )
}

export default AuthErrorComponent
