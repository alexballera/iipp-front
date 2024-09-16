//** Base Imports */
import { Suspense, lazy, useEffect, useState } from 'react'

//** MUI Imports */
import { Button, IconButton, Stack } from '@mui/material'
import { GridCellParams, GridFeatureModeConstant } from '@mui/x-data-grid'
import { Download, Refresh, TrashCan } from 'mdi-material-ui'

//** Store, Hooks, Utils Imports */
import AutorenewIcon from '@mui/icons-material/Autorenew'
import CancelIcon from '@mui/icons-material/Cancel'
import { useDispatch } from 'src/@core/configs/store'
import { useAppContext } from 'src/@core/context/AppContext'
import { FetchErrorTypes, PaginationData, PaginationDataIS } from 'src/@core/types'
import { showApiErrorMessage, showApiSuccessMessage, showMessageError } from 'src/@core/utils'
import { DescargarArchivo, MenuItemsAccion, handleEventSort } from 'src/bundle/shared/domain'

//** Custom Components Imports */
import CustomTooltip from 'src/@core/components/CustomTooltip'
import MenuActions from 'src/@core/components/MenuActions'
import ModalConfirmacion from 'src/@core/components/ModalConfirmacion/index '
import Spinner from 'src/@core/components/spinner'
import { UbicacionDocumentoEnum } from 'src/@core/enums'
import { descargarArchivo } from 'src/@core/utils/descargarArchivo'
import NovedadDetailModal from 'src/bundle/novedades/components/NovedadDetailModal'
import { columnsNovedades } from 'src/bundle/novedades/components/columns'
import {
  anularNovedad,
  getNovedadById,
  reintentarNovedad,
  useFetchNovedadesQuery
} from 'src/bundle/novedades/data/novedadesApiService'
import { setNovedad } from 'src/bundle/novedades/data/novedadesStore'
import {
  ArchivoNovedad,
  NovedadDetalleState,
  NovedadStateComponentIS
} from 'src/bundle/novedades/domain/novedadesModel'
import { getArchivo } from 'src/bundle/shared/data/descargarArchivoApiService'

const TableSelection = lazy(() => import('src/@core/components/TableSelection'))

