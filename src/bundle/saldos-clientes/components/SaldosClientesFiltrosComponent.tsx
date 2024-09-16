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
import { useAppContext } from 'src/@core/context/AppContext'

//** Custom Components */
import HeaderFiltrosComponent from 'src/@core/components/HeaderFiltrosComponent'
import {
  SaldoClienteFiltrosProps,
  SaldoClienteFiltrosDTO,
  SaldoClienteFiltrosIS as defaultValues
} from '../domain/saldosClientesModel'
import { DEUDA } from 'src/@core/constants'

function SaldosClientesFiltrosComponent({ queryParams, setQueryParams }: SaldoClienteFiltrosProps) {
  //** Hooks */
  const [nombreCliente, setNombreCliente] = useState<string>('')
  const [documentoCliente, setDocumentoCliente] = useState<string>('')
  const [estadoDeudaCliente, setEstadoDeudaCliente] = useState<string>('')
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

  const inicializarFiltrosDeuda = (estado: string) => {
    let deudaTotal = ''
    let deudaVencida = ''
    let deudaNoVencida = ''

    if (estado === 'TOTAL') {
      deudaTotal = 'true'
    } else if (estado === 'VENCIDA') {
      deudaVencida = 'true'
    } else if (estado === 'NO VENCIDA') {
      deudaNoVencida = 'true'
    }

    return { deudaTotal, deudaVencida, deudaNoVencida }
  }

  let deudaTotal = ''
  let deudaVencida = ''
  let deudaNoVencida = ''

  if (estadoDeudaCliente === 'TOTAL') {
    deudaTotal = 'true'
  } else if (estadoDeudaCliente === 'VENCIDA') {
    deudaVencida = 'true'
  } else if (estadoDeudaCliente === 'NO VENCIDA') {
    deudaNoVencida = 'true'
  }

  const datosQueryParams = {
    ...queryParams,
    filtros: [
      { campo: 'nombre', valor: nombreCliente },
      { campo: 'numero_documento', valor: documentoCliente },
      { campo: 'deuda_vencida', valor: deudaVencida },
      { campo: 'deuda_total', valor: deudaTotal },
      { campo: 'deuda_no_vencida', valor: deudaNoVencida }
    ],
    orden: selectionOrden ? [selectionOrden] : []
  } as SaldoClienteFiltrosDTO

  const clearFields = () => {
    setEstadoDeudaCliente('')
    setNombreCliente('')
    setDocumentoCliente('')
    setSelectionOrden({ campo: '', valor: '' })

    reset(defaultValues)

    setQueryParams({
      ...defaultValues,
      filtros: [
        { campo: 'nombre', valor: '' },
        { campo: 'numero_documento', valor: '' },
        { campo: 'deuda_vencida', valor: '' },
        { campo: 'deuda_total', valor: '' },
        { campo: 'deuda_no_vencida', valor: '' }
      ],
      orden: [{ campo: '', valor: '' }]
    })
  }

  const handleDeudaChange = (e: SelectChangeEvent) => {
    const estado = e.target.value
    setEstadoDeudaCliente(estado)

    let deudaTotal = ''
    let deudaVencida = ''
    let deudaNoVencida = ''

    if (estado === 'TOTAL') {
      deudaTotal = 'true'
    } else if (estado === 'VENCIDA') {
      deudaVencida = 'true'
    } else if (estado === 'NO VENCIDA') {
      deudaNoVencida = 'true'
    }

    const data = {
      ...datosQueryParams,
      filtros: [
        { campo: 'nombre', valor: nombreCliente },
        { campo: 'numero_documento', valor: documentoCliente },
        { campo: 'deuda_vencida', valor: deudaVencida },
        { campo: 'deuda_total', valor: deudaTotal },
        { campo: 'deuda_no_vencida', valor: deudaNoVencida }
      ]
    }

    setQueryParams(data as SaldoClienteFiltrosDTO)
  }

  const filtrosFiltrados = datosQueryParams?.filtros?.filter(
    filtro => filtro.campo !== '' && filtro.valor !== ''
  )

  const data = {
    ...datosQueryParams,
    filtros: filtrosFiltrados,
    orden: selectionOrden ? [selectionOrden] : []
  }

  const onBlurInput = () => setQueryParams(data as SaldoClienteFiltrosDTO)

  const cleanNombreCliente = () => {
    const estado = estadoDeudaCliente

    const { deudaTotal, deudaVencida, deudaNoVencida } = inicializarFiltrosDeuda(estado)

    const nuevosFiltros = [
      { campo: 'nombre', valor: '' },
      { campo: 'numero_documento', valor: documentoCliente },
      { campo: 'deuda_vencida', valor: deudaVencida },
      { campo: 'deuda_total', valor: deudaTotal },
      { campo: 'deuda_no_vencida', valor: deudaNoVencida }
    ]

    setNombreCliente('')
    reset({
      ...datosQueryParams,
      filtros: nuevosFiltros
    })

    const data = {
      ...datosQueryParams,
      filtros: nuevosFiltros
    }

    setQueryParams(data as SaldoClienteFiltrosDTO)
  }

  const cleanDeudaVencida = () => {
    const estado = ''

    const { deudaTotal, deudaVencida, deudaNoVencida } = inicializarFiltrosDeuda(estado)

    const nuevosFiltros = [
      { campo: 'nombre', valor: nombreCliente },
      { campo: 'numero_documento', valor: documentoCliente },
      { campo: 'deuda_vencida', valor: deudaVencida },
      { campo: 'deuda_total', valor: deudaTotal },
      { campo: 'deuda_no_vencida', valor: deudaNoVencida }
    ]

    setEstadoDeudaCliente('')
    reset({
      ...datosQueryParams,
      filtros: nuevosFiltros
    })

    const data = {
      ...datosQueryParams,
      filtros: nuevosFiltros
    }

    setQueryParams(data as SaldoClienteFiltrosDTO)
  }

  const cleanNumeroDocumento = () => {
    setDocumentoCliente('')

    const { deudaTotal, deudaVencida, deudaNoVencida } = inicializarFiltrosDeuda(estadoDeudaCliente)

    const nuevosFiltros = [
      { campo: 'nombre', valor: nombreCliente },
      { campo: 'numero_documento', valor: '' },
      { campo: 'deuda_vencida', valor: deudaVencida },
      { campo: 'deuda_total', valor: deudaTotal },
      { campo: 'deuda_no_vencida', valor: deudaNoVencida }
    ]

    reset({
      ...datosQueryParams,
      filtros: nuevosFiltros
    })

    const data = {
      ...datosQueryParams,
      filtros: nuevosFiltros
    }

    setQueryParams(data as SaldoClienteFiltrosDTO)
  }

  const CHIPS = [
    {
      id: '01',
      show: Boolean(nombreCliente),
      label: `Nombre Cliente: ${nombreCliente}`,
      onDelete: cleanNombreCliente
    },
    {
      id: '02',
      show: Boolean(documentoCliente),
      label: `Documento: ${documentoCliente}`,
      onDelete: cleanNumeroDocumento
    },
    {
      id: '03',
      show: Boolean(estadoDeudaCliente),
      label: `Deuda Vencida: ${estadoDeudaCliente}`,
      onDelete: cleanDeudaVencida
    }
  ]

  const onSubmit = (dataForm: SaldoClienteFiltrosDTO) => {
    const estado = dataForm.filtros?.[2].valor || ''

    const { deudaTotal, deudaVencida, deudaNoVencida } = inicializarFiltrosDeuda(estado)

    setQueryParams({
      ...dataForm,
      filtros: [
        { campo: 'nombre', valor: dataForm.filtros?.[0].valor || '' },
        { campo: 'numero_documento', valor: dataForm.filtros?.[1].valor || '' },
        { campo: 'deuda_vencida', valor: deudaVencida },
        { campo: 'deuda_total', valor: deudaTotal },
        { campo: 'deuda_no_vencida', valor: deudaNoVencida }
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
            {/** nombre cliente */}
            <Grid item xs={12} sm={3}>
              <FormControl fullWidth size='small'>
                <Controller
                  name='filtros.0.valor'
                  control={control}
                  render={({ field }) => {
                    setNombreCliente(field.value || '')

                    return (
                      <TextField
                        {...field}
                        placeholder='Nombre Cliente'
                        error={Boolean(errors.filtros?.[0]?.valor)}
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
                {errors.filtros?.[0]?.valor && (
                  <FormHelperText sx={{ color: 'error.main' }} id='validation-schema-first-name'>
                    {errors.filtros[0].valor.message?.toString()}
                  </FormHelperText>
                )}
              </FormControl>
            </Grid>

            {/** numero documento */}
            <Grid item xs={12} sm={3}>
              <FormControl fullWidth size='small'>
                <Controller
                  name='filtros.1.valor'
                  control={control}
                  render={({ field }) => {
                    setDocumentoCliente(field.value || '')

                    return (
                      <TextField
                        {...field}
                        placeholder='Número documento cliente'
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

            {/** estado */}
            <Grid item xs={12} sm={3}>
              <FormControl fullWidth size='small'>
                <InputLabel id='select-label'>Deuda</InputLabel>
                <Select
                  label='filtros.2.campo'
                  placeholder='Escoge el estado'
                  value={estadoDeudaCliente}
                  id='stepper-alternative-personal-select'
                  onChange={handleDeudaChange}
                  labelId='stepper-alternative-personal-select-label'
                  error={Boolean(errors.filtros?.[2]?.valor)}
                >
                  {DEUDA?.map(({ value, label }) => (
                    <MenuItem key={label} value={value}>
                      {label}
                    </MenuItem>
                  ))}
                </Select>
                {errors.filtros?.[2]?.valor && (
                  <FormHelperText sx={{ color: 'error.main' }} id='validation-schema-first-name'>
                    {errors.filtros?.[2]?.valor?.message?.toString()}
                  </FormHelperText>
                )}
              </FormControl>
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
export default memo(SaldosClientesFiltrosComponent)
