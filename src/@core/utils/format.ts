import { format } from 'date-fns'
import { DateFormatting, OptionsFormatTypes } from '../types'
import { MonedaEnum } from 'src/bundle/shared/domain'

export const UppercaseWord = (word: string | undefined): string => {
  if (!word) return ''

  return `${word[0].toUpperCase()}${word.slice(1).toLowerCase()}`
}

export const formatDate = (
  value: Date | string | undefined,
  locale?: string | 'es-AR',
  formatting: DateFormatting = {
    month: 'short',
    day: 'numeric',
    year: 'numeric'
  }
) => {
  if (!value) return value

  return new Intl.DateTimeFormat(locale, formatting).format(new Date(value))
}

export const formatDateTime = (date: Date): string => {
  const newDate = Intl.DateTimeFormat('es-AR', {
    timeStyle: 'short'
  }).format(new Date(date))

  return newDate
}

export const formatTimeHourMinutes = (date: any) => {
  const DateTime = new Date(date)
  const hours = DateTime.getUTCHours()
  const minutes = DateTime.getMinutes()
  const seconds = DateTime.getSeconds()

  return `${hours}:${minutes}:${seconds}`
}
export const formatDateOwn = (
  date: Date | number,
  formatting: string,
  options?: OptionsFormatTypes
) => {
  return format(new Date(date), formatting, options)
}

export const formatNumber = (number: number | string, locale?: string | 'es-AR') => {
  return new Intl.NumberFormat(locale).format(Number(number))
}

export const texToTitleFinal = (text: string) => {
  return text.charAt(0).toUpperCase() + text.slice(1)
}

export function utf8_to_b64(text: string) {
  return window.btoa(unescape(encodeURIComponent(text)))
}

/**
 * Removes all slashes and underscores from a string
 * @param {string} text - the text to remove the slashes and underscores
 * @returns the text without slashes and underscores
 */
export function removeSlashesAndScores(text: string): string {
  return text.replace(/\/|-|_/g, ' ')
}

/**
 * @param {number} numeroCompleto
 * @param {number} cantidadDecimal
 * @return {entero: number, decimal: number, numeroFormateado: number}
 */

type FormatDecimalTypes = {
  entero: number
  decimal: number
  numeroFormateado: number
}

export function formatearCantidadDecimales(
  numeroCompleto: number,
  cantidadDecimal: number
): FormatDecimalTypes {
  const numeroString = numeroCompleto?.toString().split('.')
  const entero = numeroString[0]
  let decimal = numeroString[1]
  decimal = decimal?.slice(0, cantidadDecimal)
  const numeroFormateado = `${entero}.${decimal}`

  return {
    entero: parseFloat(entero),
    decimal: parseFloat(decimal),
    numeroFormateado: parseFloat(numeroFormateado)
  }
}

export function formatearMonto(monto: number, moneda: MonedaEnum): string {
  const formato = new Intl.NumberFormat("es-AR", {
    style: "currency",
    currency: moneda,
  });

  return formato.format(monto)
}