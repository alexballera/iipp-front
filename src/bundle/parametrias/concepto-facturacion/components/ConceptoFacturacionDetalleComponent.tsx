// * Base imports
import { memo } from 'react'

// * MUI Imports
import EditIcon from '@mui/icons-material/Edit'
import { Box, Button, CardContent, Grid, Paper, Stack } from '@mui/material'

// * Store, Types & Hooks Imports
import { ConceptoFacturacionDetalleState } from '../domain/conceptoFacturacionModel'

// * Customs components
import CustomTooltip from 'src/@core/components/CustomTooltip'
import {
  DatoDetalle,
  HeaderDetalle,
  SelectorEstadoDetalle
} from 'src/@core/components/DetalleComponent'
import DrawerComponent from 'src/@core/components/DrawerComponent'
import TitleSectionForm from 'src/@core/components/TitleSectionForm'
import { OptionSelector } from 'src/bundle/shared/domain'

function ConceptoFacturacionDetalleComponent(props: ConceptoFacturacionDetalleState) {
  // * State
  const { open, setOpen, data, onEditar, habilitado, loading, handleChange } = props

  const optionsSelector: OptionSelector[] = [
    {
      id: '01',
      label: 'Habilitado',
      value: 'true'
    },
    {
      id: '02',
      label: 'Deshabilitado',
      value: 'false'
    }
  ]

  return (
    <Grid container spacing={6}>
      {/** Detalle */}
      <DrawerComponent open={open} onClose={() => setOpen?.(false)}>
        <Paper elevation={0} sx={{ p: '0px !important' }}>
          <HeaderDetalle
            titleHeader='CONCEPTO FACTURACION'
            subheader={`Nro ID ${data?.id}`}
            action={
              <Stack direction='row' alignItems='center'>
                <CustomTooltip text='Editar'>
                  <Button
                    startIcon={<EditIcon color='primary' sx={{ width: 20, height: 20 }} />}
                    onClick={onEditar}
                  >
                    Editar
                  </Button>
                </CustomTooltip>
              </Stack>
            }
          />

          <CardContent sx={{ p: 0, mt: 8 }}>
            {handleChange && (
              <SelectorEstadoDetalle
                value={habilitado}
                onChange={handleChange}
                loading={loading}
                optionsSelector={optionsSelector}
              />
            )}
            <Box sx={{ mt: 6 }}>
              <TitleSectionForm text='General' />
              <DatoDetalle nombre='Nombre' valor={data?.nombre || 'Sin dato'} />
              <DatoDetalle nombre='Cuenta contable' valor={data?.cuenta_contable || 'Sin dato'} />
              <DatoDetalle nombre='Productos' valor={data?.productos?.join(', ') || ''} />
            </Box>
            <Box sx={{ mt: 6 }}>
              <TitleSectionForm text='Impuesto' />
              <DatoDetalle
                nombre='Nombre'
                valor={data?.impuesto?.nombre?.toString() || 'Sin dato'}
              />
              <DatoDetalle
                nombre='Alicuota'
                valor={data?.impuesto?.alicuota?.toString() || 'Sin dato'}
              />
              <DatoDetalle
                nombre='Cuenta contable'
                valor={data?.impuesto?.cuenta_contable?.toString() || 'Sin dato'}
              />
              <DatoDetalle
                nombre='Moneda'
                valor={data?.impuesto?.moneda?.join(', ') || 'Sin dato'}
              />
            </Box>
          </CardContent>
        </Paper>
      </DrawerComponent>
    </Grid>
  )
}

export default memo(ConceptoFacturacionDetalleComponent)
