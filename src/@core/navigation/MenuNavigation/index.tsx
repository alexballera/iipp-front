import { FolderCogOutline } from 'mdi-material-ui'

import { CLIENTES_ROUTE } from 'src/@core/constants'

export const MenuNavigation = [
  {
    title: 'Clientes',
    path: CLIENTES_ROUTE,
    icon: FolderCogOutline,
    show: true
  },
  {
    title: '',
    children: []
  }
]
