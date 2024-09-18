// ** Base Imports
import { Suspense, memo, useEffect, useState } from 'react'

// ** MUI Imports
import { Grid } from '@mui/material'

// ** Custom Components Imports
import { FolderCogOutline } from 'mdi-material-ui'
import HeaderComponent from 'src/@core/components/HeaderComponent'
import Spinner from 'src/@core/components/spinner'
import { useDispatch } from 'src/@core/configs/store'
import { useAppContext } from 'src/@core/context/AppContext'
import { ElasticSearchDataIS, PaginationData, PaginationDataIS, QueryParams } from 'src/@core/types'
import ClientesView from 'src/bundle/clientes/components/ClientesView'
import { useFetchClientesQuery } from 'src/bundle/clientes/data/clientesApiService'
import { setClientesElasticSearch, setClientesList } from 'src/bundle/clientes/data/clientesStore'
import { ClienteFiltrosDTO, ClientesFiltrosIS } from 'src/bundle/clientes/domain/clientesModel'

function ClientesPage() {
  const [paginationData, setPaginationData] = useState<PaginationData>(PaginationDataIS)

  // * Hooks
  const dispatch = useDispatch()
  const { loading, setLoading } = useAppContext()
  const [queryParams] = useState<ClienteFiltrosDTO>(ClientesFiltrosIS)

  const qp = queryParams as QueryParams

  const { data, isLoading, isFetching, refetch } = useFetchClientesQuery({
    queryParams: qp,
    paginationData
  })

  useEffect(() => {
    setLoading(isLoading || isFetching || false)
  }, [setLoading, isLoading, isFetching])

  useEffect(() => {
    if (data) {
      dispatch(setClientesList(data.registros))
      dispatch(setClientesElasticSearch(data))
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data])

  return (
    <Suspense fallback={<Spinner />}>
      <Grid container spacing={6}>
        <Grid item xs={12}>
          <HeaderComponent
            icon={<FolderCogOutline />}
            textoPrincipal='Parametrías'
            textoSecundario=''
          />
          <ClientesView
            data={data || ElasticSearchDataIS}
            isLoading={loading}
            isFetching={loading}
            isLoadingRefresh={loading}
            onHandleRefresh={refetch}
            paginationData={paginationData}
            setPaginationData={setPaginationData}
          />
        </Grid>
      </Grid>
    </Suspense>
  )
}

export default memo(ClientesPage)
