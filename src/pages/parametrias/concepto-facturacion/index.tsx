//** Base Imports */
import { useRouter } from 'next/router'
import { Suspense, lazy, useEffect, useState } from 'react'

//** MUI Imports */
import { Button, IconButton, SelectChangeEvent } from '@mui/material'
import { GridCellParams, GridFeatureModeConstant } from '@mui/x-data-grid'
import { FolderCogOutline, Refresh } from 'mdi-material-ui'

//** Data & Types Imports */
import { useDispatch } from 'src/@core/configs/store'
import { CONCEPTO_FACTURACION_ROUTE, PARAMETRIAS_ROUTE } from 'src/@core/constants'
import { useAppContext } from 'src/@core/context/AppContext'
import { AccionesEnum } from 'src/@core/enums'
import { PaginationData, PaginationDataIS } from 'src/@core/types'
import {
  disableConceptoFacturacion,
  getConceptoFacturacionById,
  useFetchConceptoFacturacionQuery
} from 'src/bundle/parametrias/concepto-facturacion/data/conceptoFacturacionApiService'
import {
  setConceptoFacturacion,
  setConceptoFacturacionElastisearch,
  setConceptoFacturacionList
} from 'src/bundle/parametrias/concepto-facturacion/data/conceptoFacturacionStore'
import {
  ConceptoFacturacionDetalleState,
  ConceptoFacturacionStateComponentIS
} from 'src/bundle/parametrias/concepto-facturacion/domain/conceptoFacturacionModel'

//** Custom Components Imports */
import CustomTooltip from 'src/@core/components/CustomTooltip'
import HeaderComponent from 'src/@core/components/HeaderComponent'
import Spinner from 'src/@core/components/spinner'
import ConceptoFacturacionDetalleComponent from 'src/bundle/parametrias/concepto-facturacion/components/ConceptoFacturacionDetalleComponent'
import { columnsConceptoFacturacion } from 'src/bundle/parametrias/concepto-facturacion/components/columns'

const TableSelection = lazy(() => import('src/@core/components/TableSelection'))

function ConceptoFacturacionPage() {
  // * State
  const [open, setOpen] = useState(false)
  const [updated, setUpdated] = useState(false)
  const [itemSelected, setItemSelected] = useState<GridCellParams>()
  const [paginationData, setPaginationData] = useState<PaginationData>(PaginationDataIS)
  const [state, setState] = useState<ConceptoFacturacionDetalleState>(
    ConceptoFacturacionStateComponentIS
  )

  const { data: concepto, isDisabling, habilitado } = state

  const BASE_URL = `${PARAMETRIAS_ROUTE}/${CONCEPTO_FACTURACION_ROUTE}/form/`

  //** Hooks */
  const router = useRouter()
  const dispatch = useDispatch()
  const { loading, setLoading } = useAppContext()
  const { data, isLoading, isFetching, refetch } = useFetchConceptoFacturacionQuery(paginationData)

  useEffect(() => {
    setLoading(isLoading || isFetching || false)
  }, [setLoading, isLoading, isFetching])

  useEffect(() => {
    data && dispatch(setConceptoFacturacionList(data.registros))
    data && dispatch(setConceptoFacturacionElastisearch(data))
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data])

  useEffect(() => {
    if (updated) {
      refetch()
      data && dispatch(setConceptoFacturacionList(data.registros))
      data && dispatch(setConceptoFacturacionElastisearch(data))

      setUpdated(false)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [updated])

  useEffect(() => {
    if (itemSelected != undefined && itemSelected.field === 'accion') {
      setLoading(true)

      const response = dispatch(getConceptoFacturacionById.initiate(itemSelected.id as string))

      response
        .unwrap()
        .then((res: any) => {
          const data = res
          data && dispatch(setConceptoFacturacion(data))
          const estado = data?.habilitado?.toString()

          setState({
            ...state,
            open: true,
            loading: false,
            habilitado: estado || '',
            estado,
            data
          })

          setOpen && setOpen(true)
        })
        .finally(() => setLoading(false))

      response.unsubscribe()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [itemSelected])

  const handlePageChange = (newPage: number, newAmmount: number) => {
    setPaginationData({ pagina: newPage, cantidad: newAmmount })

    refetch()
  }

  const handleCrearConceptoFacturacion = () => {
    router.push(`${BASE_URL}${AccionesEnum.CREAR_CONCEPTO_FACTURACION}`)
  }

  const handleEditar = () => {
    setState({
      ...state,
      open: false
    })
    router.push(`${BASE_URL}${AccionesEnum.EDITAR_CONCEPTO_FACTURACION}/${concepto?.id || ''}`)
  }

  const handleChange = (event: SelectChangeEvent) => {
    const body = {
      ...concepto,
      habilitado: Boolean(event.target.value)
    }

    const response = dispatch(disableConceptoFacturacion.initiate(body))

    setState({ ...state, isDisabling: true })

    response
      .unwrap()
      .then(() => {
        setState({ ...state, isDisabling: true })
        const selected = dispatch(getConceptoFacturacionById.initiate(concepto?.id || ''))
        selected.then((res: any) => {
          const { data, isLoading: disabling } = res
          setTimeout(() => {
            data && dispatch(setConceptoFacturacion(data))
            setState({
              ...state,
              habilitado: (event.target.value as string) || '',
              isDisabling: disabling,
              data: data,
              conceptoSelected: data
            })
            refetch()
          }, 3000)
        })
        setUpdated(true)
      })
      .catch((err: any) => console.log(err))
      .finally(() => refetch())
  }

  return (
    <Suspense fallback={<Spinner />}>
      <HeaderComponent
        icon={<FolderCogOutline />}
        textoPrincipal='Parametrías'
        textoSecundario=''
        acciones={
          <Button variant='contained' onClick={handleCrearConceptoFacturacion}>
            Crear concepto
          </Button>
        }
      />
      <TableSelection
        setItemSelected={setItemSelected}
        handlePageChange={handlePageChange}
        columns={columnsConceptoFacturacion}
        loading={loading}
        rows={data?.registros || []}
        totalRows={data?.total}
        currentPage={paginationData.pagina}
        paginationMode={GridFeatureModeConstant.server}
        cursor='inherit'
        title='Conceptos de facturación'
        cardHeaderActions={
          <CustomTooltip
            text='Actualizar'
            icon={<Refresh fontSize='small' color='success' sx={{ mr: 1 }} />}
          >
            <IconButton
              onClick={refetch}
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
        <ConceptoFacturacionDetalleComponent
          open={open}
          setOpen={setOpen}
          data={concepto}
          onEditar={handleEditar}
          loading={isDisabling}
          handleChange={handleChange}
          habilitado={habilitado}
        />
      )}
    </Suspense>
  )
}

export default ConceptoFacturacionPage
