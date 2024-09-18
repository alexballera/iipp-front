// * Base imports
import { memo } from 'react'

// * MUI Imports
import { Box, Button, CardContent, Grid, Paper, Stack } from '@mui/material'
import { EyeOutline } from 'mdi-material-ui'

// * Store, Types & Hooks Imports
import { CobranzasDetalleState } from '../domain/cobranzasModel'

// * Customs components
import CustomTooltip from 'src/@core/components/CustomTooltip'
import { DatoDetalle, HeaderDetalle } from 'src/@core/components/DetalleComponent'
import DrawerComponent from 'src/@core/components/DrawerComponent'
import EstadoComponent from 'src/@core/components/EstadoComponent'
import TitleSectionForm from 'src/@core/components/TitleSectionForm'
import { formatDate, formatearMonto } from 'src/@core/utils'
import { MonedaEnum } from 'src/bundle/shared/domain'

function monstrarMonto(monto: number | undefined, moneda: MonedaEnum | undefined) {
  if (!monto || !moneda) return 'Sin dato'

  if (moneda === MonedaEnum.USD) {
    return formatearMonto(monto, moneda)
  } else {
    return `${moneda} ${formatearMonto(monto, moneda)}`
  }
}

function CobranzaDetailModal(props: CobranzasDetalleState) {
  // * State
  const { open, setOpen, data, handleDetail } = props

  return (
    <Grid container spacing={6}>
      {/** Detalle */}
      <DrawerComponent open={open} onClose={() => setOpen?.(false)}>
        <Paper elevation={0} sx={{ p: '0px !important' }}>
          <HeaderDetalle
            titleHeader='DETALLE COBRANZA'
            subheader={`Nro ID ${data?.id}`}
            action={
              <Stack direction='row' alignItems='center'>
                <CustomTooltip text='Ver más'>
                  <Button
                    startIcon={<EyeOutline color='primary' sx={{ width: 20, height: 20 }} />}
                    onClick={handleDetail}
                  >
                    Ver más
                  </Button>
                </CustomTooltip>
              </Stack>
            }
          />

          <CardContent sx={{ p: 0, mt: 8 }}>
            <Box sx={{ mt: 6 }}>
              <TitleSectionForm text='General' />
              <DatoDetalle nombre='Nombre Cliente' valor={data?.nombre || 'Sin dato'} />
              <DatoDetalle
                nombre='Estado'
                valor={<EstadoComponent estado={data?.estado || ''} />}
              />
              <DatoDetalle nombre='Fecha Alta' valor={formatDate(data?.fecha_alta) || 'Sin dato'} />
              <DatoDetalle
                nombre='Monto'
                valor={monstrarMonto(data?.monto, data?.moneda as MonedaEnum) || 'Sin dato'}
              />
            </Box>
          </CardContent>
        </Paper>
      </DrawerComponent>
    </Grid>
  )
}

export default memo(CobranzaDetailModal)
