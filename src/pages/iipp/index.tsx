// ** Base Imports
import { Suspense, memo, useEffect, useState } from 'react'

// ** MUI Imports
import { Button, Grid } from '@mui/material'

// ** Custom Components Imports
import { FolderCogOutline } from 'mdi-material-ui'
import { useRouter } from 'next/router'
import HeaderComponent from 'src/@core/components/HeaderComponent'
import Spinner from 'src/@core/components/spinner'
import { useDispatch } from 'src/@core/configs/store'
import { IIPP_ROUTE } from 'src/@core/constants'
import { useAppContext } from 'src/@core/context/AppContext'
import { AccionesEnum } from 'src/@core/enums'
import { ElasticSearchDataIS, PaginationData, PaginationDataIS, QueryParams } from 'src/@core/types'
import IippView from 'src/bundle/iipp/components/IippView'
import { useFetchIippQuery } from 'src/bundle/iipp/data/iippApiService'
import { setIippElasticSearch, setIippList } from 'src/bundle/iipp/data/iippStore'
import { IIPPFiltrosDTO, IIPPFiltrosIS } from 'src/bundle/iipp/domain/iippModel'

function IippPage() {
  const [paginationData, setPaginationData] = useState<PaginationData>(PaginationDataIS)

  // * Hooks
  const router = useRouter()
  const dispatch = useDispatch()
  const { loading, setLoading, setState, state } = useAppContext()
  const [queryParams] = useState<IIPPFiltrosDTO>(IIPPFiltrosIS)

  const qp = queryParams as QueryParams

  const { data, isLoading, isFetching, refetch } = useFetchIippQuery({
    queryParams: qp,
    paginationData
  })

  useEffect(() => {
    setLoading(isLoading || isFetching || false)
  }, [setLoading, isLoading, isFetching])

  useEffect(() => {
    if (data) {
      dispatch(setIippList(data.registros))
      dispatch(setIippElasticSearch(data))
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data])

  const handleCrear = () => {
    setState({
      ...state,
      accion: AccionesEnum.CREAR_IIPP
    })
    router.push(`${IIPP_ROUTE}/form/${AccionesEnum.CREAR_IIPP}`)
  }

  return (
    <Suspense fallback={<Spinner />}>
      <Grid container spacing={6}>
        <Grid item xs={12}>
          <HeaderComponent
            icon={<FolderCogOutline />}
            textoPrincipal='Instrucciones permanentes'
            textoSecundario=''
            acciones={
              <Button variant='contained' onClick={handleCrear}>
                Crear IIPP
              </Button>
            }
          />
          <IippView
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

export default memo(IippPage)
