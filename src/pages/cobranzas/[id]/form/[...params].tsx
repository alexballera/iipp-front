//** Base Imports */
import { useRouter } from 'next/router'
import { useState } from 'react'

//** Context, Enums & Types Imports */
import { useAppContext } from 'src/@core/context/AppContext'
import { AccionesEnum } from 'src/@core/enums'
import { FetchErrorTypes } from 'src/@core/types'
import { showApiSuccessMessage, showMessageError } from 'src/@core/utils'

//** Store, Services & Models Imports */
import BreadcrumbsComponent from 'src/@core/components/BreadcrumbsComponent'
import { useDispatch, useSelector } from 'src/@core/configs/store'
import VinculacionFormComponent from 'src/bundle/cobranzas/components/VinculacionFormComponent'
import { vincularCobranza } from 'src/bundle/cobranzas/data/cobranzasApiService'
import { VincularCobranzaDTO } from 'src/bundle/cobranzas/domain/cobranzasModel'

function CobranzasFormPage() {
  const [creado, setCreado] = useState<boolean>(false)

  //** Hooks */
  const router = useRouter()
  const dispatch = useDispatch()
  const { loading, setLoading } = useAppContext()

  const {
    COBRANZAS: { cobranza }
  } = useSelector(state => state)

  const {
    query: { params }
  } = router
  const accion = params?.[0]

  const breadCrumbCrear = [
    {
      id: '01',
      text: cobranza.nombre,
      link: () => router.back()
    },
    {
      id: '02',
      text: 'CREAR VINCULACION',
      link: undefined
    }
  ]

  const getBreadCrumbItems = () => {
    if (accion === AccionesEnum.CREAR_VINCULACION_COBRANZA) return breadCrumbCrear

    return []
  }

  const handleCrear = (data: VincularCobranzaDTO) => {
    setLoading(true)
    const response = dispatch(vincularCobranza.initiate({ ...data, id: cobranza.id }))
    response
      .unwrap()
      .then(() => {
        showApiSuccessMessage('Cobranza vinculada exitosamente')
        setCreado(true)
      })
      .catch((error: FetchErrorTypes) => showMessageError(error))
      .finally(() => setLoading(false))
  }

  return (
    <>
      <BreadcrumbsComponent breadCrumbItems={getBreadCrumbItems()} />
      <VinculacionFormComponent
        loading={loading}
        accion={accion || ''}
        creado={creado}
        handleCrear={handleCrear}
      />
    </>
  )
}
export default CobranzasFormPage
