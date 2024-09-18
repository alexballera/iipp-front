//** Base Imports */
import { useRouter } from 'next/router'
import { Suspense, memo, useEffect } from 'react'

// ** MUI Imports
import { Grid } from '@mui/material'

//** Custom Components */
import BreadcrumbsComponent from 'src/@core/components/BreadcrumbsComponent'
import ErrorMessageBackButton from 'src/@core/components/ErrorMessageBackButton'
import Spinner from 'src/@core/components/spinner'
import { useDispatch } from 'src/@core/configs/store'
import { useGetClienteByIdQuery } from 'src/bundle/clientes/data/clientesApiService'
import { setCliente } from 'src/bundle/clientes/data/clientesStore'

import ClienteDetailView from 'src/bundle/clientes/components/ClienteDetailView'

function ClientesDetailPage() {
  //** Hooks */
  const router = useRouter()
  const dispatch = useDispatch()

  let { id } = router.query
  id = id?.toString() || ''

  const { data: cliente, refetch, isLoading, isError } = useGetClienteByIdQuery(id || '')

  //** Effects */
  useEffect(() => {
    if (cliente) {
      dispatch(setCliente(cliente))
    }
  }, [dispatch, cliente])

  useEffect(() => {
    refetch()
  }, [refetch])


  const breadCrumbDetalle = [
    {
      id: '01',
      text: cliente?.nombre || ''
    }
  ]

  if (isLoading) return <Spinner />

  if (isError) return <ErrorMessageBackButton message={'Ha ocurrido un error inesperado'} />


  return (
    <Suspense fallback={<Spinner />}>
      <>
        <BreadcrumbsComponent breadCrumbItems={breadCrumbDetalle} />
        {cliente && (
          <>
            <Grid container spacing={6}>
              <Grid item xs={12}>
                <ClienteDetailView />
              </Grid>
            </Grid>
          </>
        )}
      </>
    </Suspense>
  )
}

export default memo(ClientesDetailPage)
