//** Base Imports */
import { Fragment, useCallback, useEffect, useState } from 'react'

//** MUI Imports */
import { Card, CardContent, CardHeader, Grid, IconButton, Stack, Typography } from '@mui/material'

//** Custom Components Imports */
import { ClipboardText, PencilOutline } from 'mdi-material-ui'
import { useRouter } from 'next/router'
import CustomTooltip from 'src/@core/components/CustomTooltip'
import ShowDataLabel from 'src/@core/components/ShowDataLabel'
import CustomChip from 'src/@core/components/mui/chip'
import FallbackSpinner from 'src/@core/components/spinner'
import { useDispatch } from 'src/@core/configs/store'
import { useAppContext } from 'src/@core/context/AppContext'
import { AccionesEnum } from 'src/@core/enums'
import { showApiErrorMessage, showArrayComma } from 'src/@core/utils'
import { MenuItemsAccion } from 'src/bundle/shared/domain'
import { useGetIippByIdQuery } from '../data/iippApiService'
import { setIipp } from '../data/iippStore'
import { NumeroCuenta, TipoDocumento } from '../domain/iippModel'

function ClienteDetailView() {
  const [tooltipText, setTooltipText] = useState<string>('Copiar')

  //** Hooks */
  const router = useRouter()
  const { id } = router.query
  const dispatch = useDispatch()

  const {
    data: cliente,
    isSuccess,
    isLoading: isLoadingCliente
  } = useGetIippByIdQuery(id?.toString() || '')
  const { setState, state } = useAppContext()

  useEffect(() => {
    if (isSuccess) dispatch(setIipp(cliente))
  }, [cliente, dispatch, isSuccess])

  const obtenerDocumentoPorJerarquia = (): NumeroCuenta | undefined => {
    return cliente?.numero_documento?.find(documento => TipoDocumento.includes(documento.tipo))
  }

  const handleCopyToClipboard = (text: string | undefined) => {
    if (!text) {
      return showApiErrorMessage('No se encontró el documento para copiar')
    }

    navigator.clipboard.writeText(text)
    setTooltipText('¡Copiado!')

    setTimeout(() => {
      setTooltipText('Copiar')
    }, 2000)
  }

  const handleEditarCliente = useCallback(() => {
    setState({
      ...state,
      accion: AccionesEnum.EDITAR_IIPP
    })

    router.push(`form/${AccionesEnum.EDITAR_IIPP}`)
  }, [router, setState, state])

  if (isLoadingCliente) return <FallbackSpinner />

  const menuItems: MenuItemsAccion[] = [
    {
      icon: <PencilOutline fontSize='small' color='success' sx={{ mr: 1 }} />,
      title: 'Editar cliente',
      actions: () => handleEditarCliente(),
      show: true
    }
  ]

  return (
    <>
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
                  label={obtenerDocumentoPorJerarquia()?.tipo}
                  data={
                    <Stack direction='row'>
                      <Typography variant='inherit'>
                        {obtenerDocumentoPorJerarquia()?.valor}
                      </Typography>
                      <CustomTooltip text={tooltipText}>
                        <IconButton
                          color='primary'
                          aria-label='copy-to-clipboard'
                          component='label'
                          onClick={() =>
                            handleCopyToClipboard(obtenerDocumentoPorJerarquia()?.valor)
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
            <Grid item xs={12} sm={3}>
              <ShowDataLabel
                label='Estado'
                data={
                  <CustomChip
                    size='small'
                    skin='light'
                    color={cliente?.habilitado ? 'success' : 'error'}
                    label={cliente?.habilitado ? 'Habilitado' : 'Deshabilitado'}
                    sx={{
                      '& .MuiChip-label': { textTransform: 'capitalize' }
                    }}
                  />
                }
              />
            </Grid>
          </Grid>
        </CardContent>
      </Card>
    </>
  )
}

export default ClienteDetailView
