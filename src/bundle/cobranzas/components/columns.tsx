import { Typography } from '@mui/material'
import { GridColumns, GridRenderCellParams } from '@mui/x-data-grid'
import EstadoComponent from 'src/@core/components/EstadoComponent'
import VerDetalleComponent from 'src/@core/components/VerDetalleComponent'
import { formatDate, formatearMonto } from 'src/@core/utils'

export const columnsCobranzas: GridColumns = [
  {
    flex: 0.225,
    minWidth: 250,
    headerName: 'NOMBRE CLIENTE',
    field: 'nombre',
    headerAlign: 'center',
    align: 'left',
    renderCell: (params: GridRenderCellParams) => (
      <Typography variant='body2' sx={{ color: 'text.primary' }}>
        {params.row.nombre ? params.row.nombre : 'Sin Datos'}
      </Typography>
    )
  },
  {
    flex: 0.225,
    minWidth: 120,
    headerName: 'DOCUMENTO',
    field: 'cuit',
    headerAlign: 'center',
    align: 'center',
    renderCell: (params: GridRenderCellParams) => (
      <Typography variant='body2' sx={{ color: 'text.primary' }}>
        {params.row.cuit ? params.row.cuit : 'Sin datos'}
      </Typography>
    )
  },
  {
    flex: 0.225,
    minWidth: 100,
    headerName: 'MONEDA',
    field: 'moneda',
    headerAlign: 'center',
    align: 'center',
    renderCell: (params: GridRenderCellParams) => (
      <Typography variant='body2' sx={{ color: 'text.primary' }}>
        {params.row.moneda ? params.row.moneda : 'Sin datos'}
      </Typography>
    )
  },
  {
    flex: 0.225,
    minWidth: 120,
    headerName: 'MONTO',
    field: 'monto',
    headerAlign: 'center',
    align: 'center',
    renderCell: (params: GridRenderCellParams) => (
      <Typography variant='body2' sx={{ color: 'text.primary' }}>
        {params.row.monto ? formatearMonto(params.row.monto, params.row.moneda) : 'Sin datos'}
      </Typography>
    )
  },
  {
    flex: 0.225,
    minWidth: 150,
    headerName: 'MONTO APLICADO',
    field: 'monto_aplicado',
    headerAlign: 'center',
    align: 'center',
    renderCell: (params: GridRenderCellParams) => (
      <Typography variant='body2' sx={{ color: 'text.primary' }}>
        {params.row.monto_aplicado && formatearMonto(params.row.monto_aplicado, params.row.moneda)}
      </Typography>
    )
  },
  {
    flex: 0.225,
    minWidth: 150,
    headerName: 'FECHA COBRANZA',
    field: 'fecha_operacion',
    headerAlign: 'center',
    align: 'center',
    renderCell: (params: GridRenderCellParams) => (
      <Typography variant='body2' sx={{ color: 'text.primary' }}>
        {params.row.fecha_operacion ? formatDate(params.row.fecha_operacion, 'es-AR') : 'Sin datos'}
      </Typography>
    )
  },
  {
    flex: 0.225,
    minWidth: 150,
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
