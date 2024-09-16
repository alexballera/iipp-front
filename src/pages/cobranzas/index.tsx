// ** Base Imports
import { useRouter } from 'next/router'
import { Suspense, memo, useEffect, useState } from 'react'

// ** MUI Imports
import { Grid, IconButton, Stack } from '@mui/material'
import { GridCellParams, GridFeatureModeConstant } from '@mui/x-data-grid'
import { PlusCircleOutline, Refresh } from 'mdi-material-ui'

// ** Configs, Store, Enums, Types imports
import { useDispatch } from 'src/@core/configs/store'
import { COBRANZAS_ROUTE } from 'src/@core/constants'
import { useAppContext } from 'src/@core/context/AppContext'
import { AccionesEnum } from 'src/@core/enums'
import { PaginationData, PaginationDataIS, QueryParams } from 'src/@core/types'
import { setCobranza } from '../../bundle/cobranzas/data/cobranzaStore'
import {
  getCobranzaById,
  useFetchCobranzasQuery
} from '../../bundle/cobranzas/data/cobranzasApiService'

// ** Custom Components Imports
import CustomTooltip from 'src/@core/components/CustomTooltip'
import TableSelection from 'src/@core/components/TableSelection'
import Spinner from 'src/@core/components/spinner'
import { columnsCobranzas } from 'src/bundle/cobranzas/components/columns'
import CobranzaDetailModal from 'src/bundle/cobranzas/components/CobranzaDetailModal'
import {
  CobranzasDetalleState,
  CobranzasFiltrosDTO,
  CobranzasFiltrosIS,
  CobranzasStateComponentIS
} from 'src/bundle/cobranzas/domain/cobranzasModel'
import CobranzasFiltrosComponent from 'src/bundle/cobranzas/components/CobranzasFiltrosComponent'

function CobranzasPage() {
  //** States */
  const [open, setOpen] = useState(false)
  const [itemSelected, setItemSelected] = useState<GridCellParams>()
  const [paginationData, setPaginationData] = useState<PaginationData>(PaginationDataIS)
  const [queryParams, setQueryParams] = useState<CobranzasFiltrosDTO>(CobranzasFiltrosIS)
  const [stateCobranza, setStateCobranza] =
    useState<CobranzasDetalleState>(CobranzasStateComponentIS)

  const { data: cobranza, isDisabling } = stateCobranza

  // * Hooks
  const router = useRouter()
  const dispatch = useDispatch()
  const { loading, setLoading, setState, state } = useAppContext()

  const qp = queryParams as QueryParams

  const { data, isLoading, isFetching, refetch } = useFetchCobranzasQuery({
    queryParams: qp,
    paginationData
  })

  useEffect(() => {
    setLoading(isLoading || isFetching || false)
  }, [setLoading, isLoading, isFetching])

  useEffect(() => {
    if (itemSelected != undefined && itemSelected.field === 'accion') {
      setLoading(true)

      const response = dispatch(getCobranzaById.initiate(itemSelected.id as string))

      response
        .unwrap()
        .then((res: any) => {
          const data = res
          data && dispatch(setCobranza(data))

          setStateCobranza({
            ...stateCobranza,
            open: true,
            loading: false,
            data
          })

          setOpen && setOpen(true)
        })
        .finally(() => setLoading(false))

      response.unsubscribe()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [itemSelected])

  const handleDetail = () => {
    if (itemSelected != undefined) router.push(`${COBRANZAS_ROUTE}/${itemSelected?.row.id}`)
  }

  const handlePageChange = (newPage: number, newAmmount: number) => {
    setPaginationData({ pagina: newPage, cantidad: newAmmount })

    refetch()
  }

  const handleCrearCobranza = () => {
    setState({
      ...state,
      accion: AccionesEnum.CREAR_COBRANZA
    })
    router.push(`${COBRANZAS_ROUTE}/form/${AccionesEnum.CREAR_COBRANZA}`)
  }

  return (
    <Suspense fallback={<Spinner />}>
      <Grid container spacing={6}>
        <Grid item xs={12}>
          <CobranzasFiltrosComponent queryParams={queryParams} setQueryParams={setQueryParams} />
          <TableSelection
            setItemSelected={setItemSelected}
            handlePageChange={handlePageChange}
            columns={columnsCobranzas}
            loading={loading}
            rows={data?.registros}
            totalRows={data?.total}
            currentPage={paginationData.pagina}
            paginationMode={GridFeatureModeConstant.server}
            cursor='inherit'
            title='Cobranzas'
            cardHeaderActions={
              <Stack direction='row' alignItems='center'>
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

                <CustomTooltip
                  text='Crear Cobranza'
                  icon={<PlusCircleOutline fontSize='small' color='success' sx={{ mr: 1 }} />}
                >
                  <IconButton
                    onClick={handleCrearCobranza}
                    color='primary'
                    aria-label='upload picture'
                    component='label'
                  >
                    <PlusCircleOutline fontSize='small' />
                  </IconButton>
                </CustomTooltip>
              </Stack>
            }
          />
          {open && (
            <CobranzaDetailModal
              open={open}
              setOpen={setOpen}
              data={cobranza}
              loading={isDisabling}
              handleDetail={handleDetail}
            />
          )}
        </Grid>
      </Grid>
    </Suspense>
  )
}

export default memo(CobranzasPage)
