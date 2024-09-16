//** Base Imports */
import { useRouter } from 'next/router'
import { useState } from 'react'

//** MUI Imports */
import { FormControl, FormHelperText, Grid, InputLabel, MenuItem, Select } from '@mui/material'

//** Enums, Constants, & Utils Imports */
import { REQUIRED_FIELD } from 'src/@core/constants'
import { AccionesEnum } from 'src/@core/enums'
import {
  formatDate,
  removeSlashesAndScores,
  showApiErrorMessage,
  showApiSuccessMessage,
  showMessageError
} from 'src/@core/utils'

//** Store Imports */
import { useDispatch } from 'src/@core/configs/store'
import { FetchErrorTypes, PaginationDataIS } from 'src/@core/types'
import { CrearNotaIS, GenerarNotaDTO } from 'src/bundle/facturacion/domain'
import { useFetchProductosQuery } from 'src/bundle/parametrias/productos/data/productosApiService'

// ** Third Party Imports
import { yupResolver } from '@hookform/resolvers/yup'
import { Controller, useForm } from 'react-hook-form'
import * as yup from 'yup'

//** Customs Components Imports */
import LoadingButton from '@mui/lab/LoadingButton'
import BreadcrumbsComponent from 'src/@core/components/BreadcrumbsComponent'
import ButtonsActionsForm from 'src/@core/components/ButtonsActionsForm'
import DateRangeComponent, {
  DateRangeIS,
  DateRangeTypes
} from 'src/@core/components/DateRangeComponent'
import FormLayout from 'src/@core/layouts/FormLayout'
import NovedadesTableComponent from 'src/bundle/facturacion/components/NovedadesTableComponent'
import {
  generarNotas,
  getArchivosInformacionMensual
} from 'src/bundle/facturacion/data/facturacionApiService'
import { TipoDeProducto } from 'src/bundle/parametrias/productos/domain/productosModel'
import { Archivo } from 'src/bundle/shared/domain'
import { useSettings } from 'src/@core/hooks/useSettings'

const schema = yup.object().shape({
  producto: yup.string().required(REQUIRED_FIELD)
})

interface StateType {
  loading: boolean
  showHelperTextDate: boolean
  errorDateRange: boolean
  errorCargarNovedades: boolean
  fechaDesde: Date | string
  fechaHasta: Date | string
}

const initialState: StateType = {
  loading: false,
  showHelperTextDate: false,
  errorDateRange: false,
  errorCargarNovedades: false,
  fechaDesde: '',
  fechaHasta: ''
}

