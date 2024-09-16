import {
  Box,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography
} from '@mui/material'
import TitleSectionForm from 'src/@core/components/TitleSectionForm'
import { formatDate, removeSlashesAndScores } from 'src/@core/utils'
import { Archivo } from 'src/bundle/shared/domain'

interface NovedadesTableProps {
  archivos: Archivo[]
  loading: boolean
  title: string
  error: string
}

function NovedadesTableComponent({ archivos, loading, title, error }: NovedadesTableProps) {
  return (
    <>
      <Box sx={{ my: 4 }}>
        <TitleSectionForm text={title} />
      </Box>
      {loading ? (
        <Typography>Cargando...</Typography>
      ) : archivos.length > 0 ? (
        <TableContainer sx={{ width: 450 }}>
          <Table aria-label='simple table'>
            <TableHead>
              <TableRow>
                <TableCell>Categoría</TableCell>
                <TableCell>Fecha Alta</TableCell>
                <TableCell>Nombre Archivo</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {archivos &&
                archivos?.map(archivo => (
                  <TableRow
                    key={archivo.fecha_alta}
                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                  >
                    <TableCell component='th' scope='row'>
                      {removeSlashesAndScores(archivo.categoria || 'Sin dato')}
                    </TableCell>
                    <TableCell component='th' scope='row'>
                      {formatDate(archivo.fecha_alta || 'Sin dato')}
                    </TableCell>
                    <TableCell component='th' scope='row'>
                      {archivo.nombre_original || 'Sin dato'}
                    </TableCell>
                  </TableRow>
                ))}
            </TableBody>
          </Table>
        </TableContainer>
      ) : (
        <Typography color={error ? 'error.main' : 'inherit'}>{error || 'Sin novedades'}</Typography>
      )}
    </>
  )
}
export default NovedadesTableComponent
