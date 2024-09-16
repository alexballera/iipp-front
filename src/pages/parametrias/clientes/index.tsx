// ** Base Imports
import { Suspense, memo, useEffect, useState } from 'react'

// ** MUI Imports
import { Grid } from '@mui/material'

// ** Custom Components Imports
import Spinner from 'src/@core/components/spinner'
import { useDispatch } from 'src/@core/configs/store'
import { ElasticSearchDataIS, PaginationData, PaginationDataIS, QueryParams } from 'src/@core/types'
import ClientesView from '../../../bundle/parametrias/clientes/components/ClientesView'
import { useFetchClientesQuery } from '../../../bundle/parametrias/clientes/data/clientesApiService'
import {
  setClientesElasticSearch,
  setClientesList
} from '../../../bundle/parametrias/clientes/data/clientesStore'
import { useAppContext } from 'src/@core/context/AppContext'
import HeaderComponent from 'src/@core/components/HeaderComponent'
import { FolderCogOutline } from 'mdi-material-ui'
import {
  ClienteFiltrosDTO,
  ClientesFiltrosIS
} from 'src/bundle/parametrias/clientes/domain/clientesModel'
import ClientesFiltrosComponent from 'src/bundle/parametrias/clientes/components/ClientesFiltrosComponent'

function ClientesPage() {
  const [paginationData, setPaginationData] = useState<PaginationData>(PaginationDataIS)

  // * Hooks
  const dispatch = useDispatch()
  const { loading, setLoading } = useAppContext()
  const [queryParams, setQueryParams] = useState<ClienteFiltrosDTO>(ClientesFiltrosIS)

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
          <ClientesFiltrosComponent queryParams={queryParams} setQueryParams={setQueryParams} />
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
