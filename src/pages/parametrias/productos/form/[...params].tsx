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
import { editarProducto } from 'src/bundle/parametrias/productos/data/productosApiService'
import { setProducto } from 'src/bundle/parametrias/productos/data/productosStore'
import { ModificarProductoDTO } from 'src/bundle/parametrias/productos/domain/productosModel'

//** Custom Components Imports */
const BreadcrumbsComponent = lazy(() => import('src/@core/components/BreadcrumbsComponent'))
const ProductoFormComponent = lazy(
  () => import('src/bundle/parametrias/productos/components/ProductoFormComponent')
)

function ProductoFormPage() {
  //** Hooks */
  const router = useRouter()
  const dispatch = useDispatch()
  const { loading, setLoading } = useAppContext()
  const {
    PRODUCTOS: { producto }
  } = useSelector(state => state)

  const {
    query: { params }
  } = router
  const accion = params?.[0]

  const breadCrumbEditar = [
    {
      id: '01',
      text: `NOMBRE PRODUCTO: ${producto.nombre}`,
      link: undefined
    },
    {
      id: '02',
      text: 'EDITAR PRODUCTO',
      link: undefined
    }
  ]

  const getBreadCrumbItems = () => {
    if (accion === AccionesEnum.EDITAR_PRODUCTO) return breadCrumbEditar

    return []
  }

  const handleEditar = (data: ModificarProductoDTO) => {
    setLoading(true)
    const response = dispatch(editarProducto.initiate(data))
    response
      .unwrap()
      .then(() => {
        showApiSuccessMessage('Producto editado exitosamente')
        dispatch(setProducto(data))
      })
      .catch((error: FetchErrorTypes) => showMessageError(error))
      .finally(() => setLoading(false))
  }

  return (
    <>
      <BreadcrumbsComponent breadCrumbItems={getBreadCrumbItems()} />
      <ProductoFormComponent
        loading={loading}
        accion={accion || ''}
        data={producto}
        handleEditar={handleEditar}
      />
    </>
  )
}
export default ProductoFormPage
