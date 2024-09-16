import { Typography } from '@mui/material'

type TProps = {
  message?: string
}

const ErrorMessage = ({ message }: TProps) => {
  return (
    <Typography variant='body2' sx={{ color: theme => theme.palette.error.main }}>
      {message || 'Ha ocurrido un error inesperado'}
    </Typography>
  )
}
export default ErrorMessage
