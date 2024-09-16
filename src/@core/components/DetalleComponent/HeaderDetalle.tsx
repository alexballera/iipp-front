//** MUI Imports */
import { CardHeader } from '@mui/material'

//** Core & Custom Components Imports */
import { HeaderDetalleProps } from 'src/@core/types'

const titleTypographyProps = {
  fontFamily: 'Inter',
  fontSize: '12px !important',
  fontWeight: 600,
  lineHeight: '200%',
  letterSpacing: 0.5,
  textTransform: 'uppercase',
  marginBottom: 2
}

const subheaderTypographyProps = {
  marginTop: 2,
  fontFamily: 'Inter',
  fontSize: '16px !important',
  fontWeight: 700,
  lineHeight: '150%'
}

const HeaderDetalle = (props: HeaderDetalleProps) => {
  const { subheader, titleHeader, action } = props

  return (
    <CardHeader
      sx={{ p: 0 }}
      title={titleHeader}
      subheader={subheader}
      action={action}
      titleTypographyProps={{ titleTypographyProps }}
      subheaderTypographyProps={{ subheaderTypographyProps }}
    />
  )
}
export default HeaderDetalle
