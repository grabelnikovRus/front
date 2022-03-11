import cn from 'classnames'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { VFC } from 'react'

import { MenuItem } from '@/api'
import { MenuItemEntity } from '@/modules/menu'

import styles from './menu.module.scss'

export interface MenuProps {
  menu: MenuItemEntity
  onClick?: (menuItem: MenuItem) => void
}

export const Menu: VFC<MenuProps> = ({ menu, onClick }) => {
  const { pathname, asPath } = useRouter()

  return (
    <div className={styles.menu}>
      {menu.map((item) => (
        <Link href={item.href} key={item.title}>
          <a
            onClick={() => onClick?.(item)}
            className={cn(styles.menu_link, {
              [styles.menu_link___active]:
                asPath === item.href ||
                pathname === item.href ||
                (item.href !== '/' && asPath.includes(item.href)),
            })}
          >
            {item.title}
          </a>
        </Link>
      ))}
    </div>
  )
}
