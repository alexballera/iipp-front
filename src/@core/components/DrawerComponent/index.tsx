import { Drawer } from '@mui/material'
import { ReactNode } from 'react'

type DrawerProps = {
  children: ReactNode
  onClose: () => void
  open: boolean
  anchor?: 'top' | 'left' | 'bottom' | 'right'
}

const styles = {
  drawer: {
    '.MuiPaper-root': { p: 8, minWidth: 410, borderTopLeftRadius: 20, borderBottomLeftRadius: 20 }
  }
}

function DrawerComponent({ anchor, children, onClose, open }: DrawerProps) {
  return (
    <Drawer anchor={anchor || 'right'} open={open} onClose={onClose} sx={styles.drawer}>
      {children}
    </Drawer>
  )
}
export default DrawerComponent
