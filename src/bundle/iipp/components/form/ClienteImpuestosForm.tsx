//** React Imports
import { ChangeEvent, Dispatch, SetStateAction } from 'react'

// ** MUI Imports
import {
  Box,
  Collapse,
  FormControl,
  FormControlLabel,
  FormHelperText,
  Grid,
  IconButton,
  InputLabel,
  ListItem,
  ListItemSecondaryAction,
  ListItemText,
  MenuItem,
  Select,
  Switch,
  TextField,
  Tooltip,
  Typography
} from '@mui/material'

// ** Third Party Imports
import { Controller } from 'react-hook-form'

//** Customs Components Imports */
import { AddCircle } from '@mui/icons-material'
import LoadingButton from '@mui/lab/LoadingButton'
import { CloseCircleOutline } from 'mdi-material-ui'
import DateRangeComponent, { DateRangeTypes } from 'src/@core/components/DateRangeComponent'
import TitleSectionForm from 'src/@core/components/TitleSectionForm'
import { formatDate } from 'src/@core/utils'
import { ImpuestoTypes, jurisdiccionesMock } from 'src/bundle/shared/domain'
import { StyledList } from './StyledComponent'
import { useSettings } from 'src/@core/hooks/useSettings'

type Props = {
  control: any
  errors: any
  checked: boolean
  loading: boolean
  loadingInput: boolean
  openDateRange: boolean
  selectionDateRange: DateRangeTypes
  tipo: 'impuesto' | 'percepcion'
  impuestos: ImpuestoTypes[]
  setImpuestos: Dispatch<SetStateAction<ImpuestoTypes[]>>
  handleChangeImpuesto: (event: ChangeEvent<HTMLInputElement>) => void
  setOpenDateRange: Dispatch<SetStateAction<boolean>>
  confirmarDateRange: (str: string) => void
  onClickAgregarImpuesto: () => void
  setSelectionDateRange: Dispatch<SetStateAction<DateRangeTypes>>
  showHelperTextDate: boolean
  fechaDesde: Date
  fechaHasta: Date
}

