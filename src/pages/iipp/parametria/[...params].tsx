//** Base Imports */
import { useRouter } from 'next/router'

//** MUI Imports */
import {
  FormControl,
  FormHelperText,
  Grid,
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
import { FetchErrorTypes } from 'src/@core/types'
import { removeSlashesAndScores, showApiErrorMessage, showApiSuccessMessage } from 'src/@core/utils'

//** Store && APIs Imports */
import { useSelector } from 'src/@core/configs/store'
import {
  useCreateParametriaMutation,
  useUpdateParametriaMutation
} from 'src/bundle/iipp/data/iippApiService'
import {
  AplicacionParametria,
  CrearParametriaComercialDTO,
  ModificarParametriaComercialDTO,
  parametriaIS as defaultValues
} from 'src/bundle/iipp/domain/iippModel'

// ** Custom Components
import { AccountTie } from 'mdi-material-ui'
import BreadcrumbsComponent from 'src/@core/components/BreadcrumbsComponent'
import ButtonsActionsForm from 'src/@core/components/ButtonsActionsForm'
import TitleSectionForm from 'src/@core/components/TitleSectionForm'
import FormLayout from 'src/@core/layouts/FormLayout'

const schema = yup.object().shape({
  concepto: yup.object().shape({
    id: yup.string()
  })
})

function FormParametriasPage() {
  //** States */
  const { state, setState } = useAppContext()

  //** Hooks */
  const router = useRouter()
  const { params } = router.query
  const parametria_id = params![2]
  const accion = params![1]

  //** APIs */
  const [crearParametria, { isLoading: isCreating }] = useCreateParametriaMutation()
  const [editarParametria, { isLoading: isUpdating }] = useUpdateParametriaMutation()

  const {
    IIPP: { iipp }
  } = useSelector(state => state)

  //** Hooks */
  const {
    control,
    handleSubmit,
    formState: { errors },
    reset
  } = useForm({
    defaultValues,
    mode: 'onChange',
    resolver: yupResolver(schema)
  })

  useMount(() => {
    if (accion === AccionesEnum.EDITAR_PARAMETRIA && parametria_id) {
      const parametriaAEditar = iipp?.parametrias?.find(p => p.id === parametria_id)

      if (parametriaAEditar) reset(parametriaAEditar)
    }
  })

  const handleGoBack = () => router.back()

  const handleLimpiarCampos = () => reset(defaultValues)

  const handleCreateParametria = (body: CrearParametriaComercialDTO) => {
    setState({
      ...state,
      created: false
    })
    crearParametria({
      ...body,
      cliente_id: iipp.id
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
      cliente_id: iipp.id
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
      text: `${iipp.nombre}`,
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
      <BreadcrumbsComponent
        firstBreadcrumb='iipp'
        icon={<AccountTie fontSize='small' />}
        breadCrumbItems={getBreadCrumbItems()}
      />
      <FormLayout title={removeSlashesAndScores(state.accion || '')}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Grid container spacing={5}>
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
