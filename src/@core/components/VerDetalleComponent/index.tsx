import { EyeArrowRightOutline, EyeOutline } from 'mdi-material-ui'
import CustomTooltip from '../CustomTooltip'

function VerDetalleComponent() {
  return (
    <CustomTooltip
      text='Ver detalle'
      icon={<EyeOutline fontSize='small' color='success' sx={{ mr: 1 }} />}
    >
      <EyeArrowRightOutline sx={{ width: '20px', cursor: 'pointer' }} />
    </CustomTooltip>
  )
}

export default VerDetalleComponent
