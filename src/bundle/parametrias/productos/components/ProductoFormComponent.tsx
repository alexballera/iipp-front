//** Base Imports */
import { useRouter } from 'next/router'
import { memo } from 'react'

//** MUI Imports */
import { FormControl, FormHelperText, Grid, TextField } from '@mui/material'

//** Store, Enums, Utils Imports */
import { EMAIL_VALID, MIN_TRES_CARACTERES, ONLY_NUMBERS, REQUIRED_FIELD } from 'src/@core/constants'
import { AccionesEnum } from 'src/@core/enums'
import useMount from 'src/@core/hooks/useMount'
import { removeSlashesAndScores } from 'src/@core/utils'
import {
  CrearProductoDTO,
  ProductoFormComponentProps,
  ProductoFormComponentPropsIS,
  ProductoIS
} from '../domain/productosModel'

// ** Third Party Imports
import { yupResolver } from '@hookform/resolvers/yup'
import { Controller, useForm } from 'react-hook-form'
import * as yup from 'yup'

//** Custom Components Imports */
import ButtonsActionsForm from 'src/@core/components/ButtonsActionsForm'
import TitleSectionForm from 'src/@core/components/TitleSectionForm'
import FormLayout from 'src/@core/layouts/FormLayout'

const schema = yup.object().shape({
  cuenta_contable: yup
    .number()
    .required(REQUIRED_FIELD)
    .positive(ONLY_NUMBERS)
    .integer(ONLY_NUMBERS)
    .typeError(ONLY_NUMBERS),
  responsable_comercial: yup.object().shape({
    nombre: yup.string().required(REQUIRED_FIELD).min(3, MIN_TRES_CARACTERES),
    email: yup.string().email(EMAIL_VALID).required(REQUIRED_FIELD),
    telefono: yup
      .number()
      .required(REQUIRED_FIELD)
      .positive(ONLY_NUMBERS)
      .integer(ONLY_NUMBERS)
      .typeError(ONLY_NUMBERS)
  })
})

function ProductoFormComponent(props: ProductoFormComponentProps) {
  const { accion, data, handleEditar, loading } = props

  //** Hooks */
  const router = useRouter()
  const {
    control,
    handleSubmit,
    formState: { errors },
    reset
  } = useForm({
    defaultValues: ProductoIS,
    mode: 'onChange',
    resolver: yupResolver(schema)
  })

  useMount(() => {
    if (accion === AccionesEnum.EDITAR_PRODUCTO) {
      reset(data)
    }
  })

  const handleGoBack = () => {
    reset(ProductoIS)
    router.back()
  }

  const onSubmit = (dataForm: CrearProductoDTO) => {
    if (accion === AccionesEnum.EDITAR_PRODUCTO) {
      handleEditar && handleEditar(dataForm)

      return
    }

    return
  }

  return (
    <>
      <FormLayout title={removeSlashesAndScores(accion || '')}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Grid container spacing={5}>
            <Grid item xs={12}>
              <TitleSectionForm text='Producto' />
            </Grid>
            {/** nombre */}
            <Grid item xs={12} sm={6}>
              <FormControl fullWidth>
                <Controller
                  name='nombre'
                  control={control}
                  rules={{ required: true }}
                  render={({ field: { value, onChange } }) => (
                    <TextField
                      label='Nombre producto *'
                      placeholder='Ingresa nombre producto'
                      error={Boolean(errors.nombre)}
                      value={value}
                      onChange={onChange}
                      aria-describedby='validation-schema-first-name'
                      disabled={true}
                    />
                  )}
                />
              </FormControl>
            </Grid>

            {/** cuenta_contable */}
            <Grid item xs={12} sm={6}>
              <FormControl fullWidth>
                <Controller
                  name='cuenta_contable'
                  control={control}
                  rules={{ required: true }}
                  render={({ field: { value, onChange } }) => (
                    <TextField
                      label='Cuenta contable *'
                      placeholder='Ingresa cuenta contable'
                      error={Boolean(errors.cuenta_contable)}
                      value={value}
                      onChange={onChange}
                      aria-describedby='validation-schema-first-name'
                      disabled={loading}
                      type='number'
                    />
                  )}
                />
                {errors.cuenta_contable && (
                  <FormHelperText sx={{ color: 'error.main' }} id='validation-schema-first-name'>
                    {errors.cuenta_contable.message}
                  </FormHelperText>
                )}
              </FormControl>
            </Grid>

            <Grid item xs={12}>
              <TitleSectionForm text='Responsable comercial' />
            </Grid>

            {/** responsable_comercial.nombre */}
            <Grid item xs={12} sm={6}>
              <FormControl fullWidth>
                <Controller
                  name='responsable_comercial.nombre'
                  control={control}
                  rules={{ required: true }}
                  render={({ field: { value, onChange } }) => (
                    <TextField
                      label='Nombre responsable *'
                      placeholder='Ingresa nombre responsable'
                      error={Boolean(errors.responsable_comercial?.nombre)}
                      value={value}
                      onChange={onChange}
                      aria-describedby='validation-schema-first-name'
                      disabled={loading}
                    />
                  )}
                />
                {errors.responsable_comercial?.nombre && (
                  <FormHelperText sx={{ color: 'error.main' }} id='validation-schema-first-name'>
                    {errors.responsable_comercial.nombre.message}
                  </FormHelperText>
                )}
              </FormControl>
            </Grid>

            {/** responsable_comercial.email */}
            <Grid item xs={12} sm={6}>
              <FormControl fullWidth>
                <Controller
                  name='responsable_comercial.email'
                  control={control}
                  rules={{ required: true }}
                  render={({ field: { value, onChange } }) => (
                    <TextField
                      label='Email responsable *'
                      placeholder='Ingresa email responsable'
                      error={Boolean(errors.responsable_comercial?.email)}
                      value={value}
                      onChange={onChange}
                      aria-describedby='validation-schema-first-name'
                      disabled={loading}
                      type='email'
                    />
                  )}
                />
                {errors.responsable_comercial?.email && (
                  <FormHelperText sx={{ color: 'error.main' }} id='validation-schema-first-name'>
                    {errors.responsable_comercial.email.message}
                  </FormHelperText>
                )}
              </FormControl>
            </Grid>

            {/** responsable_comercial.telefono */}
            <Grid item xs={12} sm={6}>
              <FormControl fullWidth>
                <Controller
                  name='responsable_comercial.telefono'
                  control={control}
                  rules={{ required: true }}
                  render={({ field: { value, onChange } }) => (
                    <TextField
                      label='Teléfono responsable *'
                      placeholder='Ingresa teléfono responsable'
                      error={Boolean(errors.responsable_comercial?.telefono)}
                      value={value}
                      onChange={onChange}
                      aria-describedby='validation-schema-first-name'
                      disabled={loading}
                      type='number'
                    />
                  )}
                />
                {errors.responsable_comercial?.telefono && (
                  <FormHelperText sx={{ color: 'error.main' }} id='validation-schema-first-name'>
                    {errors.responsable_comercial.telefono.message}
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

ProductoFormComponent.ProductoFormComponentPropsIS = ProductoFormComponentPropsIS

export default memo(ProductoFormComponent)
