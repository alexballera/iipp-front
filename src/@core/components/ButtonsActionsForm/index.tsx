import SendIcon from '@mui/icons-material/Send'
import LoadingButton from '@mui/lab/LoadingButton'
import { Button, Grid } from '@mui/material'
import { ReactNode } from 'react'

type ButtonsActionsForm = {
  leftTextButton?: string
  leftButton?: ReactNode
  rigthTextButton?: string
  handleBack?: () => void
  disabled?: boolean
  disabledRigthButton?: boolean
  loading?: boolean
  endIcon?: boolean
  widthButtons?: number
  onClick?: () => void
  mt?: number
  spacingContainer?: number
  rigthColorButton?: 'inherit' | 'primary' | 'secondary' | 'success' | 'error' | 'info' | 'warning'
  variantRigthButton?: 'contained' | 'outlined' | 'text'
  colorLeftButton?: 'inherit' | 'primary' | 'secondary' | 'success' | 'error' | 'info' | 'warning'
  variantLeftButton?: 'contained'
  alignContent?: string
  minHeight?: number | string
}

const ButtonsActionsForm = ({
  disabled,
  disabledRigthButton,
  handleBack,
  rigthTextButton,
  leftTextButton,
  leftButton,
  loading,
  endIcon,
  widthButtons,
  onClick,
  mt,
  variantRigthButton,
  rigthColorButton,
  spacingContainer,
  alignContent,
  minHeight
}: ButtonsActionsForm) => (
  <Grid
    container
    spacing={spacingContainer || 2}
    alignItems='center'
    alignContent={alignContent}
    justifyContent='flex-end'
    sx={{ mt: mt || 2, minHeight: minHeight || 'inherit' }}
  >
    <Grid item xs={12} sm={widthButtons || 3}>
      {leftButton
        ? leftButton
        : leftTextButton && (
            <Button
              fullWidth
              size='large'
              variant='outlined'
              onClick={handleBack}
              color='secondary'
              disabled={disabled || false}
            >
              {leftTextButton}
            </Button>
          )}
    </Grid>
    {rigthTextButton && (
      <Grid item xs={12} sm={widthButtons || 3}>
        <LoadingButton
          fullWidth
          size='large'
          type='submit'
          loading={loading}
          color={rigthColorButton || 'primary'}
          variant={variantRigthButton || 'contained'}
          loadingPosition={endIcon ? 'end' : 'center'}
          endIcon={endIcon && <SendIcon />}
          onClick={onClick}
          disabled={disabledRigthButton}
        >
          {rigthTextButton}
        </LoadingButton>
      </Grid>
    )}
  </Grid>
)
export default ButtonsActionsForm
