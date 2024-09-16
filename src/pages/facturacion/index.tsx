//** Base Imports */
import { useRouter } from 'next/router'
import { Suspense, lazy, useEffect, useState } from 'react'

//** MUI Imports */
import AutorenewIcon from '@mui/icons-material/Autorenew'
import { Box, Button, IconButton, Stack } from '@mui/material'
import { GridCellParams, GridFeatureModeConstant } from '@mui/x-data-grid'
import { Cancel, Download, FileDocumentOutline, Refresh } from 'mdi-material-ui'

//** Store, Hooks, Utils Imports */
import { useDispatch } from 'src/@core/configs/store'
import { FACTURACION_ROUTE } from 'src/@core/constants'
import { useAppContext } from 'src/@core/context/AppContext'
import { AccionesEnum, UbicacionDocumentoEnum } from 'src/@core/enums'
import { FetchErrorTypes, PaginationData, PaginationDataIS, QueryParams } from 'src/@core/types'
import { showApiErrorMessage, showApiSuccessMessage, showMessageError } from 'src/@core/utils'
import { descargarArchivo } from 'src/@core/utils/descargarArchivo'
import {
  anularNota,
  getNotaById,
  rehacerNota,
  useFetchNotasQuery
} from 'src/bundle/facturacion/data/facturacionApiService'
import { setNotaElasticSearch } from 'src/bundle/facturacion/data/facturacionStore'
import {
  NotaDTO,
  NotaFiltrosDTO,
  NotaFiltrosIS,
  RehacerNotaDTO
} from 'src/bundle/facturacion/domain'
import { getArchivo } from 'src/bundle/shared/data/descargarArchivoApiService'
import { DescargarArchivo, handleEventSort } from 'src/bundle/shared/domain'

//** Custom Components Imports */
import CustomTooltip from 'src/@core/components/CustomTooltip'
import HeaderComponent from 'src/@core/components/HeaderComponent'
import Loader from 'src/@core/components/Loader'
import ModalConfirmacion from 'src/@core/components/ModalConfirmacion/index '
import Spinner from 'src/@core/components/spinner'
import NotaDetalleComponent from 'src/bundle/facturacion/components/NotaDetalleComponent'
import NotaFormComponent from 'src/bundle/facturacion/components/NotaFormComponent'
import NotasFiltrosComponent from 'src/bundle/facturacion/components/NotasFiltrosComponent'
import { columnsNotas } from 'src/bundle/facturacion/components/columns'

const TableSelection = lazy(() => import('src/@core/components/TableSelection'))

