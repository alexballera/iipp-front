//** Base Imports */
import { useRouter } from 'next/router'
import { lazy } from 'react'

//** Context, Enums & Types Imports */
import { useAppContext } from 'src/@core/context/AppContext'
import { AccionesEnum } from 'src/@core/enums'
import { FetchErrorTypes } from 'src/@core/types'
import { showApiSuccessMessage, showMessageError } from 'src/@core/utils'

//** Store, Services & Models Imports */
import { useDispatch, useSelector } from 'src/@core/configs/store'
import {
  crearImpuesto,
  editarImpuesto
} from 'src/bundle/parametrias/impuestos/data/impuestosApiService'
import { setImpuesto } from 'src/bundle/parametrias/impuestos/data/impuestosStore'
import {
  CrearImpuestoDTO,
  ModificarImpuestoDTO
} from 'src/bundle/parametrias/impuestos/domain/impuestosModel'

//** Custom Components Imports */
const BreadcrumbsComponent = lazy(() => import('src/@core/components/BreadcrumbsComponent'))
const ImpuestoFormComponent = lazy(
  () => import('src/bundle/parametrias/impuestos/components/ImpuestoFormComponent')
)

function ImpuestoFormPage() {
  //** Hooks */
  const router = useRouter()
  const dispatch = useDispatch()
  const { loading, setLoading } = useAppContext()
  const {
    IMPUESTOS: { impuesto }
  } = useSelector(state => state)

  const {
    query: { params }
  } = router
  const accion = params?.[0]

  const breadCrumbEditar = [
    {
      id: '01',
      text: `GRUPO: ${impuesto.grupo}`,
      link: undefined
    },
    {
      id: '02',
      text: 'EDITAR IMPUESTO',
      link: undefined
    }
  ]

  const breadCrumbCrear = [
    {
      id: '0',
      text: 'CREAR IMPUESTO',
      link: undefined
    }
  ]

  const getBreadCrumbItems = () => {
    if (accion === AccionesEnum.EDITAR_IMPUESTO) return breadCrumbEditar

    return breadCrumbCrear
  }

  const handleEditar = (data: ModificarImpuestoDTO) => {
    setLoading(true)
    const response = dispatch(editarImpuesto.initiate(data))
    response
      .unwrap()
      .then(() => {
        showApiSuccessMessage('Impuesto editado exitosamente')
        dispatch(setImpuesto(data))
      })
      .catch((error: FetchErrorTypes) => showMessageError(error))
      .finally(() => {
        setLoading(false)
        response.unsubscribe()
      })
  }

  const handleCrear = (data: CrearImpuestoDTO) => {
    setLoading(true)
    const response = dispatch(crearImpuesto.initiate(data))
    response
      .unwrap()
      .then(() => {
        showApiSuccessMessage('Impuesto creado exitosamente')
        dispatch(setImpuesto(data))
      })
      .catch((error: FetchErrorTypes) => showMessageError(error))
      .finally(() => {
        setLoading(false)
        response.unsubscribe()
      })
  }

  return (
    <>
      <BreadcrumbsComponent breadCrumbItems={getBreadCrumbItems()} />
      <ImpuestoFormComponent
        loading={loading}
        accion={accion || ''}
        data={impuesto}
        handleEditar={handleEditar}
        handleCrear={handleCrear}
      />
    </>
  )
}
export default ImpuestoFormPage
