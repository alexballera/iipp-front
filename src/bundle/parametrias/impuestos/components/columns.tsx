import { Typography } from '@mui/material'
import { GridColumns, GridRenderCellParams } from '@mui/x-data-grid'
import VerDetalleComponent from 'src/@core/components/VerDetalleComponent'

export const columnsImpuestos: GridColumns = [
  {
    flex: 0.3,
    headerName: 'ID',
    field: 'id',
    headerAlign: 'left',
    align: 'left',
    renderCell: (params: GridRenderCellParams) => (
      <Typography variant='body2' sx={{ color: 'text.primary' }}>
        {params.row?.id_compuesto ? params.row?.id_compuesto : 'Sin datos'}
      </Typography>
    )
  },
  {
    flex: 0.3,
    headerName: 'Grupo',
    field: 'grupo',
    headerAlign: 'left',
    align: 'left',
    renderCell: (params: GridRenderCellParams) => (
      <Typography variant='body2' sx={{ color: 'text.primary' }}>
        {params.row?.grupo ? params.row?.grupo : 'Sin Datos'}
      </Typography>
    )
  },
  {
    flex: 0.3,
    headerName: 'Nombre del impuesto',
    field: 'descripcion',
    headerAlign: 'left',
    align: 'left',
    renderCell: (params: GridRenderCellParams) => (
      <Typography variant='body2' sx={{ color: 'text.primary' }}>
        {params.row?.descripcion ? params.row?.descripcion : 'Sin Datos'}
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