function FacturacionPage() {
  //** States */
  const [open, setOpen] = useState<boolean>(false)
  const [detalle, setDetalle] = useState<NotaDTO>()
  const [openModal, setOpenModal] = useState<boolean>(false)
  const [descargando, setDescargando] = useState<boolean>(false)
  const [loadingForm, setLoadingForm] = useState<boolean>(false)
  const [openModalForm, setOpenModalForm] = useState<boolean>(false)
  const [itemSelected, setItemSelected] = useState<GridCellParams>()
  const [paginationData, setPaginationData] = useState<PaginationData>(PaginationDataIS)
  const [queryParams, setQueryParams] = useState<NotaFiltrosDTO>(NotaFiltrosIS)

  const BASE_URL = `${FACTURACION_ROUTE}/form/`

  //** Hooks */
  const router = useRouter()
  const dispatch = useDispatch()
  const { loading, setLoading, setSelectionOrden } = useAppContext()

  const qp = queryParams as QueryParams

  const { data, isLoading, isFetching, refetch } = useFetchNotasQuery({
    queryParams: qp,
    paginationData
  })

  useEffect(() => {
    if (data) dispatch(setNotaElasticSearch(data))
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data])

  useEffect(() => {
    setLoading(isLoading || isFetching || false)
  }, [setLoading, isLoading, isFetching])

  useEffect(() => {
    if (itemSelected != undefined && itemSelected.field === 'accion')
      handleGetNotaById(itemSelected?.row.id)

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [itemSelected])

  const handleGetNotaById = (id: string) => {
    setLoading(true)
    const response = dispatch(getNotaById.initiate(id))

    response
      .unwrap()
      .then((res: any) => {
        setDetalle(res)
        setOpen && setOpen(true)
      })
      .catch((error: FetchErrorTypes) => showMessageError(error))
      .finally(() => setLoading(false))

    response.unsubscribe()
  }

  const handleSort = (params: any) => {
    const dato = handleEventSort(params)
    dato && setSelectionOrden(dato)
  }

  const handlePageChange = (newPage: number, newAmmount: number) => {
    setPaginationData({ pagina: newPage, cantidad: newAmmount })

    refetch()
  }

  const handleGenerarNotas = () => router.push(`${BASE_URL}${AccionesEnum.CREAR_NOTA_DEBITO}`)

  const handleCloseDrawer = () => {
    setLoadingForm(false)
    setOpen(false)
    setTimeout(() => {
      refetch()
    }, 2000)
  }

  const handleConfirmarRehacer = (dataForm: RehacerNotaDTO) => {
    const body: RehacerNotaDTO = {
      id: detalle?.id || '',
      fecha: dataForm.fecha
    }
    setLoadingForm(true)
    const response = dispatch(rehacerNota.initiate(body))
    response
      .unwrap()
      .then(() => showApiSuccessMessage(`Se realizó exitosamente`))
      .catch((err: FetchErrorTypes) => showMessageError(err))
      .finally(() => {
        handleCloseDrawer()
        setOpenModalForm(false)
      })
  }

  const handleRehacer = () => {
    if (detalle?.estado === 'ANULADA') {
      setOpenModalForm(true)
    } else {
      showApiErrorMessage('La Nota no está Anulada')
    }

    return
  }

  const handleConfirmarAnular = () => {
    setLoadingForm(true)
    const response = dispatch(anularNota.initiate(detalle?.id || ''))
    response
      .unwrap()
      .then(() => showApiSuccessMessage(`Se anuló exitosamente`))
      .catch((error: FetchErrorTypes) => showMessageError(error))
      .finally(() => {
        setOpenModal(false)
        handleCloseDrawer()
      })
  }

  const handleAnular = () => setOpenModal(true)

  const handleDescargar = () => {
    const body: DescargarArchivo = {
      contenedor_id: UbicacionDocumentoEnum.GENERICO,
      nombre_archivo: detalle?.ubicacion_pdf || ''
    }

    setDescargando(true)
    const response = dispatch(getArchivo.initiate(body))
    response
      .unwrap()
      .then(async (res: any) => {
        const extension = detalle?.ubicacion_pdf?.split('.')[1] || ''
        descargarArchivo(res, `NOTA-${detalle?.tipo}-${detalle?.id}`, extension)
      })
      .catch((error: FetchErrorTypes) => showMessageError(error))
      .finally(() => setDescargando(false))

    response.unsubscribe()
  }

  const handleActions = () => (detalle?.estado === 'ANULADA' ? handleRehacer() : handleAnular())

  return (
    <Suspense fallback={<Spinner />}>
      <HeaderComponent
        icon={<FileDocumentOutline />}
        textoPrincipal='Facturación'
        acciones={
          <Button variant='contained' onClick={handleGenerarNotas}>
            Generar notas de débito.
          </Button>
        }
      />
      <NotasFiltrosComponent queryParams={queryParams} setQueryParams={setQueryParams} />
      <TableSelection
        columns={columnsNotas}
        loading={loading}
        rows={data?.registros}
        handlePageChange={handlePageChange}
        totalRows={data?.total}
        currentPage={paginationData.pagina}
        paginationMode={GridFeatureModeConstant.server}
        setItemSelected={setItemSelected}
        handleSortModelChange={handleSort}
        cursor='inherit'
        title='Notas'
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
        <NotaDetalleComponent
          open={open}
          setOpen={setOpen}
          data={detalle}
          onClick={handleGetNotaById}
          loading={loading}
          action={
            <Stack direction='row' alignItems='center'>
              <CustomTooltip
                text='Descargar PDF'
                icon={<Download fontSize='small' sx={{ mr: 1 }} />}
              >
                {descargando ? (
                  <Box sx={{ width: '58px' }}>
                    <Loader height='20px' size={20} />
                  </Box>
                ) : (
                  <IconButton onClick={handleDescargar}>
                    <Download fontSize='small' color='primary' />
                  </IconButton>
                )}
              </CustomTooltip>
              {detalle?.tipo === 'ND' && (
                <CustomTooltip
                  text={detalle?.estado === 'ANULADA' ? 'Rehacer' : 'Anular'}
                  icon={
                    detalle?.estado === 'ANULADA' ? (
                      <AutorenewIcon fontSize='small' sx={{ mr: 1 }} />
                    ) : (
                      <Cancel fontSize='small' sx={{ mr: 1 }} />
                    )
                  }
                >
                  <IconButton
                    color={detalle?.estado === 'ANULADA' ? 'primary' : 'error'}
                    onClick={handleActions}
                  >
                    {detalle?.estado === 'ANULADA' ? (
                      <AutorenewIcon color='primary' />
                    ) : (
                      <Cancel color='error' />
                    )}
                  </IconButton>
                </CustomTooltip>
              )}
            </Stack>
          }
        />
      )}

      <ModalConfirmacion
        open={openModal}
        onClose={() => setOpenModal(false)}
        title={`CONFIRMA ANULAR ${detalle?.cliente?.nombre?.toUpperCase() || ''}`}
        onClick={handleConfirmarAnular}
        loading={loadingForm}
      />

      <ModalConfirmacion
        open={openModalForm}
        onClose={() => setOpenModalForm(false)}
        title={`CONFIRMA REHACER ${detalle?.cliente?.nombre?.toUpperCase() || ''}`}
        loading={loadingForm}
        hiddenDialogActions={true}
        content={
          <NotaFormComponent
            loading={loadingForm}
            setOpenModalForm={setOpenModalForm}
            handleRehacer={handleConfirmarRehacer}
          />
        }
      />
    </Suspense>
  )
}

export default FacturacionPage
