//** MUI Imports */
import { Box, FormControl, InputLabel, MenuItem, Select, SelectChangeEvent } from '@mui/material'

//** Core & Custom Components Imports */
import { OptionSelector } from 'src/bundle/shared/domain'
import Loader from '../Loader'

type SelectorEstadoProps = {
  value: string
  onChange: (event: SelectChangeEvent) => void
  loading?: boolean
  optionsSelector: OptionSelector[]
  label?: string
}

const SelectorEstadoDetalle = ({
  value,
  onChange,
  loading,
  optionsSelector,
  label
}: SelectorEstadoProps) => {
  return (
    <Box sx={{ width: '100%' }}>
      {loading ? (
        <Loader height='50px' />
      ) : (
        <FormControl fullWidth>
          <InputLabel id='demo-simple-select-label'>{label || 'Estado'}</InputLabel>
          <Select
            labelId='demo-simple-select-label'
            id='demo-simple-select'
            value={value}
            label={label || 'Estado'}
            onChange={onChange}
          >
            {optionsSelector &&
              optionsSelector.map(option => (
                <MenuItem key={option.id || option.value} value={option.value}>
                  {option.label}
                </MenuItem>
              ))}
          </Select>
        </FormControl>
      )}
    </Box>
  )
}

export default SelectorEstadoDetalle
