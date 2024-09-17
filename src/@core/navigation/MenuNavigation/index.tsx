import AccountBalanceIcon from '@mui/icons-material/AccountBalance'
import { BankTransfer, CashMultiple, FolderCogOutline, NoteTextOutline } from 'mdi-material-ui'

import {
  CLIENTES_ROUTE,
  COBRANZAS_ROUTE,
  CONCEPTO_FACTURACION_ROUTE,
  FACTURACION_ROUTE,
  IIPP_ROUTE,
  IMPUESTOS_ROUTE,
  NOVEDADES_ROUTE,
  OPERACIONES_ROUTE,
  PARAMETRIAS_ROUTE,
  PRODUCTOS_ROUTE,
  SALDOS_CLIENTES_ROUTE
} from 'src/@core/constants'

export const MenuNavigation = [
  {
    title: 'IIPP',
    icon: NoteTextOutline,
    show: true,
    path: `${IIPP_ROUTE}`
  },
  {
    title: 'Facturación',
    icon: NoteTextOutline,
    show: true,
    path: `${FACTURACION_ROUTE}`
  },
  {
    title: 'Cobranzas',
    icon: CashMultiple,
    path: `${COBRANZAS_ROUTE}`,
    show: true
  },
  {
    title: 'Novedades',
    icon: BankTransfer,
    path: `${NOVEDADES_ROUTE}`,
    show: true
  },
  {
    title: 'Saldos Clientes',
    icon: AccountBalanceIcon,
    path: `${SALDOS_CLIENTES_ROUTE}`,
    show: true
  },
  {
    title: 'Parametrías',
    icon: FolderCogOutline,
    show: true,
    children: [
      {
        title: 'Conceptos facturación',
        path: `${PARAMETRIAS_ROUTE}${CONCEPTO_FACTURACION_ROUTE}`
      },
      {
        title: 'Clientes',
        path: `${PARAMETRIAS_ROUTE}${CLIENTES_ROUTE}`
      },
      {
        title: 'Edición Producto',
        path: `${PARAMETRIAS_ROUTE}${PRODUCTOS_ROUTE}`
      },
      {
        title: 'Impuestos',
        path: `${PARAMETRIAS_ROUTE}${IMPUESTOS_ROUTE}`
      },
      {
        title: 'Operaciones/Información Mensual',
        path: `${PARAMETRIAS_ROUTE}${OPERACIONES_ROUTE}`
      }
    ]
  }
]
