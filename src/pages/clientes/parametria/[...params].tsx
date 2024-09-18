//** Base Imports */
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'

//** MUI Imports */
import {
  Box,
  FormControl,
  FormHelperText,
  Grid,
  InputAdornment,
  InputLabel,
  MenuItem,
  Select,
  TextField
} from '@mui/material'

// ** Third Party Imports
import { yupResolver } from '@hookform/resolvers/yup'
import { Controller, useForm } from 'react-hook-form'
import * as yup from 'yup'

//** Date Pickers Imports */
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFnsV3'
import { DatePicker } from '@mui/x-date-pickers/DatePicker'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider'
import es from 'date-fns/locale/es'

//** Types, Constant, Utils, Contexts & Enums Imports */
import { useAppContext } from 'src/@core/context/AppContext'
import { AccionesEnum } from 'src/@core/enums'
import useMount from 'src/@core/hooks/useMount'
import { FetchErrorTypes, PaginationDataIS } from 'src/@core/types'
import { removeSlashesAndScores, showApiErrorMessage, showApiSuccessMessage } from 'src/@core/utils'

//** Store && APIs Imports */
import { useDispatch, useSelector } from 'src/@core/configs/store'
import {
  useCreateParametriaMutation,
  useUpdateParametriaMutation
} from 'src/bundle/clientes/data/clientesApiService'
import {
  AplicacionParametria,
  CrearParametriaComercialDTO,
  ModificarParametriaComercialDTO,
  parametriaIS as defaultValues
} from 'src/bundle/clientes/domain/clientesModel'

// ** Custom Components
import BreadcrumbsComponent from 'src/@core/components/BreadcrumbsComponent'
import ButtonsActionsForm from 'src/@core/components/ButtonsActionsForm'
import Loader from 'src/@core/components/Loader'
import TitleSectionForm from 'src/@core/components/TitleSectionForm'
import FormLayout from 'src/@core/layouts/FormLayout'
import { useFetchConceptoFacturacionQuery } from 'src/bundle/parametrias/concepto-facturacion/data/conceptoFacturacionApiService'
import { ConceptoFacturacionDTO } from 'src/bundle/parametrias/concepto-facturacion/domain/conceptoFacturacionModel'
import { useFetchProductosQuery } from 'src/bundle/parametrias/productos/data/productosApiService'

const schema = yup.object().shape({
  concepto: yup.object().shape({
    id: yup.string()
  })
})

