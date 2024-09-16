// //** React Import */
// import { useState } from 'react'

// // ** MUI Imports
// import {
//   Button,
//   Collapse,
//   FormControl,
//   FormHelperText,
//   Grid,
//   IconButton,
//   InputLabel,
//   MenuItem,
//   Select,
//   Tooltip,
//   Typography
// } from '@mui/material'
// import { CloseCircleOutline, Upload } from 'mdi-material-ui'

// // ** Third Party & Libs Imports
// import { yupResolver } from '@hookform/resolvers/yup'
// import { useForm } from 'react-hook-form'
// import MultipartUpload from 'src/@core/lib/MultipartUpload'
// import * as yup from 'yup'

// //** Store & Services */
// import { useSelector } from 'src/store'
// import { cargaDocumentoIS as defaultValues } from 'src/store/initialState'

// // ** Custom Components
// import ButtonsActionsForm from 'src/@core/components/ButtonsActionsForm'

// //** Types & Enums*/
// import { UbicacionDocumentoEnum } from 'src/@core/enums'
// import { CargaDocumentoTypes } from 'src/@core/types'

// //** Constants */
// import { useAppContext } from 'src/@core/context/AppContext'
// import useCustomModal from 'src/@core/hooks/useCustomModal'
// import { showApiErrorMessage, showApiSuccessMessage } from 'src/@core/utils'
// import { PATH_ARCHIVO, REQUIRED_FIELD } from 'src/@core/constants'

// const schema = yup.object().shape({
//   archivo: yup.mixed().required('Debe seleccionar un archivo'),
//   sociedad_gerente_id: yup.string().required(REQUIRED_FIELD)
// })

// function FormUploadFile({ categoria_archivo }: CargaDocumentoTypes) {
//   const [errorArchivo, setErrorArchivo] = useState(false)

//   //** Hooks */
//   const { closeCustomModal } = useCustomModal()
//   const { loading, setLoading, setCreated } = useAppContext()
//   const {
//     SG: { sociedades }
//   } = useSelector(state => state)
//   const {
//     handleSubmit,
//     formState: { errors },
//     reset,
//     watch,
//     register
//   } = useForm({
//     defaultValues,
//     mode: 'onChange',
//     resolver: yupResolver(schema)
//   })

//   const resetArchivo = () => {
//     reset({
//       sociedad_gerente_id: watch().sociedad_gerente_id,
//       archivo: null
//     })
//   }

//   const onSubmit = (data: CargaDocumentoTypes) => {
//     const { archivo, sociedad_gerente_id } = data

//     if (archivo?.length) {
//       setLoading(true)
//       setCreated(false)

//       const URL = process.env.NEXT_PUBLIC_API_URL + PATH_ARCHIVO
//       const mpu = new MultipartUpload(URL, UbicacionDocumentoEnum.NOVEDAD)

//       mpu
//         .multipartUpload(
//           archivo[0],
//           sociedad_gerente_id as string,
//           categoria_archivo as string,
//           true
//         )
//         .then(() => {
//           showApiSuccessMessage('Archivo enviado')
//           setCreated(true)
//         })
//         .catch(() => showApiErrorMessage())
//         .finally(() => setLoading(false))

//       return
//     } else {
//       setErrorArchivo(true)

//       return
//     }
//   }

//   return (
//     <form onSubmit={handleSubmit(onSubmit)}>
//       <Grid container spacing={5}>
//         {/** sociedad_gerente_id */}
//         {sociedades?.length > 0 && (
//           <Grid item xs={12}>
//             <FormControl fullWidth sx={{ mt: 2 }}>
//               <InputLabel id='select-label'>Sociedad de gerente</InputLabel>
//               <Select
//                 label='Sociedad de gerente'
//                 placeholder='Escoge sociedad de gerente'
//                 id='stepper-alternative-personal-select'
//                 labelId='stepper-alternative-personal-select-label'
//                 error={Boolean(errors.sociedad_gerente_id)}
//                 disabled={loading}
//                 {...register('sociedad_gerente_id')}
//               >
//                 {sociedades?.map(({ id, razon_social_reducida, razon_social }) => (
//                   <MenuItem key={id} value={id}>
//                     {razon_social_reducida || razon_social}
//                   </MenuItem>
//                 ))}
//               </Select>
//               {errors.sociedad_gerente_id && (
//                 <FormHelperText sx={{ color: 'error.main' }} id='validation-schema-first-name'>
//                   {errors.sociedad_gerente_id.message}
//                 </FormHelperText>
//               )}
//             </FormControl>
//           </Grid>
//         )}

//         {/** archivo */}
//         {watch().archivo?.[0]?.name ? (
//           <Grid item xs={12}>
//             <Collapse
//               sx={{
//                 width: '100% !important',
//                 '& .MuiCollapse-wrapperInner': { width: '100% !important' }
//               }}
//               orientation='vertical'
//               in={Boolean(watch().archivo)}
//             >
//               <Typography variant='body2' sx={{ color: theme => theme.palette.primary.main }}>
//                 {watch().archivo?.[0]?.name || ''}
//                 <Tooltip arrow title='Quitar archivo'>
//                   <IconButton
//                     onClick={resetArchivo}
//                     color='error'
//                     aria-label='upload picture'
//                     component='label'
//                   >
//                     <CloseCircleOutline fontSize='small' />
//                   </IconButton>
//                 </Tooltip>
//               </Typography>
//             </Collapse>
//           </Grid>
//         ) : (
//           <Grid item xs={12}>
//             <FormHelperText
//               component={'p'}
//               sx={{ color: `${errorArchivo ? 'error.main' : ''}`, textAlign: 'right' }}
//               id='validation-schema-first-name'
//             >
//               Seleccione un archivo en formato .xlsx, .xls
//             </FormHelperText>
//           </Grid>
//         )}

//         <Grid item xs={12}>
//           <ButtonsActionsForm
//             endIcon={true}
//             handleBack={() => closeCustomModal()}
//             leftButton={
//               <FormControl fullWidth>
//                 <Button
//                   color={errorArchivo ? 'error' : 'primary'}
//                   onClick={() => setErrorArchivo(false)}
//                   variant='outlined'
//                   component='label'
//                   size='large'
//                   endIcon={<Upload />}
//                 >
//                   Archivo
//                   <input
//                     placeholder='Ingresa archivo'
//                     aria-describedby='validation-schema-first-name'
//                     hidden
//                     accept='.xlsx, .xls'
//                     multiple
//                     type='file'
//                     {...register('archivo', {
//                       required: true
//                     })}
//                     disabled={loading}
//                   />
//                 </Button>
//               </FormControl>
//             }
//             rigthTextButton='Enviar'
//             loading={loading}
//           />
//         </Grid>
//       </Grid>
//     </form>
//   )
// }

// export default FormUploadFile
