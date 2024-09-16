import { CleaningServices } from '@mui/icons-material'
import { Box, IconButton, Typography } from '@mui/material'
import { Backspace } from 'mdi-material-ui'
import CustomTooltip from 'src/@core/components/CustomTooltip'
import { showApiSuccessMessage } from 'src/@core/utils'

interface HeaderProps {
  clearFields: () => void
}
function HeaderFiltrosComponent({ clearFields }: HeaderProps) {
  return (
    <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
      <Box sx={{ display: 'flex', alignItems: 'center' }}>
        <Typography
          variant='body1'
          sx={{
            fontSize: 20,
            fontWeight: 500
          }}
        >
          Iniciar una búsqueda
        </Typography>
        <Typography
          variant='body1'
          sx={{
            fontSize: 12,
            fontWeight: 300,
            marginLeft: 2
          }}
        >
          por un dato o tantos como quieras
        </Typography>
      </Box>
      <CustomTooltip
        text='Limpia los filtros'
        icon={<Backspace fontSize='small' color='success' sx={{ mr: 1 }} />}
      >
        <IconButton
          onClick={() => {
            clearFields()
            showApiSuccessMessage('Los filtros se limpiaron')
          }}
          color='primary'
          aria-label='upload picture'
          component='label'
        >
          <CleaningServices fontSize='small' />
        </IconButton>
      </CustomTooltip>
    </Box>
  )
}
export default HeaderFiltrosComponent
