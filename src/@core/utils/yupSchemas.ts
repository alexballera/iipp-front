import { REQUIRED_FIELD } from 'src/@core/constants'
import * as yup from 'yup'

yup.addMethod(yup.string, 'codigoPostal', function (message) {
  return this.test('codigoPostal', message, function (value: any) {
    const pais = this.parent.pais
    if (pais !== 'Argentina') {
      if (/^\d{4,8}$/.test(value)) {
        return true
      }
    } else {
      return true
    }

    return this.createError({ message })
  })
})

// Extiende el tipo de Yup para incluir el nuevo método personalizado
declare module 'yup' {
  interface StringSchema {
    codigoPostal(message: string): StringSchema
  }
}

export const direccionSchema = {
  direccion: yup.object().shape({
    pais: yup.string(),
    localidad: yup.string(),
    provincia: yup.string(),
    codigo_postal: yup.string().codigoPostal('El código postal no es válido'),
    calle: yup.string().required(REQUIRED_FIELD),
    numero: yup.string().required(REQUIRED_FIELD),
    piso: yup.string(),
    departamento: yup.string(),
    oficina: yup.string()
  })
}

const impuestoSchema = {
  nombre: yup.string(),
  condicion: yup.number(),
  jurisdiccion: yup.string(),
  alicuota: yup.number()
}

export const impuestosSchema = {
  impuesto_iva: yup.object().shape({
    ...impuestoSchema
  }),
  impuesto_iibb: yup.object().shape({
    ...impuestoSchema
  })
}
