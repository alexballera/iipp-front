//** Base Imports */
import { useRouter } from 'next/router'
import { ChangeEvent, useState } from 'react'

//** MUI Imports */
import {
  Box,
  Checkbox,
  FormControl,
  FormControlLabel,
  FormGroup,
  FormHelperText,
  Grid,
  InputAdornment,
  InputLabel,
  MenuItem,
  Select,
  Switch,
  TextField
} from '@mui/material'

// ** Third Party Imports
import { yupResolver } from '@hookform/resolvers/yup'
import { Controller, useForm } from 'react-hook-form'
import * as yup from 'yup'

//** Types, Constant, Utils, Contexts & Enums Imports */
import { REQUIRED_FIELD, VALORES_ALICUOTA } from 'src/@core/constants'
import { useAppContext } from 'src/@core/context/AppContext'
import { AccionesEnum } from 'src/@core/enums'
import useMount from 'src/@core/hooks/useMount'
import { FetchErrorTypes, PaginationDataIS } from 'src/@core/types'
import { showApiSuccessMessage, showMessageError } from 'src/@core/utils'

// ** Custom Components
import BreadcrumbsComponent from 'src/@core/components/BreadcrumbsComponent'
import ButtonsActionsForm from 'src/@core/components/ButtonsActionsForm'
import LayoutInputButton from 'src/@core/components/LayoutInputButton'
import Loader from 'src/@core/components/Loader'
import TitleSectionForm from 'src/@core/components/TitleSectionForm'
import { useSelector } from 'src/@core/configs/store'
import FormLayout from 'src/@core/layouts/FormLayout'
import {
  useCreateConceptoFacturacionMutation,
  useUpdateConceptoFacturacionMutation
} from 'src/bundle/parametrias/concepto-facturacion/data/conceptoFacturacionApiService'
import {
  ConceptoFacturacionDTO,
  GrupoConceptoFacturacion,
  ImpuestoConceptoFacturacionDTO,
  conceptoFacturacionIS as defaultValues
} from 'src/bundle/parametrias/concepto-facturacion/domain/conceptoFacturacionModel'
import { useFetchProductosQuery } from 'src/bundle/parametrias/productos/data/productosApiService'
import { MonedaEnum } from 'src/bundle/shared/domain'

const schema = yup.object().shape({
  nombre: yup.string().required(REQUIRED_FIELD),
  impuesto: yup.object().shape({
    nombre: yup.string(),
    alicuota: yup.number().oneOf([0, 21]),
    cuenta_contable: yup.number()
  }),
  cuenta_contable: yup.string().required(REQUIRED_FIELD),
  producto: yup.string(),
  grupo: yup.string()
})

const initialState = {
  habilitado: true,
  fideicomiso: false,
  cedears: false,
  custodia: false,
  fondos: false,
  usd: false,
  ars: false
}

