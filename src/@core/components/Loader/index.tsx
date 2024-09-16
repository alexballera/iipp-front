import { Box, CircularProgress } from '@mui/material'

type LoaderProps = {
  height?: string
  size?: number | string
  color?: 'info' | 'inherit' | 'error' | 'success' | 'primary' | 'secondary' | 'warning'
}

const Loader = (props: LoaderProps) => {
  const { height, size, color } = props

  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        flexDirection: 'column',
        justifyContent: 'center',
        height: height || '300px'
      }}
    >
      <CircularProgress size={size} color={color} />
    </Box>
  )
}

export default Loader
