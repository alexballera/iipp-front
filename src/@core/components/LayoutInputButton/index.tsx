import { Box, Button, Grid, IconButton, Stack, Tooltip, Typography } from '@mui/material'
import { nanoid } from '@reduxjs/toolkit'
import { CloseCircleOutline } from 'mdi-material-ui'
import { ReactNode } from 'react'
import Loader from '../Loader'

type Props = {
  disabled: boolean
  handleAddItem?: () => void
  handleRemoveItem: (item: any) => void
  input: ReactNode
  isError: boolean
  listSelected: string[]
  loading: boolean
  sm?: number
}

/**
 *
 *
 * @param {Props} { disabled, handleRemoveItem, input, isError, listSelected, loading, handleAddItem, sm }
 * @return {*}
 */

function LayoutInputButton(props: Props) {
  const { disabled, handleRemoveItem, input, isError, listSelected, loading, handleAddItem, sm } =
    props

  return (
    <Grid container item xs={12} sm={sm || 6}>
      <Grid item xs={9}>
        {input}
      </Grid>
      <Grid item xs={3} sx={{ textAlign: 'right' }}>
        <Button
          color={isError ? 'error' : 'primary'}
          variant='outlined'
          component='label'
          size='large'
          onClick={handleAddItem}
          disabled={disabled}
          sx={{ height: 56, width: '90%' }}
        >
          Agregar
        </Button>
      </Grid>
      <Grid item xs={12}>
        <Stack direction='row' alignItems='center' flexWrap='wrap'>
          {listSelected.map(item => (
            <Stack key={nanoid()} direction='row' alignItems='center' sx={{ maxWidth: '450px' }}>
              <Typography
                variant='body2'
                component='span'
                sx={{ color: theme => theme.palette.primary.main }}
              >
                {item}
              </Typography>
              <Tooltip arrow title='Quitar producto'>
                <IconButton
                  onClick={() => handleRemoveItem(item)}
                  color='error'
                  aria-label='upload picture'
                  component='label'
                >
                  <CloseCircleOutline fontSize='small' />
                </IconButton>
              </Tooltip>
            </Stack>
          ))}
          {loading && (
            <Box sx={{ width: '58px' }}>
              <Loader height='20px' size={20} />
            </Box>
          )}
        </Stack>
      </Grid>
    </Grid>
  )
}
export default LayoutInputButton
