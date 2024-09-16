import { IconButton, Stack } from '@mui/material'
import { KeyboardBackspace } from 'mdi-material-ui'
import { useRouter } from 'next/router'
import ErrorMessage from '../ErrorMessage'

type TProps = {
  message?: string
}

const ErrorMessageBackButton = ({ message }: TProps) => {
  const router = useRouter()

  return (
    <Stack direction='row' justifyContent='flex-start' alignItems='center' spacing={2}>
      <IconButton aria-label='delete' onClick={() => router.back()}>
        <KeyboardBackspace />
      </IconButton>
      <ErrorMessage message={message} />
    </Stack>
  )
}
export default ErrorMessageBackButton
