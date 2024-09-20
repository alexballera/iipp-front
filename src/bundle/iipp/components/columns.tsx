import { Typography } from '@mui/material'
import { GridColumns, GridRenderCellParams } from '@mui/x-data-grid'
import VerDetalleComponent from 'src/@core/components/VerDetalleComponent'
import { formatDate } from 'src/@core/utils'

export const columnsClientes: GridColumns = [
  {
    flex: 0.5,
    headerName: 'NOMBRE CLIENTE',
    field: 'nombre_cliente',
    headerAlign: 'left',
    align: 'left',
    renderCell: (params: GridRenderCellParams) => (
      <Typography variant='body2' sx={{ color: 'text.primary' }}>
        {params.row.nombre ? params.row.nombre : 'Sin datos'}
      </Typography>
    )
  },
  {
    flex: 0.2,
    headerName: 'DOCUMENTO',
    field: 'numero_documento',
    headerAlign: 'center',
    align: 'right',
    renderCell: (params: GridRenderCellParams) => {
      const documentoArray = params.row.numero_documento
      const documento =
        Array.isArray(documentoArray) && documentoArray.length > 0
          ? documentoArray[0].valor
          : 'Sin Datos'

      return (
        <Typography variant='body2' sx={{ color: 'text.primary' }}>
          {documento}
        </Typography>
      )
    }
  },
  {
    flex: 0.2,
    minWidth: 150,
    headerName: 'FECHA ALTA',
    field: 'fecha',
    headerAlign: 'center',
    align: 'center',
    renderCell: (params: GridRenderCellParams) => (
      <Typography variant='body2' sx={{ color: 'text.primary' }}>
        {params.row.fecha_alta ? formatDate(params.row.fecha_alta, 'es-AR') : 'Sin datos'}
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
