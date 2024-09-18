// ** MUI Imports
import {
  Box,
  Button,
  FormControl,
  Grid,
  IconButton,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
  Stack,
  TextField,
  Tooltip,
  Typography
} from '@mui/material'
import { CloseCircleOutline, Upload } from 'mdi-material-ui'
import { Dispatch, SetStateAction } from 'react'
import { Controller } from 'react-hook-form'
import Loader from 'src/@core/components/Loader'

// ** Third Party Imports

//** Customs Components Imports */
import TitleSectionForm from 'src/@core/components/TitleSectionForm'
import { CategoriaArchivoFormulario } from 'src/@core/enums'
import { Archivo } from 'src/bundle/shared/domain'

type Props = {
  archivos: Archivo[]
  setArchivos: Dispatch<SetStateAction<Archivo[]>>
  loadingArchivo: boolean
  categoriaArchivo: string
  handleSelectChange: (event: SelectChangeEvent) => void
  register: any
  showCustomType: boolean
  errorArchivo: boolean
  control: any
  loading: boolean
  loadingInput: boolean
}

function ClienteArchivoForm(props: Props) {
  const {
    archivos,
    setArchivos,
    loadingArchivo,
    categoriaArchivo,
    handleSelectChange,
    register,
    showCustomType,
    errorArchivo,
    control,
    loading,
    loadingInput
  } = props

  const handleQuitarArchivo = (id: string) => {
    const archivosFiltrados = archivos.filter(archivo => archivo.id !== id)
    setArchivos(archivosFiltrados)
  }

  return (
    <Grid container spacing={5}>
      <Grid item xs={12} sx={{ mt: '20px' }}>
        <TitleSectionForm text='Archivos' />
      </Grid>

      {/** archivo */}
      <Grid item xs={12}>
        <Stack direction='row' alignItems='center' flexWrap='wrap'>
          {archivos.map(archivo => (
            <Stack key={archivo.id} direction='row' alignItems='center' sx={{ maxWidth: '450px' }}>
              <Typography
                variant='body2'
                component='span'
                sx={{ color: theme => theme.palette.primary.main }}
              >
                {archivo.nombre_original}
              </Typography>
              <Tooltip arrow title='Quitar archivo'>
                <IconButton
                  onClick={() => handleQuitarArchivo(archivo.id)}
                  color='error'
                  aria-label='upload picture'
                  component='label'
                >
                  <CloseCircleOutline fontSize='small' />
                </IconButton>
              </Tooltip>
            </Stack>
          ))}
          {loadingArchivo && (
            <Box sx={{ width: '58px' }}>
              <Loader height='20px' size={20} />
            </Box>
          )}
        </Stack>
      </Grid>
      <Grid item xs={12}>
        <Typography
          sx={{ color: `'error.main' : ''`, textAlign: 'left', mb: 4 }}
          id='validation-schema-first-name'
        >
          Seleccione uno o varios archivos
        </Typography>
      </Grid>
      <Grid item xs={12} sm={8}>
        <Stack direction='row' alignItems='center'>
          <FormControl fullWidth>
            <InputLabel id='demo-simple-select-label'>Archivo</InputLabel>
            <Select
              labelId='demo-simple-select-label'
              id='demo-simple-select'
              value={categoriaArchivo}
              label='Archivo'
              onChange={handleSelectChange}
              size='small'
              sx={{ mr: 4 }}
            >
              {Object.keys(CategoriaArchivoFormulario).map(key => (
                <MenuItem
                  key={key}
                  value={CategoriaArchivoFormulario[key as keyof typeof CategoriaArchivoFormulario]}
                >
                  {CategoriaArchivoFormulario[key as keyof typeof CategoriaArchivoFormulario]}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          {/** Tipo_archivo_cliente */}
          {showCustomType && (
            <FormControl fullWidth>
              <Controller
                name='archivos.0.descripcion'
                control={control}
                rules={{ required: true }}
                render={({ field: { value, onChange } }) => (
                  <TextField
                    value={value}
                    label='Tipo Archivo *'
                    onChange={onChange}
                    type='text'
                    placeholder='Escriba el tipo de archivo'
                    aria-describedby='stepper-linear-account-email'
                    size='small'
                  />
                )}
              />
            </FormControl>
          )}

          <FormControl fullWidth>
            <Button
              color={errorArchivo ? 'error' : 'primary'}
              variant='outlined'
              component='label'
              size='large'
              endIcon={<Upload />}
              disabled={loading || loadingInput}
              sx={{ ml: 4 }}
            >
              Adjuntar Archivo
              <input
                placeholder='Ingresa archivo'
                aria-describedby='validation-schema-first-name'
                hidden
                type='file'
                multiple
                {...register('archivo', {
                  required: true
                })}
              />
            </Button>
          </FormControl>
        </Stack>
      </Grid>
    </Grid>
  )
}

export default ClienteArchivoForm
