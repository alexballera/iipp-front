import { MenuNavigation } from '../navigation/MenuNavigation'

/** Gets the path related to the url routes
 * @param {String} pathTitle - the route path to find
 * @returns the route path
 */
export const GetRoutePath = (pathTitle: string) => {
  return MenuNavigation.find(menu => menu.title === pathTitle)?.path
}
