import { Typography } from '@mui/material'
import { GridColumns, GridRenderCellParams } from '@mui/x-data-grid'
import VerDetalleComponent from 'src/@core/components/VerDetalleComponent'

export const columnsSaldosClientes: GridColumns = [
  {
    flex: 0.25,
    headerName: 'NOMBRE CLIENTE',
    field: 'nombre_cliente',
    headerAlign: 'left',
    align: 'left',
    renderCell: (params: GridRenderCellParams) => (
      <Typography variant='body2' sx={{ color: 'text.primary' }}>
        {params.row.cliente?.nombre ? params.row.cliente?.nombre : 'Sin datos'}
      </Typography>
    )
  },
  {
    flex: 0.15,
    headerName: 'DOCUMENTO',
    field: 'numero_documento',
    headerAlign: 'center',
    align: 'center',
    renderCell: (params: GridRenderCellParams) => (
      <Typography variant='body2' sx={{ color: 'text.primary' }}>
        {params.row.cliente?.cuit ? params.row.cliente?.cuit : 'Sin Datos'}
      </Typography>
    )
  },
  {
    flex: 0.15,
    headerName: 'DEUDA TOTAL',
    field: 'deuda_total',
    headerAlign: 'center',
    align: 'center',
    renderCell: (params: GridRenderCellParams) => (
      <Typography variant='body2' sx={{ color: 'text.primary' }}>
        {params.row.deuda_total ? params.row.deuda_total : 'Sin datos'}
      </Typography>
    )
  },
  {
    flex: 0.15,
    headerName: 'DEUDA NO VENCIDA',
    field: 'deuda_total_no_vencida',
    headerAlign: 'center',
    align: 'center',
    renderCell: (params: GridRenderCellParams) => (
      <Typography variant='body2' sx={{ color: 'text.primary' }}>
        {params.row.deuda_total_no_vencida != 0 ? params.row.deuda_total_no_vencida : 'Sin datos'}
      </Typography>
    )
  },
  {
    flex: 0.15,
    headerName: 'DEUDA VENCIDA',
    field: 'deuda_total_vencida',
    headerAlign: 'center',
    align: 'center',
    renderCell: (params: GridRenderCellParams) => {
      const deudaVencida = params.row.deuda_total_vencida
      let valorDeudaVencida = 'Sin datos'

      if (deudaVencida) {
        const keys = ['hasta_treinta', 'hasta_sesenta', 'hasta_noventa', 'mas_noventa']
        const valorDeuda = keys.find(key => deudaVencida[key] && deudaVencida[key] !== '0')

        if (valorDeuda) {
          valorDeudaVencida = deudaVencida[valorDeuda]
        }
      }

      return (
        <Typography variant='body2' sx={{ color: 'text.primary' }}>
          {valorDeudaVencida}
        </Typography>
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
