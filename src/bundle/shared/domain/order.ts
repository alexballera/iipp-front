export type order = {
  campo: string
  valor: string
}

export type filtros = {
  campo: string
  valor: any
}

export const handleEventSort = (params: any): order | null => {
  const campo_orden = params[0].field
  const valor_orden = params[0].sort

  if (campo_orden === null || valor_orden === null) {
    return null
  }

  return { campo: campo_orden, valor: valor_orden }
}
