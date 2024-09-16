//** Base Imports */
import { useRouter } from 'next/router'
import { Suspense, lazy, useEffect, useState } from 'react'

//** MUI Imports */
import { IconButton } from '@mui/material'
import { GridCellParams, GridFeatureModeConstant } from '@mui/x-data-grid'
import { Refresh } from 'mdi-material-ui'

//** Store & Data Imports */
import { useDispatch } from 'src/@core/configs/store'
import {
  getProductoById,
  useFetchProductosQuery
} from 'src/bundle/parametrias/productos/data/productosApiService'
import {
  setProducto,
  setProductosElasticSearch,
  setProductosList
} from 'src/bundle/parametrias/productos/data/productosStore'
import { ProductoDetalleState } from 'src/bundle/parametrias/productos/domain/productosModel'

//** Core Imports */
import { PARAMETRIAS_ROUTE, PRODUCTOS_ROUTE } from 'src/@core/constants'
import { useAppContext } from 'src/@core/context/AppContext'
import { AccionesEnum } from 'src/@core/enums'
import { PaginationData, PaginationDataIS, detalleStateComponentIS } from 'src/@core/types'
import { showMessageError } from 'src/@core/utils'

//** Custom Components Imports */
import CustomTooltip from 'src/@core/components/CustomTooltip'
import TableSelection from 'src/@core/components/TableSelection'
import Spinner from 'src/@core/components/spinner'
import { columnsProductos } from 'src/bundle/parametrias/productos/components/columns'

const ProductoDetalleComponent = lazy(
  () => import('src/bundle/parametrias/productos/components/ProductoDetalleComponent')
)

function ProductosPage() {
  //** States */
  const [open, setOpen] = useState(false)
  const [itemSelected, setItemSelected] = useState<GridCellParams>()
  const [paginationData, setPaginationData] = useState<PaginationData>(PaginationDataIS)
  const [state, setState] = useState<ProductoDetalleState>(detalleStateComponentIS)

  const { data: producto } = state
  const BASE_URL = `${PARAMETRIAS_ROUTE}/${PRODUCTOS_ROUTE}/form/`

  //** Hooks */
  const router = useRouter()
  const dispatch = useDispatch()
  const { loading, setLoading } = useAppContext()
  const { data, isLoading, isFetching, refetch } = useFetchProductosQuery(paginationData)

  useEffect(() => {
    setLoading(isLoading || isFetching || false)
  }, [setLoading, isLoading, isFetching])

  useEffect(() => {
    if (itemSelected != undefined && itemSelected.field === 'accion') {
      setLoading(true)

      const response = dispatch(getProductoById.initiate(itemSelected.id.toLocaleString()))

      response
        .unwrap()
        .then(res => {
          const producto = res

          setState({
            ...state,
            open: true,
            data: producto
          })
          dispatch(setProducto(producto))
          setOpen && setOpen(true)
        })
        .catch(err => showMessageError(err))
        .finally(() => setLoading(false))
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [itemSelected])

  useEffect(() => {
    if (data) {
      dispatch(setProductosList(data.registros))
      dispatch(setProductosElasticSearch(data))
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data])

  const handlePageChange = (newPage: number, newAmmount: number) => {
    setPaginationData({ pagina: newPage, cantidad: newAmmount })

    refetch()
  }

  const handleEditarProducto = () =>
    router.push(`${BASE_URL}${AccionesEnum.EDITAR_PRODUCTO}/${producto?.id}`)

  return (
    <Suspense fallback={<Spinner />}>
      <TableSelection
        setItemSelected={setItemSelected}
        handlePageChange={handlePageChange}
        columns={columnsProductos}
        loading={loading}
        rows={data?.registros}
        totalRows={data?.total}
        currentPage={paginationData.pagina}
        paginationMode={GridFeatureModeConstant.server}
        cursor='inherit'
        title='Productos'
        cardHeaderActions={
          <CustomTooltip
            text='Actualizar'
            icon={<Refresh fontSize='small' color='success' sx={{ mr: 1 }} />}
          >
            <IconButton
              onClick={() => refetch()}
              color='primary'
              aria-label='upload picture'
              component='label'
              sx={{
                animation: `${loading && 'spin 1s linear infinite'}`
              }}
            >
              <Refresh fontSize='small' />
            </IconButton>
          </CustomTooltip>
        }
      />
      {open && (
        <ProductoDetalleComponent
          open={open}
          data={producto}
          setOpen={setOpen}
          onEditar={handleEditarProducto}
          loading={loading}
        />
      )}
    </Suspense>
  )
}

export default ProductosPage
