import { MenuItem } from '@/api'
import { removeUndefined } from '@/lib/object'
import { menuApi } from '@/modules/menu/menu.api'

export type MenuEntity = { [key: string]: MenuItem[] }
export type MenuItemEntity = MenuItem[]

export const enhanceMenu = (menu: { [key: string]: MenuItem[] }): MenuEntity =>
  removeUndefined(menu)

export const getMenu = async (): Promise<MenuEntity> => {
  const { response } = await menuApi.getMenu()
  if (response === undefined) {
    throw 'No response'
  }
  return enhanceMenu(response.body)
}
