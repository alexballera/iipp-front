// * Base imports
import { memo } from 'react'

// * MUI Imports
import EditIcon from '@mui/icons-material/Edit'
import { Box, CardContent, Divider, IconButton, Paper, Stack } from '@mui/material'

// * Store, Types & Hooks Imports
import { GrupoImpuestosEnum, ImpuestoDetalleState } from '../domain/impuestosModel'

// * Customs components
import CustomTooltip from 'src/@core/components/CustomTooltip'
import { DatoDetalle, HeaderDetalle } from 'src/@core/components/DetalleComponent'
import DrawerComponent from 'src/@core/components/DrawerComponent'
import Loader from 'src/@core/components/Loader'

function ImpuestoDetalleComponent(props: ImpuestoDetalleState) {
  const { open, setOpen, data, onEditar, loading } = props

  const showComma = (arr: string[], index: number) => {
    if (index === arr.length - 1) return ''

    return ', '
  }

  return (
    <DrawerComponent open={open} onClose={() => setOpen?.(false)}>
      <Paper elevation={0} sx={{ p: '0px !important' }}>
        <HeaderDetalle
          titleHeader={`DETALLE ${data?.grupo === GrupoImpuestosEnum.PERCEPCIONES ? 'PERCEPCIÓN' : 'IMPUESTO'}`}
          subheader={`Nro ID ${data?.id_compuesto}`}
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
          <Box sx={{ mt: 6 }}>
            <DatoDetalle nombre='Grupo' valor={data?.grupo || 'Sin dato'}></DatoDetalle>
            <DatoDetalle nombre='Nombre' valor={data?.descripcion || 'Sin dato'}></DatoDetalle>
            <Divider />
            <DatoDetalle
              nombre='Cuentas'
              valor={
                data?.numero_cuenta.map(
                  (cuenta, i) => `${cuenta}${showComma(data?.numero_cuenta, i)}`
                ) || 'Sin dato'
              }
            ></DatoDetalle>
            <DatoDetalle nombre='Moneda' valor={data?.moneda || 'Sin dato'}></DatoDetalle>
            <DatoDetalle nombre='Alicuota' valor={data?.alicuota}></DatoDetalle>
          </Box>
        </CardContent>
      </Paper>
    </DrawerComponent>
  )
}

export default memo(ImpuestoDetalleComponent)
