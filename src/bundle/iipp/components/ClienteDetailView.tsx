//** Base Imports */
import { useRouter } from 'next/router'
import { Fragment, useCallback, useEffect } from 'react'

//** MUI Imports */
import { Card, CardContent, CardHeader, Grid, IconButton, Stack, Typography } from '@mui/material'
import { ClipboardText, PencilOutline } from 'mdi-material-ui'

//** Store, Hooks, Enums */
import { useDispatch } from 'src/@core/configs/store'
import { useAppContext } from 'src/@core/context/AppContext'
import { AccionesEnum } from 'src/@core/enums'
import useCopyToClipboard from 'src/@core/hooks/useCopyToClipboard'
import { showArrayComma } from 'src/@core/utils'
import { MenuItemsAccion } from 'src/bundle/shared/domain'
import { useGetClienteByIdQuery } from '../data/clientesApiService'
import { setCliente } from '../data/clientesStore'
import { NumeroCuenta, TipoDocumento } from '../domain/clientesModel'

//** Custom Components Imports */
import CustomTooltip from 'src/@core/components/CustomTooltip'
import ShowDataLabel from 'src/@core/components/ShowDataLabel'
import FallbackSpinner from 'src/@core/components/spinner'

function ClienteDetailView() {
  //** Hooks */
  const router = useRouter()
  const { id } = router.query
  const dispatch = useDispatch()
  const { setState, state } = useAppContext()
  const { handleCopyToClipboard, tooltipText } = useCopyToClipboard()

  const {
    data: cliente,
    isSuccess,
    isLoading: isLoadingCliente
  } = useGetClienteByIdQuery(id?.toString() || '')

  useEffect(() => {
    if (isSuccess) dispatch(setCliente(cliente))
  }, [cliente, dispatch, isSuccess])

  const handleObtenerDocumentoPorJerarquia = (): NumeroCuenta | undefined => {
    return cliente?.numero_documento?.find(documento => TipoDocumento.includes(documento.tipo))
  }

  const handleEditarCliente = useCallback(() => {
    setState({
      ...state,
      accion: AccionesEnum.EDITAR_CLIENTE
    })

    router.push(`form/${AccionesEnum.EDITAR_CLIENTE}`)
  }, [router, setState, state])


  const menuItems: MenuItemsAccion[] = [
    {
      icon: <PencilOutline fontSize='small' color='success' sx={{ mr: 1 }} />,
      title: 'Editar cliente',
      actions: () => handleEditarCliente(),
      show: true
    }
  ]

  if (isLoadingCliente) return <FallbackSpinner />

  return (
    <Card>
      <CardHeader
        title='Detalle del Cliente'
        action={
          <Stack direction='row' alignItems='center'>
            {menuItems.map(({ title, icon, actions }, i) => (
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
            ))}
          </Stack>
        }
      />
      <CardContent>
        <Grid container rowSpacing={4} columnSpacing={2}>
          {cliente?.nombre ? (
            <Grid item xs={12} sm={3}>
              <ShowDataLabel label='Nombre cliente' data={cliente.nombre} />
            </Grid>
          ) : (
            <></>
          )}
          {cliente?.numero_documento ? (
            <Grid item xs={12} sm={3}>
              <ShowDataLabel
                label={handleObtenerDocumentoPorJerarquia()?.tipo}
                data={
                  <Stack direction='row'>
                    <Typography variant='inherit'>
                      {handleObtenerDocumentoPorJerarquia()?.valor}
                    </Typography>
                    <CustomTooltip text={tooltipText}>
                      <IconButton
                        color='primary'
                        aria-label='copy-to-clipboard'
                        component='label'
                        onClick={() =>
                          handleCopyToClipboard(handleObtenerDocumentoPorJerarquia()?.valor || '')
                        }
                        sx={{ top: '-0.5rem' }}
                      >
                        <ClipboardText sx={{ fontSize: '1rem' }} />
                      </IconButton>
                    </CustomTooltip>
                  </Stack>
                }
              />
            </Grid>
          ) : (
            <></>
          )}
          {cliente?.email ? (
            <Grid item xs={12} sm={3}>
              <ShowDataLabel label='Email' data={cliente.email} />
            </Grid>
          ) : (
            <></>
          )}
          {cliente?.nombre_referente ? (
            <Grid item xs={12} sm={3}>
              <ShowDataLabel label='Nombre referente' data={cliente.nombre_referente} />
            </Grid>
          ) : (
            <></>
          )}
          {cliente?.telefono ? (
            <Grid item xs={12} sm={3}>
              <ShowDataLabel label='Número teléfono' data={cliente.telefono} />
            </Grid>
          ) : (
            <></>
          )}
          {cliente?.idioma_factura ? (
            <Grid item xs={12} sm={3}>
              <ShowDataLabel label='Idioma factura' data={cliente.idioma_factura} />
            </Grid>
          ) : (
            <></>
          )}
          {cliente?.moneda ? (
            <Grid item xs={12} sm={3}>
              <ShowDataLabel label='Moneda' data={cliente.moneda} />
            </Grid>
          ) : (
            <></>
          )}
          {cliente?.tipo_cliente ? (
            <Grid item xs={12} sm={3}>
              <ShowDataLabel label='Tipo cliente' data={cliente?.tipo_cliente} />
            </Grid>
          ) : (
            <></>
          )}
          {cliente?.cuenta?.caja_valores ? (
            <Grid item xs={12} sm={3}>
              <ShowDataLabel
                label='Número cuenta Caja Valores'
                data={cliente?.cuenta.caja_valores}
              />
            </Grid>
          ) : (
            <></>
          )}
          {cliente?.cuenta?.custodia_bony ? (
            <Grid item xs={12} sm={3}>
              <ShowDataLabel label='Número cuenta BONY' data={cliente?.cuenta.custodia_bony} />
            </Grid>
          ) : (
            <></>
          )}
          {cliente?.productos && cliente?.productos?.length > 0 ? (
            <Grid item xs={12} sm={3}>
              <ShowDataLabel
                label='Productos'
                data={cliente?.productos.map((producto: any, i: number) => (
                  <span key={producto}>
                    {producto}
                    {showArrayComma(cliente?.productos || [], i)}{' '}
                  </span>
                ))}
              />
            </Grid>
          ) : (
            <></>
          )}
          <Grid item xs={12} sm={3}>
            <ShowDataLabel
              label='Cliente banco'
              data={cliente?.cliente_banco ? 'Cliente' : 'No cliente'}
            />
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  )
}

export default ClienteDetailView
