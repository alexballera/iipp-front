//** Base Imports */
import { useRouter } from 'next/router'
import { ChangeEvent, memo, useEffect, useState } from 'react'

//** MUI Imports */
import {
  Checkbox,
  FormControl,
  FormControlLabel,
  FormGroup,
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

//** Store, Enums, Utils Imports */
import { ONLY_NUMBERS, REQUIRED_FIELD } from 'src/@core/constants'
import { AccionesEnum } from 'src/@core/enums'
import useList from 'src/@core/hooks/useList'
import useMount from 'src/@core/hooks/useMount'
import { removeSlashesAndScores, showApiErrorMessage } from 'src/@core/utils'
import { MonedaEnum } from 'src/bundle/shared/domain'
import {
  GrupoImpuestosEnum,
  ImpuestoFormComponentProps,
  ImpuestoFormComponentPropsIS,
  ImpuestoIS
} from '../domain/impuestosModel'

//** Custom Components Imports */
import ButtonsActionsForm from 'src/@core/components/ButtonsActionsForm'
import LayoutInputButton from 'src/@core/components/LayoutInputButton'
import TitleSectionForm from 'src/@core/components/TitleSectionForm'
import FormLayout from 'src/@core/layouts/FormLayout'

const schema = yup.object().shape({
  descripcion: yup.string().required(REQUIRED_FIELD),
  alicuota: yup.number().integer(ONLY_NUMBERS).typeError(ONLY_NUMBERS),
  cuenta: yup.string()
})

const initialState = {
  usd: false,
  ars: false,
  showHelperText: false,
  showHelperTextNumeroCuenta: false,
  grupo: '',
  nombre: ''
}

function ImpuestoFormComponent(props: ImpuestoFormComponentProps) {
  const { accion, data, handleEditar, handleCrear, loading } = props
  const [estado, setEstado] = useState(initialState)

  //** Hooks */
  const router = useRouter()
  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
    setError,
    getValues,
    watch
  } = useForm({
    defaultValues: ImpuestoIS,
    mode: 'onChange',
    resolver: yupResolver(schema)
  })

  const grupoWatch = watch().grupo
  const nombreWatch = watch().descripcion

  const { isItem, addItem, cleanList, list: cuentas, deleteItem } = useList()

  useMount(() => {
    if (accion === AccionesEnum.EDITAR_IMPUESTO) {
      reset({ ...data })
      setTimeout(() => {
        setEstado({
          ...estado,
          usd: data?.moneda === MonedaEnum.USD,
          ars: data?.moneda === MonedaEnum.ARS,
          showHelperText: true
        })
      }, 100)
    }

    if (data?.numero_cuenta && data?.numero_cuenta.length > 0) {
      setEstado({
        ...estado,
        showHelperText: true
      })
    }
  })

  useEffect(() => {
    setEstado({
      ...estado,
      grupo: grupoWatch || '',
      nombre: nombreWatch
    })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [grupoWatch, nombreWatch])

  const handleMostrarCuentas = () => {
    data?.numero_cuenta.forEach(cuenta => addItem(cuenta))
    setEstado({
      ...estado,
      showHelperText: false
    })
  }

  const handleAgregarCuenta = (cuenta: string) => {
    if (!cuenta || cuenta === '') {
      setError('cuenta', {
        type: 'manual',
        message: 'Debes llenar el campo'
      })

      return
    }

    if (isItem(cuenta)) return showApiErrorMessage('La cuenta ya existe')

    addItem(cuenta)

    setEstado({
      ...estado,
      showHelperTextNumeroCuenta: false
    })

    reset({ ...getValues(), cuenta: '' })
  }

  const handleQuitarCuenta = (cuenta: string) => deleteItem(cuenta)

  const handleGoBack = () => {
    reset(ImpuestoIS)
    router.back()
  }

  const handleCleanForm = () => {
    setEstado({
      ...initialState
    })

    cleanList()

    reset(ImpuestoIS)
  }

  const onSubmit = (data: any) => {
    if (cuentas.length > 0) {
      const { descripcion } = data
      data = {
        ...data,
        descripcion: descripcion?.toUpperCase(),
        moneda: estado.ars ? MonedaEnum.ARS : MonedaEnum.USD,
        numero_cuenta: cuentas
      }

      if (accion === AccionesEnum.EDITAR_IMPUESTO) return handleEditar && handleEditar(data)

      handleCrear && handleCrear(data)

      handleCleanForm()

      setEstado({
        ...estado,
        showHelperTextNumeroCuenta: false
      })
    } else {
      setEstado({
        ...estado,
        showHelperTextNumeroCuenta: true
      })
    }

    return
  }

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    if (event.target.name === MonedaEnum.ARS) {
      setEstado({
        ...estado,
        ars: event.target.checked,
        usd: !event.target.checked
      })
    } else {
      setEstado({
        ...estado,
        ars: !event.target.checked,
        usd: event.target.checked
      })
    }
  }

  const handleHabilitarSubmitBoton = () => {
    return (
      loading ||
      (accion === AccionesEnum.EDITAR_IMPUESTO && (cuentas.length === 0 || estado.showHelperText))
    )
  }

  const handleHabilitarCuentaInput = () => {
    return loading || estado.showHelperText
  }

  const handleValidacion = () => {
    if (cuentas.length === 0) {
      setEstado({
        ...estado,
        showHelperTextNumeroCuenta: true
      })
    }
  }

  return (
    <FormLayout title={removeSlashesAndScores(accion || '')}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Grid container spacing={5}>
          {/** grupo */}
          <Grid item xs={12} sm={5}>
            <FormControl fullWidth>
              <InputLabel
                id='stepper-linear-personal-grupo'
                error={Boolean(errors.grupo)}
                htmlFor='stepper-linear-personal-grupo'
              >
                Grupo
              </InputLabel>
              <Controller
                name='grupo'
                control={control}
                rules={{ required: true }}
                render={({ field: { value, onChange } }) => (
                  <Select
                    value={value}
                    label='Grupo *'
                    id='controlled-select'
                    onChange={onChange}
                    labelId='controlled-select-label'
                  >
                    {Object.values(GrupoImpuestosEnum).map(value => (
                      <MenuItem key={value} value={value}>
                        {value}
                      </MenuItem>
                    ))}
                  </Select>
                )}
              />
              {errors.grupo && (
                <FormHelperText sx={{ color: 'error.main' }} id='validation-schema-grupo'>
                  {errors.grupo.message}
                </FormHelperText>
              )}
            </FormControl>
          </Grid>

          <Grid item xs={12}>
            <TitleSectionForm
              text={grupoWatch === GrupoImpuestosEnum.IMPUESTOS ? 'Impuesto' : 'Percepción'}
            />
          </Grid>

          {/** descripcion */}
          <Grid item xs={12} sm={5}>
            <FormControl fullWidth>
              <Controller
                name='descripcion'
                control={control}
                rules={{ required: true }}
                render={({ field: { value, onChange } }) => (
                  <TextField
                    value={value}
                    label='Nombre *'
                    onChange={onChange}
                    type='text'
                    placeholder='Escriba nombre'
                    aria-describedby='stepper-linear-account-nombre'
                    disabled={loading}
                  />
                )}
              />
              {errors.descripcion && (
                <FormHelperText sx={{ color: 'error.main' }} id='validation-schema-descripcion'>
                  {errors.descripcion.message}
                </FormHelperText>
              )}
            </FormControl>
          </Grid>

          {/** alicuota */}
          <Grid item xs={12} sm={2}>
            <FormControl fullWidth>
              <Controller
                name='alicuota'
                control={control}
                render={({ field: { value, onChange } }) => (
                  <TextField
                    label='Alícuota'
                    placeholder='Ingresa la alícuota'
                    error={Boolean(errors.alicuota)}
                    type='number'
                    value={value}
                    onChange={onChange}
                    aria-describedby='validation-schema-first-name'
                    disabled={loading}
                  />
                )}
              />
              {errors.alicuota && (
                <FormHelperText sx={{ color: 'error.main' }} id='validation-schema-idioma_factura'>
                  {errors.alicuota.message}
                </FormHelperText>
              )}
            </FormControl>
          </Grid>

          {/** cuenta contable */}
          <Grid item xs={12} sm={5}>
            <LayoutInputButton
              sm={12}
              disabled={handleHabilitarCuentaInput()}
              isError={Boolean(errors.cuenta)}
              listSelected={cuentas}
              handleRemoveItem={item => handleQuitarCuenta(item)}
              loading={loading}
              handleAddItem={() => handleAgregarCuenta(getValues().cuenta!)}
              input={
                <FormControl fullWidth>
                  <Controller
                    name='cuenta'
                    control={control}
                    rules={{ required: true }}
                    render={({ field: { value, onChange } }) => (
                      <TextField
                        value={value}
                        label='Número cuenta *'
                        onChange={onChange}
                        type='number'
                        placeholder='Ingresar número cuenta'
                        aria-describedby='stepper-linear-cuenta'
                        disabled={handleHabilitarCuentaInput()}
                      />
                    )}
                  />
                  {errors.cuenta && (
                    <FormHelperText sx={{ color: 'error.main' }} id='validation-schema-cuenta'>
                      {errors.cuenta.message}
                    </FormHelperText>
                  )}
                  {data?.numero_cuenta &&
                    data?.numero_cuenta.length > 0 &&
                    accion === AccionesEnum.EDITAR_IMPUESTO &&
                    estado.showHelperText &&
                    cuentas.length === 0 && (
                      <FormHelperText
                        id='validation-schema-cuenta'
                        sx={{ color: 'error.main', cursor: 'pointer' }}
                        onClick={handleMostrarCuentas}
                      >
                        Pulse aquí para mostrar los números de cuentas
                      </FormHelperText>
                    )}
                  {estado.showHelperTextNumeroCuenta && (
                    <FormHelperText id='validation-schema-cuenta' sx={{ color: 'error.main' }}>
                      Debe agregar al menos un número de cuenta
                    </FormHelperText>
                  )}
                </FormControl>
              }
            />
          </Grid>

          <Grid item xs={12}>
            <TitleSectionForm text='Moneda' />
          </Grid>

          {/* moneda */}
          <Grid item xs={12}>
            <FormControl>
              <FormGroup row>
                <FormControlLabel
                  control={
                    <Checkbox
                      color='primary'
                      name={MonedaEnum.USD}
                      checked={estado.usd}
                      onChange={handleChange}
                      inputProps={{ 'aria-label': 'controlled' }}
                    />
                  }
                  label={MonedaEnum.USD}
                />
                <FormControlLabel
                  control={
                    <Checkbox
                      color='primary'
                      name={MonedaEnum.ARS}
                      checked={estado.ars}
                      onChange={handleChange}
                      inputProps={{ 'aria-label': 'controlled' }}
                    />
                  }
                  label={MonedaEnum.ARS}
                />
              </FormGroup>
            </FormControl>
          </Grid>

          {/** botón de acción */}
          <Grid item xs={12}>
            <ButtonsActionsForm
              rigthTextButton='Guardar'
              rigthColorButton='primary'
              loading={loading}
              disabled={loading}
              disabledRigthButton={handleHabilitarSubmitBoton()}
              leftTextButton='Cancelar'
              handleBack={handleGoBack}
              onClick={handleValidacion}
            />
          </Grid>
        </Grid>
      </form>
    </FormLayout>
  )
}

ImpuestoFormComponent.ImpuestoFormComponentPropsIS = ImpuestoFormComponentPropsIS

export default memo(ImpuestoFormComponent)
