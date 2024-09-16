// * Base imports
import { memo } from 'react'

// * MUI Imports
import { EyeOutline } from 'mdi-material-ui'
import { Box, Button, CardContent, Grid, Paper, Stack } from '@mui/material'

// * Store, Types & Hooks Imports

// * Customs components
import CustomTooltip from 'src/@core/components/CustomTooltip'
import { DatoDetalle, HeaderDetalle } from 'src/@core/components/DetalleComponent'
import DrawerComponent from 'src/@core/components/DrawerComponent'
import TitleSectionForm from 'src/@core/components/TitleSectionForm'
import { SaldosClienteDetalleState } from '../domain/saldosClientesModel'

function SaldosClienteDetailModal(props: SaldosClienteDetalleState) {
  // * State
  const { open, setOpen, data, handleDetail } = props

  return (
    <Grid container spacing={6}>
      {/** Detalle */}
      <DrawerComponent open={open} onClose={() => setOpen?.(false)}>
        <Paper elevation={0} sx={{ p: '0px !important' }}>
          <HeaderDetalle
            titleHeader='Saldo Cliente'
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
              <DatoDetalle nombre='Nombre Cliente' valor={data?.cliente.nombre || 'Sin dato'} />
              <DatoDetalle nombre='Número Documneto' valor={data?.cliente.cuit || 'Sin dato'} />
              <DatoDetalle nombre='Cuenta Contable' valor={data?.cuenta_contable || 'Sin Dato'} />
              <DatoDetalle nombre='Deuda Total Cliente' valor={data?.deuda_total || 'Sin dato'} />
              <DatoDetalle
                nombre='Importe Cobrado'
                valor={
                  data?.importe_total_cobrado ? parseInt(data?.importe_total_cobrado) : 'Sin dato'
                }
              />
              <TitleSectionForm text='Deuda Vencida' />
              <DatoDetalle
                nombre='Más Treinta Días'
                valor={data?.deuda_total_vencida.hasta_treinta}
              />
              <DatoDetalle
                nombre='Hasta Sesenta Días'
                valor={data?.deuda_total_vencida.hasta_sesenta}
              />
              <DatoDetalle
                nombre='Hasta Noventa Días'
                valor={data?.deuda_total_vencida.hasta_noventa}
              />
              <DatoDetalle
                nombre='Más Noventa Días'
                valor={data?.deuda_total_vencida.mas_noventa}
              />
            </Box>
          </CardContent>
        </Paper>
      </DrawerComponent>
    </Grid>
  )
}

export default memo(SaldosClienteDetailModal)
