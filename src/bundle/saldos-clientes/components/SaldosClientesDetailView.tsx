//** MUI Imports */
import { Card, CardContent, CardHeader, Grid } from '@mui/material'

//** Custom Components Imports */
import ShowDataLabel from 'src/@core/components/ShowDataLabel'
import FallbackSpinner from 'src/@core/components/spinner'
import { useSelector } from 'src/@core/configs/store'
import { useAppContext } from 'src/@core/context/AppContext'

function SaldosClientesDetailView() {
  //** Hooks */
  const { loading } = useAppContext()

  const {
    SALDOS_CLIENTES: { saldo }
  } = useSelector(state => state)

  if (loading) return <FallbackSpinner />

  return (
    <Card>
      <CardHeader title='Detalle Saldo Cliente' />
      <CardContent>
        <Grid container rowSpacing={4} columnSpacing={2}>
          {saldo?.cliente.nombre ? (
            <Grid item xs={12} sm={3}>
              <ShowDataLabel label='Nombre cliente' data={saldo?.cliente.nombre} />
            </Grid>
          ) : (
            <></>
          )}
          {saldo?.cliente?.cuit ? (
            <Grid item xs={12} sm={3}>
              <ShowDataLabel label='Número documento' data={saldo?.cliente.cuit} />
            </Grid>
          ) : (
            <></>
          )}
          {saldo?.cuenta_contable ? (
            <Grid item xs={12} sm={3}>
              <ShowDataLabel label='Cuenta Contable' data={saldo?.cuenta_contable} />
            </Grid>
          ) : (
            <></>
          )}
          {saldo?.deuda_total ? (
            <Grid item xs={12} sm={3}>
              <ShowDataLabel label='Deuda Total' data={saldo?.deuda_total} />
            </Grid>
          ) : (
            <></>
          )}
          {saldo?.deuda_total_no_vencida ? (
            <Grid item xs={12} sm={3}>
              <ShowDataLabel label='Deuda Total No Vencida' data={saldo?.deuda_total_no_vencida} />
            </Grid>
          ) : (
            <></>
          )}
          {saldo?.importe_total_cobrado ? (
            <Grid item xs={12} sm={3}>
              <ShowDataLabel label='Importe Total Cobrado' data={saldo?.importe_total_cobrado} />
            </Grid>
          ) : (
            <></>
          )}
          {saldo?.deuda_total_vencida.hasta_treinta ? (
            <Grid item xs={12} sm={3}>
              <ShowDataLabel
                label='Más Treinta Días'
                data={saldo?.deuda_total_vencida.hasta_treinta}
              />
            </Grid>
          ) : (
            <></>
          )}
        </Grid>
      </CardContent>
    </Card>
  )
}

export default SaldosClientesDetailView
