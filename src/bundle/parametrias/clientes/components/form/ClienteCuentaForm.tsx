// ** MUI Imports
import { Box, FormControl, FormHelperText, Grid, InputAdornment, TextField } from '@mui/material'
import { Dispatch, SetStateAction } from 'react'

// ** Third Party Imports
import { Controller } from 'react-hook-form'

//** Customs Components Imports */
import LayoutInputButton from 'src/@core/components/LayoutInputButton'
import Loader from 'src/@core/components/Loader'
import TitleSectionForm from 'src/@core/components/TitleSectionForm'

type Props = {
  disabled: boolean
  isError: boolean
  listSelected: string[]
  loading: boolean
  loadingInput: boolean
  isValidDocumento: boolean
  control: any
  onBlur: () => void
  errors: any
  setDocumento: Dispatch<SetStateAction<string>>
  documentos: string[]
  setDocumentos: Dispatch<SetStateAction<string[]>>
}

function ClienteCuentaForm(props: Props) {
  const {
    isValidDocumento,
    disabled,
    isError,
    listSelected,
    loading,
    control,
    loadingInput,
    errors,
    onBlur,
    setDocumento,
    documentos,
    setDocumentos
  } = props

  const handleQuitarDocumento = (doc: string) => {
    const documentosFiltrados = documentos.filter(c => c !== doc)
    setDocumentos(documentosFiltrados)
  }

  return (
    <Grid container spacing={5}>
      <Grid item xs={12}>
        <TitleSectionForm text='Cuenta' />
      </Grid>

      {/** numero_documento */}
      <LayoutInputButton
        disabled={disabled}
        isError={isError}
        listSelected={listSelected}
        handleRemoveItem={item => handleQuitarDocumento(item)}
        loading={loading}
        input={
          <FormControl fullWidth>
            <Controller
              name='documento'
              control={control}
              render={({ field }) => {
                setDocumento(field.value || '')

                return (
                  <TextField
                    {...field}
                    label='Número documento, CUIL, CUIT, Pasaporte'
                    placeholder='Ingrese el número de documento, CUIL, CUIT, Pasaporte'
                    aria-describedby='validation-schema-first-name'
                    onBlur={onBlur}
                    error={Boolean(errors.documento)}
                    InputProps={{
                      endAdornment: (
                        <InputAdornment position='end'>
                          {loadingInput && (
                            <Box sx={{ width: '58px' }}>
                              <Loader height='20px' size={20} />
                            </Box>
                          )}
                        </InputAdornment>
                      )
                    }}
                  />
                )
              }}
            />

            {errors.numero_documento && (
              <FormHelperText sx={{ color: 'error.main' }} id='validation-schema-documento'>
                {errors.numero_documento?.message}
              </FormHelperText>
            )}
            {isValidDocumento && (
              <FormHelperText sx={{ color: 'success.main' }} id='validation-schema-documento'>
                El documento es valido
              </FormHelperText>
            )}
          </FormControl>
        }
      />

      {/** nombre */}
      <Grid item xs={12} sm={6}>
        <FormControl fullWidth>
          <Controller
            name='nombre'
            control={control}
            rules={{ required: true }}
            render={({ field: { value, onChange } }) => (
              <TextField
                value={value}
                label='Nombre Cliente *'
                onChange={onChange}
                type='text'
                placeholder='Escriba nombre cliente completo'
                aria-describedby='stepper-linear-account-email'
                disabled={loadingInput}
              />
            )}
          />
          {errors.nombre && (
            <FormHelperText sx={{ color: 'error.main' }} id='validation-schema-nombre'>
              {errors.nombre.message}
            </FormHelperText>
          )}
        </FormControl>
      </Grid>

      {/** cuenta_caja_valores */}
      <Grid item xs={12} sm={6}>
        <FormControl fullWidth>
          <Controller
            name='cuenta.caja_valores'
            control={control}
            render={({ field: { value, onChange } }) => (
              <TextField
                value={value}
                label='Cuenta Caja Valores'
                onChange={onChange}
                type='text'
                placeholder='Escriba Numero Cuenta Comitente'
                aria-describedby='stepper-linear-account-actividad'
                disabled={loadingInput}
              />
            )}
          />
        </FormControl>
      </Grid>

      {/** cuenta_custodia_bony */}
      <Grid item xs={12} sm={6}>
        <FormControl fullWidth>
          <Controller
            name='cuenta.custodia_bony'
            control={control}
            render={({ field: { value, onChange } }) => (
              <TextField
                value={value}
                label='Cuenta Custodia BONY'
                onChange={onChange}
                type='text'
                placeholder='Escriba Numero Cuenta Comitente'
                aria-describedby='stepper-linear-account-actividad'
                disabled={loadingInput}
              />
            )}
          />
        </FormControl>
      </Grid>
    </Grid>
  )
}

export default ClienteCuentaForm
