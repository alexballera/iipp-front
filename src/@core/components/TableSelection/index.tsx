// ** React Import
import { ReactNode, memo, useEffect, useState } from 'react'

// ** MUI Imports
import { Card, CardHeader } from '@mui/material'
import {
  DataGrid,
  GridCellParams,
  GridColumns,
  GridFeatureMode,
  GridFeatureModeConstant,
  esES
} from '@mui/x-data-grid'
import { CANTIDAD_POR_PAGINAS } from 'src/@core/constants'

type TableSelectionProps = {
  title?: string
  cursor?: string
  loading: boolean
  rows: any
  columns: GridColumns
  handleOpen?: () => void
  setItemSelected?: (obj: GridCellParams) => void
  handlePageChange?: (newPage: number, newAmmount: number) => void
  cardHeaderActions?: ReactNode
  totalRows?: number
  currentPage?: number
  paginationMode?: GridFeatureMode
  rowsPerPageOptions?: Array<number>
  handleSortModelChange?: (params: any) => void
  handleFilterModelChange?: (params: any) => void
} & typeof defaultProps

const defaultProps = {
  title: '',
  cursor: 'inherit',
  loading: false,
  rowsPerPageOptions: [7, 10, 25, 50],
  rows: [],
  totalRows: CANTIDAD_POR_PAGINAS
}

const TableSelection = ({
  title,
  cursor,
  rows,
  loading,
  columns,
  setItemSelected,
  handlePageChange,
  cardHeaderActions,
  totalRows,
  currentPage,
  paginationMode,
  rowsPerPageOptions,
  handleFilterModelChange,
  handleSortModelChange
}: TableSelectionProps) => {
  // ** State
  const [pageSize, setPageSize] = useState<number>(CANTIDAD_POR_PAGINAS)
  const [rowCountState, setRowCountState] = useState(totalRows)

  useEffect(() => {
    setRowCountState(prevRowCountState => (totalRows !== undefined ? totalRows : prevRowCountState))
  }, [totalRows, setRowCountState])

  const onCellClick = (event: any) => {
    if (setItemSelected) setItemSelected(event)
  }

  const handlePageSizeChange = (newPageSize: number, currentPage?: number) => {
    setPageSize(newPageSize)
    handlePageChange && currentPage ? handlePageChange(currentPage, newPageSize) : null
  }

  return (
    <Card>
      {title && <CardHeader title={title} action={cardHeaderActions || <></>} />}
      <DataGrid
        autoHeight
        rowCount={rowCountState}
        hideFooterSelectedRowCount
        localeText={esES.components.MuiDataGrid.defaultProps.localeText}
        sx={{ cursor: cursor ? cursor : setItemSelected ? 'pointer' : 'inherit' }}
        rows={rows}
        loading={loading}
        onCellClick={onCellClick}
        columns={columns}
        pageSize={pageSize}
        paginationMode={paginationMode ? paginationMode : GridFeatureModeConstant.client}
        rowsPerPageOptions={rowsPerPageOptions}
        onPageSizeChange={newPageSize => handlePageSizeChange(newPageSize, currentPage)}
        onPageChange={newPage =>
          handlePageChange ? handlePageChange(newPage + 1, pageSize) : null
        }
        onSortModelChange={handleSortModelChange}
        onFilterModelChange={handleFilterModelChange}
      />
    </Card>
  )
}

TableSelection.defaultProps = defaultProps

export default memo(TableSelection)
