import { FolderCogOutline } from 'mdi-material-ui'

import { CLIENTES_ROUTE, PARAMETRIAS_ROUTE } from 'src/@core/constants'

export const MenuNavigation = [
  {
    title: 'Clientes',
    path: `${PARAMETRIAS_ROUTE}${CLIENTES_ROUTE}`,
    icon: FolderCogOutline,
    show: true
  },
  {
    title: '',
    children: []
  }
]
