import { KeyboardBackspace } from 'mdi-material-ui'
import toast from 'react-hot-toast'
import { FetchErrorTypes } from 'src/@core/types'

export const showApiErrorMessage = (message?: string) =>
  toast.error(message || 'Ha ocurrido un error inesperado', {
    position: 'top-center',
    duration: 4000
  })

const closeToast = (t: any) => toast.dismiss(t.id)

const hanldeVerDetalle = (t: any) => {
  console.log('ver')
  closeToast(t.id)
}

export const ShowToastPrueba = (message?: string) =>
  toast(
    t => (
      <span>
        Custom and <b>bold</b>
        <button onClick={() => hanldeVerDetalle(t)}>Ver</button>
        <button onClick={() => closeToast(t)}>{message}</button>
      </span>
    ),
    {
      duration: 20000,
      style: {
        border: '1px solid #713200',
        padding: '16px',
        color: '#713200'
      },
      icon: <KeyboardBackspace />
    }
  )

export const showApiSuccessMessage = (message?: string, duration?: number) =>
  toast.success(message || 'Se realizó de manera exitosa', {
    position: 'top-center',
    duration: duration || 4000
  })

export const showMessageError = (res: FetchErrorTypes) => {
  if (res.data?.error?.message) return showApiErrorMessage(res.data?.error?.message)
  if (res?.message) return showApiErrorMessage(res?.message)
  if (res.status === 'FETCH_ERROR') return showApiErrorMessage('Ha ocurrido un error inesperado')
  if (res.status && (res.status >= 400 || res.status < 500))
    return showApiErrorMessage('No se encontró')

  /* if (!res.originalArgs?.nombre_archivo)
    return showApiErrorMessage('No se encuentra el nombre de archivo') */

  return showApiErrorMessage(
    res.data?.error?.message || res.data?.error?.context || 'Ha ocurrido un error inesperado'
  )
}
