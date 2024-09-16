import { Box, CardContent, Paper, Stack } from '@mui/material'
import { memo } from 'react'
import { DatoDetalle, HeaderDetalle } from 'src/@core/components/DetalleComponent'
import DrawerComponent from 'src/@core/components/DrawerComponent'
import EstadoComponent from 'src/@core/components/EstadoComponent'
import TitleSectionForm from 'src/@core/components/TitleSectionForm'
import { formatDate } from 'src/@core/utils'
import { OperacionDetalleState } from '../domain/operacionesModel'
import AccionesDetalle from 'src/@core/components/DetalleComponent/AccionesDetalle'

function OperacionDetailModal(props: OperacionDetalleState) {
  const { data, open, setOpen, action } = props

  return (
    <DrawerComponent open={open} onClose={() => setOpen?.(false)}>
      <Paper elevation={0} sx={{ p: '0px !important' }}>
        <HeaderDetalle titleHeader='OPERACION' subheader={`Nro ID ${data?.id}`} />
        <CardContent sx={{ p: 0, mt: 5 }}>
          <Box>
            <AccionesDetalle accion={action} />
          </Box>
        </CardContent>
        <CardContent sx={{ p: 0, mt: 8 }}>
          <Box sx={{ mt: 6 }}>
            <TitleSectionForm text='General' />
            <DatoDetalle nombre='Estado' valor={<EstadoComponent estado={data?.estado || ''} />} />
            <DatoDetalle nombre='Producto' valor={data?.producto || 'Sin dato'} />
            <DatoDetalle nombre='Tipo Archivo' valor={data?.categoria || 'Sin dato'} />
            <DatoDetalle nombre='Fecha Alta' valor={formatDate(data?.fecha_alta) || 'Sin dato'} />
          </Box>
          <Box>
            {data?.errores !== undefined && data?.errores?.length > 0 ? (
              <>
                <Stack sx={{ p: 0, mt: 8 }}>Errores</Stack>
                {data?.errores.slice(0, 10).map((error, index) => (
                  <Box key={index}>
                    <DatoDetalle nombre='' valor={error || 'Sin dato'} />
                  </Box>
                ))}
              </>
            ) : (
              <></>
            )}
          </Box>
        </CardContent>
      </Paper>
    </DrawerComponent>
  )
}

export default memo(OperacionDetailModal)
