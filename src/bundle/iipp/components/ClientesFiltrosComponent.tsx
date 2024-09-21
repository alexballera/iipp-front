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
import { ESTADO_CLIENTE } from 'src/@core/constants'
import { useAppContext } from 'src/@core/context/AppContext'

//** Custom Components */
import HeaderFiltrosComponent from 'src/@core/components/HeaderFiltrosComponent'
import {
  ClienteFiltrosProps,
  ClienteFiltrosDTO,
  ClientesFiltrosIS as defaultValues
} from '../domain/clientesModel'

function ClientesFiltrosComponent({ queryParams, setQueryParams }: ClienteFiltrosProps) {
  //** Hooks */
  const [razonSocial, setRazonSocial] = useState<string>('')
  const [numeroDocumento, setNumeroDocumento] = useState<string>('')
  const [estadoCliente, setEstadoCliente] = useState<string>('')
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

  const estado = estadoCliente === 'COMPLETO' ? true : false

  const datosQueryParams = {
    ...queryParams,
    filtros: [
      { campo: 'cliente_completo', valor: estado },
      { campo: 'numero_documento', valor: numeroDocumento },
      { campo: 'nombre', valor: razonSocial }
    ],
    orden: selectionOrden ? [selectionOrden] : []
  } as ClienteFiltrosDTO

  const clearFields = () => {
    setEstadoCliente('')
    setRazonSocial('')
    setNumeroDocumento('')
    setSelectionOrden({ campo: '', valor: '' })

    reset(defaultValues)

    setQueryParams({
      ...defaultValues,
      filtros: [
        { campo: 'cliente_completo', valor: '' },
        { campo: 'numero_documento', valor: '' },
        { campo: 'nombre', valor: '' }
      ],
      orden: [{ campo: '', valor: '' }]
    })
  }

  const handleEstadoChange = (e: SelectChangeEvent) => {
    setEstadoCliente(e.target.value)
    const estado = e.target.value === 'COMPLETO' ? true : false
    const data = {
      ...datosQueryParams,
      filtros: [
        { campo: 'cliente_completo', valor: estado },
        { campo: 'numero_documento', valor: numeroDocumento },
        { campo: 'nombre', valor: razonSocial }
      ]
    }

    setQueryParams(data as ClienteFiltrosDTO)
  }

  const filtrosFiltrados = datosQueryParams?.filtros?.filter(
    filtro => filtro.campo !== '' && filtro.valor !== ''
  )

  const data = {
    ...datosQueryParams,
    filtros: filtrosFiltrados,
    orden: selectionOrden ? [selectionOrden] : []
  }

  const onBlurInput = () => setQueryParams(data as ClienteFiltrosDTO)

  const cleanHabilitado = () => {
    setEstadoCliente('')
    reset({
      ...datosQueryParams,
      filtros: [
        { campo: 'cliente_completo', valor: '' },
        { campo: 'numero_documento', valor: numeroDocumento },
        { campo: 'nombre', valor: razonSocial }
      ]
    })
    const data = {
      ...datosQueryParams,
      filtros: [
        { campo: 'cliente_completo', valor: '' },
        { campo: 'numero_documento', valor: numeroDocumento },
        { campo: 'nombre', valor: razonSocial }
      ]
    }
    setQueryParams(data as ClienteFiltrosDTO)
  }

  const cleanRazonSocial = () => {
    setRazonSocial('')
    reset({
      ...datosQueryParams,
      filtros: [
        { campo: 'cliente_completo', valor: estadoCliente },
        { campo: 'numero_documento', valor: numeroDocumento },
        { campo: 'nombre', valor: '' }
      ]
    })

    const data = {
      ...datosQueryParams,
      filtros: [
        { campo: 'cliente_completo', valor: estadoCliente },
        { campo: 'numero_documento', valor: numeroDocumento },
        { campo: 'nombre', valor: '' }
      ]
    }
    setQueryParams(data as ClienteFiltrosDTO)
  }

  const cleanNumeroDocumento = () => {
    setNumeroDocumento('')
    reset({
      ...datosQueryParams,
      filtros: [
        { campo: 'cliente_completo', valor: estadoCliente },
        { campo: 'numero_documento', valor: '' },
        { campo: 'nombre', valor: razonSocial }
      ]
    })
    const data = {
      ...datosQueryParams,
      filtros: [
        { campo: 'cliente_completo', valor: estadoCliente },
        { campo: 'numero_documento', valor: '' },
        { campo: 'nombre', valor: razonSocial }
      ]
    }
    setQueryParams(data as ClienteFiltrosDTO)
  }

  const CHIPS = [
    {
      id: '01',
      show: Boolean(estadoCliente),
      label: `Estado: ${estadoCliente}`,
      onDelete: cleanHabilitado
    },
    {
      id: '02',
      show: Boolean(razonSocial),
      label: `Nombre Cliente: ${razonSocial}`,
      onDelete: cleanRazonSocial
    },
    {
      id: '03',
      show: Boolean(numeroDocumento),
      label: `Documento: ${numeroDocumento}`,
      onDelete: cleanNumeroDocumento
    }
  ]

  const onSubmit = (dataForm: ClienteFiltrosDTO) => {
    setQueryParams({
      ...dataForm,
      filtros: [
        { campo: 'cliente_completo', valor: dataForm.filtros?.[0].valor || estadoCliente },
        { campo: 'numero_documento', valor: dataForm.filtros?.[1].valor || '' },
        { campo: 'nombre', valor: dataForm.filtros?.[2].valor || '' }
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
                  value={estadoCliente}
                  id='stepper-alternative-personal-select'
                  onChange={handleEstadoChange}
                  labelId='stepper-alternative-personal-select-label'
                  error={Boolean(errors.filtros?.[0]?.valor)}
                >
                  {ESTADO_CLIENTE?.map(({ value, label }) => (
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

            {/** nombre */}
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
                        placeholder='Nombre Cliente'
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
export default memo(ClientesFiltrosComponent)
