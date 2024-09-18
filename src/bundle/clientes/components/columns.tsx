import { IconButton, Typography } from '@mui/material'
import { GridColumns, GridRenderCellParams } from '@mui/x-data-grid'
import { Download } from 'mdi-material-ui'
import CustomTooltip from 'src/@core/components/CustomTooltip'
import EstadoComponent from 'src/@core/components/EstadoComponent'
import VerDetalleComponent from 'src/@core/components/VerDetalleComponent'
import { showArrayComma } from 'src/@core/utils'

export const columnsClientes: GridColumns = [
  {
    flex: 0.25,
    headerName: 'NOMBRE CLIENTE',
    field: 'nombre_cliente',
    headerAlign: 'center',
    align: 'left',
    renderCell: (params: GridRenderCellParams) => (
      <Typography variant='body2' sx={{ color: 'text.primary' }}>
        {params.row.nombre ? params.row.nombre : 'Sin datos'}
      </Typography>
    )
  },
  {
    flex: 0.15,
    headerName: 'DOCUMENTO',
    field: 'numero_documento',
    headerAlign: 'center',
    align: 'left',
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
    flex: 0.225,
    minWidth: 200,
    field: 'PRODUCTOS',
    headerAlign: 'center',
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
    minWidth: 150,
    headerName: 'ESTADO',
    field: 'estado',
    headerAlign: 'center',
    align: 'center',
    renderCell: (params: GridRenderCellParams) => (
      <EstadoComponent estado={params?.row?.cliente_completo ? 'COMPLETO' : 'INCOMPLETO'} />
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

export const columnsDocumentos: GridColumns = [
  {
    flex: 0.25,
    headerName: 'Tipo',
    field: 'tipo',
    headerAlign: 'center',
    align: 'center',
    renderCell: (params: GridRenderCellParams) => (
      <Typography variant='body2' sx={{ color: 'text.primary' }}>
        {params.row.tipo ? params.row.tipo : 'Sin datos'}
      </Typography>
    )
  },
  {
    flex: 0.25,
    headerName: 'Valor',
    field: 'valor',
    headerAlign: 'center',
    align: 'center',
    renderCell: (params: GridRenderCellParams) => (
      <Typography variant='body2' sx={{ color: 'text.primary' }}>
        {params.row.valor ? params.row.valor : 'Sin datos'}
      </Typography>
    )
  }
]

export const columnsImpuestos: GridColumns = [
  {
    flex: 0.25,
    headerName: 'Nombre',
    field: 'nombre',
    headerAlign: 'center',
    align: 'center',
    renderCell: (params: GridRenderCellParams) => (
      <Typography variant='body2' sx={{ color: 'text.primary' }}>
        {params.row.nombre ? params.row.nombre : 'Sin datos'}
      </Typography>
    )
  },
  {
    flex: 0.25,
    headerName: 'Condición',
    field: 'condicion',
    headerAlign: 'center',
    align: 'center',
    renderCell: (params: GridRenderCellParams) => (
      <Typography variant='body2' sx={{ color: 'text.primary' }}>
        {params.row.condicion ? params.row.condicion : 'Sin datos'}
      </Typography>
    )
  },
  {
    flex: 0.25,
    headerName: 'Jurisdicción',
    field: 'jurisdiccion',
    headerAlign: 'center',
    align: 'center',
    renderCell: (params: GridRenderCellParams) => (
      <Typography variant='body2' sx={{ color: 'text.primary' }}>
        {params.row.jurisdiccion ? params.row.jurisdiccion : 'Sin datos'}
      </Typography>
    )
  },
  {
    flex: 0.25,
    headerName: 'Alicuota',
    field: 'alicuota',
    headerAlign: 'center',
    align: 'center',
    renderCell: (params: GridRenderCellParams) => (
      <Typography variant='body2' sx={{ color: 'text.primary' }}>
        {params.row.alicuota ? params.row.alicuota : 'Sin datos'}
      </Typography>
    )
  },
  {
    flex: 0.25,
    headerName: 'Cuenta Contable',
    field: 'cuenta_contable',
    headerAlign: 'center',
    align: 'center',
    renderCell: (params: GridRenderCellParams) => (
      <Typography variant='body2' sx={{ color: 'text.primary' }}>
        {params.row.cuenta_contable ? params.row.cuenta_contable : 'Sin datos'}
      </Typography>
    )
  }
]

export const columnsArchivos: GridColumns = [
  {
    flex: 0.25,
    headerName: 'Nombre',
    field: 'nombre_original',
    headerAlign: 'center',
    align: 'center',
    renderCell: (params: GridRenderCellParams) => (
      <Typography variant='body2' sx={{ color: 'text.primary' }}>
        {params.row?.nombre_original ? params.row?.nombre_original : 'Sin datos'}
      </Typography>
    )
  },
  {
    flex: 0.25,
    headerName: 'Tipo',
    field: 'tipo_archivo',
    headerAlign: 'center',
    align: 'center',
    renderCell: (params: GridRenderCellParams) => (
      <Typography variant='body2' sx={{ color: 'text.primary' }}>
        {params.row?.tipo ? params.row?.tipo : 'Sin datos'}
      </Typography>
    )
  },
  {
    flex: 0.25,
    headerName: 'Descripcion',
    field: 'descripcion',
    headerAlign: 'center',
    align: 'center',
    renderCell: (params: GridRenderCellParams) => (
      <Typography variant='body2' sx={{ color: 'text.primary' }}>
        {params.row?.descripcion ? params.row?.descripcion : 'Sin datos'}
      </Typography>
    )
  },
  {
    flex: 0.125,
    minWidth: 75,
    headerName: 'Descargar',
    field: 'accion',
    headerAlign: 'center',
    align: 'center',
    renderCell: (params: GridRenderCellParams) =>
      params.row.ubicacion ? (
        <CustomTooltip
          text='Descargar archivo'
          icon={<Download fontSize='small' color='success' sx={{ mr: 1 }} />}
        >
          <IconButton>
            <Download fontSize='small' color='primary' />
          </IconButton>
        </CustomTooltip>
      ) : (
        <></>
      )
  }
]

export const columnsCorreos: GridColumns = [
  {
    flex: 1,
    field: 'correo',
    align: 'left',
    renderCell: (params: GridRenderCellParams) => (
      <Typography variant='body2' sx={{ color: 'text.primary' }}>
        {params.row.correo}
      </Typography>
    )
  }
]
