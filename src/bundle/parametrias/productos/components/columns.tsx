import { Typography } from '@mui/material'
import { GridColumns, GridRenderCellParams } from '@mui/x-data-grid'
import VerDetalleComponent from 'src/@core/components/VerDetalleComponent'

export const columnsProductos: GridColumns = [
  {
    flex: 0.3,
    headerName: 'NOMBRE',
    field: 'nombre',
    headerAlign: 'left',
    align: 'left',
    renderCell: (params: GridRenderCellParams) => (
      <Typography variant='body2' sx={{ color: 'text.primary' }}>
        {params.row?.nombre ? params.row?.nombre : 'Sin datos'}
      </Typography>
    )
  },
  {
    flex: 0.3,
    headerName: 'CUENTA CONTABLE',
    field: 'cuenta_contable',
    headerAlign: 'left',
    align: 'left',
    renderCell: (params: GridRenderCellParams) => (
      <Typography variant='body2' sx={{ color: 'text.primary' }}>
        {params.row?.cuenta_contable ? params.row?.cuenta_contable : 'Sin Datos'}
      </Typography>
    )
  },
  {
    flex: 0.3,
    headerName: 'RESPONSABLE COMERCIAL',
    field: 'responsable_comercial',
    headerAlign: 'left',
    align: 'left',
    renderCell: (params: GridRenderCellParams) => (
      <Typography variant='body2' sx={{ color: 'text.primary' }}>
        {params.row?.responsable_comercial?.nombre
          ? params.row?.responsable_comercial?.nombre
          : 'Sin Datos'}
      </Typography>
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
