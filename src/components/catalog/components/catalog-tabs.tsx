import { VFC, ReactElement, RefObject } from 'react'

import styles from './catalog-tabs.module.scss'

interface CatalogTabsProps {
  activeTab: number | null
  children: ReactElement | ReactElement[]
  setActiveTab: (tab: number) => void
  tabsRef: RefObject<HTMLDivElement>
}

export const CatalogTabs: VFC<CatalogTabsProps> = ({
  activeTab,
  children,
  setActiveTab,
  tabsRef,
}) => (
  <div ref={tabsRef} className={styles.tabs}>
    <div className={styles.tabs_button}>
      <button
        className={activeTab === 0 ? styles.tabs_button___active : ''}
        onClick={() => setActiveTab(0)}
      >
        Фильтр
      </button>
      <button
        className={activeTab === 1 ? styles.tabs_button___active : ''}
        onClick={() => setActiveTab(1)}
      >
        Мои поиски
      </button>
    </div>
    {Array.isArray(children) &&
      children.map((child, key) => (
        <div
          className={`${styles.tabs_box} ${activeTab === key ? styles.tabs_box___active : ''}`}
          key={key}
        >
          {child}
        </div>
      ))}
  </div>
)
