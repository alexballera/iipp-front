//** Base Imports */
import { useRouter } from 'next/router'
import { Suspense, useCallback, useEffect, useState } from 'react'

//** MUI Imports */
import CancelIcon from '@mui/icons-material/Cancel'
import { Button, IconButton, Stack } from '@mui/material'
import { FolderCogOutline } from 'mdi-material-ui'

//** Data & Types Imports */
import { OPERACIONES_ROUTE, PARAMETRIAS_ROUTE } from 'src/@core/constants'
import { useAppContext } from 'src/@core/context/AppContext'
import { AccionesEnum, UbicacionDocumentoEnum } from 'src/@core/enums'
import { FetchErrorTypes, PaginationData, PaginationDataIS } from 'src/@core/types'
import {
  anularOperacion,
  getOperacionById,
  useFetchOperacionQuery
} from 'src/bundle/parametrias/operaciones/data/operacionesApiService'

//** Custom Components Imports */
import { Download, Refresh } from '@mui/icons-material'
import { GridCellParams, GridFeatureModeConstant } from '@mui/x-data-grid'
import CustomTooltip from 'src/@core/components/CustomTooltip'
import HeaderComponent from 'src/@core/components/HeaderComponent'
import MenuActions from 'src/@core/components/MenuActions'
import ModalConfirmacion from 'src/@core/components/ModalConfirmacion/index '
import TableSelection from 'src/@core/components/TableSelection'
import Spinner from 'src/@core/components/spinner'
import { useDispatch } from 'src/@core/configs/store'
import { showApiSuccessMessage, showMessageError } from 'src/@core/utils'
import { descargarArchivo } from 'src/@core/utils/descargarArchivo'
import { TipoNovedad } from 'src/bundle/novedades/domain/novedadesModel'
import OperacionDetailModal from 'src/bundle/parametrias/operaciones/components/OperacionDetailModal'
import { columnsOperaciones } from 'src/bundle/parametrias/operaciones/components/columns'
import { setOperacion } from 'src/bundle/parametrias/operaciones/data/operacionesStore'
import {
  OperacionDetalleState,
  OperacionStateComponentIS
} from 'src/bundle/parametrias/operaciones/domain/operacionesModel'
import { getArchivo } from 'src/bundle/shared/data/descargarArchivoApiService'
import { DescargarArchivo, MenuItemsAccion, handleEventSort } from 'src/bundle/shared/domain'

