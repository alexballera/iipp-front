//** Base Imports */
import { useRouter } from 'next/router'
import { useEffect } from 'react'

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

//** Types, Constant, Utils, Contexts & Enums Imports */
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFnsV3'
import { DatePicker } from '@mui/x-date-pickers/DatePicker'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider'
import es from 'date-fns/locale/es'
import { useSelector } from 'src/@core/configs/store'
import { REQUIRED_FIELD } from 'src/@core/constants'
import { useAppContext } from 'src/@core/context/AppContext'
import { AccionesEnum } from 'src/@core/enums'
import { FetchErrorTypes } from 'src/@core/types'
import { removeSlashesAndScores, showApiSuccessMessage, showMessageError } from 'src/@core/utils'
import {
  useCreateCobranzaMutation,
  useUpdateCobranzaMutation
} from 'src/bundle/cobranzas/data/cobranzasApiService'
import {
  CrearCobranzaDTO,
  cobranzasIS as defaultValues
} from 'src/bundle/cobranzas/domain/cobranzasModel'
import { MonedaEnum } from 'src/bundle/shared/domain'

// ** Custom Components
import BreadcrumbsComponent from 'src/@core/components/BreadcrumbsComponent'
import ButtonsActionsForm from 'src/@core/components/ButtonsActionsForm'
import TitleSectionForm from 'src/@core/components/TitleSectionForm'
import FormLayout from 'src/@core/layouts/FormLayout'

const schema = yup.object().shape({
  cuit: yup.string().required(REQUIRED_FIELD),
  cuenta_originante: yup.string().required(REQUIRED_FIELD),
  monto: yup.string().required(REQUIRED_FIELD)
})

