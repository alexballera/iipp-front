import { IconButton, Stack, Typography } from '@mui/material'
import { ClipboardText } from 'mdi-material-ui'
import useCopyToClipboard from 'src/@core/hooks/useCopyToClipboard'
import CustomTooltip from '../CustomTooltip'

interface Props {
  text: string
}

function TextToClipboardComponent({ text }: Props) {
  //** Hooks */
  const { tooltipText, handleCopyToClipboard } = useCopyToClipboard()

  return (
    <Stack direction='row'>
      <Typography variant='body1' sx={{ lineHeight: '32px' }}>
        {text}
      </Typography>
      <CustomTooltip text={tooltipText}>
        <IconButton
          color='primary'
          aria-label='copy-to-clipboard'
          component='label'
          onClick={() => handleCopyToClipboard(text)}
        >
          <ClipboardText sx={{ fontSize: '1rem' }} />
        </IconButton>
      </CustomTooltip>
    </Stack>
  )
}

export default TextToClipboardComponent