function Novedades() {
  //** States */
  const [open, setOpen] = useState<boolean>(false)
  const [openModal, setOpenModal] = useState<boolean>(false)
  const [loadingForm, setLoadingForm] = useState<boolean>(false)
  const [openModalForm, setOpenModalForm] = useState<boolean>(false)
  const [itemSelected, setItemSelected] = useState<GridCellParams>()
  const [paginationData, setPaginationData] = useState<PaginationData>(PaginationDataIS)
  const [state, setState] = useState<NovedadDetalleState>(NovedadStateComponentIS)
  const [anchorElAction, setAnchorElAction] = useState<null | HTMLElement>(null)
  const [menuItems, setMenuItems] = useState<MenuItemsAccion[]>([])

  const { data: novedad, isDisabling } = state

  //** Hooks */
  const dispatch = useDispatch()
  const { loading, setLoading, setSelectionOrden } = useAppContext()

  const { data, isLoading, isFetching, refetch } = useFetchNovedadesQuery(paginationData)

  useEffect(() => {
    setLoading(isLoading || isFetching || false)
  }, [setLoading, isLoading, isFetching])

  useEffect(() => {
    if (itemSelected != undefined && itemSelected.field === 'accion') {
      setLoading(true)

      const response = dispatch(getNovedadById.initiate(itemSelected.id as string))

      response
        .unwrap()
        .then((res: any) => {
          const data = res
          data && dispatch(setNovedad(data))

          setState({
            ...state,
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

  useEffect(() => {
    if (novedad?.archivo_entrada) {
      const menu: MenuItemsAccion[] = novedad?.archivo_entrada?.map(item => {
        return {
          icon: <Download fontSize='small' color='primary' />,
          loader: loading,
          title: item.ubicacion.split('/')[1],
          actions: () => handleDescargar(item),
          show: true
        }
      })
      setMenuItems(menu)
    } else {
      const menu: MenuItemsAccion[] = [
        {
          icon: <TrashCan fontSize='small' color='primary' />,
          loader: loading,
          title: 'Sin Datos',
          actions: () => '',
          show: true
        }
      ]
      setMenuItems(menu)
    }

    if (novedad?.archivo_salida) {
      const menu: MenuItemsAccion[] = [
        {
          icon: <Download fontSize='small' color='primary' />,
          loader: loading,
          title: novedad?.archivo_salida.ubicacion.split('/')[1],
          actions: () => (novedad?.archivo_salida ? handleDescargar(novedad?.archivo_salida) : ''),
          show: true
        }
      ]
      setMenuItems(menu)
    } else {
      const menu: MenuItemsAccion[] = [
        {
          icon: <TrashCan fontSize='small' color='primary' />,
          loader: loading,
          title: 'Sin Datos',
          actions: () => '',
          show: true
        }
      ]
      setMenuItems(menu)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [novedad])

  const handleOpenActionsMenu = (event: React.MouseEvent<HTMLElement>) =>
    setAnchorElAction(event.currentTarget)

  const handleCloseActionsMenu = () => setAnchorElAction(null)

  const handleDescargar = (item: ArchivoNovedad) => {
    const body: DescargarArchivo = {
      contenedor_id: UbicacionDocumentoEnum.GENERICO,
      nombre_archivo: item.ubicacion || ''
    }

    setLoading(true)

    const response = dispatch(getArchivo.initiate(body))
    response
      .unwrap()
      .then(async (res: any) => {
        setLoading(true)
        const extension = item.ubicacion?.split('.')[1] || ''
        descargarArchivo(res, `${item.nombre_original}` || '', extension)
      })
      .catch((error: FetchErrorTypes) => showMessageError(error))
      .finally(() => {
        setLoading(false)
        handleCloseActionsMenu()
      })
  }

  const handleCloseDrawer = () => {
    setLoadingForm(false)
    setOpen(false)
    setTimeout(() => {
      refetch()
    }, 2000)
  }

  const handleConfirmarReintetar = () => {
    setLoadingForm(true)
    const response = dispatch(reintentarNovedad.initiate(novedad?.id || ''))
    response
      .unwrap()
      .then(() => showApiSuccessMessage('Funcionalidad no implementada'))
      .catch((error: FetchErrorTypes) => {
        showMessageError(error)
        setOpenModalForm(false)
      })
      .finally(() => {
        setOpenModalForm(false)
        handleCloseDrawer()
      })
  }

  const handleSort = (params: any) => {
    const dato = handleEventSort(params)
    dato && setSelectionOrden(dato)
  }

  const handleReintetar = () => {
    if (novedad?.estado === 'CON_ERROR') {
      setOpenModalForm(true)
    } else {
      showApiErrorMessage('La Novedad no tiene errores')
    }

    return
  }

  const handleConfirmarAnular = () => {
    setLoadingForm(true)
    const response = dispatch(anularNovedad.initiate(novedad?.id || ''))
    response
      .unwrap()
      .then(res => console.log(res))
      .catch((error: FetchErrorTypes) => showMessageError(error))
      .finally(() => {
        setOpenModal(false)
        handleCloseDrawer()
      })
  }

  const handleAnular = () => setOpenModal(true)

  const handlePageChange = (newPage: number, newAmmount: number) => {
    setPaginationData({ pagina: newPage, cantidad: newAmmount })

    refetch()
  }

  const handleActions = () => (novedad?.estado === 'CON_ERROR' ? handleReintetar() : handleAnular())

  return (
    <Suspense fallback={<Spinner />}>
      <TableSelection
        columns={columnsNovedades}
        loading={loading}
        rows={data?.registros}
        handlePageChange={handlePageChange}
        totalRows={data?.total}
        currentPage={paginationData.pagina}
        paginationMode={GridFeatureModeConstant.server}
        setItemSelected={setItemSelected}
        handleSortModelChange={handleSort}
        cursor='inherit'
        title='Novedades'
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
        <NovedadDetailModal
          titleHeader='DETALLE NOVEDAD'
          open={open}
          setOpen={setOpen}
          data={novedad}
          loading={isDisabling}
          action={
            <Stack direction='row' alignItems='center'>
              <MenuActions
                textTooltip='Descargar'
                anchorElAction={anchorElAction}
                menuItems={menuItems}
                handleOpenActionsMenu={handleOpenActionsMenu}
                handleCloseActionsMenu={handleCloseActionsMenu}
                loading={loading}
              />
              {novedad?.estado === 'CON_ERROR' ? (
                <CustomTooltip text={'Reintentar'}>
                  <Button
                    color={novedad?.estado === 'CON_ERROR' ? 'primary' : 'error'}
                    startIcon={
                      novedad?.estado === 'CON_ERROR' ? (
                        <AutorenewIcon color='primary' />
                      ) : (
                        <CancelIcon color='error' />
                      )
                    }
                    onClick={handleActions}
                  >
                    {novedad?.estado === 'CON_ERROR' ? 'Reintentar' : 'Anular'}
                  </Button>
                </CustomTooltip>
              ) : novedad?.estado === 'OK' && novedad?.tipo_novedad === 'OPERACION' ? (
                <CustomTooltip text={'Anular'}>
                  <Button
                    color={'error'}
                    startIcon={<CancelIcon color='error' />}
                    onClick={handleActions}
                  >
                    {'Anular'}
                  </Button>
                </CustomTooltip>
              ) : (
                <></>
              )}
            </Stack>
          }
        />
      )}

      <ModalConfirmacion
        open={openModal}
        onClose={() => setOpenModal(false)}
        title={`CONFIRMA ANULAR ${novedad?.tipo_novedad?.toUpperCase() || ''}`}
        onClick={handleConfirmarAnular}
        loading={loadingForm}
      />

      <ModalConfirmacion
        open={openModalForm}
        onClose={() => setOpenModalForm(false)}
        title={`CONFIRMA REINTENTAR ${novedad?.tipo_novedad?.toUpperCase() || ''}`}
        loading={loadingForm}
        onClick={handleConfirmarReintetar}
      />
    </Suspense>
  )
}

export default Novedades
