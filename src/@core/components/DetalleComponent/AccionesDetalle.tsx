import { Stack, CardHeader } from '@mui/material'
import { ReactNode } from 'react'

type AccionesDetalleProps = {
  nombreAnular?: string
  nombreDescargar?: string
  accion?: ReactNode
}

const titleTypographyProps = {
  fontFamily: 'Inter',
  fontSize: '12px !important',
  fontWeight: 600,
  lineHeight: '200%',
  letterSpacing: 0.5,
  textTransform: 'uppercase',
  marginBottom: 2
}

const subheaderTypographyProps = {
  marginTop: 2,
  fontFamily: 'Inter',
  fontSize: '16px !important',
  fontWeight: 700,
  lineHeight: '150%'
}

const AccionesDetalle = ({ accion }: AccionesDetalleProps) => {
  return (
    <Stack sx={{ my: 2 }} direction='row' alignItems='center' justifyContent='space-between'>
      <CardHeader
        sx={{ p: 0 }}
        action={accion}
        titleTypographyProps={{ titleTypographyProps }}
        subheaderTypographyProps={{ subheaderTypographyProps }}
      />
    </Stack>
  )
}

export default AccionesDetalle
