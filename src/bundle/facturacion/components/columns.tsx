import { Typography } from '@mui/material'
import { GridColumns, GridRenderCellParams } from '@mui/x-data-grid'
import EstadoComponent from 'src/@core/components/EstadoComponent'
import VerDetalleComponent from 'src/@core/components/VerDetalleComponent'
import { formatDate, formatearMonto } from 'src/@core/utils'

export const columnsNotas: GridColumns = [
  {
    flex: 0.1,
    minWidth: 75,
    headerName: 'ID',
    field: 'id',
    headerAlign: 'center',
    align: 'center',
    renderCell: (params: GridRenderCellParams) => (
      <Typography variant='body2' sx={{ color: 'text.primary' }}>
        {params.row?.id ? params.row?.id : 'Sin datos'}
      </Typography>
    )
  },
  {
    flex: 0.1,
    minWidth: 100,
    headerName: 'TIPO',
    field: 'TIPO',
    headerAlign: 'center',
    align: 'center',
    renderCell: (params: GridRenderCellParams) => (
      <Typography variant='body2' sx={{ color: 'text.primary' }}>
        {params.row?.tipo ? params.row?.tipo : 'Sin Datos'}
      </Typography>
    )
  },
  {
    flex: 0.1,
    minWidth: 250,
    headerName: 'NOMBRE CLIENTE',
    field: 'razon_social',
    headerAlign: 'center',
    align: 'left',
    renderCell: (params: GridRenderCellParams) => (
      <Typography variant='body2' sx={{ color: 'text.primary' }}>
        {params.row?.cliente?.nombre ? params.row?.cliente?.nombre : 'Sin Datos'}
      </Typography>
    )
  },
  {
    flex: 0.1,
    minWidth: 160,
    headerName: 'DOCUMENTO',
    field: 'numero_documento',
    headerAlign: 'center',
    align: 'center',
    renderCell: (params: GridRenderCellParams) => (
      <Typography variant='body2' sx={{ color: 'text.primary' }}>
        {params.row?.cliente?.numero_documento
          ? params.row?.cliente?.numero_documento[0].valor
          : 'Sin datos'}
      </Typography>
    )
  },
  {
    flex: 0.1,
    minWidth: 100,
    headerName: 'MONEDA',
    field: 'moneda',
    headerAlign: 'left',
    align: 'left',
    renderCell: (params: GridRenderCellParams) => (
      <Typography variant='body2' sx={{ color: 'text.primary' }}>
        {params.row?.moneda ? params.row?.moneda : 'Sin datos'}
      </Typography>
    )
  },
  {
    flex: 0.1,
    minWidth: 100,
    headerName: 'MONTO',
    field: 'monto',
    headerAlign: 'left',
    align: 'left',
    renderCell: (params: GridRenderCellParams) => (
      <Typography variant='body2' sx={{ color: 'text.primary' }}>
        {params.row?.monto ? formatearMonto(params.row.monto, params.row.moneda) : 'Sin datos'}
      </Typography>
    )
  },
  {
    flex: 0.1,
    minWidth: 160,
    headerName: 'FECHA EMISON',
    field: 'fecha_alta',
    headerAlign: 'center',
    align: 'center',
    renderCell: (params: GridRenderCellParams) => (
      <Typography variant='body2' sx={{ color: 'text.primary' }}>
        {params.row?.fecha_alta ? formatDate(params.row?.fecha_alta) : 'Sin datos'}
      </Typography>
    )
  },
  {
    flex: 0.1,
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
