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

import { AccountTie } from 'mdi-material-ui'
import ClienteDetailView from 'src/bundle/iipp/components/ClienteDetailView'
import { useGetClienteByIdQuery } from 'src/bundle/iipp/data/clientesApiService'
import { setCliente } from 'src/bundle/iipp/data/clientesStore'

function IippDetailPage() {
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
        <BreadcrumbsComponent
          firstBreadcrumb='iipp'
          icon={<AccountTie fontSize='small' />}
          breadCrumbItems={breadCrumbDetalle}
        />
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

export default memo(IippDetailPage)