function FormParametriasPage() {
  //** States */
  const { state, setState } = useAppContext()
  const [conceptosList, setConceptosList] = useState<ConceptoFacturacionDTO[]>([])

  //** Hooks */
  const router = useRouter()
  const { params } = router.query
  const parametria_id = params![2]
  const accion = params![1]
  const dispatch = useDispatch()

  //** APIs */
  const [crearParametria, { isLoading: isCreating }] = useCreateParametriaMutation()
  const [editarParametria, { isLoading: isUpdating }] = useUpdateParametriaMutation()
  const { data: conceptos, isFetching: isFetchingConceptos } =
    useFetchConceptoFacturacionQuery(PaginationDataIS)
  const { data: productos, isFetching: isFetchingProductos } =
    useFetchProductosQuery(PaginationDataIS)

  const {
    CLIENTES: { cliente }
  } = useSelector(state => state)

  //** Hooks */
  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
    watch
  } = useForm({
    defaultValues,
    mode: 'onChange',
    resolver: yupResolver(schema)
  })

  const productoSelected = watch().producto

  useMount(() => {
    if (accion === AccionesEnum.EDITAR_PARAMETRIA && parametria_id) {
      const parametriaAEditar = cliente?.parametrias?.find(p => p.id === parametria_id)

      if (parametriaAEditar) reset(parametriaAEditar)
    }
  })

  useEffect(() => {
    if (productoSelected) {
      const conceptosFiltered = conceptos?.registros.filter(c => {
        return c.productos?.find(p => p === productoSelected)
      })

      setConceptosList(conceptosFiltered || [])
    }
  }, [productoSelected, conceptos?.registros, dispatch])

  const handleGoBack = () => router.back()

  const handleLimpiarCampos = () => reset(defaultValues)

  const handleCreateParametria = (body: CrearParametriaComercialDTO) => {
    setState({
      ...state,
      created: false
    })
    crearParametria({
      ...body,
      cliente_id: cliente.id
    })
      .unwrap()
      .then(() => {
        showApiSuccessMessage('Parametria Creada')
        handleLimpiarCampos()
        setState({
          ...state,
          created: true
        })
      })
      .catch((error: FetchErrorTypes) => showApiErrorMessage(error?.data?.error?.message))
  }

  const handleUpdateParametria = (dataForm: ModificarParametriaComercialDTO) => {
    setState({
      ...state,
      updated: false
    })
    editarParametria({
      ...dataForm,
      cliente_id: cliente.id
    })
      .unwrap()
      .then(() => {
        showApiSuccessMessage('Parametria Editada')
        setState({
          ...state,
          updated: true
        })
      })
      .catch((error: FetchErrorTypes) => showApiErrorMessage(error?.data?.error?.message))
  }

  const breadCrumbEditar = [
    {
      id: '01',
      text: 'PARAMETRIA',
      link: () => router.back()
    },
    {
      id: '02',
      text: 'EDITAR PARAMETRIA',
      link: undefined
    }
  ]

  const breadCrumbCrear = [
    {
      id: '01',
      text: `${cliente.nombre}`,
      link: () => router.back()
    },
    {
      id: '02',
      text: 'CREAR PARAMETRIA',
      link: undefined
    }
  ]

  const getBreadCrumbItems = () => {
    if (accion === AccionesEnum.CREAR_PARAMETRIA) return breadCrumbCrear
    if (accion === AccionesEnum.EDITAR_PARAMETRIA) return breadCrumbEditar

    return []
  }

  const onSubmit = (dataForm: CrearParametriaComercialDTO) => {
    const body = {
      ...dataForm,
      fecha_inicio: new Date(dataForm.fecha_vigencia_inicio!).toISOString(),
      fecha_fin: new Date(dataForm.fecha_vigencia_fin!).toISOString()
    }

    if (accion === AccionesEnum.CREAR_PARAMETRIA) {
      handleCreateParametria(body)

      return
    }

    if (accion === AccionesEnum.EDITAR_PARAMETRIA) {
      handleUpdateParametria(body)

      return
    }

    return
  }

  return (
    <>
      <BreadcrumbsComponent breadCrumbItems={getBreadCrumbItems()} />
      <FormLayout title={removeSlashesAndScores(state.accion || '')}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Grid container spacing={5}>
            {/** producto */}
            <Grid item sm={6}>
              <FormControl fullWidth>
                <InputLabel
                  id='stepper-linear-personal-pais'
                  error={Boolean(errors.producto)}
                  htmlFor='stepper-linear-personal-pais'
                >
                  Producto *
                </InputLabel>
                <Controller
                  name='producto'
                  control={control}
                  rules={{ required: state.accion === AccionesEnum.CREAR_PARAMETRIA }}
                  render={({ field: { value, onChange } }) => (
                    <Select
                      value={value}
                      label='Producto *'
                      id='controlled-select'
                      onChange={onChange}
                      disabled={
                        isFetchingConceptos ||
                        isFetchingProductos ||
                        isCreating ||
                        isUpdating ||
                        state.accion === AccionesEnum.EDITAR_PARAMETRIA
                      }
                      labelId='controlled-select-label'
                      endAdornment={
                        <InputAdornment position='end'>
                          {isFetchingProductos && (
                            <Box sx={{ width: '58px' }}>
                              <Loader height='20px' size={20} />
                            </Box>
                          )}
                        </InputAdornment>
                      }
                    >
                      {productos?.registros.map(value => (
                        <MenuItem key={value.id} value={value.nombre}>
                          {value.nombre}
                        </MenuItem>
                      ))}
                    </Select>
                  )}
                />
                {errors.producto && (
                  <FormHelperText
                    sx={{ color: 'error.main' }}
                    id='validation-schema-idioma_factura'
                  >
                    {errors.producto.message}
                  </FormHelperText>
                )}
              </FormControl>
            </Grid>

            {/** concepto */}
            <Grid item sm={6}>
              <FormControl fullWidth>
                <InputLabel
                  id='stepper-linear-personal-pais'
                  error={Boolean(errors.concepto)}
                  htmlFor='stepper-linear-personal-pais'
                >
                  Concepto *
                </InputLabel>
                <Controller
                  name='concepto.id'
                  control={control}
                  rules={{ required: state.accion === AccionesEnum.CREAR_PARAMETRIA }}
                  render={({ field: { value, onChange } }) => (
                    <Select
                      value={value}
                      label='Concepto *'
                      id='controlled-select'
                      onChange={onChange}
                      disabled={
                        isFetchingConceptos ||
                        isCreating ||
                        isUpdating ||
                        conceptosList.length === 0 ||
                        state.accion === AccionesEnum.EDITAR_PARAMETRIA
                      }
                      labelId='controlled-select-label'
                      endAdornment={
                        <InputAdornment position='end'>
                          {isFetchingConceptos && (
                            <Box sx={{ width: '58px' }}>
                              <Loader height='20px' size={20} />
                            </Box>
                          )}
                        </InputAdornment>
                      }
                    >
                      {conceptosList.map(value => (
                        <MenuItem key={value.id} value={value.id}>
                          {value.nombre}
                        </MenuItem>
                      ))}
                    </Select>
                  )}
                />
                {errors.concepto?.id && (
                  <FormHelperText
                    sx={{ color: 'error.main' }}
                    id='validation-schema-idioma_factura'
                  >
                    {errors.concepto?.id.message}
                  </FormHelperText>
                )}
              </FormControl>
            </Grid>

            <Grid item xs={12}>
              <TitleSectionForm text='Condiciones Especiales' />
            </Grid>

            {/** costo concepto */}
            <Grid item xs={6} sm={3}>
              <FormControl fullWidth>
                <Controller
                  name='costo'
                  control={control}
                  rules={{ required: false }}
                  render={({ field: { value, onChange } }) => (
                    <TextField
                      label='Costo concepto'
                      placeholder='Ingresa el monto'
                      error={Boolean(errors.costo)}
                      type='number'
                      value={value}
                      onChange={onChange}
                      aria-describedby='validation-schema-first-name'
                      disabled={isCreating || isUpdating}
                    />
                  )}
                />
                {errors.costo && (
                  <FormHelperText sx={{ color: 'error.main' }} id='validation-schema-first-name'>
                    {errors.costo.message}
                  </FormHelperText>
                )}
              </FormControl>
            </Grid>

            {/** maximo */}
            <Grid item xs={6} sm={3}>
              <FormControl fullWidth>
                <Controller
                  name='maximo'
                  control={control}
                  rules={{ required: false }}
                  render={({ field: { value, onChange } }) => (
                    <TextField
                      label='Máximo'
                      placeholder='Ingresa el monto'
                      error={Boolean(errors.maximo)}
                      type='number'
                      value={value}
                      onChange={onChange}
                      aria-describedby='validation-schema-first-name'
                      disabled={isCreating || isUpdating}
                    />
                  )}
                />
                {errors.maximo && (
                  <FormHelperText sx={{ color: 'error.main' }} id='validation-schema-first-name'>
                    {errors.maximo.message}
                  </FormHelperText>
                )}
              </FormControl>
            </Grid>

            {/** minimo */}
            <Grid item xs={6} sm={3}>
              <FormControl fullWidth>
                <Controller
                  name='minimo'
                  control={control}
                  rules={{ required: false }}
                  render={({ field: { value, onChange } }) => (
                    <TextField
                      label='Mínimo'
                      placeholder='Ingresa el monto'
                      error={Boolean(errors.minimo)}
                      type='number'
                      value={value}
                      onChange={onChange}
                      aria-describedby='validation-schema-first-name'
                      disabled={isCreating || isUpdating}
                    />
                  )}
                />
                {errors.minimo && (
                  <FormHelperText sx={{ color: 'error.main' }} id='validation-schema-first-name'>
                    {errors.minimo.message}
                  </FormHelperText>
                )}
              </FormControl>
            </Grid>

            {/** aplicacion */}
            <Grid item xs={6} sm={3}>
              <FormControl fullWidth>
                <InputLabel
                  id='stepper-linear-personal-pais'
                  error={Boolean(errors.aplicacion)}
                  htmlFor='stepper-linear-personal-pais'
                >
                  Aplicacion
                </InputLabel>
                <Controller
                  name='aplicacion'
                  control={control}
                  rules={{ required: true }}
                  render={({ field: { value, onChange } }) => (
                    <Select
                      value={value}
                      label='Aplicacion *'
                      id='controlled-select'
                      onChange={onChange}
                      labelId='controlled-select-label'
                    >
                      {Object.values(AplicacionParametria).map(value => (
                        <MenuItem key={value} value={value}>
                          {removeSlashesAndScores(value)}
                        </MenuItem>
                      ))}
                    </Select>
                  )}
                />
                {errors.aplicacion && (
                  <FormHelperText sx={{ color: 'error.main' }} id='validation-schema-grupo'>
                    {errors.aplicacion.message}
                  </FormHelperText>
                )}
              </FormControl>
            </Grid>

            {/** 'fecha vigencia inicio' */}
            <Grid item xs={6} sm={6}>
              <FormControl fullWidth>
                <Controller
                  name='fecha_vigencia_inicio'
                  control={control}
                  rules={{ required: true }}
                  render={({ field: { value, onChange } }) => (
                    <LocalizationProvider dateAdapter={AdapterDateFns} adapterLocale={es}>
                      <DatePicker
                        label='Fecha inicio'
                        openTo='day'
                        value={value}
                        onChange={onChange}
                        views={['year', 'month', 'day']}
                        loading={isCreating || isUpdating}
                      />
                    </LocalizationProvider>
                  )}
                />
                {errors.fecha_vigencia_inicio && (
                  <FormHelperText sx={{ color: 'error.main' }} id='stepper-linear-account-email'>
                    {errors.fecha_vigencia_inicio.message}
                  </FormHelperText>
                )}
              </FormControl>
            </Grid>

            {/** 'fecha vigencia fin' */}
            <Grid item xs={6} sm={6}>
              <FormControl fullWidth>
                <Controller
                  name='fecha_vigencia_fin'
                  control={control}
                  rules={{ required: true }}
                  render={({ field: { value, onChange } }) => (
                    <LocalizationProvider dateAdapter={AdapterDateFns} adapterLocale={es}>
                      <DatePicker
                        label='Fecha fin'
                        openTo='day'
                        value={value}
                        onChange={onChange}
                        views={['year', 'month', 'day']}
                        loading={isCreating || isUpdating}
                      />
                    </LocalizationProvider>
                  )}
                />
                {errors.fecha_vigencia_fin && (
                  <FormHelperText sx={{ color: 'error.main' }} id='stepper-linear-account-email'>
                    {errors.fecha_vigencia_fin.message}
                  </FormHelperText>
                )}
              </FormControl>
            </Grid>

            {/** botón de acción */}
            <Grid item xs={12}>
              <ButtonsActionsForm
                rigthTextButton='Guardar'
                rigthColorButton='primary'
                loading={isCreating || isUpdating}
                disabled={isCreating || isUpdating}
                leftTextButton='Cancelar'
                handleBack={handleGoBack}
              />
            </Grid>
          </Grid>
        </form>
      </FormLayout>
    </>
  )
}

export default FormParametriasPage
