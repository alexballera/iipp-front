// * Base imports
import { useRouter } from 'next/router'
import { memo, useEffect, useState } from 'react'

// * MUI Imports
import { IconButton, Stack } from '@mui/material'
import { GridCellParams, GridFeatureModeConstant } from '@mui/x-data-grid'
import { Refresh } from 'mdi-material-ui'

// * Customs components
import CustomTooltip from 'src/@core/components/CustomTooltip'
import TableSelection from 'src/@core/components/TableSelection'
import { SALDOS_CLIENTES_ROUTE } from 'src/@core/constants'
import SaldosClienteDetailModal from './SaldosClientesDetailModal'
import { columnsSaldosClientes } from './columns'
import {
  SaldosClienteDetalleState,
  SaldosClienteStateComponentIS,
  SaldosClientesViewProps
} from '../domain/saldosClientesModel'
import { useAppContext } from 'src/@core/context/AppContext'

function SaldosClientesView(props: SaldosClientesViewProps) {
  const { data, isLoading, onHandleRefresh, isLoadingRefresh, paginationData, setPaginationData } =
    props

  // * State
  const [open, setOpen] = useState(false)
  const [itemSelected, setItemSelected] = useState<GridCellParams>()
  const [stateSaldo, setStateSaldo] = useState<SaldosClienteDetalleState>(
    SaldosClienteStateComponentIS
  )

  const { data: saldo, isDisabling } = stateSaldo

  // * Hooks & Context
  const router = useRouter()
  const { setLoading } = useAppContext()

  const handleDetail = () => {
    if (itemSelected != undefined) router.push(`${SALDOS_CLIENTES_ROUTE}/${itemSelected?.id}`)
  }

  useEffect(() => {
    if (itemSelected != undefined && itemSelected.field === 'accion') {
      setLoading(true)
      const timeoutId = setTimeout(() => {
        setOpen(true)
        setStateSaldo({
          ...stateSaldo,
          open: true,
          loading: false,
          data: itemSelected.row
        })
        setLoading(false)
      }, 2000)

      return () => clearTimeout(timeoutId)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [itemSelected, setOpen, setStateSaldo])

  const handlePageChange = (newPage: number, newAmmount: number) => {
    setPaginationData({ pagina: newPage, cantidad: newAmmount })

    onHandleRefresh ? onHandleRefresh() : null
  }

  return (
    <>
      <TableSelection
        setItemSelected={setItemSelected}
        handlePageChange={handlePageChange}
        columns={columnsSaldosClientes}
        loading={isLoading}
        rows={data?.registros}
        totalRows={data?.total}
        title='Saldos de Clientes'
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
          </Stack>
        }
      />
      {open && (
        <SaldosClienteDetailModal
          open={open}
          setOpen={setOpen}
          data={saldo}
          loading={isDisabling}
          handleDetail={handleDetail}
        />
      )}
    </>
  )
}

export default memo(SaldosClientesView)