function FormConceptoFacturacion() {
  const [estado, setEstado] = useState(initialState)

  //** Hooks */
  const router = useRouter()
  const accionForm = router?.query?.params![0]

  const { state, setState } = useAppContext()
  const [crearConceptoFacturacion, { isLoading: isCreating }] =
    useCreateConceptoFacturacionMutation()
  const [editarConceptoFacturacion, { isLoading: isUpdating }] =
    useUpdateConceptoFacturacionMutation()
  const [productosSelected, setProductosSelected] = useState<string[]>([])

  const { data: productos, isFetching: isFetchingProductos } =
    useFetchProductosQuery(PaginationDataIS)

  const {
    CONCEPTO_FACTURACION: { conceptoFacturacion }
  } = useSelector(state => state)

  //** Hooks */
  const {
    control,
    handleSubmit,
    formState: { errors },
    getValues,
    setError,
    clearErrors,
    reset
  } = useForm({
    defaultValues,
    mode: 'onChange',
    resolver: yupResolver(schema)
  })

  useMount(() => {
    if (accionForm === AccionesEnum.EDITAR_CONCEPTO_FACTURACION) {
      setEstado({
        habilitado: conceptoFacturacion.habilitado || false,
        fideicomiso: conceptoFacturacion?.productos?.includes('FIDEICOMISO') || false,
        cedears: conceptoFacturacion?.productos?.includes('CEDEARS') || false,
        custodia: conceptoFacturacion?.productos?.includes('CUSTODIA') || false,
        fondos: conceptoFacturacion?.productos?.includes('FONDOS') || false,
        usd: conceptoFacturacion?.impuesto?.moneda?.includes('USD') || false,
        ars: conceptoFacturacion?.impuesto?.moneda?.includes('ARS') || false
      })
      reset(conceptoFacturacion)
      setProductosSelected(conceptoFacturacion.productos || [])
    }
  })

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setEstado({
      ...estado,
      [event.target.name]: event.target.checked
    })
  }

  const handleGoBack = () => {
    setState({
      ...state,
      accion: ''
    })
    router.back()
  }

  const handleLimpiarCampos = () => {
    reset(defaultValues)
  }

  const handleCreateConcepto = (body: ConceptoFacturacionDTO) => {
    setState({
      ...state,
      created: false
    })

    crearConceptoFacturacion(body)
      .unwrap()
      .then(() => {
        showApiSuccessMessage('Concepto Facturación Creado')
        handleLimpiarCampos()
        setState({
          ...state,
          created: true
        })
      })
      .catch((error: FetchErrorTypes) => showMessageError(error))
  }

  const handleUpdateConcepto = (dataForm: ConceptoFacturacionDTO) => {
    setState({
      ...state,
      updated: false
    })
    editarConceptoFacturacion(dataForm)
      .unwrap()
      .then(() => {
        showApiSuccessMessage('Concepto Facturación Editado')
        setState({
          ...state,
          updated: true
        })
      })
      .catch((error: FetchErrorTypes) => showMessageError(error))
  }

  const breadCrumbEditar = [
    {
      id: '01',
      text: conceptoFacturacion?.nombre || 'Sin datos',
      link: () => router.back()
    },
    {
      id: '02',
      text: 'EDITAR CONCEPTO FACTURACION',
      link: undefined
    }
  ]

  const breadCrumbCrear = [
    {
      id: '01',
      text: 'NUEVO CONCEPTO',
      link: undefined
    }
  ]

  const getBreadCrumbItems = () => {
    if (accionForm === AccionesEnum.CREAR_CONCEPTO_FACTURACION) return breadCrumbCrear
    if (accionForm === AccionesEnum.EDITAR_CONCEPTO_FACTURACION) return breadCrumbEditar

    return []
  }

  const onSubmit = (dataForm: ConceptoFacturacionDTO) => {
    const moneda = []

    if (productosSelected.length === 0) {
      setError('producto', {
        type: 'manual',
        message: 'El campo producto es requerido'
      })

      return
    }

    if (estado.usd) moneda.push(MonedaEnum.USD)
    if (estado.ars) moneda.push(MonedaEnum.ARS)

    const impuesto: ImpuestoConceptoFacturacionDTO = {
      nombre: dataForm.impuesto?.nombre || '',
      alicuota: dataForm.impuesto?.alicuota || 0,
      cuenta_contable: dataForm.impuesto?.cuenta_contable || 0,
      moneda
    }

    const body = {
      ...dataForm,
      impuesto,
      habilitado: estado.habilitado,
      productos: productosSelected
    }

    if (accionForm === AccionesEnum.CREAR_CONCEPTO_FACTURACION) {
      handleCreateConcepto(body)

      return
    }

    if (accionForm === AccionesEnum.EDITAR_CONCEPTO_FACTURACION) {
      handleUpdateConcepto(body)

      return
    }

    return
  }

  const handleAgregarProducto = () => {
    const producto = getValues().producto || ''

    if (producto === '') {
      setError('producto', {
        type: 'manual',
        message: 'El campo producto es requerido'
      })

      return
    }

    if (productosSelected.includes(producto)) {
      setError('producto', {
        type: 'manual',
        message: 'El producto ya fue agregado'
      })

      return
    }

    setProductosSelected([...productosSelected, producto])

    setTimeout(() => {
      clearErrors('producto')
    }, 3000)
  }

  const handleQuitarProducto = (producto: string) => {
    const productos = productosSelected.filter(p => p !== producto)
    setProductosSelected(productos)
  }

  return (
    <>
      <BreadcrumbsComponent breadCrumbItems={getBreadCrumbItems()} />
      <FormLayout title={'CREAR CONCEPTO'}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Grid container spacing={5}>
            {/** nombre concepto */}
            <Grid item xs={12} sm={6}>
              <FormControl fullWidth>
                <Controller
                  name='nombre'
                  control={control}
                  rules={{ required: true }}
                  render={({ field: { value, onChange } }) => (
                    <TextField
                      value={value}
                      label='Nombre Concepto *'
                      onChange={onChange}
                      type='text'
                      placeholder='Escriba nombre concepto'
                      aria-describedby='stepper-linear-account-email'
                      disabled={isCreating || isUpdating}
                    />
                  )}
                />
                {errors.nombre && (
                  <FormHelperText sx={{ color: 'error.main' }} id='validation-schema-nombre'>
                    {errors.nombre.message}
                  </FormHelperText>
                )}
              </FormControl>
            </Grid>

            {/** producto */}
            <LayoutInputButton
              disabled={state.loading}
              handleAddItem={handleAgregarProducto}
              isError={Boolean(errors.producto)}
              listSelected={productosSelected}
              handleRemoveItem={item => handleQuitarProducto(item)}
              loading={false}
              input={
                <FormControl fullWidth>
                  <InputLabel
                    id='stepper-linear-personal-pais'
                    error={Boolean(errors.productos)}
                    htmlFor='stepper-linear-personal-pais'
                  >
                    Producto *
                  </InputLabel>
                  <Controller
                    name='producto'
                    control={control}
                    rules={{ required: accionForm === AccionesEnum.CREAR_CONCEPTO_FACTURACION }}
                    render={({ field: { value, onChange } }) => (
                      <Select
                        value={value || ''}
                        label='Producto *'
                        id='controlled-select'
                        onChange={onChange}
                        disabled={isFetchingProductos || isCreating || isUpdating}
                        labelId='controlled-select-label'
                        endAdornment={
                          <InputAdornment position='end'>
                            {isFetchingProductos && (
                              <Box sx={{ width: '58px' }}>
                                <Loader height='20px' size={20} />
                              </Box>
                            )}
                          </InputAdornment>
                        }
                      >
                        {productos?.registros.map(value => (
                          <MenuItem key={value.id} value={value.nombre}>
                            {value.nombre}
                          </MenuItem>
                        ))}
                      </Select>
                    )}
                  />
                  {errors.producto && (
                    <FormHelperText
                      sx={{ color: 'error.main' }}
                      id='validation-schema-idioma_factura'
                    >
                      {errors.producto.message}
                    </FormHelperText>
                  )}
                </FormControl>
              }
            />

            {/** grupo */}
            <Grid item xs={12} sm={6}>
              <FormControl fullWidth>
                <InputLabel
                  id='stepper-linear-personal-pais'
                  error={Boolean(errors.grupo)}
                  htmlFor='stepper-linear-personal-pais'
                >
                  Grupo
                </InputLabel>
                <Controller
                  name='grupo'
                  control={control}
                  rules={{ required: true }}
                  render={({ field: { value, onChange } }) => (
                    <Select
                      value={value}
                      label='Grupo *'
                      id='controlled-select'
                      onChange={onChange}
                      labelId='controlled-select-label'
                    >
                      {Object.values(GrupoConceptoFacturacion).map(value => (
                        <MenuItem key={value} value={value}>
                          {value}
                        </MenuItem>
                      ))}
                    </Select>
                  )}
                />
                {errors.grupo && (
                  <FormHelperText sx={{ color: 'error.main' }} id='validation-schema-grupo'>
                    {errors.grupo.message}
                  </FormHelperText>
                )}
              </FormControl>
            </Grid>

            {/** cuenta contable */}
            <Grid item xs={12} sm={6}>
              <FormControl fullWidth>
                <Controller
                  name='cuenta_contable'
                  control={control}
                  render={({ field: { value, onChange } }) => (
                    <TextField
                      label='Cuenta contable *'
                      placeholder='Ingresa la cuenta contable'
                      error={Boolean(errors.cuenta_contable)}
                      type='text'
                      value={value}
                      onChange={onChange}
                      aria-describedby='validation-schema-first-name'
                      disabled={isCreating || isUpdating}
                    />
                  )}
                />
                {errors.cuenta_contable && (
                  <FormHelperText sx={{ color: 'error.main' }} id='validation-schema-first-name'>
                    {errors.cuenta_contable.message}
                  </FormHelperText>
                )}
              </FormControl>
            </Grid>

            <Grid item xs={12}>
              <TitleSectionForm text='Impuesto' />
            </Grid>

            {/** nombre */}
            <Grid item sm={6}>
              <FormControl fullWidth>
                <Controller
                  name='impuesto.nombre'
                  control={control}
                  render={({ field: { value, onChange } }) => (
                    <TextField
                      label='Nombre impuesto *'
                      placeholder='Ingresa nombre impuesto'
                      value={value}
                      onChange={onChange}
                      aria-describedby='validation-schema-first-name'
                      disabled={isCreating || isUpdating}
                    />
                  )}
                />
              </FormControl>
            </Grid>

            {/** alicuota */}
            <Grid item sm={3}>
              <FormControl fullWidth>
                <InputLabel
                  id='stepper-linear-personal-pais'
                  error={Boolean(errors.impuesto?.alicuota)}
                  htmlFor='stepper-linear-personal-pais'
                >
                  Alicuota *
                </InputLabel>
                <Controller
                  name='impuesto.alicuota'
                  control={control}
                  render={({ field: { value, onChange } }) => (
                    <Select
                      value={value}
                      label='Alicuota *'
                      id='controlled-select'
                      onChange={onChange}
                      labelId='controlled-select-label'
                    >
                      {VALORES_ALICUOTA.map((value, index) => (
                        <MenuItem key={index * 2} value={value}>
                          {value}
                        </MenuItem>
                      ))}
                    </Select>
                  )}
                />
                {errors.impuesto?.alicuota && (
                  <FormHelperText
                    sx={{ color: 'error.main' }}
                    id='validation-schema-idioma_factura'
                  >
                    {errors.impuesto?.alicuota.message}
                  </FormHelperText>
                )}
              </FormControl>
            </Grid>

            {/** cuenta contable impuesto */}
            <Grid item sm={3}>
              <FormControl fullWidth>
                <Controller
                  name='impuesto.cuenta_contable'
                  control={control}
                  render={({ field: { value, onChange } }) => (
                    <TextField
                      label='Cuenta contable Impuesto *'
                      placeholder='Ingresa cuenta contable impuesto'
                      error={Boolean(errors.impuesto?.cuenta_contable)}
                      type='number'
                      value={value}
                      onChange={onChange}
                      aria-describedby='validation-schema-first-name'
                      disabled={isCreating || isUpdating}
                    />
                  )}
                />
                {errors.impuesto?.cuenta_contable && (
                  <FormHelperText sx={{ color: 'error.main' }} id='validation-schema-first-name'>
                    {errors.impuesto?.cuenta_contable.message}
                  </FormHelperText>
                )}
              </FormControl>
            </Grid>

            <Grid item xs={12}>
              <TitleSectionForm text='Moneda' />
            </Grid>

            {/* moneda */}
            <Grid item xs={12}>
              <FormControl>
                <FormGroup row>
                  <FormControlLabel
                    control={
                      <Checkbox
                        color='primary'
                        name='usd'
                        checked={estado.usd}
                        onChange={handleChange}
                        inputProps={{ 'aria-label': 'controlled' }}
                      />
                    }
                    label='USD'
                  />
                  <FormControlLabel
                    control={
                      <Checkbox
                        color='primary'
                        name='ars'
                        checked={estado.ars}
                        onChange={handleChange}
                        inputProps={{ 'aria-label': 'controlled' }}
                      />
                    }
                    label='ARS'
                  />
                </FormGroup>
              </FormControl>
            </Grid>

            {/** habilitado */}
            <Grid item xs={2}>
              <FormControl fullWidth component='fieldset' variant='standard'>
                <FormControlLabel
                  sx={{ pl: 2 }}
                  control={
                    <Switch
                      checked={estado.habilitado}
                      onChange={handleChange}
                      inputProps={{ 'aria-label': 'controlled' }}
                      name='habilitado'
                    />
                  }
                  label={estado.habilitado ? 'Habiltado' : 'Deshabilitado'}
                />
              </FormControl>
            </Grid>

            {/** botón de acción */}
            <Grid item xs={12}>
              <ButtonsActionsForm
                rigthTextButton='Guardar'
                rigthColorButton='primary'
                loading={isCreating || isUpdating}
                disabled={isCreating || isUpdating}
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

export default FormConceptoFacturacion
