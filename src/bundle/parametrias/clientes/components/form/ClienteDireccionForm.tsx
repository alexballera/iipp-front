// ** MUI Imports
import {
  Box,
  FormControl,
  FormHelperText,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  TextField
} from '@mui/material'
import { Dispatch, SetStateAction } from 'react'

// ** Third Party Imports
import { Controller } from 'react-hook-form'

//** Customs Components Imports */
import TitleSectionForm from 'src/@core/components/TitleSectionForm'
import { COUNTRIES } from 'src/@core/constants'
import { DireccionDTO } from 'src/bundle/shared/domain'

export const getProvinces = (country: string) => {
  const c = COUNTRIES.find(c => c.label === country)
  if (!c || !c.provinces) return null
  if (country !== 'Argentina') return null

  return c.provinces
}

export const getLocalidades = (country: string, province: string) => {
  const p = getProvinces(country)?.find((p: any) => p.nombre === province)
  if (!p) return null

  return p.localidades
}

type Props = {
  disabledLocalidad: boolean
  handleCambioPais: () => void
  loadingInput: boolean
  control: any
  errors: any
  direccion: DireccionDTO
  codigoPostal: string
  setCodigoPostal: Dispatch<SetStateAction<string>>
}

function ClienteDireccionForm(props: Props) {
  const {
    disabledLocalidad,
    handleCambioPais,
    loadingInput,
    control,
    errors,
    direccion,
    codigoPostal,
    setCodigoPostal
  } = props

  const getCodigoPostal = (country: string, province: string, localidad: string) => {
    const l = getLocalidades(country, province)?.find((p: any) => p.nombre === localidad)
    if (!l) return null
    if (l.codigo_postal) setCodigoPostal(l.codigo_postal)

    return l.codigo_postal
  }

  return (
    <Grid container spacing={5}>
      <Grid item xs={12} sx={{ mt: '20px' }}>
        <TitleSectionForm text='Domicilio' />
      </Grid>

      {/** pais */}
      <Grid item xs={12} sm={6}>
        <FormControl fullWidth>
          <InputLabel
            id='stepper-linear-personal-pais'
            error={Boolean(errors.direccion?.pais)}
            htmlFor='stepper-linear-personal-pais'
          >
            País *
          </InputLabel>
          <Controller
            name='direccion.pais'
            control={control}
            rules={{ required: true }}
            render={({ field: { value, onChange } }) => {
              return (
                <Select
                  value={value}
                  error={Boolean(errors.direccion?.pais)}
                  label='País *'
                  id='controlled-select'
                  onChange={onChange}
                  onClick={handleCambioPais}
                  labelId='controlled-select-label'
                >
                  {COUNTRIES.map(country => (
                    <MenuItem key={country.code} value={country.label}>
                      <Box sx={{ '& > img': { mr: 4, flexShrink: 0 } }}>
                        <img
                          alt=''
                          width='20'
                          loading='lazy'
                          src={`https://flagcdn.com/w20/${country.code.toLowerCase()}.png`}
                          srcSet={`https://flagcdn.com/w40/${country.code.toLowerCase()}.png 2x`}
                        />
                        {country.label} ({country.code}) +{country.phone}
                      </Box>
                    </MenuItem>
                  ))}
                </Select>
              )
            }}
          />
          {errors.direccion?.pais && (
            <FormHelperText sx={{ color: 'error.main' }} id='stepper-linear-personal-pais-helper'>
              {errors.direccion?.pais.message}
            </FormHelperText>
          )}
        </FormControl>
      </Grid>

      {/** provincia */}
      <Grid item xs={12} sm={6}>
        <FormControl fullWidth>
          <Controller
            name='direccion.provincia'
            control={control}
            rules={{ required: true }}
            render={({ field: { value, onChange } }) => {
              const provinces = getProvinces(direccion?.pais as string)

              return provinces ? (
                <>
                  <InputLabel
                    id='stepper-linear-personal-provincia'
                    error={Boolean(errors.direccion?.provincia)}
                    htmlFor='stepper-linear-personal-provincia'
                  >
                    Provincia *
                  </InputLabel>
                  <Select
                    value={value}
                    error={Boolean(errors.direccion?.provincia)}
                    label='Provincia *'
                    id='controlled-select'
                    onChange={onChange}
                    labelId='controlled-select-label'
                  >
                    {provinces.map((p: any) => (
                      <MenuItem key={p.codigo} value={p.nombre}>
                        <Box sx={{ '& > img': { mr: 4, flexShrink: 0 } }}>{p.nombre}</Box>
                      </MenuItem>
                    ))}
                  </Select>
                </>
              ) : (
                <TextField
                  value={value}
                  label='Provincia *'
                  onChange={onChange}
                  type='text'
                  placeholder='Ingresa provincia'
                  error={Boolean(errors.direccion?.provincia)}
                  aria-describedby='stepper-linear-account-razon_social_reducida'
                  disabled={loadingInput}
                />
              )
            }}
          />
          {errors.direccion?.provincia && (
            <FormHelperText sx={{ color: 'error.main' }} id='stepper-linear-account-provincia'>
              {errors.direccion?.provincia.message}
            </FormHelperText>
          )}
        </FormControl>
      </Grid>

      {/** localidad */}
      <Grid item xs={12} sm={6}>
        <FormControl fullWidth>
          <Controller
            name='direccion.localidad'
            control={control}
            rules={{ required: true }}
            render={({ field: { value, onChange } }) => {
              const localidades = getLocalidades(
                direccion?.pais as string,
                direccion?.provincia as string
              )

              return localidades ? (
                <>
                  <InputLabel
                    id='stepper-linear-personal-provincia'
                    error={Boolean(errors.direccion?.provincia)}
                    htmlFor='stepper-linear-personal-provincia'
                  >
                    Localidad *
                  </InputLabel>
                  <Select
                    value={value}
                    error={Boolean(errors.direccion?.pais)}
                    label='Localidad *'
                    id='controlled-select'
                    onChange={onChange}
                    labelId='controlled-select-label'
                    disabled={direccion?.provincia === ''}
                  >
                    {localidades.map((l: any) => (
                      <MenuItem key={l.nombre} value={l.nombre}>
                        <Box sx={{ '& > img': { mr: 4, flexShrink: 0 } }}>{l.nombre}</Box>
                      </MenuItem>
                    ))}
                  </Select>
                </>
              ) : (
                <TextField
                  value={value}
                  label='Localidad *'
                  onChange={onChange}
                  type='text'
                  placeholder='Ingresa localidad'
                  error={Boolean(errors.direccion?.localidad)}
                  aria-describedby='stepper-linear-account-razon_social_reducida'
                  disabled={direccion?.provincia === '' || loadingInput}
                />
              )
            }}
          />
          {errors.direccion?.localidad && (
            <FormHelperText sx={{ color: 'error.main' }} id='stepper-linear-account-localidad'>
              {errors.direccion?.localidad.message}
            </FormHelperText>
          )}
        </FormControl>
      </Grid>

      {/** codigo_postal */}
      <Grid item xs={12} sm={6}>
        <FormControl fullWidth>
          <Controller
            name='direccion.codigo_postal'
            control={control}
            render={({ field: { value, onChange } }) => {
              const cp = getCodigoPostal(
                direccion?.pais as string,
                direccion?.provincia as string,
                direccion?.localidad as string
              )

              value && setCodigoPostal(value)

              return (
                <TextField
                  value={cp || codigoPostal}
                  label='Código postal *'
                  onChange={onChange}
                  type='text'
                  placeholder='Ingresa código postal'
                  error={Boolean(errors.direccion?.codigo_postal)}
                  aria-describedby='stepper-linear-account-codigo_postal'
                  disabled={disabledLocalidad}
                />
              )
            }}
          />
          {errors.direccion?.codigo_postal && (
            <FormHelperText sx={{ color: 'error.main' }} id='stepper-linear-account-codigo_postal'>
              {errors.direccion?.codigo_postal.message}
            </FormHelperText>
          )}
        </FormControl>
      </Grid>

      {/** direccion.calle */}
      <Grid item xs={12} sm={6}>
        <FormControl fullWidth>
          <Controller
            name='direccion.calle'
            control={control}
            rules={{ required: true }}
            render={({ field: { value, onChange } }) => (
              <TextField
                value={value}
                label='Calle *'
                onChange={onChange}
                type='text'
                placeholder='Escriba calle'
                aria-describedby='stepper-linear-social-twitter'
                disabled={loadingInput}
              />
            )}
          />
          {errors.direccion?.calle && (
            <FormHelperText sx={{ color: 'error.main' }} id='validation-schema-direccion.calle'>
              {errors.direccion?.calle.message}
            </FormHelperText>
          )}
        </FormControl>
      </Grid>

      {/** direccion.numero */}
      <Grid item xs={12} sm={6}>
        <FormControl fullWidth>
          <Controller
            name='direccion.numero'
            control={control}
            rules={{ required: true }}
            render={({ field: { value, onChange } }) => (
              <TextField
                value={value}
                label='Número'
                onChange={onChange}
                type='text'
                placeholder='Escriba número'
                aria-describedby='stepper-linear-social-twitter'
                disabled={loadingInput}
              />
            )}
          />
          {errors.direccion?.numero && (
            <FormHelperText sx={{ color: 'error.main' }} id='validation-schema-direccion.numero'>
              {errors.direccion?.numero.message}
            </FormHelperText>
          )}
        </FormControl>
      </Grid>

      {/** direccion.piso */}
      <Grid item xs={12} sm={6}>
        <FormControl fullWidth>
          <Controller
            name='direccion.piso'
            control={control}
            rules={{ required: true }}
            render={({ field: { value, onChange } }) => (
              <TextField
                value={value}
                label='Piso'
                onChange={onChange}
                type='text'
                placeholder='Escriba piso'
                aria-describedby='stepper-linear-social-piso'
                disabled={loadingInput}
              />
            )}
          />
          {errors.direccion?.piso && (
            <FormHelperText sx={{ color: 'error.main' }} id='validation-schema-direccion.piso'>
              {errors.direccion?.piso.message}
            </FormHelperText>
          )}
        </FormControl>
      </Grid>

      {/** direccion.departamento */}
      <Grid item xs={12} sm={6}>
        <FormControl fullWidth>
          <Controller
            name='direccion.departamento'
            control={control}
            rules={{ required: true }}
            render={({ field: { value, onChange } }) => (
              <TextField
                value={value}
                label='Departamento'
                onChange={onChange}
                type='text'
                aria-describedby='stepper-linear-social-calle'
                placeholder='Escriba departamento'
                disabled={loadingInput}
              />
            )}
          />
          {errors.direccion?.departamento && (
            <FormHelperText
              sx={{ color: 'error.main' }}
              id='validation-schema-direccion.departamento'
            >
              {errors.direccion?.departamento.message}
            </FormHelperText>
          )}
        </FormControl>
      </Grid>

      {/** direccion.oficina */}
      <Grid item xs={12} sm={6}>
        <FormControl fullWidth>
          <Controller
            name='direccion.oficina'
            control={control}
            rules={{ required: true }}
            render={({ field: { value, onChange } }) => (
              <TextField
                value={value}
                label='Oficina'
                onChange={onChange}
                type='text'
                placeholder='Escriba oficina'
                aria-describedby='stepper-linear-social-linkedIn'
                disabled={loadingInput}
              />
            )}
          />
          {errors.direccion?.oficina && (
            <FormHelperText sx={{ color: 'error.main' }} id='validation-schema-direccion.oficina'>
              {errors.direccion?.oficina.message}
            </FormHelperText>
          )}
        </FormControl>
      </Grid>
    </Grid>
  )
}

export default ClienteDireccionForm
