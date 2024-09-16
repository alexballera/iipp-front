// * Base imports
import { memo } from 'react'

// * MUI Imports
import { Box, CardContent, Paper, Stack } from '@mui/material'

// * Store, Types & Hooks Imports
import { formatDate, removeSlashesAndScores } from 'src/@core/utils'
import { NovedadDetalleState } from '../domain/novedadesModel'

// * Customs components
import { DatoDetalle, HeaderDetalle } from 'src/@core/components/DetalleComponent'
import AccionesDetalle from 'src/@core/components/DetalleComponent/AccionesDetalle'
import DrawerComponent from 'src/@core/components/DrawerComponent'
import EstadoComponent from 'src/@core/components/EstadoComponent'

function NovedadDetalleComponent(props: NovedadDetalleState) {
  const { data, open, action, setOpen, titleHeader } = props

  return (
    <DrawerComponent open={open} onClose={() => setOpen?.(false)}>
      <Paper elevation={0} sx={{ p: '0px !important' }}>
        <HeaderDetalle titleHeader={titleHeader} subheader={`Nro ID ${data?.id}`} />
        <CardContent sx={{ p: 0, mt: 5 }}>
          <Box>
            <AccionesDetalle accion={action} />
          </Box>
        </CardContent>
        <CardContent sx={{ p: 0, mt: 8 }}>
          <Box sx={{ mt: 6 }}>
            <DatoDetalle nombre='Estado' valor={<EstadoComponent estado={data?.estado || ''} />} />
            <DatoDetalle
              nombre='Tipo Novedad'
              valor={
                data?.tipo_novedad ? removeSlashesAndScores(data?.tipo_novedad) : '' || 'Sin dato'
              }
            />
            <DatoDetalle nombre='Emisión' valor={formatDate(data?.fecha_alta) || 'Sin dato'} />
            <DatoDetalle
              nombre='Categoría'
              valor={data?.categoria ? removeSlashesAndScores(data?.categoria) : '' || 'Sin dato'}
            />
            <DatoDetalle nombre='Producto' valor={data?.producto || 'Sin dato'} />
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

export default memo(NovedadDetalleComponent)
