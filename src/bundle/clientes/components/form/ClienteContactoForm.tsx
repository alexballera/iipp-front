// ** MUI Imports
import { FormControl, FormHelperText, Grid, TextField } from '@mui/material'
import { Dispatch, SetStateAction, useEffect, useState } from 'react'

// ** Third Party Imports
import { Controller } from 'react-hook-form'

//** Customs Components Imports */
import LayoutInputButton from 'src/@core/components/LayoutInputButton'
import TitleSectionForm from 'src/@core/components/TitleSectionForm'
import useList from 'src/@core/hooks/useList'
import { showApiErrorMessage } from 'src/@core/utils'

type Props = {
  disabled: boolean
  isError: boolean
  loading: boolean
  loadingInput: boolean
  control: any
  errors: any
  reset: any
  getValues: any
  setError: any
  setCorreos: Dispatch<SetStateAction<string[]>>
  correos: string[]
}

function ClienteContactoForm(props: Props) {
  const {
    correos,
    setCorreos,
    disabled,
    isError,
    loading,
    control,
    loadingInput,
    errors,
    reset,
    getValues,
    setError
  } = props
  const [showHelperText, setShowHelperText] = useState(true)

  const { isItem, addItem, list, deleteItem } = useList()

  useEffect(() => {
    setCorreos(list)
  }, [list, addItem, setCorreos])

  useEffect(() => {
    if (Object.keys(errors).length > 0)
      showApiErrorMessage('Revise los errores en los campos del formulario')
  }, [errors])

  const handleAgregarCorreo = (correo: string) => {
    if (!correo || correo === '') {
      setError('email', {
        type: 'manual',
        message: 'Debes llenar el campo'
      })

      return
    }

    if (isItem(correo)) return showApiErrorMessage('El correo ya existe')

    addItem(correo)

    reset({ ...getValues(), email: '' })
  }

  const handleQuitarCorreo = (correo: string) => deleteItem(correo)

  const handleMostrarCorreos = () => {
    correos.forEach(correo => addItem(correo))
    setShowHelperText(false)
  }

  return (
    <Grid container spacing={5}>
      <Grid item xs={12} sx={{ mt: '20px' }}>
        <TitleSectionForm text='Contacto' />
      </Grid>

      {/** nombre_referente */}
      <Grid item xs={12} sm={6}>
        <FormControl fullWidth>
          <Controller
            name='nombre_referente'
            control={control}
            rules={{ required: true }}
            render={({ field: { value, onChange } }) => (
              <TextField
                value={value}
                label='Nombre Referente *'
                onChange={onChange}
                type='text'
                placeholder='Escriba nombre referente completo'
                aria-describedby='stepper-linear-account-email'
                disabled={loadingInput}
              />
            )}
          />
          {errors.nombre_referente && (
            <FormHelperText sx={{ color: 'error.main' }} id='validation-schema-nombre_referente'>
              {errors.nombre_referente.message}
            </FormHelperText>
          )}
        </FormControl>
      </Grid>

      {/** telefono */}
      <Grid item xs={12} sm={6}>
        <FormControl fullWidth>
          <Controller
            name='telefono'
            control={control}
            render={({ field: { value, onChange } }) => (
              <TextField
                value={value}
                label='Teléfono'
                onChange={onChange}
                type='text'
                aria-describedby='stepper-linear-social-calle'
                placeholder='Escriba número de teléfono'
              />
            )}
          />
          {errors.telefono && (
            <FormHelperText sx={{ color: 'error.main' }} id='validation-schema-telefono'>
              {errors.telefono.message}
            </FormHelperText>
          )}
        </FormControl>
      </Grid>

      {/** email */}
      <LayoutInputButton
        disabled={disabled}
        isError={isError}
        listSelected={list}
        handleRemoveItem={item => handleQuitarCorreo(item)}
        loading={loading}
        handleAddItem={() => handleAgregarCorreo(getValues().email!)}
        input={
          <FormControl fullWidth>
            <Controller
              name='email'
              control={control}
              render={({ field: { value, onChange } }) => (
                <TextField
                  value={value}
                  label='Correo *'
                  onChange={onChange}
                  type='email'
                  placeholder='Ingresar correo'
                  aria-describedby='stepper-linear-account-razon_social_reducida'
                />
              )}
            />
            {errors.email && list.length === 0 && (
              <FormHelperText sx={{ color: 'error.main' }} id='validation-schema-email'>
                {errors.email.message}
              </FormHelperText>
            )}
            {showHelperText && correos.length > 0 && (
              <FormHelperText
                id='validation-schema-cuenta'
                sx={{ color: 'error.main', cursor: 'pointer' }}
                onClick={handleMostrarCorreos}
              >
                Pulse aquí para mostrar los correos
              </FormHelperText>
            )}
          </FormControl>
        }
      />
    </Grid>
  )
}

export default ClienteContactoForm
