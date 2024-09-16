import { Box, CircularProgress } from '@mui/material'

const AuthLoadingComponent = () => {
  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        flexDirection: 'column',
        justifyContent: 'center',
        height: 'calc(100vh - 144px)'
      }}
    >
      <img
        src='/images/comafi/brandLogoImgVertical.png'
        alt='Picture of the author'
        loading='lazy'
        width={208}
        height={208}
      />
      <CircularProgress size={50} sx={{ mt: 6 }} />
    </Box>
  )
}

export default AuthLoadingComponent
