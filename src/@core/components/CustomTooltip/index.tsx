import { Stack, Tooltip, Typography } from '@mui/material'
import { ReactElement, ReactNode } from 'react'

type CustomTooltipProps = {
  icon?: ReactNode
  children?: ReactElement
  text: ReactNode | string
}

const CustomTooltip = ({ children, icon, text }: CustomTooltipProps) => {
  return (
    <Tooltip
      arrow
      title={
        <Stack direction='row' alignItems='center'>
          {icon && icon}
          <Typography variant='body1' component='span' color='white' sx={{ fontSize: 13 }}>
            {text}
          </Typography>
        </Stack>
      }
    >
      {children || <></>}
    </Tooltip>
  )
}

export default CustomTooltip
