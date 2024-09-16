//** MUI Imports */
import { Stack, Typography } from '@mui/material'
import { ReactNode } from 'react'

type DatoDetalleProps = {
  nombre: ReactNode | string
  valor: ReactNode | string | number
}

const DatoDetalle = ({ nombre, valor }: DatoDetalleProps) => {
  return (
    <Stack sx={{ my: 2 }} direction='row' alignItems='center' justifyContent='space-between'>
      <Typography
        sx={{
          fontFamily: 'Inter',
          fontSize: '14px',
          fontWeight: 500,
          lineHeight: '157%'
        }}
      >
        {nombre}
      </Typography>
      <Typography
        sx={{
          fontFamily: 'Inter',
          fontSize: '14px',
          fontWeight: 400,
          lineHeight: '157%',
          display: 'flex',
          flexDirection: 'row'
        }}
      >
        {valor}
      </Typography>
    </Stack>
  )
}
export default DatoDetalle
