import { Typography } from '@mui/material'
import { useTheme } from '@mui/material/styles'

const TemplateName = () => {
  // ** Hooks
  const theme = useTheme()

  return (
    <Typography
      variant='h6'
      sx={{
        ml: 3,
        fontWeight: 600,
        lineHeight: 'normal',
        textTransform: 'uppercase',
        color: theme.palette.primary.main
      }}
    >
      {'mc-custodia'}
    </Typography>
  )
}

export default TemplateName
