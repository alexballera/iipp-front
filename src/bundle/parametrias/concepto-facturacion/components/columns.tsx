import { Typography } from '@mui/material'
import { GridColumns, GridRenderCellParams } from '@mui/x-data-grid'
import VerDetalleComponent from 'src/@core/components/VerDetalleComponent'
import CustomChip from 'src/@core/components/mui/chip'
import { showArrayComma } from 'src/@core/utils'

export const columnsConceptoFacturacion: GridColumns = [
  {
    flex: 0.3,
    minWidth: 230,
    field: 'ID',
    headerAlign: 'left',
    align: 'left',
    renderCell: (params: GridRenderCellParams) => (
      <Typography variant='body2' sx={{ color: 'text.primary' }}>
        {params.row.id_compuesto ? params.row.id_compuesto : 'Sin dato'}
      </Typography>
    )
  },
  {
    flex: 0.225,
    minWidth: 150,
    field: 'NOMBRE',
    headerAlign: 'left',
    align: 'left',
    renderCell: (params: GridRenderCellParams) => (
      <Typography variant='body2' sx={{ color: 'text.primary' }}>
        {params.row.nombre ? params.row.nombre : 'Sin dato'}
      </Typography>
    )
  },
  {
    flex: 0.225,
    minWidth: 200,
    field: 'PRODUCTO',
    headerAlign: 'left',
    align: 'left',
    renderCell: (params: GridRenderCellParams) =>
      params.row.productos.length > 0 ? (
        params.row.productos.map((producto: string, i: number) => (
          <Typography key={producto} variant='body2' sx={{ color: 'text.primary', mr: 2 }}>
            {producto}
            {showArrayComma(params.row.productos, i)}
          </Typography>
        ))
      ) : (
        <Typography variant='body2' sx={{ color: 'text.primary' }}>
          Sin dato
        </Typography>
      )
  },
  {
    flex: 0.15,
    minWidth: 140,
    field: 'ESTADO',
    headerAlign: 'center',
    align: 'center',
    renderCell: (params: GridRenderCellParams) => {
      return (
        <CustomChip
          size='small'
          skin='light'
          color={params.row.habilitado ? 'success' : 'error'}
          label={params.row.habilitado ? 'Habilitado' : 'Deshabilitado'}
          sx={{
            '& .MuiChip-label': { textTransform: 'capitalize' }
          }}
        />
      )
    }
  },
  {
    flex: 0.1,
    minWidth: 80,
    headerName: '',
    field: 'accion',
    headerAlign: 'center',
    align: 'center',
    renderCell: () => <VerDetalleComponent />
  }
]
