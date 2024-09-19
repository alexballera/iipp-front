// ** Base Imports
import { useRouter } from 'next/router'
import { ChangeEvent, useEffect, useState } from 'react'

// ** MUI Imports
import { Grid, SelectChangeEvent } from '@mui/material'

// ** Third Party Imports
import { yupResolver } from '@hookform/resolvers/yup'
import { nanoid } from '@reduxjs/toolkit'
import { useForm } from 'react-hook-form'
import * as yup from 'yup'

//** Types, Enums, Utils & Constants Imports */
import { useSelector } from 'src/@core/configs/store'
import { APP_ROUTE, ARCHIVO_ROUTE, ONLY_NUMBERS } from 'src/@core/constants'
import { useAppContext } from 'src/@core/context/AppContext'
import { AccionesEnum, CategoriaArchivoEnum, UbicacionDocumentoEnum } from 'src/@core/enums'
import { FetchErrorTypes } from 'src/@core/types'
import {
  direccionSchema,
  removeSlashesAndScores,
  showApiErrorMessage,
  showApiSuccessMessage,
  showMessageError
} from 'src/@core/utils'
import useClientesHook from 'src/bundle/iipp/components/useClientesHook'

//** Customs Components Imports */
import { AccountTie } from 'mdi-material-ui'
import BreadcrumbsComponent from 'src/@core/components/BreadcrumbsComponent'
import ButtonsActionsForm from 'src/@core/components/ButtonsActionsForm'
import { DateRangeIS, DateRangeTypes } from 'src/@core/components/DateRangeComponent'
import FormLayout from 'src/@core/layouts/FormLayout'
import MultipartUpload from 'src/@core/lib/MultipartUpload'
import ClienteArchivoForm from 'src/bundle/iipp/components/form/ClienteArchivoForm'
import ClienteContactoForm from 'src/bundle/iipp/components/form/ClienteContactoForm'
import ClienteCuentaForm from 'src/bundle/iipp/components/form/ClienteCuentaForm'
import ClienteDireccionForm from 'src/bundle/iipp/components/form/ClienteDireccionForm'
import ClienteImpuestosForm from 'src/bundle/iipp/components/form/ClienteImpuestosForm'
import ClienteProductosForm from 'src/bundle/iipp/components/form/ClienteProductosForm'
import ClienteTipoForm from 'src/bundle/iipp/components/form/ClienteTipoForm'
import { useCreateIippMutation, useUpdateIippMutation } from 'src/bundle/iipp/data/iippApiService'
import {
  ClienteDTO,
  clienteIS,
  DireccionIS,
  ImpuestoTypesIS
} from 'src/bundle/iipp/domain/iippModel'
import { Archivo, ImpuestoTypes } from 'src/bundle/shared/domain'

const schema = yup.object().shape({
  nombre: yup.string(),
  minimo: yup.number().integer(ONLY_NUMBERS).typeError(ONLY_NUMBERS),
  email: yup.string().email('El correo es invalido'),
  telefono: yup.string(),
  nombre_referente: yup.string(),
  idioma_factura: yup.string(),
  tipo_cliente: yup.string(),
  moneda: yup.string(),
  documento: yup.string(),
  ...direccionSchema
})

