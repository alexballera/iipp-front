//** Base Imports */
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'

//** MUI Imports */
import {
  Box,
  Button,
  FormControl,
  FormHelperText,
  Grid,
  IconButton,
  InputLabel,
  MenuItem,
  Select,
  Stack,
  Tooltip,
  Typography
} from '@mui/material'

// ** Third Party Imports
import { yupResolver } from '@hookform/resolvers/yup'
import { Controller, useForm } from 'react-hook-form'
import * as yup from 'yup'

//** Types, Constant, Utils, Contexts & Enums Imports */
import { useAppContext } from 'src/@core/context/AppContext'
import { AccionesEnum, CategoriaArchivoEnum, UbicacionDocumentoEnum } from 'src/@core/enums'
import {
  removeSlashesAndScores,
  showApiErrorMessage,
  showApiSuccessMessage,
  showMessageError
} from 'src/@core/utils'

// ** Custom Components
import { nanoid } from '@reduxjs/toolkit'
import { CloseCircleOutline, Upload } from 'mdi-material-ui'
import BreadcrumbsComponent from 'src/@core/components/BreadcrumbsComponent'
import ButtonsActionsForm from 'src/@core/components/ButtonsActionsForm'
import Loader from 'src/@core/components/Loader'
import TitleSectionForm from 'src/@core/components/TitleSectionForm'
import { APP_ROUTE, ARCHIVO_ROUTE, REQUIRED_FIELD } from 'src/@core/constants'
import FormLayout from 'src/@core/layouts/FormLayout'
import MultipartUpload from 'src/@core/lib/MultipartUpload'
import { FetchErrorTypes } from 'src/@core/types'
import { useCrearOperacionMutation } from 'src/bundle/parametrias/operaciones/data/operacionesApiService'
import {
  CrearOperacionDTO,
  operacionesIS as defaultValues
} from 'src/bundle/parametrias/operaciones/domain/operacionesModel'
import { Archivo } from 'src/bundle/shared/domain'

const schema = yup.object().shape({
  categoria: yup.string().required(REQUIRED_FIELD),
  producto: yup.string().required(REQUIRED_FIELD)
})

interface TipoArchivoOption {
  value: string
}

