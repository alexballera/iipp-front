//** Base Imports */
import { useRouter } from 'next/router'
import { memo, useEffect, useState } from 'react'

//** MUI Imports */
import {
  Box,
  FormControl,
  FormHelperText,
  Grid,
  InputAdornment,
  InputLabel,
  MenuItem,
  Select
} from '@mui/material'

//** Store, Enums, Utils Imports */
import { REQUIRED_FIELD } from 'src/@core/constants'
import { AccionesEnum } from 'src/@core/enums'
import { removeSlashesAndScores } from 'src/@core/utils'
import { useFetchNotasQuery } from 'src/bundle/facturacion/data/facturacionApiService'
import {
  CobranzasFormComponentProps,
  EstadoCobranzasOptions,
  VincularCobranzaDTO,
  cobranzasIS
} from '../domain/cobranzasModel'

// ** Third Party Imports
import { yupResolver } from '@hookform/resolvers/yup'
import { Controller, useForm } from 'react-hook-form'
import * as yup from 'yup'

//** Custom Components Imports */
import ButtonsActionsForm from 'src/@core/components/ButtonsActionsForm'
import Loader from 'src/@core/components/Loader'
import { useSelector } from 'src/@core/configs/store'
import FormLayout from 'src/@core/layouts/FormLayout'
import { PaginationDataIS, QueryParams } from 'src/@core/types'
import { EstadoNotaContable, NotaFiltrosDTO } from 'src/bundle/facturacion/domain'

const schema = yup.object().shape({
  notas_debito: yup.array(
    yup.object({
      id: yup.string().required(REQUIRED_FIELD)
    })
  ),
  estado: yup.string().oneOf(EstadoCobranzasOptions).required(REQUIRED_FIELD)
})

function VinculacionFormComponent(props: CobranzasFormComponentProps) {
  const { accion, creado, handleCrear, loading } = props

  const {
    COBRANZAS: { cobranza }
  } = useSelector(state => state)

  const [queryParams] = useState<NotaFiltrosDTO>({
    filtros: [
      {
        campo: 'numero_documento',
        valor: cobranza.cuit
      },
      {
        campo: 'estado',
        valor: EstadoNotaContable.GENERADA
      }
    ]
  })

  const qp = queryParams as QueryParams

  const { data, isFetching } = useFetchNotasQuery({
    queryParams: qp,
    paginationData: PaginationDataIS
  })

  const notasDebito = data?.registros.filter(nota => nota.estado !== 'ANULADA')

  //** Hooks */
  const router = useRouter()
  const {
    control,
    handleSubmit,
    formState: { errors },
    reset
  } = useForm({
    defaultValues: cobranzasIS,
    mode: 'onChange',
    resolver: yupResolver(schema)
  })

  useEffect(() => {
    if (creado) {
      reset()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [creado])

  const handleGoBack = () => {
    reset(cobranzasIS)
    router.back()
  }

  const onSubmit = (dataForm: VincularCobranzaDTO) => {
    if (accion === AccionesEnum.CREAR_VINCULACION_COBRANZA) {
      handleCrear && handleCrear({ ...dataForm, id: cobranza.id })

      return
    }

    return
  }

  return (
    <>
      <FormLayout title={removeSlashesAndScores(accion || '')}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Grid container spacing={5}>
            {/* Nota debito */}
            <Grid item xs={12}>
              <FormControl fullWidth>
                <InputLabel
                  id='stepper-linear-personal-pais'
                  error={Boolean(errors.notas_debito)}
                  htmlFor='stepper-linear-personal-pais'
                >
                  Nota debito *
                </InputLabel>
                <Controller
                  name='notas_debito.0.id'
                  control={control}
                  render={({ field: { value, onChange } }) => (
                    <Select
                      value={value}
                      label='Nota debito *'
                      id='controlled-select'
                      onChange={onChange}
                      labelId='controlled-select-label'
                      endAdornment={
                        <InputAdornment position='end'>
                          {isFetching && (
                            <Box sx={{ width: '58px' }}>
                              <Loader height='20px' size={20} />
                            </Box>
                          )}
                        </InputAdornment>
                      }
                    >
                      {notasDebito?.map(value => (
                        <MenuItem key={value.id} value={value.id}>
                          {value?.cliente?.nombre}-{value?.monto}-{value?.estado}
                        </MenuItem>
                      ))}
                    </Select>
                  )}
                />
                {errors.notas_debito && (
                  <FormHelperText
                    sx={{ color: 'error.main' }}
                    id='validation-schema-idioma_factura'
                  >
                    {errors.notas_debito.message}
                  </FormHelperText>
                )}
              </FormControl>
            </Grid>

            {/* Estado */}
            <Grid item xs={12}>
              <FormControl fullWidth>
                <InputLabel
                  id='stepper-linear-personal-pais'
                  error={Boolean(errors.estado)}
                  htmlFor='stepper-linear-personal-pais'
                >
                  Estado *
                </InputLabel>
                <Controller
                  name='estado'
                  control={control}
                  render={({ field: { value, onChange } }) => (
                    <Select
                      value={value}
                      label='Estado *'
                      id='controlled-select'
                      onChange={onChange}
                      labelId='controlled-select-label'
                    >
                      {EstadoCobranzasOptions.map((value, index) => (
                        <MenuItem key={index * 2} value={value}>
                          {removeSlashesAndScores(value)}
                        </MenuItem>
                      ))}
                    </Select>
                  )}
                />
                {errors.estado && (
                  <FormHelperText
                    sx={{ color: 'error.main' }}
                    id='validation-schema-idioma_factura'
                  >
                    {errors.estado.message}
                  </FormHelperText>
                )}
              </FormControl>
            </Grid>

            <Grid item xs={12}>
              <ButtonsActionsForm
                rigthTextButton='Guardar'
                rigthColorButton='primary'
                loading={loading}
                disabled={loading}
                leftTextButton='Cancelar'
                handleBack={handleGoBack}
              />
            </Grid>
          </Grid>
        </form>
      </FormLayout>
    </>
  )
}

export default memo(VinculacionFormComponent)
