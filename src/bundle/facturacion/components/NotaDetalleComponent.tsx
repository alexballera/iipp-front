// * Base imports
import { Fragment, memo } from 'react'

// * MUI Imports
import { Box, CardContent, Paper, Stack, Typography } from '@mui/material'
import { Launch } from 'mdi-material-ui'

// * Store, Types & Hooks Imports
import { formatDate, formatearMonto } from 'src/@core/utils'
import { NotaDetalleState } from '../domain'

// * Customs components
import { DatoDetalle, HeaderDetalle } from 'src/@core/components/DetalleComponent'
import DrawerComponent from 'src/@core/components/DrawerComponent'
import EstadoComponent from 'src/@core/components/EstadoComponent'
import Loader from 'src/@core/components/Loader'
import { MonedaEnum } from 'src/bundle/shared/domain'

function mostrarMonto(monto: number | undefined, moneda: MonedaEnum | undefined) {
  if (!monto || !moneda) return 'Sin dato'

  if (moneda === MonedaEnum.USD) {
    return formatearMonto(monto, moneda)
  } else {
    return `${moneda} ${formatearMonto(monto, moneda)}`
  }
}

function NotaDetalleComponent(props: NotaDetalleState) {
  const { data, open, action, setOpen, onClick, loading } = props

  return (
    <DrawerComponent open={open} onClose={() => setOpen?.(false)}>
      <Paper elevation={0} sx={{ p: '0px !important' }}>
        <HeaderDetalle
          titleHeader={`NOTA DE ${data?.tipo === 'ND' ? 'DÉBITO' : 'CRÉDITO'}`}
          subheader={`Nro ID ${data?.id}`}
          action={action}
        />
        <CardContent sx={{ p: 0, mt: 8 }}>
          <Box sx={{ mt: 6 }}>
            <DatoDetalle nombre='Estado' valor={<EstadoComponent estado={data?.estado || ''} />} />
            <DatoDetalle nombre='Emisión' valor={formatDate(data?.fecha_alta) || 'Sin dato'} />
            <DatoDetalle nombre='Nombre' valor={data?.cliente?.nombre || 'Sin dato'} />
            <DatoDetalle
              nombre='Documento'
              valor={`${data?.cliente?.numero_documento![0].tipo} ${data?.cliente?.numero_documento![0].valor}` || 'Sin dato'}
            />
            <DatoDetalle nombre='Monto' valor={mostrarMonto(data?.monto, data?.moneda as MonedaEnum) || 'Sin dato'} />
            <DatoDetalle nombre='Producto' valor={data?.producto || 'Sin dato'} />
            {data?.nota_credito || data?.nota_debito ? (
              <DatoDetalle
                nombre={
                  <Stack direction='row' spacing={2} sx={{ cursor: 'pointer' }}>
                    <Typography
                      sx={{
                        color: theme => theme.palette.info.main,
                        '&:hover': { color: theme => theme.palette.info.light }
                      }}
                      onClick={() =>
                        onClick?.(data?.nota_credito?.id || data?.nota_debito?.id || '')
                      }
                    >
                      Ir a la nota relacionada
                    </Typography>
                    {loading ? (
                      <Box sx={{ width: '20px', color: theme => theme.palette.info.main }}>
                        <Loader height='20px' size={20} color='info' />
                      </Box>
                    ) : (
                      <Launch
                        onClick={() =>
                          onClick?.(data?.nota_credito?.id || data?.nota_debito?.id || '')
                        }
                        sx={{
                          color: theme => theme.palette.info.main,
                          '&:hover': { color: theme => theme.palette.info.light },
                          fontSize: 20
                        }}
                      />
                    )}
                  </Stack>
                }
                valor=''
              />
            ) : (
              <></>
            )}
          </Box>
          <Box>
            {data?.conceptos !== undefined && data?.conceptos?.length > 0 ? (
              <>
                <Stack sx={{ p: 0, mt: 8 }}>CONCEPTOS</Stack>
                {data?.conceptos.map(concepto => (
                  <Fragment key={concepto?.id}>
                    <DatoDetalle nombre='Nombre' valor={concepto?.nombre || 'Sin dato'} />
                    <DatoDetalle
                      nombre='Cuenta Contable'
                      valor={concepto?.cuenta_contable || 'Sin dato'}
                    />
                    <DatoDetalle
                      nombre='Productos'
                      valor={concepto?.productos.join(',') || 'Sin dato'}
                    />
                  </Fragment>
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

export default memo(NotaDetalleComponent)
