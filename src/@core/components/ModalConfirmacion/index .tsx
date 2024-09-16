import LoadingButton from '@mui/lab/LoadingButton'
import { Button, Dialog, DialogActions, DialogContent, DialogTitle } from '@mui/material'
import { ReactNode } from 'react'
import { CONFIRMACION_ACCION } from 'src/@core/constants'

interface Props {
  open: boolean
  onClose: () => void
  onClick?: () => void
  title: string
  loading: boolean
  hiddenDialogActions?: boolean
  content?: ReactNode
  textCloseButton?: string
  textAccionButton?: string
  type?: 'button' | 'submit' | 'reset'
}

function ModalConfirmacion(props: Props) {
  const {
    open,
    onClose,
    title,
    onClick,
    content,
    loading,
    textCloseButton,
    textAccionButton,
    type,
    hiddenDialogActions
  } = props

  return (
    <Dialog open={open} onClose={onClose} aria-labelledby='responsive-dialog-title'>
      <DialogTitle id='responsive-dialog-title'>{title}</DialogTitle>
      <DialogContent>{content || CONFIRMACION_ACCION}</DialogContent>
      {!hiddenDialogActions && (
        <DialogActions>
          <Button variant='outlined' color='info' autoFocus onClick={onClose}>
            {textCloseButton || 'Cancelar'}
          </Button>
          <LoadingButton
            type={type || 'button'}
            loading={loading}
            variant='contained'
            onClick={onClick}
            autoFocus
          >
            {textAccionButton || 'Confirmar'}
          </LoadingButton>
        </DialogActions>
      )}
    </Dialog>
  )
}
export default ModalConfirmacion
