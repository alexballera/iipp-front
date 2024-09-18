import { GridCellParams } from '@mui/x-data-grid'
import { useEffect, useState } from 'react'
import TableSelection from 'src/@core/components/TableSelection'
import { useDispatch } from 'src/@core/configs/store'
import { UbicacionDocumentoEnum } from 'src/@core/enums'
import { showApiErrorMessage } from 'src/@core/utils'
import { descargarArchivo } from 'src/@core/utils/descargarArchivo'
import { getArchivo } from 'src/bundle/shared/data/descargarArchivoApiService'
import { Archivo, DescargarArchivo } from 'src/bundle/shared/domain'
import { columnsArchivos } from './columns'

type DataGridArchivosProps = {
  archivos: Archivo[]
}
function DataGridArchivos({ archivos }: DataGridArchivosProps) {
  const dispatch = useDispatch()
  const [itemSelected, setItemSelected] = useState<GridCellParams>()
  const [loadingReportes, setLoadingReportes] = useState<boolean>(false)

  const archivosConId = archivos.map(archivo => ({
    id: archivo.id,
    nombre_original: archivo.nombre_original,
    tipo: archivo.ubicacion.split('/')[1],
    descripcion: archivo.descripcion,
    ubicacion: archivo.ubicacion
  }))

  useEffect(() => {
    if (itemSelected != undefined) {
      const body: DescargarArchivo = {
        contenedor_id: UbicacionDocumentoEnum.GENERICO,
        nombre_archivo: itemSelected?.row.ubicacion
      }

      setLoadingReportes(true)
      const response = dispatch(getArchivo.initiate(body))
      response
        .unwrap()
        .then(async (res: any) => {
          const extension = itemSelected?.row.nombre_original.split('.')[1]
          descargarArchivo(res, itemSelected?.row.tipo, extension)
        })
        .catch((error: any) => showApiErrorMessage(error?.data?.error?.message))
        .finally(() => setLoadingReportes(false))

      response.unsubscribe()
    }
  }, [itemSelected, dispatch])

  return (
    <TableSelection
      title='Archivos'
      setItemSelected={setItemSelected}
      columns={columnsArchivos}
      rows={archivosConId || []}
      loading={loadingReportes}
    />
  )
}

export default DataGridArchivos
