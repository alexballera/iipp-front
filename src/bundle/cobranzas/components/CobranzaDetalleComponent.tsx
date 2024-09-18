import { Card, CardContent, CardHeader, Grid, IconButton, Stack } from '@mui/material'
import { PencilOutline, PlusCircleOutline } from 'mdi-material-ui'
import { useRouter } from 'next/router'
import { Fragment, useCallback } from 'react'
import CustomTooltip from 'src/@core/components/CustomTooltip'
import ShowDataLabel from 'src/@core/components/ShowDataLabel'
import { useSelector } from 'src/@core/configs/store'
import { COBRANZAS_ROUTE } from 'src/@core/constants'
import { useAppContext } from 'src/@core/context/AppContext'
import { AccionesEnum } from 'src/@core/enums'
import { formatDate, formatearMonto, removeSlashesAndScores } from 'src/@core/utils'
import { MenuItemsAccion, MonedaEnum } from 'src/bundle/shared/domain'
import { EstadoCobranza, TipoCobranza } from '../domain/cobranzasModel'

function CobranzaDetalleComponent() {
  const router = useRouter()
  const { setState, state } = useAppContext()

  const {
    COBRANZAS: { cobranza }
  } = useSelector(state => state)

  const handleVincular = () => {
    router.push(`${COBRANZAS_ROUTE}/${cobranza.id}/form/${AccionesEnum.CREAR_VINCULACION_COBRANZA}`)
  }

  const handleEditarCobranza = useCallback(() => {
    setState({
      ...state,
      accion: AccionesEnum.EDITAR_COBRANZA
    })

    router.push(`form/${AccionesEnum.EDITAR_COBRANZA}`)
  }, [router, setState, state])

  const validarBotonEditar = () => {
    return (
      cobranza.estado === EstadoCobranza.PENDIENTE &&
      cobranza.tipo_cobranza === TipoCobranza.CORRESPONSAL
    )
  }

  const menuItems: MenuItemsAccion[] = [
    {
      icon: <PlusCircleOutline fontSize='small' color='success' sx={{ mr: 1 }} />,
      title: 'Vincular',
      actions: () => handleVincular(),
      show: true
    },
    {
      icon: <PencilOutline fontSize='small' color='success' sx={{ mr: 1 }} />,
      title: 'Editar cobranza',
      actions: () => handleEditarCobranza(),
      show: validarBotonEditar()
    }
  ]

  const mostrarMonto = (monto: number, moneda: MonedaEnum) => {
    return formatearMonto(monto, moneda)
  }

  return (
    <Card>
      <CardHeader
        title='Detalle de la cobranza'
        action={
          <Stack direction='row' alignItems='center'>
            {menuItems.map(
              ({ title, icon, actions, show }, i) =>
                show && (
                  <Fragment key={`${title}-${i}`}>
                    <CustomTooltip text={title} icon={icon}>
                      <IconButton
                        onClick={actions}
                        color='primary'
                        aria-label='upload picture'
                        component='label'
                      >
                        {icon}
                      </IconButton>
                    </CustomTooltip>
                  </Fragment>
                )
            )}
          </Stack>
        }
      />
      <CardContent>
        <Grid container rowSpacing={4} columnSpacing={2}>
          {cobranza?.nombre ? (
            <Grid item xs={12} sm={3}>
              <ShowDataLabel label='Nombre cliente' data={cobranza.nombre} />
            </Grid>
          ) : (
            <></>
          )}
          {cobranza.cuit ? (
            <Grid item xs={12} sm={3}>
              <ShowDataLabel label='Documento' data={cobranza.cuit} />
            </Grid>
          ) : (
            <></>
          )}
          {cobranza.monto ? (
            <Grid item xs={12} sm={3}>
              <ShowDataLabel
                label='Monto'
                data={mostrarMonto(cobranza.monto, cobranza.moneda as MonedaEnum)}
              />
            </Grid>
          ) : (
            <></>
          )}
          {cobranza.moneda ? (
            <Grid item xs={12} sm={3}>
              <ShowDataLabel label='Moneda' data={cobranza.moneda} />
            </Grid>
          ) : (
            <></>
          )}
          {cobranza.estado ? (
            <Grid item xs={12} sm={3}>
              <ShowDataLabel label='Estado' data={removeSlashesAndScores(cobranza.estado)} />
            </Grid>
          ) : (
            <></>
          )}
          {cobranza.fecha_operacion ? (
            <Grid item xs={12} sm={3}>
              <ShowDataLabel
                label='Fecha Operacion'
                data={formatDate(cobranza.fecha_operacion, 'es-AR')}
              />
            </Grid>
          ) : (
            <></>
          )}
          {cobranza.fecha_alta ? (
            <Grid item xs={12} sm={3}>
              <ShowDataLabel label='Fecha Alta' data={formatDate(cobranza.fecha_alta, 'es-AR')} />
            </Grid>
          ) : (
            <></>
          )}
          {cobranza.monto_aplicado ? (
            <Grid item xs={12} sm={3}>
              <ShowDataLabel
                label='Monto Aplicado'
                data={mostrarMonto(cobranza.monto_aplicado, cobranza.moneda as MonedaEnum)}
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

export default CobranzaDetalleComponent
