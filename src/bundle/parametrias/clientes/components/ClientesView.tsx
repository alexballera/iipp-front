// * Base imports
import { useRouter } from 'next/router'
import { memo, useEffect, useState } from 'react'

// * MUI Imports
import { IconButton, Stack } from '@mui/material'
import { GridCellParams, GridFeatureModeConstant } from '@mui/x-data-grid'
import { PlusCircleOutline, Refresh } from 'mdi-material-ui'

// * Store, Types, Enums & Utils Imports
import { useAppContext } from 'src/@core/context/AppContext'
import {
  ClienteDetalleState,
  ClienteStateComponentIS,
  ClientesViewProps
} from '../domain/clientesModel'

// * Customs components
import CustomTooltip from 'src/@core/components/CustomTooltip'
import TableSelection from 'src/@core/components/TableSelection'
import { CLIENTES_ROUTE, PARAMETRIAS_ROUTE } from 'src/@core/constants'
import { AccionesEnum } from 'src/@core/enums'
import ClienteDetailModal from './ClienteDetailModal'
import { columnsClientes } from './columns'

function ClientesView(props: ClientesViewProps) {
  const { data, isLoading, onHandleRefresh, isLoadingRefresh, paginationData, setPaginationData } =
    props

  // * State
  const [open, setOpen] = useState(false)
  const [itemSelected, setItemSelected] = useState<GridCellParams>()
  const [stateCliente, setStateCliente] = useState<ClienteDetalleState>(ClienteStateComponentIS)

  const { data: cliente, isDisabling } = stateCliente

  // * Hooks & Context
  const router = useRouter()
  const { setState, state } = useAppContext()

  const handleDetail = () => {
    if (itemSelected != undefined)
      router.push(`${PARAMETRIAS_ROUTE}${CLIENTES_ROUTE}/${itemSelected?.id}`)
  }

  useEffect(() => {
    if (itemSelected != undefined && itemSelected.field === 'accion') {
      const selected = data.registros.find(item => item.id === itemSelected.id)

      setStateCliente({
        ...stateCliente,
        open: true,
        loading: false,
        data: selected
      })
      setOpen && setOpen(true)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [itemSelected])

  const handleCrearCliente = () => {
    setState({
      ...state,
      accion: AccionesEnum.CREAR_CLIENTE
    })
    router.push(`${PARAMETRIAS_ROUTE}${CLIENTES_ROUTE}/form/${AccionesEnum.CREAR_CLIENTE}`)
  }

  const handlePageChange = (newPage: number, newAmmount: number) => {
    setPaginationData({ pagina: newPage, cantidad: newAmmount })

    onHandleRefresh ? onHandleRefresh() : null
  }

  return (
    <>
      <TableSelection
        setItemSelected={setItemSelected}
        handlePageChange={handlePageChange}
        columns={columnsClientes}
        loading={isLoading}
        rows={data?.registros}
        totalRows={data?.total}
        title='Clientes'
        currentPage={paginationData.pagina}
        paginationMode={GridFeatureModeConstant.server}
        cardHeaderActions={
          <Stack direction='row' alignItems='center'>
            <CustomTooltip
              text='Actualizar'
              icon={<Refresh fontSize='small' color='success' sx={{ mr: 1 }} />}
            >
              <IconButton
                onClick={onHandleRefresh}
                color='primary'
                aria-label='upload picture'
                component='label'
                sx={{
                  animation: `${isLoadingRefresh && 'spin 1s linear infinite'}`
                }}
              >
                <Refresh fontSize='small' />
              </IconButton>
            </CustomTooltip>

            <CustomTooltip
              text='Crear Cliente'
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
      />
      {open && (
        <ClienteDetailModal
          open={open}
          setOpen={setOpen}
          data={cliente}
          loading={isDisabling}
          handleDetail={handleDetail}
        />
      )}
    </>
  )
}

export default memo(ClientesView)