function OperacionesPage() {
  /* States */
  const [open, setOpen] = useState<boolean>(false)
  const [openModal, setOpenModal] = useState<boolean>(false)
  const [loadingForm, setLoadingForm] = useState<boolean>(false)
  const [itemSelected, setItemSelected] = useState<GridCellParams>()
  const [stateOperacion, setStateOperacion] =
    useState<OperacionDetalleState>(OperacionStateComponentIS)
  const [paginationData, setPaginationData] = useState<PaginationData>(PaginationDataIS)
  const [anchorElAction, setAnchorElAction] = useState<null | HTMLElement>(null)

  const { data, isLoading, isFetching, refetch } = useFetchOperacionQuery({
    ...paginationData,
    tipo: TipoNovedad.OPERACION
  })

  const { data: operacion, isDisabling } = stateOperacion

  /* Hooks */
  const router = useRouter()
  const dispatch = useDispatch()
  const { loading, setLoading, state, setState, setSelectionOrden } = useAppContext()

  const BASE_URL = `${PARAMETRIAS_ROUTE}${OPERACIONES_ROUTE}/form/`

  useEffect(() => {
    setLoading(isLoading || isFetching || false)
  }, [setLoading, isLoading, isFetching])

  useEffect(() => {
    if (itemSelected != undefined && itemSelected.field === 'accion') {
      setLoading(true)
      const response = dispatch(getOperacionById.initiate(itemSelected.id as string))
      response
        .unwrap()
        .then((res: any) => {
          const data = res
          data && dispatch(setOperacion(data))

          setStateOperacion({
            ...stateOperacion,
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

  const handleCloseDrawer = () => {
    setLoadingForm(false)
    setOpen(false)
    setTimeout(() => {
      refetch()
    }, 2000)
  }

  const handleConfirmarAnular = () => {
    setLoadingForm(true)
    const response = dispatch(anularOperacion.initiate(operacion?.id || ''))
    response
      .unwrap()
      .then(() => {
        showApiSuccessMessage(`${operacion?.categoria} se Anuló correctamente`)
      })
      .catch((error: FetchErrorTypes) => showMessageError(error))
      .finally(() => {
        setOpenModal(false)
        handleCloseDrawer()
      })
  }

  const handleSort = (params: any) => {
    const dato = handleEventSort(params)
    dato && setSelectionOrden(dato)
  }

  const handleDescargar = useCallback(
    (archivoTipo: string) => {
      if (itemSelected != undefined) {
        setLoading(true)

        const obtenerUbicacion = (archivo: any) => {
          if (Array.isArray(archivo)) {
            return archivo[0]?.ubicacion
          }

          return archivo?.ubicacion
        }

        const obtenerNombreOriginal = (archivo: any) => {
          if (Array.isArray(archivo)) {
            return archivo[0]?.nombre_original
          }

          return archivo?.nombre_original
        }

        const body: DescargarArchivo = {
          contenedor_id: UbicacionDocumentoEnum.GENERICO,
          nombre_archivo:
            archivoTipo === 'original'
              ? obtenerUbicacion(itemSelected?.row?.archivo_entrada)
              : obtenerUbicacion(itemSelected?.row?.archivo_salida)
        }

        const response = dispatch(getArchivo.initiate(body))
        response
          .unwrap()
          .then(async (res: any) => {
            setLoading(true)
            const extension =
              archivoTipo === 'original'
                ? obtenerNombreOriginal(itemSelected?.row?.archivo_entrada)?.split('.')[1]
                : obtenerNombreOriginal(itemSelected?.row?.archivo_salida)?.split('.')[1]

            descargarArchivo(res, itemSelected?.row?.categoria, extension)
          })
          .catch((error: FetchErrorTypes) => showMessageError(error))
          .finally(() => setLoading(false))
      }
    },
    [itemSelected, dispatch, setLoading]
  )

  const handlePageChange = (newPage: number, newAmmount: number) => {
    setPaginationData({ pagina: newPage, cantidad: newAmmount })

    refetch()
  }

  const menuItems: MenuItemsAccion[] = [
    {
      icon: <Download fontSize='small' color='primary' />,
      loader: false,
      title: 'Documento original',
      actions: () => handleDescargar('original'),
      show: true
    },
    {
      icon: <Download fontSize='small' color='primary' />,
      loader: false,
      title: 'Documento generado',
      actions: () => handleDescargar('generado'),
      show: operacion?.estado !== 'CON_ERROR' && operacion?.estado !== 'EN_EJECUCION'
    }
  ]

  const handleOpenActionsMenu = (event: React.MouseEvent<HTMLElement>) =>
    setAnchorElAction(event.currentTarget)

  const handleCloseActionsMenu = () => setAnchorElAction(null)

  const handleCrearOperacion = () => {
    setState({
      ...state,
      accion: AccionesEnum.CREAR_OPERACION
    })
    router.push(`${BASE_URL}${AccionesEnum.CREAR_OPERACION}`)
  }

  const handleAnular = () => setOpenModal(true)

  return (
    <Suspense fallback={<Spinner />}>
      <HeaderComponent
        icon={<FolderCogOutline />}
        textoPrincipal='Parametrías'
        textoSecundario=''
        acciones={
          <Button variant='contained' onClick={handleCrearOperacion}>
            Cargar archivo
          </Button>
        }
      />
      <TableSelection
        columns={columnsOperaciones}
        loading={loading}
        rows={data?.registros || []}
        handlePageChange={handlePageChange}
        totalRows={data?.total}
        currentPage={paginationData.pagina}
        paginationMode={GridFeatureModeConstant.server}
        setItemSelected={setItemSelected}
        handleSortModelChange={handleSort}
        cursor='inherit'
        title='Operaciones'
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
        <OperacionDetailModal
          titleHeader='DETALLE OPERACION'
          open={open}
          setOpen={setOpen}
          data={operacion}
          loading={isDisabling}
          action={
            <Stack direction='row' alignItems='center' spacing={50}>
              <MenuActions
                textTooltip='Descargar'
                anchorElAction={anchorElAction}
                menuItems={menuItems}
                handleOpenActionsMenu={handleOpenActionsMenu}
                handleCloseActionsMenu={handleCloseActionsMenu}
                loading={loading}
              />
              {operacion?.estado === 'OK' && (
                <CustomTooltip text={'Anular'}>
                  <Button
                    color={'error'}
                    startIcon={<CancelIcon color='error' />}
                    onClick={handleAnular}
                  >
                    {'Anular'}
                  </Button>
                </CustomTooltip>
              )}
            </Stack>
          }
        />
      )}

      <ModalConfirmacion
        open={openModal}
        onClose={() => setOpenModal(false)}
        title={`CONFIRMAR ANULAR ${operacion?.categoria}`}
        loading={loadingForm}
        onClick={handleConfirmarAnular}
      />
    </Suspense>
  )
}

export default OperacionesPage
