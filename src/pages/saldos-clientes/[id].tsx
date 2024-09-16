import TabContext from '@mui/lab/TabContext'
import TabList from '@mui/lab/TabList'
import TabPanel from '@mui/lab/TabPanel'
import { Box, Grid, Stack, Tab } from '@mui/material'
import { useRouter } from 'next/router'
import { Suspense, SyntheticEvent, useEffect, useState } from 'react'
import BreadcrumbsComponent from 'src/@core/components/BreadcrumbsComponent'
import ErrorMessageBackButton from 'src/@core/components/ErrorMessageBackButton'
import TableSelection from 'src/@core/components/TableSelection'
import Spinner from 'src/@core/components/spinner'
import { useDispatch } from 'src/@core/configs/store'
import { PaginationData, PaginationDataIS, QueryParams } from 'src/@core/types'
import { columnsCobranzas } from 'src/bundle/cobranzas/components/columns'
import { columnsNotas } from 'src/bundle/facturacion/components/columns'
import SaldosClientesDetailView from 'src/bundle/saldos-clientes/components/SaldosClientesDetailView'
import { useFetchSaldosClientesQuery } from 'src/bundle/saldos-clientes/data/saldosClientesApiService'
import { setSaldo } from 'src/bundle/saldos-clientes/data/saldosClientesStore'
import {
  DataGridCobranzasProps,
  DataGridNotasProps,
  SaldoClienteFiltrosDTO,
  SaldoClienteFiltrosIS,
  SaldosClienteDTO,
  saldosClienteIS
} from 'src/bundle/saldos-clientes/domain/saldosClientesModel'

function DetalleSaldosClientePage() {
  const [paginationData] = useState<PaginationData>(PaginationDataIS)

  //** States */
  const [messageError, setMessageError] = useState('')
  const [stateSaldo, setStateSaldo] = useState<SaldosClienteDTO>(saldosClienteIS)
  const [queryParams] = useState<SaldoClienteFiltrosDTO>(SaldoClienteFiltrosIS)

  //** Hooks */
  const router = useRouter()
  const dispatch = useDispatch()
  const [value, setValue] = useState('cobranzas')

  let { id } = router.query
  id = id?.toString() || ''

  const qp = queryParams as QueryParams

  const { data, isLoading, error, isError } = useFetchSaldosClientesQuery({
    queryParams: qp,
    paginationData
  })

  //** Effects */
  useEffect(() => {
    const saldo = data?.registros.find(item => item.id === id)
    if (saldo) {
      setStateSaldo(saldo)
      dispatch(setSaldo(saldo))
    }
  }, [dispatch, data?.registros, id])

  function DataGridCobranzas({ cobranzas }: DataGridCobranzasProps) {
    const cobranzasConId = cobranzas.map((cobranza, index) => ({ ...cobranza, id: index + 1 }))

    return (
      <TableSelection
        loading={isLoading}
        title='Cobranzas'
        columns={columnsCobranzas}
        rows={cobranzasConId}
      />
    )
  }

  function DataGridNotas({ notas }: DataGridNotasProps) {
    const notasId = notas?.map((nota, index) => ({ ...nota, id: index + 1 }))

    return (
      <TableSelection loading={isLoading} title='Notas' columns={columnsNotas} rows={notasId} />
    )
  }

  useEffect(() => {
    if (error) {
      const message: any = error
      setMessageError(message?.data?.error?.message || '')
    }
  }, [isError, error])

  const breadCrumbDetalle = [
    {
      id: '01',
      text: stateSaldo?.cliente.nombre || ''
    }
  ]

  if (isLoading) return <Spinner />
  if (isError) return <ErrorMessageBackButton message={messageError} />

  const TabContent = [
    {
      value: 'cobranzas',
      content: <DataGridCobranzas cobranzas={stateSaldo?.cobranza || []} />
    },
    {
      value: 'notas',
      content: <DataGridNotas notas={stateSaldo?.nota_debito || []} />
    }
  ]

  const handleChange = (_event: SyntheticEvent, newValue: string) => setValue(newValue)

  return (
    <Suspense fallback={<Spinner />}>
      <BreadcrumbsComponent breadCrumbItems={breadCrumbDetalle} />
      {stateSaldo && (
        <Grid container spacing={6}>
          <Grid item xs={12}>
            <SaldosClientesDetailView />
          </Grid>

          <Grid item xs={12}>
            <TabContext value={value}>
              <Box sx={{ mb: 4 }}>
                <Stack
                  direction='row'
                  justifyContent='space-between'
                  alignItems='center'
                  spacing={2}
                >
                  <TabList onChange={handleChange} aria-label='lab API tabs example'>
                    {TabContent.map(tab => (
                      <Tab
                        key={tab.value}
                        label={tab.value.toLocaleUpperCase()}
                        value={tab.value}
                      />
                    ))}
                  </TabList>
                </Stack>
              </Box>
              {TabContent.map(tab => (
                <TabPanel key={tab.value} value={tab.value} sx={{ px: 0 }}>
                  {tab.content}
                </TabPanel>
              ))}
            </TabContext>
          </Grid>
        </Grid>
      )}
    </Suspense>
  )
}

export default DetalleSaldosClientePage
