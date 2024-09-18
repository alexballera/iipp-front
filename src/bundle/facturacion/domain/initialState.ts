import { SumarioClienteIS } from 'src/bundle/clientes/domain/clientesModel'
import { TipoDeProducto } from 'src/bundle/parametrias/productos/domain/productosModel'
import { GenerarNotaDTO, NotaDTO, NotaFiltrosDTO, TipoNota } from './facturacionModel'

//** Initial State */
export const CrearNotaIS: GenerarNotaDTO = {
  producto: TipoDeProducto.CUSTODIA
}

export const NotaIS: NotaDTO = {
  id: '',
  cliente: SumarioClienteIS,
  monto: 0,
  moneda: '',
  moneda_calculo: '',
  conceptos: [],
  producto: TipoDeProducto.CUSTODIA,
  fecha_alta: new Date(),
  tipo: TipoNota.DEBITO,
  id_compuesto: ''
}

export const NotaFiltrosIS: NotaFiltrosDTO = {
  filtros: [
    { campo: 'estado', valor: '' },
    { campo: 'numero_documento', valor: '' },
    { campo: 'razon_social', valor: '' },
    { campo: 'fecha_alta_desde', valor: '' },
    { campo: 'fecha_alta_hasta', valor: '' }
  ],
  orden: []
}
