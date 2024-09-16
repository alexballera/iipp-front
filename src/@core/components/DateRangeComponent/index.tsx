//** Base Imports */
import { Dispatch, SetStateAction } from 'react'

//** MUI Imports */
import { Collapse, Stack, styled, useTheme } from '@mui/material'
import Button, { ButtonProps } from '@mui/material/Button'
import { MenuDown, MenuUp } from 'mdi-material-ui'

//** Date Components Imports */
import { es } from 'date-fns/locale'
import { DateRange, RangeKeyDict } from 'react-date-range'
import {
  errorColor,
  primaryColor,
  secondaryColor,
  warningColor
} from 'src/@core/layouts/UserThemeOptions'

export type DRComponentTypes = {
  textButton: string
  openDateRange: boolean
  setOpenDateRange: Dispatch<SetStateAction<boolean>>
  handleConfirmarFechas?: () => void
  onChange: (rangesByKey: RangeKeyDict) => void
  selectionDateRange: DateRangeTypes
  disabled: boolean
  height?: string
  top?: string
  size?: any
  sx?: any
  dateRangeClassName?: string
  error?: boolean
}

export type DateRangeTypes = {
  startDate?: Date
  endDate?: Date
  key: string
}

export const DateRangeIS: DateRangeTypes = {
  key: 'selection'
}

const DateRangeComponent = ({
  textButton,
  onChange,
  openDateRange,
  selectionDateRange,
  setOpenDateRange,
  disabled,
  top,
  size,
  sx,
  dateRangeClassName,
  handleConfirmarFechas,
}: DRComponentTypes) => {
  const theme = useTheme();
  const colors = ['rgba(58, 53, 65, 0.7)', primaryColor, secondaryColor, warningColor, errorColor]

  const CustomButton = styled(Button)<ButtonProps>(() => ({
    color: colors[0],
    fontWeight: 400,
    '&.MuiButtonBase-root': {
      justifyContent: 'space-between',
      marginBottom: 16,
      paddingLeft: 14
    }
  }))

  return (
    <>
      <CustomButton
        onClick={() => setOpenDateRange(!openDateRange)}
        variant='outlined'
        disabled={disabled || false}
        fullWidth
        size={size}
        sx={sx}
        endIcon={
          openDateRange ? (
            <MenuUp sx={{ color: colors[0] }} />
          ) : (
            <MenuDown sx={{ color: colors[0] }} />
          )
        }
      >
        {textButton}
      </CustomButton>
      <Collapse
        in={openDateRange}
        style={{
          border: theme.palette.mode === 'dark' ? 'none' : '1px solid rgb(239, 242, 247)',
          position: 'absolute',
          zIndex: 1000,
          top: top,
          backgroundColor: theme.palette.mode === 'dark' ? '#3D3759' : 'white', 
          borderRadius: 8
        }}
      >
        <Stack direction={'column'}>
          <DateRange
            editableDateInputs={true}
            ranges={[selectionDateRange]}
            onChange={onChange}
            locale={es}
            rangeColors={[colors[1], colors[2], colors[3]]}
            dateDisplayFormat='d MMM, yyyy'
            startDatePlaceholder='Desde'
            endDatePlaceholder='Hasta'
            maxDate={undefined}
            className={dateRangeClassName || ''}
          />
          <Button
            color='secondary'
            size='small'
            variant='contained'
            sx={{ m: 4 }}
            onClick={handleConfirmarFechas}
          >
            Confirmar fechas
          </Button>
        </Stack>
      </Collapse>
    </>
  )
}

export default DateRangeComponent