function FormOperaciones() {
  const [errorArchivo, setErrorArchivo] = useState<boolean>(false)
  const [archivo_entrada, setArchivo] = useState<Archivo[]>([])
  const [tipoArchivosOptions, setTipoArchivosOptions] = useState<TipoArchivoOption[]>([])
  const [state, setState] = useState({
    loading: false,
    loadingArchivo: false
  })
  const URL = `${process.env.NEXT_PUBLIC_API_URL}${APP_ROUTE}${ARCHIVO_ROUTE}`

  //** Hooks */
  const router = useRouter()
  const { state: appState, setState: setAppState } = useAppContext()
  const [crearOperacion, { isLoading: isCreating }] = useCrearOperacionMutation()

  //** Hooks */
  const {
    control,
    handleSubmit,
    reset,
    register,
    watch,
    setValue,
    formState: { errors }
  } = useForm({
    defaultValues,
    mode: 'onChange',
    resolver: yupResolver(schema)
  })

  const watchArchivo = watch().archivo_entrada
  const watchCategoria = watch().categoria
  const watchProducto = watch().producto
  const descripcionArchivo = watch('archivo_entrada.descripcion') || ''

  useEffect(() => {
    const getCategoriaOperaciones = () => {
      switch (watchCategoria) {
        case 'OPERACIONES_BONY' as string:
          return CategoriaArchivoEnum.OPERACIONES_BONY
        case 'OPERACIONES_SGM' as string:
          return CategoriaArchivoEnum.OPERACIONES_SGM
        case 'OPERACIONES_SGM' as string:
          return CategoriaArchivoEnum.OPERACIONES_TRESURY
        default:
          return CategoriaArchivoEnum.OPERACIONES_TRESURY
      }
    }

    const getNombreArchivo = () => {
      if (watchProducto === 'CUSTODIA') {
        return getCategoriaOperaciones()
      } else {
        return watchProducto
      }
    }

    const mpu = new MultipartUpload(URL, UbicacionDocumentoEnum.GENERICO, getCategoriaOperaciones())
    if (watchArchivo?.length) {
      setState({
        ...state,
        loading: true,
        loadingArchivo: true
      })
      mpu
        .multipartUpload(watchArchivo[0], nanoid(), getCategoriaOperaciones(), true)
        .then((res: any) => {
          const archivo: Archivo[] = [
            {
              id: nanoid(),
              ubicacion: res.url,
              nombre_original: `${getNombreArchivo()}-${watchArchivo[0].name}`,
              descripcion: descripcionArchivo
            }
          ]
          setArchivo(archivo)
          setValue('archivo_entrada.descripcion', '')
        })
        .catch(() => showApiErrorMessage('Ha ocurrido un error al cargar el archivo'))
        .finally(() => {
          setState({
            ...state,
            loading: false,
            loadingArchivo: false
          })
        })
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [watchArchivo])

  const resetArchivo = () => {
    reset({
      categoria: watchCategoria,
      producto: watchProducto,
      archivo_entrada: []
    })
    setArchivo([])
  }

  const handleGoBack = () => {
    setErrorArchivo(false)
    setAppState({
      ...appState,
      accion: ''
    })
    router.back()
  }

  const handleLimpiarCampos = () => {
    reset({ ...defaultValues, archivo_entrada: [] })
    setArchivo([])
  }

  const handleProductChange = (event: any) => {
    const selectedValue = event.target.value

    if (selectedValue === 'CUSTODIA') {
      setTipoArchivosOptions([
        { value: 'OPERACIONES_BONY' },
        { value: 'OPERACIONES_SGM' },
        { value: 'OPERACIONES_TRESURY' }
      ])
    } else {
      setTipoArchivosOptions([])
    }
  }

  const breadCrumbCrear = [
    {
      id: '01',
      text: 'NUEVA OPERACIÓN',
      link: undefined
    }
  ]

  const getBreadCrumbItems = () => {
    if (appState.accion === AccionesEnum.CREAR_OPERACION) return breadCrumbCrear

    return []
  }

  const onSubmit = (dataForm: CrearOperacionDTO) => {
    if (!archivo_entrada || archivo_entrada.length === 0) {
      // Mostrar mensaje de error o realizar la acción que desees cuando no hay archivo seleccionado
      showApiErrorMessage('Seleccione un archivo antes de guardar')

      return
    }

    const body = {
      ...dataForm,
      archivo_entrada
    }

    if (appState.accion === AccionesEnum.CREAR_OPERACION) {
      crearOperacion(body)
        .unwrap()
        .then(() => {
          showApiSuccessMessage('Informacion cargada correctamente')
          handleLimpiarCampos()
        })
        .catch((error: FetchErrorTypes) => showMessageError(error))
    }

    return
  }

  const PRODUCTO = [
    { value: 'CEDEARS' },
    { value: 'FIDEICOMISO' },
    { value: 'FONDOS' },
    { value: 'CUSTODIA' }
  ]

  return (
    <>
      <BreadcrumbsComponent breadCrumbItems={getBreadCrumbItems()} />
      <FormLayout title={removeSlashesAndScores(appState.accion || '')}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Grid container spacing={5}>
            <Grid item xs={12}>
              <TitleSectionForm text='Productos' />
            </Grid>

            <Grid item xs={12} sm={6}>
              <FormControl fullWidth>
                <InputLabel id='producto' error={Boolean(errors.producto)} htmlFor='producto'>
                  Producto *
                </InputLabel>
                <Controller
                  name='producto'
                  control={control}
                  rules={{ required: true }}
                  render={({ field: { value, onChange } }) => (
                    <Select
                      value={value}
                      label='Producto *'
                      id='controlled-select'
                      onChange={event => {
                        onChange(event)
                        handleProductChange(event)
                      }}
                      labelId='controlled-select-label'
                    >
                      {PRODUCTO.map(item => (
                        <MenuItem key={item.value} value={item.value}>
                          {item.value}
                        </MenuItem>
                      ))}
                    </Select>
                  )}
                />
                {errors.producto && (
                  <FormHelperText sx={{ color: 'error.main' }} id='validation-schema-tipo_cliente'>
                    {errors.producto.message}
                  </FormHelperText>
                )}
              </FormControl>
            </Grid>

            <Grid item xs={12}>
              <Grid container spacing={5}>
                <Grid item xs={12}>
                  <TitleSectionForm text='Tipo Archivo' />
                </Grid>

                <Grid item xs={12} sm={6}>
                  <FormControl fullWidth>
                    <InputLabel
                      id='tipo_archivo'
                      error={Boolean(errors.categoria)}
                      htmlFor='tipo_archivo'
                    >
                      Tipo archivo *
                    </InputLabel>
                    <Controller
                      name='categoria'
                      control={control}
                      rules={{ required: true }}
                      render={({ field: { value, onChange } }) => (
                        <Select
                          value={value}
                          label={'Tipo archivo *'}
                          id='controlled-select'
                          onChange={onChange}
                          labelId='controlled-select-label'
                          disabled={!tipoArchivosOptions.length}
                        >
                          {tipoArchivosOptions.map(item => (
                            <MenuItem key={item.value} value={item.value}>
                              {removeSlashesAndScores(item.value)}
                            </MenuItem>
                          ))}
                        </Select>
                      )}
                    />
                    {errors.categoria && (
                      <FormHelperText
                        sx={{ color: 'error.main' }}
                        id='validation-schema-tipo_cliente'
                      >
                        {errors.categoria.message}
                      </FormHelperText>
                    )}
                  </FormControl>
                </Grid>

                {/** archivo */}
                <Grid item xs={12}>
                  <Stack direction='row' alignItems='center' flexWrap='wrap'>
                    {archivo_entrada[0] ? (
                      <Stack
                        key={archivo_entrada?.[0]?.id}
                        direction='row'
                        alignItems='center'
                        sx={{ maxWidth: '450px' }}
                      >
                        <Typography
                          variant='body2'
                          component='span'
                          sx={{ color: theme => theme.palette.primary.main }}
                        >
                          {archivo_entrada?.[0]?.nombre_original}
                        </Typography>
                        <Tooltip arrow title='Quitar archivo'>
                          <IconButton
                            onClick={resetArchivo}
                            color='error'
                            aria-label='upload picture'
                            component='label'
                          >
                            <CloseCircleOutline fontSize='small' />
                          </IconButton>
                        </Tooltip>
                      </Stack>
                    ) : (
                      <></>
                    )}
                    {state.loadingArchivo && (
                      <Box sx={{ width: '58px' }}>
                        <Loader height='20px' size={20} />
                      </Box>
                    )}
                  </Stack>
                </Grid>
              </Grid>
            </Grid>
            <Grid item xs={12}>
              <Typography
                sx={{ color: `'error.main' : ''`, textAlign: 'left', mb: 4 }}
                id='validation-schema-first-name'
              >
                Seleccione un archivo
              </Typography>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Stack direction='row' alignItems='center'>
                <FormControl fullWidth>
                  <Button
                    color={errorArchivo ? 'error' : 'primary'}
                    onClick={() => setErrorArchivo(false)}
                    variant='outlined'
                    component='label'
                    size='large'
                    endIcon={<Upload />}
                  >
                    Adjuntar Archivo
                    <input
                      placeholder='Ingresa archivo'
                      aria-describedby='validation-schema-first-name'
                      hidden
                      accept='.xlsx, .xls'
                      type='file'
                      multiple
                      {...register('archivo_entrada', {
                        required: true
                      })}
                      disabled={state.loading}
                    />
                  </Button>
                </FormControl>
              </Stack>
            </Grid>

            {/** botón de acción */}
            <Grid item xs={12}>
              <ButtonsActionsForm
                rigthTextButton='Guardar'
                rigthColorButton='primary'
                loading={isCreating}
                disabled={isCreating}
                leftTextButton='Cancelar'
                handleBack={handleGoBack}
              />
            </Grid>
          </Grid>
        </form>
      </FormLayout>
    </>
  )
}

export default FormOperaciones