function FormClientesPage() {
  //** States */
  const [codigoPostal, setCodigoPostal] = useState('')
  const [errorArchivo, setErrorArchivo] = useState<boolean>(false)
  const [documentos, setDocumentos] = useState<string[]>([])
  const [showCustomType, setShowCustomType] = useState(false)
  const [openDateRangeImpuesto, setOpenDateRangeImpuesto] = useState<boolean>(false)
  const [openDateRangePercepcion, setOpenDateRangePercepcion] = useState<boolean>(false)
  const [selectionDateRangeImpuesto, setSelectionDateRangeImpuesto] =
    useState<DateRangeTypes>(DateRangeIS)
  const [selectionDateRangePercepcion, setSelectionDateRangePercepcion] =
    useState<DateRangeTypes>(DateRangeIS)
  const [correos, setCorreos] = useState<string[]>([])
  const [percepciones, setPercepciones] = useState<ImpuestoTypes[]>([])
  const [impuestos, setImpuestos] = useState<ImpuestoTypes[]>([])
  const [archivos, setArchivos] = useState<Archivo[]>([])
  const [state, setState] = useState({
    isClienteBanco: false,
    fideicomisos: false,
    cedears: false,
    custodia: false,
    fondos: false,
    impuesto: ImpuestoTypesIS,
    percepcion: ImpuestoTypesIS,
    loading: false,
    loadingArchivo: false,
    categoriaArchivo: CategoriaArchivoEnum.CLIENTE_CONSTANCIA_CUIT,
    loadingInput: false,
    showHelperTextDateImpuestos: false,
    fechaImpuestoDesde: '',
    fechaImpuestoHasta: '',
    showHelperTextDatePercepcion: false,
    fechaPercepcionDesde: '',
    fechaPercepcionHasta: ''
  })
  const URL = `${process.env.NEXT_PUBLIC_API_URL}${APP_ROUTE}${ARCHIVO_ROUTE}`

  const [crearCliente, { isLoading: isCreatingCliente }] = useCreateIippMutation()
  const [updateCliente, { isLoading: isUpdatingCliente }] = useUpdateIippMutation()

  //** Hooks */
  const router = useRouter()
  const { state: appState, setState: setAppState } = useAppContext()
  const {
    control,
    handleSubmit,
    watch,
    register,
    setError,
    resetField,
    setValue,
    reset,
    getValues,
    formState: { errors }
  } = useForm({
    defaultValues: clienteIS,
    mode: 'onChange',
    resolver: yupResolver(schema)
  })

  const {
    IIPP: { iipp }
  } = useSelector(state => state)

  const { getBreadCrumb } = useClientesHook(appState.accion, iipp?.nombre || '')

  const watchArchivo = watch().archivo
  const descripcionArchivo = watch('archivos.0.descripcion') || ''
  const addressField = ['direccion.pais', 'direccion.provincia', 'direccion.localidad']
  const watchAddressFields = watch(addressField as any[])
  const { params } = router.query

  useEffect(() => {
    if (appState.accion === AccionesEnum.EDITAR_IIPP) {
      reset({ ...iipp })
      setImpuestos(iipp.impuestos || [])
      setPercepciones(iipp.percepciones || [])
      setDocumentos(iipp.numero_documento!.map(doc => doc.valor) || [])
      setCorreos(iipp.emails || [])
      if (iipp.archivos) {
        setArchivos(iipp.archivos)
      }
    }
    setState(prevState => ({
      ...prevState,
      isClienteBanco: iipp.cliente_banco || false,
      loading: false,
      loadingArchivo: false,
      loadingInput: false,
      categoriaArchivo: CategoriaArchivoEnum.CLIENTE_CONSTANCIA_CUIT
    }))
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [iipp, appState])

  useEffect(() => {
    const subscription = watch((_value, { name }) => {
      const field = addressField.find(f => f === name)
      if (!field) return
      switch (field) {
        case 'direccion.pais':
          resetField('direccion.provincia')
          break
        case 'direccion.provincia':
          resetField('direccion.localidad')
          break
        case 'direccion.localidad':
          resetField('direccion.codigo_postal')
          break
        default:
          break
      }
    })

    return () => subscription.unsubscribe()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [watchAddressFields])

  useEffect(() => {
    const getCategoriaArchivo = () => {
      if (state.categoriaArchivo === ('Constancia Excepciones' as string)) {
        return CategoriaArchivoEnum.CLIENTE_CONSTANCIA_EXCEPCIONES
      }
      if (state.categoriaArchivo === ('Contratos' as string)) {
        return CategoriaArchivoEnum.CLIENTE_CONTRATOS
      }
      if (state.categoriaArchivo === ('Otros' as string)) {
        return CategoriaArchivoEnum.CLIENTE_OTROS
      }

      return CategoriaArchivoEnum.CLIENTE_CONSTANCIA_CUIT
    }

    const mpu = new MultipartUpload(URL, UbicacionDocumentoEnum.GENERICO, getCategoriaArchivo())
    if (watchArchivo?.length) {
      setState({
        ...state,
        loading: true,
        loadingArchivo: true
      })
      mpu
        .multipartUpload(watchArchivo[0], nanoid(), getCategoriaArchivo(), true)
        .then((res: any) => {
          const archivo: Archivo = {
            id: nanoid(),
            ubicacion: res.url,
            nombre_original: `${getCategoriaArchivo()}-${watchArchivo[0].name}`,
            descripcion: descripcionArchivo
          }
          setArchivos(prev => [...prev, archivo])
          setValue('archivos.0.descripcion', '')
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

  const handleGoBack = () => {
    setErrorArchivo(false)
    setAppState({
      ...appState,
      accion: ''
    })
    handleLimpiarCampos()
    router.back()
  }

  const handleLimpiarCampos = () => {
    reset({ ...clienteIS, archivo: null, archivos: [] })
    setState({
      ...state,
      fideicomisos: false,
      cedears: false,
      custodia: false,
      fondos: false,
      impuesto: ImpuestoTypesIS,
      percepcion: ImpuestoTypesIS
    })
    setImpuestos([])
    setPercepciones([])
    setArchivos([])
    setCorreos([])
  }

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setState({
      ...state,
      [event.target.name]: event.target.checked
    })
  }

  const handleAgregarImpuesto = (impuesto: ImpuestoTypes) => {
    impuesto.fecha_desde = selectionDateRangeImpuesto?.startDate?.toISOString() || ''
    impuesto.fecha_hasta = selectionDateRangeImpuesto?.endDate?.toISOString() || ''

    if (impuesto.nombre === '') {
      setError('impuesto.nombre', {
        type: 'manual',
        message: 'Debes llenar el campo'
      })

      return
    }

    if (impuesto.condicion === '') {
      setError('impuesto.condicion', {
        type: 'manual',
        message: 'Debes llenar el campo'
      })

      return
    }

    if (impuesto.jurisdiccion === '') {
      setError('impuesto.jurisdiccion', {
        type: 'manual',
        message: 'Debes llenar el campo'
      })

      return
    }

    if (!impuesto.fecha_desde || !impuesto.fecha_hasta) {
      setError('impuesto.fecha_desde', {
        type: 'manual',
        message: 'Debes seleccionar una fecha'
      })

      return
    }

    if (impuesto.alicuota === 0) {
      setError('impuesto.alicuota', {
        type: 'manual',
        message: 'Debes llenar el campo'
      })

      return
    }

    const impuestoExiste = impuestos.find(i => i.nombre === impuesto.nombre)

    if (impuestoExiste) {
      return showApiErrorMessage('El impuesto ya fue agregado')
    } else {
      impuesto.habilitado = state.impuesto.habilitado.valueOf()

      setImpuestos(prevImpuestos => [...prevImpuestos, impuesto])

      reset({
        ...getValues(),
        impuesto: {
          nombre: '',
          condicion: '',
          jurisdiccion: '',
          alicuota: 0,
          habilitado: true,
          fecha_desde: '',
          fecha_hasta: '',
          cuenta_contable: 0
        }
      })
      setSelectionDateRangeImpuesto(DateRangeIS)
    }
  }

  const handleAgregarPercepcion = (percepcion: ImpuestoTypes) => {
    percepcion.fecha_desde = selectionDateRangePercepcion?.startDate?.toISOString() || ''
    percepcion.fecha_hasta = selectionDateRangePercepcion?.endDate?.toISOString() || ''

    if (percepcion.nombre === '') {
      setError('percepcion.nombre', {
        type: 'manual',
        message: 'Debes llenar el campo'
      })

      return
    }

    if (percepcion.condicion === '') {
      setError('percepcion.condicion', {
        type: 'manual',
        message: 'Debes llenar el campo'
      })

      return
    }

    if (percepcion.jurisdiccion === '') {
      setError('percepcion.jurisdiccion', {
        type: 'manual',
        message: 'Debes llenar el campo'
      })

      return
    }

    if (!percepcion.fecha_desde || !percepcion.fecha_hasta) {
      setError('percepcion.fecha_desde', {
        type: 'manual',
        message: 'Debes seleccionar una fecha'
      })

      return
    }

    if (percepcion.alicuota === 0) {
      setError('percepcion.alicuota', {
        type: 'manual',
        message: 'Debes llenar el campo'
      })

      return
    }

    const percepcionExiste = percepciones.find(i => i.nombre === percepcion.nombre)

    if (percepcionExiste) {
      return showApiErrorMessage('La percepcion ya fue agregado')
    } else {
      percepcion.habilitado = state.percepcion.habilitado.valueOf()

      setPercepciones(prevPercepciones => [...prevPercepciones, percepcion])

      reset({
        ...getValues(),
        percepcion: {
          nombre: '',
          condicion: '',
          jurisdiccion: '',
          alicuota: 0,
          habilitado: true,
          fecha_desde: '',
          fecha_hasta: '',
          cuenta_contable: 0
        }
      })
      setSelectionDateRangePercepcion(DateRangeIS)
    }
  }

  const handleChangeImpuesto = (event: ChangeEvent<HTMLInputElement>) => {
    setState(prevState => ({
      ...prevState,
      impuesto: {
        nombre: prevState.impuesto.nombre,
        condicion: prevState.impuesto.condicion,
        jurisdiccion: prevState.impuesto.jurisdiccion,
        alicuota: prevState.impuesto.alicuota,
        habilitado: event.target.checked,
        fecha_desde: prevState.impuesto.fecha_desde,
        fecha_hasta: prevState.impuesto.fecha_hasta,
        cuenta_contable: prevState.impuesto.cuenta_contable
      }
    }))
  }

  const handleChangePercepcion = (event: ChangeEvent<HTMLInputElement>) => {
    setState(prevState => ({
      ...prevState,
      percepcion: {
        nombre: prevState.impuesto.nombre,
        condicion: prevState.impuesto.condicion,
        jurisdiccion: prevState.impuesto.jurisdiccion,
        alicuota: prevState.impuesto.alicuota,
        habilitado: event.target.checked,
        fecha_desde: prevState.impuesto.fecha_desde,
        fecha_hasta: prevState.impuesto.fecha_hasta,
        cuenta_contable: prevState.impuesto.cuenta_contable
      }
    }))
  }

  const handleSelectChange = (event: SelectChangeEvent) => {
    const selectedValue = event.target.value

    if (selectedValue === 'Otros') {
      setShowCustomType(true)
    } else {
      setShowCustomType(false)
    }

    setState({
      ...state,
      categoriaArchivo: event.target.value as CategoriaArchivoEnum
    })
  }

  const confirmarDateRange = (str: string) => {
    if (str === 'impuesto') {
      setOpenDateRangeImpuesto(false)
      setState({
        ...state,
        showHelperTextDateImpuestos: true,
        fechaImpuestoDesde: selectionDateRangeImpuesto?.startDate?.toISOString() || '',
        fechaImpuestoHasta: selectionDateRangeImpuesto?.endDate?.toISOString() || ''
      })

      return
    }
    if (str === 'percepcion') {
      setOpenDateRangePercepcion(false)
      setState({
        ...state,
        showHelperTextDatePercepcion: true,
        fechaPercepcionDesde: selectionDateRangePercepcion?.startDate?.toISOString() || '',
        fechaPercepcionHasta: selectionDateRangePercepcion?.endDate?.toISOString() || ''
      })

      return
    }
  }

  const onSubmit = (dataForm: ClienteDTO) => {
    if (correos.length === 0) {
      setError('email', {
        type: 'manual',
        message: 'Campo requerido'
      })

      return
    }

    const body = {
      ...dataForm,
      emails: correos,
      cliente_banco: state.isClienteBanco,
      direccion: {
        ...dataForm.direccion,
        codigo_postal: codigoPostal
      },
      impuestos,
      percepciones,
      archivos,
      documentos
    }

    if (appState.accion === AccionesEnum.EDITAR_IIPP) {
      updateCliente(body)
        .unwrap()
        .then(() => {
          showApiSuccessMessage('Cliente editado exitosamente')
          setCorreos([])
        })
        .catch((error: FetchErrorTypes) => showMessageError(error))
    } else {
      crearCliente(body)
        .unwrap()
        .then(() => {
          showApiSuccessMessage('Cliente creado exitosamente')
          handleLimpiarCampos()
        })
        .catch((error: FetchErrorTypes) => showMessageError(error))
    }
  }

  return (
    <>
      <BreadcrumbsComponent
        firstBreadcrumb='iipp'
        icon={<AccountTie fontSize='small' />}
        breadCrumbItems={getBreadCrumb()}
      />
      <FormLayout title={removeSlashesAndScores(params?.[0] || '')}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <ClienteCuentaForm
            disabled={state.loading || Boolean(errors.numero_documento)}
            isError={Boolean(errors.numero_documento)}
            listSelected={documentos}
            loading={state.loading}
            control={control}
            errors={errors}
            loadingInput={state.loadingInput}
            documentos={documentos}
            setDocumentos={setDocumentos}
          />

          <ClienteContactoForm
            disabled={state.loading || Boolean(errors.email)}
            isError={Boolean(errors.email)}
            loading={state.loading}
            getValues={getValues}
            setError={setError}
            reset={reset}
            control={control}
            errors={errors}
            loadingInput={state.loadingInput}
            setCorreos={setCorreos}
            correos={iipp.emails || []}
          />

          <ClienteDireccionForm
            control={control}
            errors={errors}
            loadingInput={state.loadingInput}
            handleCambioPais={() => setCodigoPostal('')}
            direccion={watch().direccion || DireccionIS}
            codigoPostal={codigoPostal}
            setCodigoPostal={setCodigoPostal}
            disabledLocalidad={watch().direccion?.provincia === '' || state.loadingInput}
          />

          <ClienteTipoForm
            control={control}
            errors={errors}
            isClienteBanco={state.isClienteBanco}
            handleChangeIsClienteBanco={handleChange}
          />

          <ClienteImpuestosForm
            tipo='impuesto'
            control={control}
            errors={errors}
            checked={state.impuesto?.habilitado}
            confirmarDateRange={() => confirmarDateRange('impuesto')}
            handleChangeImpuesto={handleChangeImpuesto}
            impuestos={impuestos}
            setImpuestos={setImpuestos}
            fechaDesde={selectionDateRangeImpuesto.startDate || new Date()}
            fechaHasta={selectionDateRangeImpuesto.endDate || new Date()}
            showHelperTextDate={state.showHelperTextDateImpuestos}
            loading={state.loading}
            loadingInput={state.loadingArchivo}
            onClickAgregarImpuesto={() => handleAgregarImpuesto(getValues().impuesto!)}
            openDateRange={openDateRangeImpuesto}
            setOpenDateRange={setOpenDateRangeImpuesto}
            selectionDateRange={selectionDateRangeImpuesto}
            setSelectionDateRange={setSelectionDateRangeImpuesto}
          />

          <ClienteImpuestosForm
            tipo='percepcion'
            control={control}
            errors={errors}
            checked={state.percepcion?.habilitado}
            confirmarDateRange={() => confirmarDateRange('percepcion')}
            handleChangeImpuesto={handleChangePercepcion}
            impuestos={percepciones}
            setImpuestos={setPercepciones}
            fechaDesde={selectionDateRangePercepcion.startDate || new Date()}
            fechaHasta={selectionDateRangePercepcion.endDate || new Date()}
            showHelperTextDate={state.showHelperTextDatePercepcion}
            loading={state.loading}
            loadingInput={state.loadingArchivo}
            onClickAgregarImpuesto={() => handleAgregarPercepcion(getValues().percepcion!)}
            openDateRange={openDateRangePercepcion}
            setOpenDateRange={setOpenDateRangePercepcion}
            selectionDateRange={selectionDateRangePercepcion}
            setSelectionDateRange={setSelectionDateRangePercepcion}
          />

          <ClienteProductosForm
            cedears={state.cedears}
            custodia={state.custodia}
            fideicomisos={state.fideicomisos}
            fondos={state.fondos}
            handleChange={handleChange}
            control={control}
            errors={errors}
            loadingInput={state.loadingInput}
          />

          <ClienteArchivoForm
            archivos={archivos}
            categoriaArchivo={state.categoriaArchivo}
            control={control}
            errorArchivo={errorArchivo}
            setArchivos={setArchivos}
            handleSelectChange={handleSelectChange}
            loading={state.loading}
            loadingArchivo={state.loadingArchivo}
            loadingInput={state.loadingInput}
            register={register}
            showCustomType={showCustomType}
          />

          <Grid container spacing={5} item xs={12} sx={{ mt: '20px' }}>
            <ButtonsActionsForm
              rigthTextButton='Guardar'
              rigthColorButton='primary'
              leftTextButton={'Cancelar'}
              colorLeftButton='secondary'
              loading={isCreatingCliente || isUpdatingCliente}
              handleBack={handleGoBack}
            />
          </Grid>
        </form>
      </FormLayout>
    </>
  )
}

export default FormClientesPage