function FacturacionFormPage() {
  //** States */
  const [state, setState] = useState<StateType>(initialState)
  const [archivos, setArchivos] = useState<Archivo[]>([])
  const [openDateRange, setOpenDateRange] = useState<boolean>(false)
  const [selectionDateRange, setSelectionDateRange] = useState<DateRangeTypes>(DateRangeIS)

  //** Hooks */
  const router = useRouter()
  const dispatch = useDispatch()
  const accion = router?.query?.params![0]

  const { data: productos, isLoading, isFetching } = useFetchProductosQuery(PaginationDataIS)

  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
    watch
  } = useForm({
    defaultValues: CrearNotaIS,
    mode: 'onChange',
    resolver: yupResolver(schema)
  })

  const { settings } = useSettings()

  const producto = watch().producto
  const fecha_desde = state.fechaDesde
  const fecha_hasta = state.fechaHasta

  const handleCargarNovedades = () => {
    setArchivos([])
    if (producto && fecha_desde && fecha_hasta) {
      const body: GenerarNotaDTO = {
        fecha_desde: new Date(fecha_desde),
        fecha_hasta: new Date(fecha_hasta),
        producto
      }

      const response = dispatch(getArchivosInformacionMensual.initiate(body))
      setState({
        ...state,
        loading: true
      })

      response
        .unwrap()
        .then((res: any) => {
          showApiSuccessMessage('Ver Archivos')
          setArchivos(res.registros)
        })
        .catch((error: FetchErrorTypes) => showMessageError(error))
        .finally(() =>
          setState({
            ...state,
            loading: false,
            errorCargarNovedades: false
          })
        )
    }
  }

  const breadCrumbEditar = [
    {
      id: '01',
      text: 'Nombre ND',
      link: () => router.back()
    },
    {
      id: '02',
      text: 'EDITAR NOTA DÉBITO',
      link: undefined
    }
  ]

  const breadCrumbCrear = [
    {
      id: '01',
      text: 'NUEVA NOTA DÉBITO',
      link: undefined
    }
  ]

  const getBreadCrumbItems = () => {
    if (accion === AccionesEnum.CREAR_NOTA_DEBITO) return breadCrumbCrear
    if (accion === AccionesEnum.EDITAR_NOTA_DEBITO) return breadCrumbEditar

    return []
  }

  const handleChangeDateRange = (ranges: any) => {
    setSelectionDateRange(ranges.selection)

    setState({
      ...state,
      showHelperTextDate: true,
      errorDateRange: false,
      fechaDesde: ranges.selection.startDate,
      fechaHasta: ranges.selection.endDate
    })
  }

  const handleConfirmarFechas = () => setOpenDateRange(false)

  const handleBack = () => router.back()

  const obtenerMensajeGenerador = (cantidad: number, cantidadErrores: number) => {
    if (cantidadErrores > 0) {
      return showApiSuccessMessage(
        `${cantidad} Notas de Debito Generadas.\n\n Se registraron ${cantidadErrores} errores durante la generación. Revisar novedad`,
        5000
      )
    }

    if (cantidad === 0)
      return showApiErrorMessage('No se generaron Notas de Debito. Revisar novedad')

    return showApiSuccessMessage(`${cantidad} Notas de Debito Generadas`)
  }

  const handleCrearNotaDebito = (data: GenerarNotaDTO) => {
    if (producto === TipoDeProducto.CUSTODIA && !fecha_desde && !fecha_hasta) {
      setState({
        ...state,
        errorDateRange: true
      })

      return
    }

    if (producto === TipoDeProducto.CUSTODIA && archivos.length === 0) {
      setState({
        ...state,
        errorCargarNovedades: true
      })

      return
    }

    setState({
      ...state,
      loading: true,
      errorDateRange: false
    })
    const body: GenerarNotaDTO = {
      ...data,
      fecha_desde: new Date(fecha_desde),
      fecha_hasta: new Date(fecha_hasta)
    }

    setOpenDateRange(false)
    const response = dispatch(generarNotas.initiate(body))
    response
      .unwrap()
      .then((res: any) => {
        obtenerMensajeGenerador(res.cantidad, res.cantidad_errores)
        setArchivos([])
        reset(CrearNotaIS)
      })
      .catch((error: FetchErrorTypes) => showMessageError(error))
      .finally(() => {
        setState({
          ...state,
          loading: false,
          showHelperTextDate: false,
          errorCargarNovedades: false
        })
      })
  }

  const dateRangeTextButton = () =>
    state.showHelperTextDate
      ? `${formatDate(state.fechaDesde)} - ${formatDate(state.fechaHasta)}`
      : 'Rango fecha'

  const onSubmit = (data: GenerarNotaDTO) => {
    if (accion === AccionesEnum.CREAR_NOTA_DEBITO) handleCrearNotaDebito(data)
  }

  return (
    <>
      <BreadcrumbsComponent breadCrumbItems={getBreadCrumbItems()} />
      <FormLayout title={removeSlashesAndScores(accion || '')}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Grid container spacing={5}>
            {/** producto */}
            <Grid item xs={12} sm={6}>
              {isLoading || isFetching ? (
                'Cargando...'
              ) : (
                <FormControl fullWidth disabled={state.loading || false}>
                  <InputLabel id='producto' error={Boolean(errors.producto)} htmlFor='producto'>
                    Producto *
                  </InputLabel>
                  <Controller
                    name='producto'
                    control={control}
                    rules={{ required: true }}
                    render={({ field: { value, onChange } }) => (
                      <Select
                        value={value}
                        label='Producto *'
                        id='controlled-select'
                        onChange={onChange}
                        labelId='controlled-select-label'
                        color='primary'
                      >
                        {productos &&
                          productos.registros.map(product => (
                            <MenuItem key={product.id} value={product.nombre}>
                              {product.nombre}
                            </MenuItem>
                          ))}
                      </Select>
                    )}
                  />
                  {errors.producto && (
                    <FormHelperText sx={{ color: 'error.main' }} id='validation-schema-producto'>
                      {errors.producto.message}
                    </FormHelperText>
                  )}
                </FormControl>
              )}
            </Grid>

            {/** rango_fecha */}
            <Grid item xs={12} sm={6}>
              <FormControl fullWidth>
                <DateRangeComponent
                  disabled={state.loading || false}
                  textButton={dateRangeTextButton()}
                  onChange={handleChangeDateRange}
                  openDateRange={openDateRange}
                  setOpenDateRange={setOpenDateRange}
                  selectionDateRange={selectionDateRange}
                  handleConfirmarFechas={handleConfirmarFechas}
                  sx={{
                    height: 56,
                    marginBottom: '0px !important',
                    color: settings.mode === 'dark' ? 'currentColor' : 'rgba(58, 53, 65, 0.87)'
                  }}
                  dateRangeClassName={
                    settings.mode === 'dark'
                      ? 'date-range__base date-range__nd date-range-dark'
                      : 'date-range__base date-range__nd'
                  }
                  size='large'
                  height='56px'
                  top='56px'
                  error={state.errorDateRange}
                />

                {state.errorDateRange && (
                  <FormHelperText sx={{ color: 'error.main' }} id='validation-schema-producto'>
                    Campo requerido
                  </FormHelperText>
                )}
              </FormControl>
            </Grid>

            <Grid item xs={12}>
              <LoadingButton
                size='large'
                variant='outlined'
                onClick={handleCargarNovedades}
                color='secondary'
                loading={state.loading}
                disabled={!(producto && fecha_desde && fecha_hasta)}
              >
                Cargar novedades
              </LoadingButton>
              <NovedadesTableComponent
                loading={state.loading}
                title='Novedades Cargadas'
                archivos={archivos}
                error={
                  producto === TipoDeProducto.CUSTODIA && state.errorCargarNovedades
                    ? 'Primero debe cargar novedades...'
                    : ''
                }
              />
            </Grid>

            {/** botón de acción */}
            <Grid item xs={12}>
              <ButtonsActionsForm
                leftTextButton='Cancelar'
                rigthTextButton='Guardar'
                rigthColorButton='primary'
                loading={state.loading}
                disabled={state.loading}
                handleBack={handleBack}
                alignContent='flex-end'
                minHeight={openDateRange ? '306px' : 'inherit'}
              />
            </Grid>
          </Grid>
        </form>
      </FormLayout>
    </>
  )
}
export default FacturacionFormPage
