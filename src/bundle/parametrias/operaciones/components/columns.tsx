//** MUI Imports */
import { Typography } from '@mui/material'
import { GridColumns, GridRenderCellParams } from '@mui/x-data-grid'

//** Types, Constants & Utils Imports */
import { formatDate, formatDateTime, removeSlashesAndScores } from 'src/@core/utils'

//** Custom Components Imports */
import CustomChip from 'src/@core/components/mui/chip'
import VerDetalleComponent from 'src/@core/components/VerDetalleComponent'

export const getTexto = (estado: string) => {
  if (estado === undefined) return 'Sin estado'

  return {
    EN_EJECUCION: 'En ejecución',
    OK: 'Ok',
    CON_ERROR: 'Con error',
    APLICADA: 'Aplicada',
    ANULADA: 'Anulada',
    default: 'Sin estado'
  }[estado || 'default']
}

export const getColor = (estado: string) => {
  if (estado === undefined) return

  switch (estado) {
    case 'EN_EJECUCION':
      return 'warning'
    case 'OK':
      return 'success'
    case 'CON_ERROR':
      return 'error'
    case 'APLICADA':
      return 'info'
    case 'ANULADA':
      return 'warning'

    default:
      return
  }
}

export const columnsOperaciones: GridColumns = [
  {
    flex: 0.225,
    minWidth: 150,
    field: 'tipo_archivo',
    headerName: 'TIPO DE ARCHIVO',
    headerAlign: 'left',
    align: 'left',
    renderCell: (params: GridRenderCellParams) => (
      <Typography variant='body2' sx={{ color: 'text.primary' }}>
        {params.row.categoria ? removeSlashesAndScores(params.row.categoria) : 'Sin dato'}
      </Typography>
    )
  },
  {
    flex: 0.3,
    minWidth: 230,
    field: 'producto',
    headerName: 'PRODUCTO',
    headerAlign: 'center',
    align: 'center',
    renderCell: (params: GridRenderCellParams) => (
      <Typography variant='body2' sx={{ color: 'text.primary' }}>
        {params.row.producto ? params.row.producto : 'Sin dato'}
      </Typography>
    )
  },
  {
    flex: 0.225,
    minWidth: 100,
    field: 'fecha_alta',
    headerName: 'FECHA',
    headerAlign: 'left',
    align: 'left',
    renderCell: (params: GridRenderCellParams) => (
      <Typography variant='body2' sx={{ color: 'text.primary' }}>
        {params.row.fecha_alta
          ? formatDate(params.row.fecha_alta, 'es-AR') +
            ' - ' +
            formatDateTime(params.row.fecha_alta)
          : ''}
      </Typography>
    )
  },
  {
    flex: 0.2,
    minWidth: 130,
    field: 'status',
    headerName: 'ESTADO',
    sortable: false,
    disableColumnMenu: false,
    headerAlign: 'center',
    align: 'center',
    renderCell: (params: GridRenderCellParams) => {
      const estado = params.row.estado

      return (
        <CustomChip
          size='small'
          skin='light'
          color={getColor(estado)}
          label={getTexto(estado)}
          sx={{ cursor: 'pointer' }}
        />
      )
    }
  },
  {
    flex: 0.1,
    maxWidth: 80,
    headerName: '',
    field: 'accion',
    headerAlign: 'center',
    align: 'center',
    renderCell: () => <VerDetalleComponent />
  }
]
