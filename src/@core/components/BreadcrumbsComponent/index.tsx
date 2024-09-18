//** Base Imports */
import { useRouter } from 'next/router'
import { memo, ReactNode } from 'react'

//** MUI Imports */
import NavigateNextIcon from '@mui/icons-material/NavigateNext'
import { Breadcrumbs, Typography } from '@mui/material'

//** Context, Enums && Utils Imports */
import { AccionesEnum } from 'src/@core/enums'
import { removeSlashesAndScores } from 'src/@core/utils'

export type breadCrumbItemsTypes = {
  id: string
  text: AccionesEnum | string | undefined
  link?: () => void | undefined
}

type TypesProps = {
  firstBreadcrumb: string
  icon: ReactNode
  breadCrumbItems: breadCrumbItemsTypes[]
}

const BreadcrumbsComponent = (props: TypesProps) => {
  const { firstBreadcrumb, icon, breadCrumbItems } = props

  //** Hooks */
  const router = useRouter()

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
      <Typography onClick={() => router.back()} color='text.primary' sx={styles.link1}>
        {icon}
        <Typography component='span' sx={styles.span}>
          {removeSlashesAndScores(firstBreadcrumb?.toLocaleUpperCase() || '')}
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
