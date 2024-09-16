import { Grid } from '@mui/material'
import { useRouter } from 'next/router'
import { Suspense, useEffect, useState } from 'react'
import BreadcrumbsComponent from 'src/@core/components/BreadcrumbsComponent'
import ErrorMessageBackButton from 'src/@core/components/ErrorMessageBackButton'
import Spinner from 'src/@core/components/spinner'
import { useDispatch } from 'src/@core/configs/store'
import CobranzaDetalleComponent from 'src/bundle/cobranzas/components/CobranzaDetalleComponent'
import { setCobranza } from 'src/bundle/cobranzas/data/cobranzaStore'
import { useGetCobranzaByIdQuery } from 'src/bundle/cobranzas/data/cobranzasApiService'

function CobranzaDetallePage() {
  //** States */
  const [messageError, setMessageError] = useState('')

  //** Hooks */
  const router = useRouter()
  const dispatch = useDispatch()

  let { id } = router.query
  id = id?.toString() || ''

  const { data: cobranza, refetch, isLoading, isError, error } = useGetCobranzaByIdQuery(id || '')

  //** Effects */
  useEffect(() => {
    if (cobranza) {
      dispatch(setCobranza(cobranza))
    }
  }, [dispatch, cobranza])

  useEffect(() => {
    refetch()
  }, [refetch])

  useEffect(() => {
    if (error) {
      const message: any = error
      setMessageError(message?.data?.error?.message || '')
    }
  }, [isError, error])

  const breadCrumbDetalle = [
    {
      id: '01',
      text: cobranza?.nombre || ''
    }
  ]

  if (isLoading) return <Spinner />
  if (isError) return <ErrorMessageBackButton message={messageError} />

  return (
    <Suspense fallback={<Spinner />}>
      <BreadcrumbsComponent breadCrumbItems={breadCrumbDetalle} />
      {cobranza && (
        <Grid container spacing={6}>
          <Grid item xs={12}>
            <CobranzaDetalleComponent />
          </Grid>
        </Grid>
      )}
    </Suspense>
  )
}

export default CobranzaDetallePage
