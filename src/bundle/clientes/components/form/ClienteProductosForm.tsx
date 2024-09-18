// ** MUI Imports
import {
  Checkbox,
  Collapse,
  FormControl,
  FormControlLabel,
  FormGroup,
  FormHelperText,
  Grid,
  TextField
} from '@mui/material'
import { ChangeEvent } from 'react'
import { Controller } from 'react-hook-form'

// ** Third Party Imports

//** Customs Components Imports */
import TitleSectionForm from 'src/@core/components/TitleSectionForm'

type Props = {
  fideicomisos: boolean
  cedears: boolean
  custodia: boolean
  fondos: boolean
  loadingInput: boolean
  errors: any
  control: any
  handleChange: (event: ChangeEvent<HTMLInputElement>) => void
}

function ClienteProductosForm(props: Props) {
  const { fideicomisos, cedears, custodia, fondos, handleChange, errors, loadingInput, control } =
    props
  const checkboxItems = [
    {
      name: 'fideicomisos',
      checked: fideicomisos,
      onChange: handleChange,
      label: 'FIDEICOMISOS'
    },
    {
      name: 'cedears',
      checked: cedears,
      onChange: handleChange,
      label: 'CEDEARS'
    },
    {
      name: 'custodia',
      checked: custodia,
      onChange: handleChange,
      label: 'CUSTODIA'
    },
    {
      name: 'fondos',
      checked: fondos,
      onChange: handleChange,
      label: 'FONDOS'
    }
  ]

  return (
    <Grid container spacing={5}>
      <Grid item xs={12} sx={{ mt: '20px' }}>
        <TitleSectionForm text='Productos' />
      </Grid>

      {/* productos */}
      <Grid item xs={12}>
        <FormControl>
          <FormGroup row>
            {checkboxItems.map(item => (
              <FormControlLabel
                key={item.name}
                control={
                  <Checkbox
                    color='primary'
                    name={item.name}
                    checked={item.checked}
                    onChange={item.onChange}
                    inputProps={{ 'aria-label': 'controlled' }}
                  />
                }
                label={item.label}
              />
            ))}
          </FormGroup>
        </FormControl>
      </Grid>

      {/** minimo */}
      <Collapse
        in={custodia}
        sx={{
          width: '100% !important',
          paddingLeft: '1.25rem',
          '& .MuiCollapse-wrapperInner': { width: '100% !important' }
        }}
      >
        <Grid container item xs={12} sm={4}>
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
                  disabled={loadingInput}
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
      </Collapse>
    </Grid>
  )
}

export default ClienteProductosForm
