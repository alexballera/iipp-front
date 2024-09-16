//** Base Imports */
import { useRouter } from 'next/router'
import { Suspense, lazy, useEffect, useState } from 'react'

//** MUI Imports */
import { Button, IconButton } from '@mui/material'
import { GridCellParams, GridFeatureModeConstant } from '@mui/x-data-grid'
import { FolderCogOutline, Refresh } from 'mdi-material-ui'

//** Store & Data Imports */
import { useDispatch } from 'src/@core/configs/store'
import { columnsImpuestos } from 'src/bundle/parametrias/impuestos/components/columns'
import {
  getImpuestoById,
  useFetchImpuestosQuery
} from 'src/bundle/parametrias/impuestos/data/impuestosApiService'
import {
  setImpuesto,
  setImpuestosElasticSearch,
  setImpuestosList
} from 'src/bundle/parametrias/impuestos/data/impuestosStore'
import { ImpuestoDetalleState } from 'src/bundle/parametrias/impuestos/domain/impuestosModel'

//** Core Imports */
import { IMPUESTOS_ROUTE, PARAMETRIAS_ROUTE } from 'src/@core/constants'
import { useAppContext } from 'src/@core/context/AppContext'
import { AccionesEnum } from 'src/@core/enums'
import { PaginationData, PaginationDataIS, detalleStateComponentIS } from 'src/@core/types'
import { showMessageError } from 'src/@core/utils'

//** Custom Components Imports */
import CustomTooltip from 'src/@core/components/CustomTooltip'
import HeaderComponent from 'src/@core/components/HeaderComponent'
import TableSelection from 'src/@core/components/TableSelection'
import Spinner from 'src/@core/components/spinner'
import useMount from 'src/@core/hooks/useMount'

const ImpuestoDetalleComponent = lazy(
  () => import('src/bundle/parametrias/impuestos/components/ImpuestoDetalleComponent')
)

function ImpuestoPage() {
  //** States */
  const [open, setOpen] = useState(false)
  const [itemSelected, setItemSelected] = useState<GridCellParams>()
  const [paginationData, setPaginationData] = useState<PaginationData>(PaginationDataIS)
  const [state, setState] = useState<ImpuestoDetalleState>(detalleStateComponentIS)

  const { data: impuesto } = state
  const BASE_URL = `${PARAMETRIAS_ROUTE}/${IMPUESTOS_ROUTE}/form/`

  //** Hooks */
  const router = useRouter()
  const dispatch = useDispatch()
  const { loading, setLoading } = useAppContext()
  const { data, isLoading, isFetching, refetch } = useFetchImpuestosQuery(paginationData)

  useMount(() => {
    refetch()
  })

  useEffect(() => {
    setLoading(isLoading || isFetching || false)
  }, [setLoading, isLoading, isFetching])

  useEffect(() => {
    if (itemSelected != undefined && itemSelected.field === 'accion') {
      setLoading(true)

      const response = dispatch(getImpuestoById.initiate(itemSelected.id.toLocaleString()))

      response
        .unwrap()
        .then(res => {
          const impuesto = res

          setState({
            ...state,
            open: true,
            data: impuesto
          })
          dispatch(setImpuesto(impuesto))
          setOpen && setOpen(true)
        })
        .catch(err => showMessageError(err))
        .finally(() => setLoading(false))
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [itemSelected])

  useEffect(() => {
    if (data) {
      dispatch(setImpuestosList(data.registros))
      dispatch(setImpuestosElasticSearch(data))
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data])

  const handlePageChange = (newPage: number, newAmmount: number) => {
    setPaginationData({ pagina: newPage, cantidad: newAmmount })

    refetch()
  }

  const handleEditarImpuesto = () =>
    router.push(`${BASE_URL}${AccionesEnum.EDITAR_IMPUESTO}/${impuesto?.id}`)

  const handleCrearImpuesto = () => router.push(`${BASE_URL}${AccionesEnum.CREAR_IMPUESTO}`)

  return (
    <Suspense fallback={<Spinner />}>
      <HeaderComponent
        icon={<FolderCogOutline />}
        textoPrincipal='Parametrías'
        textoSecundario=''
        acciones={
          <Button variant='contained' onClick={handleCrearImpuesto}>
            Crear impuesto
          </Button>
        }
      />
      <TableSelection
        setItemSelected={setItemSelected}
        handlePageChange={handlePageChange}
        columns={columnsImpuestos}
        loading={loading}
        rows={data?.registros}
        totalRows={data?.total}
        currentPage={paginationData.pagina}
        paginationMode={GridFeatureModeConstant.server}
        cursor='inherit'
        title='Impuestos'
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
        <ImpuestoDetalleComponent
          open={open}
          data={impuesto}
          setOpen={setOpen}
          onEditar={handleEditarImpuesto}
          loading={loading}
        />
      )}
    </Suspense>
  )
}

export default ImpuestoPage
