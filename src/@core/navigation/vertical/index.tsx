import { VerticalNavItemsType } from 'src/@core/layouts/types'
import { MenuNavigation } from '../MenuNavigation'

const Navigation = (): VerticalNavItemsType => {
  const navigationItems: VerticalNavItemsType = MenuNavigation.map(item => {
    return {
      title: item.title,
      icon: item.icon,
      path: item.path,
      children: item.children
    }
  })

  return navigationItems
}

export default Navigation
