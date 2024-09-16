import { HorizontalNavItemsType } from 'src/@core/layouts/types'
import { MenuNavigation } from '../MenuNavigation'

const Navigation = (): HorizontalNavItemsType => {
  const navigationItems: HorizontalNavItemsType = MenuNavigation.map(item => {
    return {
      title: item.title,
      icon: item.icon,
      path: item.path
    }
  })

  return navigationItems
}

export default Navigation