function ClienteImpuestosForm(props: Props) {
  const {
    control,
    errors,
    checked,
    loading,
    loadingInput,
    openDateRange,
    selectionDateRange,
    impuestos,
    tipo,
    setImpuestos,
    setSelectionDateRange,
    handleChangeImpuesto,
    setOpenDateRange,
    confirmarDateRange,
    onClickAgregarImpuesto,
    showHelperTextDate,
    fechaDesde,
    fechaHasta
  } = props

  const { settings } = useSettings()

  const handleTextButtonDateRange = () => {
    return showHelperTextDate
      ? `${formatDate(fechaDesde)} - ${formatDate(fechaHasta)}`
      : `Rango fecha ${tipo}`
  }

  const handleDeleteImpuesto = (nombre: string) => {
    const filtered = impuestos.filter(impuesto => impuesto.nombre !== nombre)
    setImpuestos(filtered)
  }

  return (
    <Grid container spacing={5}>
      <Grid item xs={12} sx={{ mt: '20px' }}>
        <TitleSectionForm text={tipo.toLocaleUpperCase()} />
      </Grid>

      {/** impuesto.nombre */}
      <Grid item xs={12} sm={4}>
        <FormControl fullWidth>
          <Controller
            name={tipo === 'impuesto' ? 'impuesto.nombre' : 'percepcion.nombre'}
            control={control}
            rules={{ required: true }}
            render={({ field: { value, onChange } }) => (
              <TextField
                value={value || ''}
                label={`Ingrese nombre ${tipo} *`}
                onChange={onChange}
                type='text'
                placeholder={`Escriba nombre ${tipo}`}
                aria-describedby='stepper-linear-account-razon_social_reducida'
                disabled={loadingInput}
              />
            )}
          />
          {(errors.impuesto?.nombre || errors.percepcion?.nombre) && (
            <FormHelperText sx={{ color: 'error.main' }} id='validation-schema-iva'>
              {errors.impuesto?.nombre.message || errors.percepcion?.nombre.message}
            </FormHelperText>
          )}
        </FormControl>
      </Grid>

      {/** impuesto.condicion */}
      <Grid item xs={12} sm={4}>
        <FormControl fullWidth>
          <Controller
            name={tipo === 'impuesto' ? 'impuesto.condicion' : 'percepcion.condicion'}
            control={control}
            rules={{ required: true }}
            render={({ field: { value, onChange } }) => (
              <TextField
                value={value || ''}
                label='Condicion *'
                onChange={onChange}
                type='text'
                placeholder='Escriba condicion'
                aria-describedby='stepper-linear-account-razon_social_reducida'
                disabled={loadingInput}
              />
            )}
          />
          {(errors.impuesto?.condicion || errors.percepcion?.condicion) && (
            <FormHelperText sx={{ color: 'error.main' }} id='validation-schema-alicuota'>
              {errors.impuesto?.condicion.message || errors.percepcion?.condicion.message}
            </FormHelperText>
          )}
        </FormControl>
      </Grid>

      {/** impuesto.jurisdiccion */}
      <Grid item xs={12} sm={4}>
        <FormControl fullWidth>
          <InputLabel
            id='stepper-linear-personal-pais'
            error={Boolean(errors.impuesto?.jurisdiccion || errors.percepcion?.jurisdiccion)}
            htmlFor='stepper-linear-personal-pais'
          >
            Jurisdiccion *
          </InputLabel>
          <Controller
            name={tipo === 'impuesto' ? 'impuesto.jurisdiccion' : 'percepcion.jurisdiccion'}
            control={control}
            rules={{ required: true }}
            render={({ field: { value, onChange } }) => (
              <Select
                value={value || ''}
                label='Jurisdiccion *'
                id='controlled-select'
                onChange={onChange}
                labelId='controlled-select-label'
              >
                {jurisdiccionesMock.map(value => (
                  <MenuItem key={value.codigo} value={value.nombre}>
                    {value.nombre}
                  </MenuItem>
                ))}
              </Select>
            )}
          />
          {(errors.impuesto?.jurisdiccion || errors.percepcion?.jurisdiccion) && (
            <FormHelperText sx={{ color: 'error.main' }} id='validation-schema-jurisdiccion'>
              {errors.impuesto?.jurisdiccion.message || errors.percepcion?.jurisdiccion.message}
            </FormHelperText>
          )}
        </FormControl>
      </Grid>

      {/** impuesto.rango_fecha */}
      <Grid item xs={12} sm={4}>
        <DateRangeComponent
          disabled={false}
          textButton={handleTextButtonDateRange()}
          onChange={(ranges: any) => setSelectionDateRange(ranges.selection)}
          openDateRange={openDateRange}
          setOpenDateRange={setOpenDateRange}
          selectionDateRange={selectionDateRange}
          size='small'
          sx={{
            height: 56,
            marginBottom: '0px !important',
            color: settings.mode === 'dark' ? 'currentColor' : 'rgba(58, 53, 65, 0.87)'
          }}
          dateRangeClassName={
            settings.mode === 'dark' ? 'date-range__base date-range-dark' : 'date-range__base'
          }
          handleConfirmarFechas={() => confirmarDateRange(tipo)}
        />
        {(errors.impuesto?.fecha_desde || errors.percepcion?.fecha_desde) && (
          <FormHelperText sx={{ color: 'error.main' }}>
            {errors.impuesto?.fecha_desde.message || errors.percepcion?.fecha_desde.message}
          </FormHelperText>
        )}
      </Grid>

      {/** impuesto.cuenta_contable */}
      <Grid item xs={12} sm={4}>
        <FormControl fullWidth>
          <Controller
            name={tipo === 'impuesto' ? 'impuesto.cuenta_contable' : 'percepcion.cuenta_contable'}
            control={control}
            rules={{ required: true }}
            render={({ field: { value, onChange } }) => (
              <TextField
                value={value || ''}
                label='Cuenta contable *'
                onChange={onChange}
                type='number'
                placeholder='Escriba la cuena contable asociada'
                aria-describedby='stepper-linear-account-razon_social_reducida'
                disabled={loadingInput}
              />
            )}
          />
          {(errors.impuesto?.cuenta_contable || errors.percepcion?.cuenta_contable) && (
            <FormHelperText sx={{ color: 'error.main' }} id='validation-schema-alicuota'>
              {errors.impuesto?.cuenta_contable.message ||
                errors.percepcion?.cuenta_contable.message}
            </FormHelperText>
          )}
        </FormControl>
      </Grid>

      {/** impuesto.alicuota */}
      <Grid item xs={12} sm={2}>
        <FormControl fullWidth>
          <Controller
            name={tipo === 'impuesto' ? 'impuesto.alicuota' : 'percepcion.alicuota'}
            control={control}
            rules={{ required: true }}
            render={({ field: { value, onChange } }) => (
              <TextField
                value={value || ''}
                label='Alicuota *'
                onChange={onChange}
                type='number'
                placeholder='Escriba alicuota'
                aria-describedby='stepper-linear-account-razon_social_reducida'
                disabled={loadingInput}
              />
            )}
          />
          {(errors.impuesto?.alicuota || errors.percepcion?.alicuota) && (
            <FormHelperText sx={{ color: 'error.main' }} id='validation-schema-alicuota'>
              {errors.impuesto?.alicuota.message || errors.impuesto?.alicuota.message}
            </FormHelperText>
          )}
        </FormControl>
      </Grid>

      {/** impuesto.habilitado */}
      <Grid item xs={12} sm={2}>
        <FormControl fullWidth component='fieldset' variant='standard'>
          <FormControlLabel
            sx={{ pl: 2 }}
            control={
              <Switch
                checked={checked}
                onChange={handleChangeImpuesto}
                inputProps={{ 'aria-label': 'controlled' }}
                name='habilitado'
              />
            }
            label='Habilitado'
          />
        </FormControl>
      </Grid>

      {/** Botón agregar impuesto */}
      <Grid justifyContent='start' item xs={12}>
        <LoadingButton
          startIcon={<AddCircle />}
          loading={loading}
          onClick={onClickAgregarImpuesto}
          disabled={loading}
        >
          {`Agregar ${tipo}`}
        </LoadingButton>
      </Grid>

      <Grid item xs={12}>
        <Collapse
          sx={{
            width: '100% !important',
            '& .MuiCollapse-wrapperInner': { width: '100% !important' }
          }}
          orientation='vertical'
          in={Boolean(impuestos[0]?.nombre)}
        >
          {impuestos?.length > 0 &&
            impuestos?.map(item => (
              <StyledList key={item.nombre}>
                <ListItem>
                  <div>
                    <ListItemText
                      primary={
                        tipo === 'impuesto'
                          ? `Impuesto: ${item.nombre}`
                          : `Percepción: ${item.nombre}`
                      }
                    />
                    <Box sx={{ display: 'flex', alignItems: 'center', flexWrap: 'wrap' }}>
                      <Typography
                        variant='caption'
                        sx={{ color: 'text.main', fontWeight: 500, ml: 1 }}
                      >
                        Nombre:
                      </Typography>
                      <Typography variant='caption' sx={{ color: 'text.disabled', ml: 1 }}>
                        {item?.nombre}
                      </Typography>
                      <Typography
                        variant='caption'
                        sx={{ color: 'text.main', fontWeight: 500, ml: 1 }}
                      >
                        Condicion:
                      </Typography>
                      <Typography variant='caption' sx={{ color: 'text.disabled', ml: 1 }}>
                        {item?.condicion}
                      </Typography>
                      <Typography
                        variant='caption'
                        sx={{ color: 'text.main', fontWeight: 500, ml: 1 }}
                      >
                        Jurisdiccion:
                      </Typography>
                      <Typography variant='caption' sx={{ color: 'text.disabled', ml: 1 }}>
                        {item?.jurisdiccion}
                      </Typography>
                      <Typography
                        variant='caption'
                        sx={{ color: 'text.main', fontWeight: 500, ml: 1 }}
                      >
                        Alicuota:
                      </Typography>
                      <Typography variant='caption' sx={{ color: 'text.disabled', ml: 1 }}>
                        {item?.alicuota}
                      </Typography>
                      <Typography
                        variant='caption'
                        sx={{ color: 'text.main', fontWeight: 500, ml: 1 }}
                      >
                        Fecha:
                      </Typography>
                      <Typography variant='caption' sx={{ color: 'text.disabled', ml: 1 }}>
                        {formatDate(item?.fecha_desde)} - {formatDate(item?.fecha_hasta)}
                      </Typography>
                      <Typography
                        variant='caption'
                        sx={{ color: 'text.main', fontWeight: 500, ml: 1 }}
                      >
                        Cuenta contable:
                      </Typography>
                      <Typography variant='caption' sx={{ color: 'text.disabled', ml: 1 }}>
                        {item?.cuenta_contable}
                      </Typography>
                      <Typography
                        variant='caption'
                        sx={{ color: 'text.main', fontWeight: 500, ml: 1 }}
                      >
                        Habilitado:
                      </Typography>
                      <Typography variant='caption' sx={{ color: 'text.disabled', ml: 1 }}>
                        {item?.habilitado ? 'Sí' : 'No'}
                      </Typography>
                    </Box>
                  </div>
                  <ListItemSecondaryAction>
                    <Tooltip arrow title='Quitar de la lista'>
                      <IconButton
                        onClick={() => handleDeleteImpuesto(item.nombre || '')}
                        color='error'
                        aria-label='upload picture'
                        edge='end'
                      >
                        <CloseCircleOutline fontSize='small' />
                      </IconButton>
                    </Tooltip>
                  </ListItemSecondaryAction>
                </ListItem>
              </StyledList>
            ))}
        </Collapse>
      </Grid>
    </Grid>
  )
}

export default ClienteImpuestosForm
