import { Box, Typography } from '@mui/material'
import { ReactNode } from 'react'

type TProps = {
  label?: string
  data?: string | number | ReactNode
  dataFontWeight?: number
}

const ShowDataLabel = ({ label, data, dataFontWeight }: TProps) => (
  <Box>
    <Typography variant='caption' sx={{ fontWeight: 300, fontSize: '0.7rem' }}>
      {label}
    </Typography>
    <Typography variant='body2' sx={{ fontWeight: dataFontWeight || 600, fontSize: '0.875rem' }}>
      {data}
    </Typography>
  </Box>
)
export default ShowDataLabel
