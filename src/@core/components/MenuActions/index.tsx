import { ArrowDropDown, Download } from '@mui/icons-material'
import { Box, Button, ListItemIcon, ListItemText, Menu, MenuItem, Stack } from '@mui/material'
import { ReactNode } from 'react'
import { removeSlashesAndScores } from 'src/@core/utils'
import { MenuItemsAccion } from 'src/bundle/shared/domain'
import CustomTooltip from '../CustomTooltip'
import Loader from '../Loader'

type MenuActionsProps = {
  anchorElAction: null | HTMLElement
  menuItems: MenuItemsAccion[]
  handleOpenActionsMenu?: (event: React.MouseEvent<HTMLElement>) => void
  handleCloseActionsMenu: () => void
  textTooltip?: string
  iconTooltip?: ReactNode
  iconButton?: ReactNode
  withDotsVerticalIcon: boolean
  loading?: boolean
}

const MenuActions = ({
  anchorElAction,
  menuItems,
  handleOpenActionsMenu,
  handleCloseActionsMenu,
  textTooltip,
  iconTooltip,
  iconButton,
  withDotsVerticalIcon,
  loading
}: MenuActionsProps) => (
  <Stack direction='row' alignItems='center'>
    <Box sx={{ flexGrow: 0 }}>
      {(withDotsVerticalIcon || iconButton) && (
        <CustomTooltip text={textTooltip || 'Acciones'} icon={iconTooltip}>
          <Button
            sx={{ paddingLeft: 0 }}
            startIcon={
              loading ? (
                <Loader height='20px' size={20} />
              ) : (
                <Download color='primary' sx={{ width: 15, height: 15 }} />
              )
            }
            onClick={handleOpenActionsMenu}
            color='primary'
          >
            DESCARGAR
            <ArrowDropDown color='primary' sx={{ width: 20, height: 20 }} />
          </Button>
        </CustomTooltip>
      )}
      <Menu
        sx={{ mt: '45px' }}
        id='menu-appbar'
        keepMounted
        anchorEl={anchorElAction}
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'right'
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right'
        }}
        open={Boolean(anchorElAction)}
        onClose={handleCloseActionsMenu}
      >
        {menuItems &&
          menuItems.map(
            (item, i) =>
              item !== null &&
              item?.show && (
                <MenuItem key={i} onClick={item?.actions}>
                  <ListItemIcon sx={{ m: 0, minWidth: '24px !important' }}>
                    {item?.icon ? (
                      item.loader ? (
                        <Loader height='20px' size={20} />
                      ) : (
                        item.icon
                      )
                    ) : (
                      <></>
                    )}
                  </ListItemIcon>
                  <ListItemText>{removeSlashesAndScores(item?.title)}</ListItemText>
                </MenuItem>
              )
          )}
      </Menu>
    </Box>
  </Stack>
)

MenuActions.defaultProps = {
  withDotsVerticalIcon: true
}

export default MenuActions
