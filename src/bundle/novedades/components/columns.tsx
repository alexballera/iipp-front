import { Typography } from '@mui/material'
import { GridColumns, GridRenderCellParams } from '@mui/x-data-grid'
import EstadoComponent from 'src/@core/components/EstadoComponent'
import VerDetalleComponent from 'src/@core/components/VerDetalleComponent'
import { formatDate, removeSlashesAndScores } from 'src/@core/utils'

export const columnsNovedades: GridColumns = [
  {
    flex: 0.3,
    minWidth: 180,
    headerName: 'PROCESO',
    field: 'tipo_novedad',
    headerAlign: 'center',
    align: 'center',
    renderCell: (params: GridRenderCellParams) => (
      <Typography variant='body2' sx={{ color: 'text.primary' }}>
        {params.row.tipo_novedad ? removeSlashesAndScores(params.row.tipo_novedad) : 'Sin Datos'}
      </Typography>
    )
  },
  {
    flex: 0.3,
    minWidth: 180,
    headerName: 'FECHA',
    field: 'fecha_alta',
    headerAlign: 'center',
    align: 'center',
    renderCell: (params: GridRenderCellParams) => (
      <Typography variant='body2' sx={{ color: 'text.primary' }}>
        {params.row.fecha_alta ? formatDate(params.row.fecha_alta, 'es-AR') : 'Sin datos'}
      </Typography>
    )
  },
  {
    flex: 0.3,
    minWidth: 180,
    headerName: 'ESTADO',
    field: 'estado',
    headerAlign: 'center',
    align: 'center',
    renderCell: (params: GridRenderCellParams) => (
      <EstadoComponent estado={params.row.estado || ''} />
    )
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
