// * Base imports
import { memo } from 'react'

// * MUI Imports
import EditIcon from '@mui/icons-material/Edit'
import { Box, CardContent, Divider, IconButton, Paper, Stack, Typography } from '@mui/material'

// * Store, Types & Hooks Imports
import { ProductoDetalleState } from '../domain/productosModel'

// * Customs components
import CustomTooltip from 'src/@core/components/CustomTooltip'
import { DatoDetalle, HeaderDetalle } from 'src/@core/components/DetalleComponent'
import DrawerComponent from 'src/@core/components/DrawerComponent'
import Loader from 'src/@core/components/Loader'

function ProductoDetalleComponent(props: ProductoDetalleState) {
  const { open, setOpen, data, onEditar, loading } = props

  return (
    <DrawerComponent open={open} onClose={() => setOpen?.(false)}>
      <Paper elevation={0} sx={{ p: '0px !important' }}>
        <HeaderDetalle
          titleHeader='DETALLE PRODUCTO'
          subheader={`Nro ID ${data?.id}`}
          action={
            <Stack direction='row' alignItems='center'>
              <CustomTooltip text='Editar'>
                <IconButton onClick={onEditar}>
                  <EditIcon color='primary' sx={{ width: 20, height: 20 }} />
                </IconButton>
              </CustomTooltip>
              {loading && (
                <Box sx={{ width: '58px' }}>
                  <Loader height='20px' size={20} />
                </Box>
              )}
            </Stack>
          }
        />

        <CardContent sx={{ p: 0, mt: 8 }}>
          <>
            <Box sx={{ mt: 6 }}>
              <DatoDetalle nombre='Nombre' valor={data?.nombre || 'Sin dato'}></DatoDetalle>
              <DatoDetalle
                nombre='Cuenta contable'
                valor={data?.cuenta_contable || 'Sin dato'}
              ></DatoDetalle>
              <Divider />
              <Typography variant='subtitle1' sx={{ fontWeight: 500 }}>
                Responsable Comercial
              </Typography>
              <DatoDetalle
                nombre='Nombre'
                valor={data?.responsable_comercial.nombre || 'Sin dato'}
              ></DatoDetalle>
              <DatoDetalle
                nombre='Correo'
                valor={data?.responsable_comercial.email || 'Sin dato'}
              ></DatoDetalle>
              <DatoDetalle
                nombre='Teléfono'
                valor={data?.responsable_comercial.telefono || 'Sin dato'}
              ></DatoDetalle>
            </Box>
          </>
        </CardContent>
      </Paper>
    </DrawerComponent>
  )
}

export default memo(ProductoDetalleComponent)
