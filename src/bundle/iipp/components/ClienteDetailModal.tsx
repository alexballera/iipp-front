// * Base imports
import { memo } from 'react'

// * MUI Imports
import { Box, Button, CardContent, Grid, Paper, Stack } from '@mui/material'
import { EyeOutline } from 'mdi-material-ui'

// * Store, Types & Hooks Imports
import { ClienteDetalleState, NumeroCuenta, TipoDocumento } from '../domain/iippModel'

// * Customs components
import CustomTooltip from 'src/@core/components/CustomTooltip'
import { DatoDetalle, HeaderDetalle } from 'src/@core/components/DetalleComponent'
import DrawerComponent from 'src/@core/components/DrawerComponent'
import EstadoComponent from 'src/@core/components/EstadoComponent'
import TitleSectionForm from 'src/@core/components/TitleSectionForm'

function ClienteDetailModal(props: ClienteDetalleState) {
  // * State
  const { open, setOpen, data, handleDetail } = props

  const obtenerDocumentoPorJerarquia = (): NumeroCuenta | undefined => {
    return data?.numero_documento?.find(documento => TipoDocumento.includes(documento.tipo))
  }

  return (
    <Grid container spacing={6}>
      {/** Detalle */}
      <DrawerComponent open={open} onClose={() => setOpen?.(false)}>
        <Paper elevation={0} sx={{ p: '0px !important' }}>
          <HeaderDetalle
            titleHeader='CLIENTE'
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
              <DatoDetalle
                nombre='Estado Cliente'
                valor={
                  <EstadoComponent estado={data?.cliente_completo ? 'COMPLETO' : 'INCOMPLETO'} />
                }
              />
              {data?.nombre && <DatoDetalle nombre='Nombre Cliente' valor={data?.nombre} />}
              <DatoDetalle
                nombre='Documento'
                valor={`${obtenerDocumentoPorJerarquia()?.tipo} - ${obtenerDocumentoPorJerarquia()?.valor}`}
              />
              {data?.telefono && <DatoDetalle nombre='Número Teléfono' valor={data?.telefono} />}
              {data?.tipo_cliente && (
                <DatoDetalle nombre='Tipo Cliente' valor={data?.tipo_cliente} />
              )}
              <DatoDetalle
                nombre='Cliente Banco'
                valor={data?.cliente_banco ? 'Cliente' : 'No cliente'}
              />
              <DatoDetalle
                nombre='Habilitado'
                valor={data?.habilitado ? 'Habilitado' : 'Deshabilitado'}
              />
            </Box>
          </CardContent>
        </Paper>
      </DrawerComponent>
    </Grid>
  )
}

export default memo(ClienteDetailModal)