function FormCobranzas() {
  //** Hooks */
  const router = useRouter()
  const { state: appState, setState: setAppState, loading, setLoading } = useAppContext()
  const [createCobranza, { isLoading: isCreating }] = useCreateCobranzaMutation()
  const [updateCobranza, { isLoading: isUpdating }] = useUpdateCobranzaMutation()

  //** Hooks */
  const {
    control,
    handleSubmit,
    reset,
    formState: { errors }
  } = useForm({
    defaultValues,
    mode: 'onChange',
    resolver: yupResolver(schema)
  })

  const {
    COBRANZAS: { cobranza }
  } = useSelector(state => state)

  useEffect(() => {
    if (appState.accion === AccionesEnum.EDITAR_COBRANZA) {
      reset({ ...cobranza })
    }
  }, [cobranza, reset, appState])

  useEffect(() => {
    setLoading(isCreating || isUpdating || false)
  }, [setLoading, isCreating, isUpdating])

  const handleGoBack = () => {
    setAppState({
      ...appState,
      accion: ''
    })
    router.back()
  }

  const handleLimpiarCampos = () => {
    reset({ ...defaultValues })
  }

  const breadCrumbEditar = [
    {
      id: '01',
      text: cobranza.nombre,
      link: () => router.back()
    },
    {
      id: '02',
      text: 'EDITAR COBRANZA',
      link: undefined
    }
  ]

  const breadCrumbCrear = [
    {
      id: '01',
      text: 'NUEVA COBRANZA',
      link: undefined
    }
  ]

  const getBreadCrumbItems = () => {
    if (appState.accion === AccionesEnum.CREAR_COBRANZA) return breadCrumbCrear
    if (appState.accion === AccionesEnum.EDITAR_COBRANZA) return breadCrumbEditar

    return []
  }

  const onSubmit = (dataForm: CrearCobranzaDTO) => {
    const body = {
      ...dataForm
    }

    if (appState.accion === AccionesEnum.EDITAR_COBRANZA) {
      updateCobranza(body)
        .unwrap()
        .then(() => {
          showApiSuccessMessage('Informacacion editada correctamente')
        })
        .catch((error: FetchErrorTypes) => showMessageError(error))
    } else {
      createCobranza(body)
        .unwrap()
        .then(() => {
          showApiSuccessMessage('Informacacion cargada correctamente')
          handleLimpiarCampos()
        })
        .catch((error: FetchErrorTypes) => showMessageError(error))
    }

    return
  }

  return (
    <>
      <BreadcrumbsComponent breadCrumbItems={getBreadCrumbItems()} />
      <FormLayout title={removeSlashesAndScores(appState.accion || '')}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Grid container spacing={5}>
            <Grid item xs={12}>
              <TitleSectionForm text='Cliente' />
            </Grid>

            {/** CUIT */}
            <Grid item xs={12} sm={6}>
              <FormControl fullWidth>
                <Controller
                  name='cuit'
                  control={control}
                  rules={{ required: true }}
                  render={({ field: { value, onChange } }) => (
                    <TextField
                      value={value}
                      label='Numero CUIT'
                      onChange={onChange}
                      type='text'
                      placeholder='Escriba numero de CUIT'
                      aria-describedby='stepper-linear-account-actividad'
                      disabled={loading}
                    />
                  )}
                />
                {errors.cuit && (
                  <FormHelperText sx={{ color: 'error.main' }} id='validation-schema-numero_fci'>
                    {errors.cuit?.message}
                  </FormHelperText>
                )}
              </FormControl>
            </Grid>

            {/** cuenta_originante */}
            <Grid item xs={12} sm={6}>
              <FormControl fullWidth>
                <Controller
                  name='cuenta_originante'
                  control={control}
                  rules={{ required: true }}
                  render={({ field: { value, onChange } }) => (
                    <TextField
                      value={value}
                      label='Numero cuenta *'
                      onChange={onChange}
                      type='text'
                      placeholder='Escriba el numero de cuenta'
                      aria-describedby='stepper-linear-account-actividad'
                      disabled={loading}
                    />
                  )}
                />
                {errors.cuenta_originante && (
                  <FormHelperText sx={{ color: 'error.main' }} id='validation-schema-numero_fci'>
                    {errors.cuenta_originante?.message}
                  </FormHelperText>
                )}
              </FormControl>
            </Grid>

            <Grid item xs={12}>
              <TitleSectionForm text='Informacion' />
            </Grid>

            {/** fecha */}
            <Grid item xs={12} sm={6}>
              <FormControl fullWidth>
                <Controller
                  name='fecha_operacion'
                  control={control}
                  rules={{ required: true }}
                  render={({ field: { value, onChange } }) => (
                    <LocalizationProvider dateAdapter={AdapterDateFns} adapterLocale={es}>
                      <DatePicker
                        label='Fecha'
                        disableFuture
                        openTo='day'
                        value={value}
                        onChange={onChange}
                        views={['year', 'month', 'day']}
                      />
                    </LocalizationProvider>
                  )}
                />
                {errors.fecha_operacion && (
                  <FormHelperText sx={{ color: 'error.main' }} id='stepper-linear-account-email'>
                    {errors.fecha_operacion.message}
                  </FormHelperText>
                )}
              </FormControl>
            </Grid>

            {/** monto */}
            <Grid item xs={12} sm={6}>
              <FormControl fullWidth>
                <Controller
                  name='monto'
                  control={control}
                  rules={{ required: true }}
                  render={({ field: { value, onChange } }) => (
                    <TextField
                      value={value}
                      label='Monto'
                      onChange={onChange}
                      type='text'
                      placeholder='Ingrese el monto'
                      aria-describedby='stepper-linear-account-actividad'
                      disabled={loading}
                    />
                  )}
                />
                {errors.monto && (
                  <FormHelperText sx={{ color: 'error.main' }} id='validation-schema-numero_fci'>
                    {errors.monto?.message}
                  </FormHelperText>
                )}
              </FormControl>
            </Grid>

            <Grid item xs={12}>
              <TitleSectionForm text='Monedas' />
            </Grid>

            {/** moneda */}
            <Grid item xs={12} sm={6}>
              <FormControl fullWidth>
                <InputLabel
                  id='stepper-linear-personal-pais'
                  error={Boolean(errors.moneda)}
                  htmlFor='stepper-linear-personal-pais'
                >
                  Tipo de moneda *
                </InputLabel>
                <Controller
                  name='moneda'
                  control={control}
                  rules={{ required: true }}
                  render={({ field: { value, onChange } }) => (
                    <Select
                      value={value}
                      label='Tipo de moneda *'
                      id='controlled-select'
                      onChange={onChange}
                      labelId='controlled-select-label'
                    >
                      {Object.values(MonedaEnum).map(value => (
                        <MenuItem key={value} value={value}>
                          {value}
                        </MenuItem>
                      ))}
                    </Select>
                  )}
                />
                {errors.moneda && (
                  <FormHelperText sx={{ color: 'error.main' }} id='validation-schema-moneda'>
                    {errors.moneda.message}
                  </FormHelperText>
                )}
              </FormControl>
            </Grid>

            {/** botón de acción */}
            <Grid item xs={12}>
              <ButtonsActionsForm
                rigthTextButton='Guardar'
                rigthColorButton='primary'
                loading={loading}
                disabled={loading}
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

export default FormCobranzas
