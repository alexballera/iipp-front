//** Base Imports */
import TabContext from '@mui/lab/TabContext'
import TabList from '@mui/lab/TabList'
import TabPanel from '@mui/lab/TabPanel'
import { useRouter } from 'next/router'
import { Suspense, SyntheticEvent, memo, useEffect, useState } from 'react'

// ** MUI Imports
import { Box, Grid, Stack, Tab } from '@mui/material'

//** Custom Components */
import BreadcrumbsComponent from 'src/@core/components/BreadcrumbsComponent'
import ErrorMessageBackButton from 'src/@core/components/ErrorMessageBackButton'
import Spinner from 'src/@core/components/spinner'
import { useDispatch } from 'src/@core/configs/store'
import DataGridParametrias from 'src/bundle/clientes/components/DataGridParametrias'
import { useGetClienteByIdQuery } from 'src/bundle/clientes/data/clientesApiService'
import { setCliente } from 'src/bundle/clientes/data/clientesStore'
import DirectionComponent from 'src/bundle/facturacion/components/DireccionComponent'

import TableSelection from 'src/@core/components/TableSelection'
import ClienteDetailView from 'src/bundle/clientes/components/ClienteDetailView'
import DataGridArchivos from 'src/bundle/clientes/components/DataGridArchivos'
import {
  columnsCorreos,
  columnsDocumentos,
  columnsImpuestos
} from 'src/bundle/clientes/components/columns'
import {
  DataGridCorreosProps,
  DataGridDocumentosProps,
  DataGridImpuestosProps,
  DataGridPercepcionesProps
} from 'src/bundle/clientes/domain/clientesModel'

function ClientesDetailPage() {
  //** Hooks */
  const router = useRouter()
  const dispatch = useDispatch()
  const [value, setValue] = useState('impuestos')

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

  function DataGridCorreos({ correos }: DataGridCorreosProps) {
    const correosConId = correos.map((correo, index) => ({ id: index, correo }))

    return <TableSelection title='Correos' columns={columnsCorreos} rows={correosConId} />
  }

  function DataGridImpuestos({ impuestos }: DataGridImpuestosProps) {
    const impuestosConId = impuestos?.map((impuesto, index) => ({ ...impuesto, id: index + 1 }))

    return <TableSelection title='Impuestos' columns={columnsImpuestos} rows={impuestosConId} />
  }

  function DataGridDocumentos({ documentos }: DataGridDocumentosProps) {
    const documentosConId = documentos?.map((documento, index) => ({ ...documento, id: index + 1 }))

    return <TableSelection title='Documentos' columns={columnsDocumentos} rows={documentosConId} />
  }

  function DataGridPercepciones({ percepciones }: DataGridPercepcionesProps) {
    const percepcionesConId = percepciones?.map((percepcion, index) => ({
      ...percepcion,
      id: index + 1
    }))

    return (
      <TableSelection title='Percepciones' columns={columnsImpuestos} rows={percepcionesConId} />
    )
  }

  const breadCrumbDetalle = [
    {
      id: '01',
      text: cliente?.nombre || ''
    }
  ]

  if (isLoading) return <Spinner />

  if (isError) return <ErrorMessageBackButton message={'Ha ocurrido un error inesperado'} />

  const TabContent = [
    {
      value: 'impuestos',
      content: <DataGridImpuestos impuestos={cliente?.impuestos || []} />
    },
    {
      value: 'percepciones',
      content: <DataGridPercepciones percepciones={cliente?.percepciones || []} />
    },
    {
      value: 'documentos',
      content: <DataGridDocumentos documentos={cliente?.numero_documento || []} />
    },
    {
      value: 'correos',
      content: <DataGridCorreos correos={cliente?.emails || []} />
    },
    {
      value: 'parametrias',
      content: <DataGridParametrias parametrias={cliente?.parametrias || []} />
    },
    {
      value: 'archivos',
      content: <DataGridArchivos archivos={cliente?.archivos || []} />
    }
  ]

  const handleChange = (_event: SyntheticEvent, newValue: string) => setValue(newValue)

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

              {cliente.direccion && Boolean(Object.values(cliente.direccion).join('')) && (
                <Grid item xs={12}>
                  <DirectionComponent direccion={cliente.direccion} />
                </Grid>
              )}
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
          </>
        )}
      </>
    </Suspense>
  )
}

export default memo(ClientesDetailPage)
