// ** Base Imports
import { Suspense, memo, useEffect, useState } from 'react'

// ** MUI Imports
import { Grid } from '@mui/material'

// ** Custom Components Imports
import Spinner from 'src/@core/components/spinner'
import { useDispatch } from 'src/@core/configs/store'
import { ElasticSearchDataIS, PaginationData, PaginationDataIS, QueryParams } from 'src/@core/types'
import {
  setSaldosElastisearch,
  setSaldosList
} from 'src/bundle/saldos-clientes/data/saldosClientesStore'
import { useFetchSaldosClientesQuery } from 'src/bundle/saldos-clientes/data/saldosClientesApiService'
import { useAppContext } from 'src/@core/context/AppContext'
import HeaderComponent from 'src/@core/components/HeaderComponent'
import { FolderCogOutline } from 'mdi-material-ui'
import SaldosClientesView from 'src/bundle/saldos-clientes/components/SaldosClientesView'
import SaldosClientesFiltrosComponent from 'src/bundle/saldos-clientes/components/SaldosClientesFiltrosComponent'
import {
  SaldoClienteFiltrosDTO,
  SaldoClienteFiltrosIS
} from 'src/bundle/saldos-clientes/domain/saldosClientesModel'

function SaldosClientesPage() {
  const [paginationData, setPaginationData] = useState<PaginationData>(PaginationDataIS)
  const [queryParams, setQueryParams] = useState<SaldoClienteFiltrosDTO>(SaldoClienteFiltrosIS)

  // * Hooks
  const dispatch = useDispatch()
  const { loading, setLoading } = useAppContext()

  const qp = queryParams as QueryParams

  const { data, isLoading, isFetching, refetch } = useFetchSaldosClientesQuery({
    queryParams: qp,
    paginationData
  })

  useEffect(() => {
    setLoading(isLoading || isFetching || false)
  }, [setLoading, isLoading, isFetching])

  useEffect(() => {
    if (data) {
      dispatch(setSaldosList(data.registros))
      dispatch(setSaldosElastisearch(data))
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data])

  return (
    <Suspense fallback={<Spinner />}>
      <Grid container spacing={6}>
        <Grid item xs={12}>
          <HeaderComponent
            icon={<FolderCogOutline />}
            textoPrincipal='Saldos Clientes'
            textoSecundario=''
          />
          <SaldosClientesFiltrosComponent
            queryParams={queryParams}
            setQueryParams={setQueryParams}
          />
          <SaldosClientesView
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

export default memo(SaldosClientesPage)
