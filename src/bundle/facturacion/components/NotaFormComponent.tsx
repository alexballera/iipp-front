//** Base Imports */
import { Dispatch, SetStateAction, memo } from 'react'

//** MUI Imports */
import { FormControl, FormHelperText, Grid } from '@mui/material'

//** Third Party Imports
import { yupResolver } from '@hookform/resolvers/yup'
import { Controller, useForm } from 'react-hook-form'
import * as yup from 'yup'

//** Date Pickers Imports */
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFnsV3'
import { DatePicker } from '@mui/x-date-pickers/DatePicker'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider'
import es from 'date-fns/locale/es'

//** Custom Components Imports */
import ButtonsActionsForm from 'src/@core/components/ButtonsActionsForm'
import { REQUIRED_FIELD } from 'src/@core/constants'
import { RehacerNotaDTO } from '../domain'

const schema = yup.object().shape({
  fecha: yup.date().required(REQUIRED_FIELD)
})

const defaultValues = {
  fecha: new Date()
}

interface Props {
  handleRehacer: (d: RehacerNotaDTO) => void
  loading: boolean
  setOpenModalForm: Dispatch<SetStateAction<boolean>>
}

function NotaFormComponent(props: Props) {
  const { handleRehacer, loading, setOpenModalForm } = props

  const {
    control,
    handleSubmit,
    formState: { errors }
  } = useForm({
    defaultValues,
    mode: 'onChange',
    resolver: yupResolver(schema)
  })

  return (
    <form onSubmit={handleSubmit(handleRehacer)}>
      <Grid container spacing={5}>
        {/** fecha */}
        <Grid sx={{ mt: 8 }} item xs={12} container>
          <FormControl fullWidth sx={{ mt: 2 }}>
            <Controller
              name='fecha'
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
            {errors.fecha && (
              <FormHelperText sx={{ color: 'error.main' }} id='stepper-linear-account-email'>
                {errors.fecha.message}
              </FormHelperText>
            )}
          </FormControl>
        </Grid>

        {/** botón de acción */}
        <Grid item xs={12}>
          <ButtonsActionsForm
            rigthTextButton='Confirmar'
            rigthColorButton='primary'
            loading={loading}
            disabled={loading}
            leftTextButton='Cancelar'
            handleBack={() => setOpenModalForm(false)}
          />
        </Grid>
      </Grid>
    </form>
  )
}
export default memo(NotaFormComponent)
