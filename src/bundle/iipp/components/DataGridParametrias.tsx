import MoreVertIcon from '@mui/icons-material/MoreVert'
import { IconButton, Menu, MenuItem, Stack, Typography } from '@mui/material'
import { GridCellParams, GridColumns, GridRenderCellParams } from '@mui/x-data-grid'
import { PlusCircleOutline } from 'mdi-material-ui'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import CustomTooltip from 'src/@core/components/CustomTooltip'
import ModalConfirmacion from 'src/@core/components/ModalConfirmacion/index '
import TableSelection from 'src/@core/components/TableSelection'
import { RootState, useDispatch, useSelector } from 'src/@core/configs/store'
import { CLIENTES_ROUTE } from 'src/@core/constants'
import { useAppContext } from 'src/@core/context/AppContext'
import { AccionesEnum } from 'src/@core/enums'
import { FetchErrorTypes } from 'src/@core/types'
import { formatDate, showApiSuccessMessage, showMessageError } from 'src/@core/utils'
import { iippApi } from '../data/iippApiService'
import { ParametriaComercialDTO } from '../domain/iippModel'

type DataGridParametriasProps = {
  parametrias: ParametriaComercialDTO[]
}

function DataGridParametrias({ parametrias }: DataGridParametriasProps) {
  const [openModal, setOpenModal] = useState(false)
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)
  const open = Boolean(anchorEl)
  const { setState, state, loading, setLoading } = useAppContext()
  const [itemSelected, setItemSelected] = useState<GridCellParams>()
  const [idSelected, setIdSelected] = useState<string>('')
  const {
    IIPP: { iipp }
  } = useSelector((state: RootState) => state)
  const router = useRouter()
  const dispatch = useDispatch()

  const columnsParametrias: GridColumns = [
    {
      flex: 0.8,
      field: 'producto',
      align: 'left',
      renderCell: (params: GridRenderCellParams) => (
        <Typography variant='body2' sx={{ color: 'text.primary' }}>
          {params.row.producto ? params.row.producto : 'Sin datos'}
        </Typography>
      )
    },
    {
      flex: 1,
      field: 'concepto',
      align: 'left',
      renderCell: (params: GridRenderCellParams) => (
        <Typography variant='body2' sx={{ color: 'text.primary' }}>
          {params.row.concepto?.nombre ? params.row.concepto.nombre : 'Sin datos'}
        </Typography>
      )
    },
    {
      flex: 1,
      headerName: 'fecha inicio',
      field: 'fecha_inicio',
      align: 'left',
      renderCell: (params: GridRenderCellParams) => (
        <Typography variant='body2' sx={{ color: 'text.primary' }}>
          {params.row.fecha_vigencia_inicio
            ? formatDate(params.row.fecha_vigencia_inicio, 'es-AR')
            : 'Sin datos'}
        </Typography>
      )
    },
    {
      flex: 1,
      headerName: 'fecha fin',
      field: 'fecha_fin',
      align: 'left',
      renderCell: (params: GridRenderCellParams) => (
        <Typography variant='body2' sx={{ color: 'text.primary' }}>
          {params.row.fecha_vigencia_fin
            ? formatDate(params.row.fecha_vigencia_fin, 'es-AR')
            : 'Sin datos'}
        </Typography>
      )
    },
    {
      flex: 1,
      headerName: 'fecha alta',
      field: 'fecha_alta',
      align: 'left',
      renderCell: (params: GridRenderCellParams) => (
        <Typography variant='body2' sx={{ color: 'text.primary' }}>
          {params.row.fecha_alta ? formatDate(params.row.fecha_alta, 'es-AR') : 'Sin datos'}
        </Typography>
      )
    },
    {
      flex: 0.5,
      headerName: '',
      field: 'accion',
      align: 'center',
      renderCell: () => (
        <CustomTooltip text='Acciones'>
          <IconButton onClick={handleClick}>
            <MoreVertIcon sx={{ width: '20px', cursor: 'pointer' }} />
          </IconButton>
        </CustomTooltip>
      )
    }
  ]

  useEffect(() => {
    if (itemSelected != undefined && itemSelected.field === 'accion') {
      setIdSelected(itemSelected?.row.id)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [itemSelected])

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget)
  }
  const handleClose = () => {
    setAnchorEl(null)
  }

  const handleEliminar = () => {
    setLoading(true)

    const response = dispatch(
      iippApi.endpoints.deleteParametria.initiate({
        cliente_id: iipp.id,
        id: idSelected
      })
    )

    const handleFinally = () => {
      setLoading(false)
      handleCloseModal()
      handleClose()
    }

    response
      .unwrap()
      .then(() => showApiSuccessMessage('Parametria eliminada'))
      .catch((error: FetchErrorTypes) => showMessageError(error))
      .finally(() => handleFinally())
  }

  const handleEditar = () => {
    setState({
      ...state,
      accion: AccionesEnum.EDITAR_PARAMETRIA
    })
    const parametria_id = idSelected
    router.push(
      `${CLIENTES_ROUTE}/parametria/${iipp.id}/${AccionesEnum.EDITAR_PARAMETRIA}/${parametria_id}`
    )
    handleClose()
  }

  const handleCrearCliente = () => {
    setState({
      ...state,
      accion: AccionesEnum.CREAR_PARAMETRIA
    })
    router.push(`${CLIENTES_ROUTE}/parametria/${iipp.id}/${AccionesEnum.CREAR_PARAMETRIA}`)
  }

  const handleCloseModal = () => {
    setOpenModal(false)
  }

  const handleConfirmarEliminar = () => {
    setOpenModal(true)
  }

  return (
    <>
      <TableSelection
        setItemSelected={setItemSelected}
        title='Parametrias'
        columns={columnsParametrias}
        rows={parametrias || []}
        cursor='inherit'
        cardHeaderActions={
          <Stack direction='row' alignItems='center'>
            <CustomTooltip
              text='Crear Parametria'
              icon={<PlusCircleOutline fontSize='small' color='success' sx={{ mr: 1 }} />}
            >
              <IconButton
                onClick={handleCrearCliente}
                color='primary'
                aria-label='upload picture'
                component='label'
              >
                <PlusCircleOutline fontSize='small' />
              </IconButton>
            </CustomTooltip>
          </Stack>
        }
        loading={false}
      />
      <Menu
        id='basic-menu'
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          'aria-labelledby': 'basic-button'
        }}
      >
        <MenuItem onClick={handleConfirmarEliminar}>Eliminar</MenuItem>
        <MenuItem onClick={handleEditar}>Editar</MenuItem>
      </Menu>
      <ModalConfirmacion
        open={openModal}
        onClose={handleCloseModal}
        title={`CONFIRMA ELIMINAR PARAMETRIA`}
        onClick={handleEliminar}
        loading={loading}
      />
    </>
  )
}

export default DataGridParametrias
