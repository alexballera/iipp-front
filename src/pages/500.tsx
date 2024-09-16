// ** React Imports
import { ReactNode } from 'react'

// ** Next Import
import Link from 'next/link'

// ** MUI Components
import Box, { BoxProps } from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import { styled } from '@mui/material/styles'

// ** Layout Import
import BlankLayout from 'src/@core/layouts/BlankLayout'

// ** Demo Imports
// import FooterIllustrations from 'src/bundle/pages/misc/FooterIllustrations'

// ** Styled Components
const BoxWrapper = styled(Box)<BoxProps>(({ theme }) => ({
  [theme.breakpoints.down('md')]: {
    width: '90vw'
  }
}))

// const TreeIllustration = styled('img')(({ theme }) => ({
//   left: 0,
//   bottom: '5rem',
//   position: 'absolute',
//   [theme.breakpoints.down('lg')]: {
//     bottom: 0
//   }
// }))

const Error500 = () => {
  return (
    <Box className='content-center'>
      <Box
        sx={{
          p: 5,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          textAlign: 'center'
        }}
      >
        <BoxWrapper>
          <Typography variant='h2'>500</Typography>
          <Typography variant='h5' sx={{ mb: 1, fontSize: '1.5rem !important' }}>
            Error inesperado 👨🏻‍💻
          </Typography>
          <Typography variant='body2'>Oops, ¡Algo salió mal!</Typography>
        </BoxWrapper>
        <Link passHref href='/'>
          Volver a la página principal
        </Link>
      </Box>
      {/* <FooterIllustrations image={<TreeIllustration alt='tree' src='/images/pages/tree.png' />} /> */}
    </Box>
  )
}

Error500.getLayout = (page: ReactNode) => <BlankLayout>{page}</BlankLayout>

export default Error500
