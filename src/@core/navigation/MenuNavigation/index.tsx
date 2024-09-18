import { FolderCogOutline } from 'mdi-material-ui'

import { IIPP_ROUTE } from 'src/@core/constants'

export const MenuNavigation = [
  {
    title: 'IIPP',
    path: IIPP_ROUTE,
    icon: FolderCogOutline,
    show: true
  },
  {
    title: '',
    children: []
  }
]
