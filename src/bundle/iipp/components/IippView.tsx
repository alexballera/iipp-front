// * Base imports
import { useRouter } from 'next/router'
import { memo, useEffect, useState } from 'react'

// * MUI Imports
import { IconButton, Stack } from '@mui/material'
import { GridCellParams, GridFeatureModeConstant } from '@mui/x-data-grid'
import { PlusCircleOutline, Refresh } from 'mdi-material-ui'

// * Store, Types, Enums & Utils Imports
import { useAppContext } from 'src/@core/context/AppContext'
import { ClientesViewProps } from '../domain/iippModel'

// * Customs components
import CustomTooltip from 'src/@core/components/CustomTooltip'
import TableSelection from 'src/@core/components/TableSelection'
import { IIPP_ROUTE } from 'src/@core/constants'
import { AccionesEnum } from 'src/@core/enums'
import { columnsClientes } from './columns'

function IippView(props: ClientesViewProps) {
  const { data, isLoading, onHandleRefresh, isLoadingRefresh, paginationData, setPaginationData } =
    props

  // * State
  const [itemSelected, setItemSelected] = useState<GridCellParams>()

  // * Hooks & Context
  const router = useRouter()
  const { setState, state } = useAppContext()
  useEffect(() => {
    if (itemSelected != undefined && itemSelected.field === 'accion') {
      router.push(`${IIPP_ROUTE}/${itemSelected?.id}`)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [itemSelected])

  const handleCrearCliente = () => {
    setState({
      ...state,
      accion: AccionesEnum.CREAR_CLIENTE
    })
    router.push(`${IIPP_ROUTE}/form/${AccionesEnum.CREAR_CLIENTE}`)
  }

  const handlePageChange = (newPage: number, newAmmount: number) => {
    setPaginationData({ pagina: newPage, cantidad: newAmmount })

    onHandleRefresh ? onHandleRefresh() : null
  }

  return (
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
  )
}

export default memo(IippView)
