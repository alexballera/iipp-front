import CustomChip from 'src/@core/components/mui/chip'
import { removeSlashesAndScores } from 'src/@core/utils'

export const getEstadoTexto = (estado: string) => {
  if (estado === undefined) return 'Sin estado'

  return {
    ANULADA: 'ANULADA',
    APLICADO: 'APLICADO',
    APLICADO_PARCIALMENTE: 'APLICADO_PARCIALMENTE',
    CANCELADA: 'CANCELADA',
    COMPLETO: 'COMPLETO',
    VENCIDA: 'VENCIDA',
    CON_ERROR: 'CON_ERROR',
    EJECUTADA: 'EJECUTADA',
    EN_EJECUCION: 'EN_EJECUCION',
    EN_PROCESO: 'EN_PROCESO',
    GENERADA: 'GENERADA',
    INCOMPLETO: 'INCOMPLETO',
    OK: 'OK',
    PENDIENTE: 'PENDIENTE',
    default: 'SIN ESTADO'
  }[estado.toUpperCase() || 'default']
}

export const getEstadoColor = (estado: string) => {
  if (estado === undefined) return

  //** color: primary, secondary, success, error, warning, info */

  switch (estado.toUpperCase()) {
    case 'APLICADO':
      return 'primary'
    case 'APLICADO_PARCIALMENTE':
      return 'info'
    case 'PENDIENTE':
      return 'warning'
    case 'GENERADA':
      return 'primary'
    case 'COMPLETO':
      return 'primary'
    case 'INCOMPLETO':
      return 'warning'
    case 'OK':
      return 'primary'
    case 'EJECUTADA':
      return 'primary'
    case 'CANCELADA':
      return 'warning'
    case 'EN_PROCESO':
      return 'warning'
    case 'EN_EJECUCION':
      return 'warning'
    case 'VENCIDA':
      return 'warning'
    case 'ANULADA':
      return 'error'
    case 'CON_ERROR':
      return 'error'

    default:
      return
  }
}

type Props = {
  estado: string
}

function EstadoComponent({ estado }: Props) {
  const label = getEstadoTexto(estado || '')
  const color = getEstadoColor(estado || '')

  return (
    <CustomChip
      size='small'
      skin='light'
      color={color}
      label={removeSlashesAndScores(label || 'Sin dato')}
      sx={{
        '& .MuiChip-label': { textTransform: 'capitalize' }
      }}
    />
  )
}

export default EstadoComponent
