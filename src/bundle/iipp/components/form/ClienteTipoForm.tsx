//** React Imports
import { ChangeEvent } from 'react'

// ** MUI Imports
import {
  FormControl,
  FormControlLabel,
  FormGroup,
  FormHelperText,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  Switch
} from '@mui/material'

// ** Third Party Imports
import { Controller } from 'react-hook-form'
import { TipoClienteEnum } from '../../domain/iippModel'

//** Customs Components Imports */
import TitleSectionForm from 'src/@core/components/TitleSectionForm'
import { IdiomaEnum, MonedaEnum } from 'src/bundle/shared/domain'

type Props = {
  handleChangeIsClienteBanco: (event: ChangeEvent<HTMLInputElement>) => void
  control: any
  errors: any
  isClienteBanco: boolean
}

function ClienteTipoForm(props: Props) {
  const { handleChangeIsClienteBanco, control, errors, isClienteBanco } = props

  return (
    <Grid container spacing={5}>
      <Grid item xs={12} sx={{ mt: '20px' }}>
        <TitleSectionForm text='Tipo Cliente' />
      </Grid>

      {/** tipo_cliente */}
      <Grid item xs={12} sm={6}>
        <FormControl fullWidth>
          <InputLabel id='tipo_cliente' error={Boolean(errors.tipo_cliente)} htmlFor='tipo_cliente'>
            Tipo cliente *
          </InputLabel>
          <Controller
            name='tipo_cliente'
            control={control}
            rules={{ required: true }}
            render={({ field: { value, onChange } }) => (
              <Select
                value={value}
                label='Tipo cliente *'
                id='controlled-select'
                onChange={onChange}
                labelId='controlled-select-label'
              >
                {Object.values(TipoClienteEnum).map(value => (
                  <MenuItem key={value} value={value}>
                    {value}
                  </MenuItem>
                ))}
              </Select>
            )}
          />
          {errors.tipo_cliente && (
            <FormHelperText sx={{ color: 'error.main' }} id='validation-schema-tipo_cliente'>
              {errors.tipo_cliente.message}
            </FormHelperText>
          )}
        </FormControl>
      </Grid>

      {/** idioma_factura */}
      <Grid item xs={12} sm={6}>
        <FormControl fullWidth>
          <InputLabel
            id='stepper-linear-personal-pais'
            error={Boolean(errors.idioma_factura)}
            htmlFor='stepper-linear-personal-pais'
          >
            Idioma Factura *
          </InputLabel>
          <Controller
            name='idioma_factura'
            control={control}
            rules={{ required: true }}
            render={({ field: { value, onChange } }) => (
              <Select
                value={value}
                label='Idioma Factura *'
                id='controlled-select'
                onChange={onChange}
                labelId='controlled-select-label'
              >
                {Object.values(IdiomaEnum).map(value => (
                  <MenuItem key={value} value={value}>
                    {value}
                  </MenuItem>
                ))}
              </Select>
            )}
          />
          {errors.idioma_factura && (
            <FormHelperText sx={{ color: 'error.main' }} id='validation-schema-idioma_factura'>
              {errors.idioma_factura.message}
            </FormHelperText>
          )}
        </FormControl>
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

      {/** cliente_banco */}
      <Grid item xs={12}>
        <FormControl fullWidth component='fieldset' variant='standard'>
          <FormGroup row>
            <FormControlLabel
              sx={{ pl: 2 }}
              control={
                <Switch
                  disabled={true}
                  checked={isClienteBanco}
                  onChange={handleChangeIsClienteBanco}
                  inputProps={{ 'aria-label': 'controlled' }}
                  name='isClienteBanco'
                />
              }
              label='Cliente Banco'
            />
          </FormGroup>
        </FormControl>
      </Grid>
    </Grid>
  )
}

export default ClienteTipoForm
