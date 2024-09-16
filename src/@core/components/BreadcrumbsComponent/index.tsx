//** Base Imports */
import { useRouter } from 'next/router'
import { memo, useEffect, useState } from 'react'

//** MUI Imports */
import AccountBalanceIcon from '@mui/icons-material/AccountBalance'
import NavigateNextIcon from '@mui/icons-material/NavigateNext'
import { Breadcrumbs, Typography } from '@mui/material'
import { AccountTie, FolderCogOutline, NoteTextOutline } from 'mdi-material-ui'

//** Context, Enums && Utils Imports */
import { COBRANZAS_ROUTE, FACTURACION_ROUTE, SALDOS_CLIENTES_ROUTE } from 'src/@core/constants'
import { AccionesEnum } from 'src/@core/enums'
import { removeSlashesAndScores } from 'src/@core/utils'

export type breadCrumbItemsTypes = {
  id: string
  text: AccionesEnum | string | undefined
  link?: () => void | undefined
}

type TypesProps = {
  breadCrumbItems: breadCrumbItemsTypes[]
}

const BreadcrumbsComponent = ({ breadCrumbItems }: TypesProps) => {
  //** States */
  const [path, setPath] = useState<string[]>([])

  //** Hooks */
  const router = useRouter()

  useEffect(() => {
    let migas = router.asPath.split('/')
    migas = migas.filter(item => item !== '')
    setPath(migas)
  }, [router])

  const getIcon = () => {
    if (path[0] === 'clientes') return <AccountTie fontSize='small' />
    if (path[0] === 'parametrias') return <FolderCogOutline fontSize='small' />
    if (path[0] === 'cobranzas') return <NoteTextOutline fontSize='small' />
    if (path[0] === 'facturacion') return <NoteTextOutline fontSize='small' />
    if (path[0] === 'saldos-clientes') return <AccountBalanceIcon fontSize='small' />

    return <></>
  }

  const goBack = () => {
    if (path[0] === 'parametrias') {
      if (path[1] === 'clientes') {
        router.replace('/parametrias/clientes')
      }

      router.back()
    }

    if (path[0] === 'cobranzas') {
      router.replace(`${COBRANZAS_ROUTE}`)
    }

    if (path[0] === 'facturacion') {
      router.replace(`${FACTURACION_ROUTE}`)
    }

    if (path[0] === 'saldos-clientes') {
      router.replace(`${SALDOS_CLIENTES_ROUTE}`)
    }
  }

  const getFirstBreadcrumb = () => {
    if (path[0] === 'parametrias') return path[1]
    if (path[0] === 'cobranzas') return path[0]
    if (path[0] === 'facturacion') return 'Notas'
    if (path[0] === 'saldos-clientes') return 'Saldos Clientes'
  }

  const styles = {
    link1: {
      cursor: 'pointer',
      display: 'flex',
      alignItems: 'center',
      '&:hover': { textDecoration: 'underline' }
    },
    link2: {
      cursor: 'pointer',
      fontWeight: 500,
      '&:hover': { textDecoration: 'underline' }
    },
    span: {
      fontWeight: 500,
      marginLeft: 4
    }
  }

  return (
    <Breadcrumbs
      sx={{ py: 4, textTransform: 'uppercase' }}
      aria-label='breadcrumb'
      separator={<NavigateNextIcon fontSize='small' />}
    >
      <Typography onClick={goBack} color='text.primary' sx={styles.link1}>
        {getIcon()}
        <Typography component='span' sx={styles.span}>
          {removeSlashesAndScores(getFirstBreadcrumb()?.toLocaleUpperCase() || '')}
        </Typography>
      </Typography>
      {breadCrumbItems &&
        breadCrumbItems.map(item => (
          <Typography
            key={item.id}
            onClick={item.link}
            sx={item.link && styles.link2}
            color='text.primary'
          >
            {removeSlashesAndScores(item.text || '')}
          </Typography>
        ))}
    </Breadcrumbs>
  )
}

export default memo(BreadcrumbsComponent)
