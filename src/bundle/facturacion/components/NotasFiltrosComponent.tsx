//** Base Imports */
import { memo, useState } from 'react'

//** MUI Imports */
import LoadingButton from '@mui/lab/LoadingButton'
import {
  Chip,
  Collapse,
  FormControl,
  FormHelperText,
  Grid,
  InputAdornment,
  InputLabel,
  MenuItem,
  Paper,
  Select,
  SelectChangeEvent,
  Stack,
  TextField,
  Typography
} from '@mui/material'
import { Magnify } from 'mdi-material-ui'
import { Controller, useForm } from 'react-hook-form'

//** Store, Hooks, Utils Imports */
import { ESTADO } from 'src/@core/constants'
import { useAppContext } from 'src/@core/context/AppContext'
import { formatDate } from 'src/@core/utils'
import { NotaFiltrosDTO, NotaFiltrosProps, NotaFiltrosIS as defaultValues } from '../domain'

//** Custom Components */
import DateRangeComponent, {
  DateRangeIS,
  DateRangeTypes
} from 'src/@core/components/DateRangeComponent'
import HeaderFiltrosComponent from 'src/@core/components/HeaderFiltrosComponent'
import { useSettings } from 'src/@core/hooks/useSettings'

function NotasFiltrosComponent({ queryParams, setQueryParams }: NotaFiltrosProps) {
  //** Hooks */
  const [openDateRange, setOpenDateRange] = useState<boolean>(false)
  const [razonSocial, setRazonSocial] = useState<string>('')
  const [numeroDocumento, setNumeroDocumento] = useState<string>('')
  const [estadoNotaContable, setEstadoNotaContable] = useState<string>('')
  const [selectionDateRange, setSelectionDateRange] = useState<DateRangeTypes>(DateRangeIS)
  const { loading, selectionOrden, setSelectionOrden } = useAppContext()
  const {
    control,
    handleSubmit,
    formState: { errors },
    reset
  } = useForm({
    defaultValues,
    mode: 'onChange'
  })

  const { settings } = useSettings()

  const datosQueryParams = {
    ...queryParams,
    filtros: [
      { campo: 'estado', valor: estadoNotaContable },
      { campo: 'numero_documento', valor: numeroDocumento },
      { campo: 'razon_social', valor: razonSocial },
      { campo: 'fecha_alta_desde', valor: selectionDateRange.startDate || '' },
      { campo: 'fecha_alta_hasta', valor: selectionDateRange.endDate || '' }
    ],
    orden: selectionOrden ? [selectionOrden] : []
  } as NotaFiltrosDTO

  const clearFields = () => {
    setEstadoNotaContable('')
    setRazonSocial('')
    setSelectionDateRange(DateRangeIS)
    setNumeroDocumento('')
    setOpenDateRange(false)
    setSelectionOrden({ campo: '', valor: '' })

    reset(defaultValues)

    setQueryParams({
      ...defaultValues,
      filtros: [
        { campo: 'estado', valor: '' },
        { campo: 'numero_documento', valor: '' },
        { campo: 'razon_social', valor: '' },
        { campo: 'fecha_alta_desde', valor: '' },
        { campo: 'fecha_alta_hasta', valor: '' }
      ],
      orden: [{ campo: '', valor: '' }]
    })
  }

  const handleEstadoChange = (e: SelectChangeEvent) => {
    setEstadoNotaContable(e.target.value)
    const estado = e.target.value
    const data = {
      ...datosQueryParams,
      filtros: [
        { campo: 'estado', valor: estado },
        { campo: 'numero_documento', valor: numeroDocumento },
        { campo: 'razon_social', valor: razonSocial },
        { campo: 'fecha_alta_desde', valor: selectionDateRange.startDate || '' },
        { campo: 'fecha_alta_hasta', valor: selectionDateRange.endDate || '' }
      ]
    }

    setQueryParams(data as NotaFiltrosDTO)
  }

  const handleChangeDateRange = (ranges: any) => {
    setSelectionDateRange(ranges.selection)
  }

  const handleConfirmarFechas = () => {
    const data = {
      ...datosQueryParams,
      filtros: [
        { campo: 'estado', valor: estadoNotaContable },
        { campo: 'numero_documento', valor: numeroDocumento },
        { campo: 'razon_social', valor: razonSocial },
        { campo: 'fecha_alta_desde', valor: selectionDateRange.startDate || '' },
        { campo: 'fecha_alta_hasta', valor: selectionDateRange.endDate || '' }
      ]
    }

    setQueryParams(data as NotaFiltrosDTO)
    setOpenDateRange(false)
  }

  const filtrosFiltrados = datosQueryParams?.filtros?.filter(
    filtro => filtro.campo !== '' && filtro.valor !== ''
  )

  const data = {
    ...datosQueryParams,
    filtros: filtrosFiltrados,
    orden: selectionOrden ? [selectionOrden] : []
  }

  const onBlurInput = () => setQueryParams(data as NotaFiltrosDTO)

  const cleanHabilitado = () => {
    setEstadoNotaContable('')
    reset({
      ...datosQueryParams,
      filtros: [
        { campo: 'estado', valor: '' },
        { campo: 'numero_documento', valor: numeroDocumento },
        { campo: 'razon_social', valor: razonSocial },
        { campo: 'fecha_alta_desde', valor: selectionDateRange.startDate || '' },
        { campo: 'fecha_alta_hasta', valor: selectionDateRange.endDate || '' }
      ]
    })
    const data = {
      ...datosQueryParams,
      filtros: [
        { campo: 'estado', valor: '' },
        { campo: 'numero_documento', valor: numeroDocumento },
        { campo: 'razon_social', valor: razonSocial },
        { campo: 'fecha_alta_desde', valor: selectionDateRange.startDate || '' },
        { campo: 'fecha_alta_hasta', valor: selectionDateRange.endDate || '' }
      ]
    }
    setQueryParams(data as NotaFiltrosDTO)
  }

  const cleanRazonSocial = () => {
    setRazonSocial('')
    reset({
      ...datosQueryParams,
      filtros: [
        { campo: 'estado', valor: estadoNotaContable },
        { campo: 'numero_documento', valor: numeroDocumento },
        { campo: 'razon_social', valor: '' },
        { campo: 'fecha_alta_desde', valor: selectionDateRange.startDate || '' },
        { campo: 'fecha_alta_hasta', valor: selectionDateRange.endDate || '' }
      ]
    })

    const data = {
      ...datosQueryParams,
      filtros: [
        { campo: 'estado', valor: estadoNotaContable },
        { campo: 'numero_documento', valor: numeroDocumento },
        { campo: 'razon_social', valor: '' },
        { campo: 'fecha_alta_desde', valor: selectionDateRange.startDate || '' },
        { campo: 'fecha_alta_hasta', valor: selectionDateRange.endDate || '' }
      ]
    }
    setQueryParams(data as NotaFiltrosDTO)
  }

  const cleanNumeroDocumento = () => {
    setNumeroDocumento('')
    reset({
      ...datosQueryParams,
      filtros: [
        { campo: 'estado', valor: estadoNotaContable },
        { campo: 'numero_documento', valor: '' },
        { campo: 'razon_social', valor: razonSocial },
        { campo: 'fecha_alta_desde', valor: selectionDateRange.startDate || '' },
        { campo: 'fecha_alta_hasta', valor: selectionDateRange.endDate || '' }
      ]
    })
    const data = {
      ...datosQueryParams,
      filtros: [
        { campo: 'estado', valor: estadoNotaContable },
        { campo: 'numero_documento', valor: '' },
        { campo: 'razon_social', valor: razonSocial },
        { campo: 'fecha_alta_desde', valor: selectionDateRange.startDate || '' },
        { campo: 'fecha_alta_hasta', valor: selectionDateRange.endDate || '' }
      ]
    }
    setQueryParams(data as NotaFiltrosDTO)
  }

  const cleanDateRange = () => {
    setSelectionDateRange(DateRangeIS)
    setOpenDateRange(false)

    reset({
      ...datosQueryParams,
      filtros: [
        { campo: 'estado', valor: estadoNotaContable },
        { campo: 'numero_documento', valor: numeroDocumento },
        { campo: 'razon_social', valor: razonSocial },
        { campo: 'fecha_alta_desde', valor: '' },
        { campo: 'fecha_alta_hasta', valor: '' }
      ]
    })

    setQueryParams({
      ...datosQueryParams,
      filtros: [
        { campo: 'estado', valor: estadoNotaContable },
        { campo: 'numero_documento', valor: numeroDocumento },
        { campo: 'razon_social', valor: razonSocial },
        { campo: 'fecha_alta_desde', valor: '' },
        { campo: 'fecha_alta_hasta', valor: '' }
      ]
    })
  }

  const CHIPS = [
    {
      id: '01',
      show: Boolean(estadoNotaContable),
      label: `Estado: ${estadoNotaContable}`,
      onDelete: cleanHabilitado
    },
    {
      id: '02',
      show: Boolean(razonSocial),
      label: `Razón Social: ${razonSocial}`,
      onDelete: cleanRazonSocial
    },
    {
      id: '03',
      show: Boolean(numeroDocumento),
      label: `Documento: ${numeroDocumento}`,
      onDelete: cleanNumeroDocumento
    },
    {
      id: '04',
      show: Boolean(selectionDateRange.startDate || selectionDateRange.endDate),
      label: `Desde: ${formatDate(selectionDateRange.startDate || '')} - Hasta: ${formatDate(
        selectionDateRange.endDate || ''
      )}`,
      onDelete: cleanDateRange
    }
  ]

  const onSubmit = (dataForm: NotaFiltrosDTO) => {
    setQueryParams({
      ...dataForm,
      filtros: [
        { campo: 'estado', valor: dataForm.filtros?.[0].valor || estadoNotaContable },
        { campo: 'numero_documento', valor: dataForm.filtros?.[1].valor || '' },
        { campo: 'razon_social', valor: dataForm.filtros?.[2].valor || '' },
        { campo: 'fecha_alta_desde', valor: selectionDateRange.startDate || '' },
        { campo: 'fecha_alta_hasta', valor: selectionDateRange.endDate || '' }
      ].filter(filtro => filtro.campo !== '' && filtro.valor !== ''),
      orden: selectionOrden ? [selectionOrden] : []
    })
  }

  return (
    <>
      <Paper sx={{ mb: 8, p: 4 }} elevation={0}>
        <HeaderFiltrosComponent clearFields={clearFields} />
        <form onSubmit={handleSubmit(onSubmit)}>
          <Grid container spacing={4} alignItems='center' sx={{ my: 1 }}>
            {/** estado */}
            <Grid item xs={12} sm={3}>
              <FormControl fullWidth size='small'>
                <InputLabel id='select-label'>Estado</InputLabel>
                <Select
                  label='filtros.0.campo'
                  placeholder='Escoge el estado'
                  value={estadoNotaContable}
                  id='stepper-alternative-personal-select'
                  onChange={handleEstadoChange}
                  labelId='stepper-alternative-personal-select-label'
                  error={Boolean(errors.filtros?.[0]?.valor)}
                >
                  {ESTADO?.map(({ value, label }) => (
                    <MenuItem key={label} value={value}>
                      {label}
                    </MenuItem>
                  ))}
                </Select>
                {errors.filtros?.[0]?.valor && (
                  <FormHelperText sx={{ color: 'error.main' }} id='validation-schema-first-name'>
                    {errors.filtros?.[0]?.valor?.message?.toString()}
                  </FormHelperText>
                )}
              </FormControl>
            </Grid>

            {/** numero_documento */}
            <Grid item xs={12} sm={3}>
              <FormControl fullWidth size='small'>
                <Controller
                  name='filtros.1.valor'
                  control={control}
                  render={({ field }) => {
                    setNumeroDocumento(field.value || '')

                    return (
                      <TextField
                        {...field}
                        placeholder='Número de documento'
                        error={Boolean(errors.filtros?.[1]?.valor)}
                        value={field.value}
                        onBlur={onBlurInput}
                        type='number'
                        aria-describedby='validation-schema-first-name'
                        disabled={loading}
                        size='small'
                        InputProps={{
                          startAdornment: (
                            <InputAdornment position='start'>
                              <Magnify />
                            </InputAdornment>
                          )
                        }}
                      />
                    )
                  }}
                />
                {errors.filtros?.[1]?.valor && (
                  <FormHelperText sx={{ color: 'error.main' }} id='validation-schema-first-name'>
                    {errors.filtros?.[1]?.valor.message?.toString()}
                  </FormHelperText>
                )}
              </FormControl>
            </Grid>

            {/** razon_social */}
            <Grid item xs={12} sm={3}>
              <FormControl fullWidth size='small'>
                <Controller
                  name='filtros.2.valor'
                  control={control}
                  render={({ field }) => {
                    setRazonSocial(field.value || '')

                    return (
                      <TextField
                        {...field}
                        placeholder='Razón social'
                        error={Boolean(errors.filtros?.[2]?.valor)}
                        value={field.value}
                        onBlur={onBlurInput}
                        aria-describedby='validation-schema-first-name'
                        disabled={loading}
                        size='small'
                        InputProps={{
                          startAdornment: (
                            <InputAdornment position='start'>
                              <Magnify />
                            </InputAdornment>
                          )
                        }}
                      />
                    )
                  }}
                />
                {errors.filtros?.[2]?.valor && (
                  <FormHelperText sx={{ color: 'error.main' }} id='validation-schema-first-name'>
                    {errors.filtros[2].valor.message?.toString()}
                  </FormHelperText>
                )}
              </FormControl>
            </Grid>

            {/** rango_fecha */}
            <Grid item xs={12} sm={3}>
              <DateRangeComponent
                disabled={loading || false}
                textButton='Rango fecha de alta'
                onChange={handleChangeDateRange}
                openDateRange={openDateRange}
                setOpenDateRange={setOpenDateRange}
                selectionDateRange={selectionDateRange}
                size='small'
                height='40px'
                sx={{
                  height: 40,
                  marginBottom: '0px !important',
                  color: settings.mode === 'dark' ? 'currentColor' : 'rgba(58, 53, 65, 0.87)'
                }}
                dateRangeClassName={
                  settings.mode === 'dark'
                    ? 'date-range__base date-range-dark'
                    : 'date-range__base'
                }
                handleConfirmarFechas={handleConfirmarFechas}
              />
            </Grid>
          </Grid>

          <Grid container justifyContent='end' item xs={12}>
            <LoadingButton
              type='submit'
              loading={loading}
              loadingPosition='end'
              endIcon={<Magnify />}
              variant='text'
            >
              Buscar
            </LoadingButton>
          </Grid>
        </form>
      </Paper>

      <Stack direction='row' flexWrap='wrap' alignItems='center' sx={{ mb: 8 }}>
        <Typography sx={{ fontSize: 20, fontWeight: 300 }}>Resultado de Búsqueda</Typography>
        {CHIPS.map(
          chip =>
            chip.show && (
              <Collapse key={chip.id} in={chip.show}>
                <Chip
                  label={chip.label}
                  variant='outlined'
                  onDelete={chip.onDelete}
                  color='secondary'
                  sx={{ mx: 1, my: 1 }}
                />
              </Collapse>
            )
        )}
      </Stack>
    </>
  )
}
export default memo(NotasFiltrosComponent)
