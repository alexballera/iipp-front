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
import { ESTADO_COBRANZA } from 'src/@core/constants'
import { useAppContext } from 'src/@core/context/AppContext'
import { formatDate, removeSlashesAndScores } from 'src/@core/utils'
import {
  CobranzasFiltrosDTO,
  CobranzasFiltrosProps,
  CobranzasFiltrosIS as defaultValues
} from '../domain/cobranzasModel'

//** Custom Components */
import DateRangeComponent, {
  DateRangeIS,
  DateRangeTypes
} from 'src/@core/components/DateRangeComponent'
import HeaderFiltrosComponent from 'src/@core/components/HeaderFiltrosComponent'
import { useSettings } from 'src/@core/hooks/useSettings'

function CobranzasFiltrosComponent({ queryParams, setQueryParams }: CobranzasFiltrosProps) {
  //** Hooks */
  const [openDateRange, setOpenDateRange] = useState<boolean>(false)
  const [nombre, setNombre] = useState<string>('')
  const [numeroDocumento, setNumeroDocumento] = useState<string>('')
  const [estadoCobranza, setEstadoCobranza] = useState<string>('')
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
      { campo: 'estado', valor: estadoCobranza },
      { campo: 'cuit', valor: numeroDocumento },
      { campo: 'nombre', valor: nombre },
      { campo: 'fecha_alta_desde', valor: selectionDateRange.startDate || '' },
      { campo: 'fecha_alta_hasta', valor: selectionDateRange.endDate || '' }
    ],
    orden: selectionOrden ? [selectionOrden] : []
  } as CobranzasFiltrosDTO

  const clearFields = () => {
    setEstadoCobranza('')
    setNombre('')
    setSelectionDateRange(DateRangeIS)
    setNumeroDocumento('')
    setOpenDateRange(false)
    setSelectionOrden({ campo: '', valor: '' })

    reset(defaultValues)

    setQueryParams({
      ...defaultValues,
      filtros: [
        { campo: 'estado', valor: '' },
        { campo: 'cuit', valor: '' },
        { campo: 'nombre', valor: '' },
        { campo: 'fecha_alta_desde', valor: '' },
        { campo: 'fecha_alta_hasta', valor: '' }
      ],
      orden: [{ campo: '', valor: '' }]
    })
  }

  const handleEstadoChange = (e: SelectChangeEvent) => {
    setEstadoCobranza(e.target.value)
    const estado = e.target.value
    const data = {
      ...datosQueryParams,
      filtros: [
        { campo: 'estado', valor: estado },
        { campo: 'cuit', valor: numeroDocumento },
        { campo: 'nombre', valor: nombre },
        { campo: 'fecha_alta_desde', valor: selectionDateRange.startDate || '' },
        { campo: 'fecha_alta_hasta', valor: selectionDateRange.endDate || '' }
      ]
    }

    setQueryParams(data as CobranzasFiltrosDTO)
  }

  const handleChangeDateRange = (ranges: any) => {
    setSelectionDateRange(ranges.selection)
  }

  const handleConfirmarFechas = () => {
    const data = {
      ...datosQueryParams,
      filtros: [
        { campo: 'estado', valor: estadoCobranza },
        { campo: 'cuit', valor: numeroDocumento },
        { campo: 'nombre', valor: nombre },
        { campo: 'fecha_alta_desde', valor: selectionDateRange.startDate || '' },
        { campo: 'fecha_alta_hasta', valor: selectionDateRange.endDate || '' }
      ]
    }

    setQueryParams(data as CobranzasFiltrosDTO)
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

  const onBlurInput = () => setQueryParams(data as CobranzasFiltrosDTO)

  const cleanHabilitado = () => {
    setEstadoCobranza('')
    reset({
      ...datosQueryParams,
      filtros: [
        { campo: 'estado', valor: '' },
        { campo: 'cuit', valor: numeroDocumento },
        { campo: 'nombre', valor: nombre },
        { campo: 'fecha_alta_desde', valor: selectionDateRange.startDate || '' },
        { campo: 'fecha_alta_hasta', valor: selectionDateRange.endDate || '' }
      ]
    })
    const data = {
      ...datosQueryParams,
      filtros: [
        { campo: 'estado', valor: '' },
        { campo: 'cuit', valor: numeroDocumento },
        { campo: 'nombre', valor: nombre },
        { campo: 'fecha_alta_desde', valor: selectionDateRange.startDate || '' },
        { campo: 'fecha_alta_hasta', valor: selectionDateRange.endDate || '' }
      ]
    }
    setQueryParams(data as CobranzasFiltrosDTO)
  }

  const cleanRazonSocial = () => {
    setNombre('')
    reset({
      ...datosQueryParams,
      filtros: [
        { campo: 'estado', valor: estadoCobranza },
        { campo: 'cuit', valor: numeroDocumento },
        { campo: 'nombre', valor: '' },
        { campo: 'fecha_alta_desde', valor: selectionDateRange.startDate || '' },
        { campo: 'fecha_alta_hasta', valor: selectionDateRange.endDate || '' }
      ]
    })

    const data = {
      ...datosQueryParams,
      filtros: [
        { campo: 'estado', valor: estadoCobranza },
        { campo: 'cuit', valor: numeroDocumento },
        { campo: 'nombre', valor: '' },
        { campo: 'fecha_alta_desde', valor: selectionDateRange.startDate || '' },
        { campo: 'fecha_alta_hasta', valor: selectionDateRange.endDate || '' }
      ]
    }
    setQueryParams(data as CobranzasFiltrosDTO)
  }

  const cleanNumeroDocumento = () => {
    setNumeroDocumento('')
    reset({
      ...datosQueryParams,
      filtros: [
        { campo: 'estado', valor: estadoCobranza },
        { campo: 'cuit', valor: '' },
        { campo: 'nombre', valor: nombre },
        { campo: 'fecha_alta_desde', valor: selectionDateRange.startDate || '' },
        { campo: 'fecha_alta_hasta', valor: selectionDateRange.endDate || '' }
      ]
    })
    const data = {
      ...datosQueryParams,
      filtros: [
        { campo: 'estado', valor: estadoCobranza },
        { campo: 'cuit', valor: '' },
        { campo: 'nombre', valor: nombre },
        { campo: 'fecha_alta_desde', valor: selectionDateRange.startDate || '' },
        { campo: 'fecha_alta_hasta', valor: selectionDateRange.endDate || '' }
      ]
    }
    setQueryParams(data as CobranzasFiltrosDTO)
  }

  const cleanDateRange = () => {
    setSelectionDateRange(DateRangeIS)
    setOpenDateRange(false)

    reset({
      ...datosQueryParams,
      filtros: [
        { campo: 'estado', valor: estadoCobranza },
        { campo: 'cuit', valor: numeroDocumento },
        { campo: 'nombre', valor: nombre },
        { campo: 'fecha_alta_desde', valor: '' },
        { campo: 'fecha_alta_hasta', valor: '' }
      ]
    })

    setQueryParams({
      ...datosQueryParams,
      filtros: [
        { campo: 'estado', valor: estadoCobranza },
        { campo: 'cuit', valor: numeroDocumento },
        { campo: 'nombre', valor: nombre },
        { campo: 'fecha_alta_desde', valor: '' },
        { campo: 'fecha_alta_hasta', valor: '' }
      ]
    })
  }

  const CHIPS = [
    {
      id: '01',
      show: Boolean(estadoCobranza),
      label: `Estado: ${estadoCobranza}`,
      onDelete: cleanHabilitado
    },
    {
      id: '02',
      show: Boolean(nombre),
      label: `Nombre: ${nombre}`,
      onDelete: cleanRazonSocial
    },
    {
      id: '03',
      show: Boolean(numeroDocumento),
      label: `Documento/CUIT: ${numeroDocumento}`,
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

  const onSubmit = (dataForm: CobranzasFiltrosDTO) => {
    setQueryParams({
      ...dataForm,
      filtros: [
        { campo: 'estado', valor: dataForm.filtros?.[0].valor || estadoCobranza },
        { campo: 'cuit', valor: dataForm.filtros?.[1].valor || '' },
        { campo: 'nombre', valor: dataForm.filtros?.[2].valor || '' },
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
            {/** Estado */}
            <Grid item xs={12} sm={3}>
              <FormControl fullWidth size='small'>
                <InputLabel id='select-label'>Estado</InputLabel>
                <Select
                  label='filtros.0.campo'
                  placeholder='Escoge el estado'
                  value={estadoCobranza}
                  id='stepper-alternative-personal-select'
                  onChange={handleEstadoChange}
                  labelId='stepper-alternative-personal-select-label'
                  error={Boolean(errors.filtros?.[0]?.valor)}
                >
                  {ESTADO_COBRANZA?.map(({ value, label }) => (
                    <MenuItem key={label} value={value}>
                      {removeSlashesAndScores(label)}
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

            {/** Numero Documento */}
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

            {/** Nombre */}
            <Grid item xs={12} sm={3}>
              <FormControl fullWidth size='small'>
                <Controller
                  name='filtros.2.valor'
                  control={control}
                  render={({ field }) => {
                    setNombre(field.value || '')

                    return (
                      <TextField
                        {...field}
                        placeholder='Nombre'
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

            {/** Rango Fecha */}
            <Grid item xs={12} sm={3}>
              <DateRangeComponent
                disabled={loading || false}
                textButton='Rango fecha de alta'
                onChange={handleChangeDateRange}
                openDateRange={openDateRange}
                setOpenDateRange={setOpenDateRange}
                selectionDateRange={selectionDateRange}
                size='small'
                sx={{
                  height: 40,
                  marginBottom: '0px !important',
                  color: settings.mode === 'dark' ? 'currentColor' : 'rgba(58, 53, 65, 0.87)'
                }}
                dateRangeClassName={
                  settings.mode === 'dark' ? 'date-range__base date-range-dark' : 'date-range__base'
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
export default memo(CobranzasFiltrosComponent)
