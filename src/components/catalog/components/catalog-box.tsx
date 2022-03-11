import Drawer from '@material-ui/core/Drawer'
import { ReactElement, useEffect, useState, VFC } from 'react'

import { BottomSheet } from '@/uikit/bottom-sheet/bottom-sheet'

import style from './catalog-box.module.scss'

interface CatalogBoxProps {
  active: boolean
  children: ReactElement
  media?: number | string
  onClose: () => void
  responsives?: { desktop: boolean; phone: boolean; tablet: boolean }
}

export const CatalogBox: VFC<CatalogBoxProps> = ({
  active,
  children,
  media = 'all',
  onClose,
  responsives = { desktop: true, phone: true, tablet: true },
}) => {
  const [width, setWidth] = useState<number>(768)
  const changeSize = () => setWidth(window.innerWidth)
  const bodyDisabledScroll = () => {
    document.body.classList.add('map-open')
    document.body.style.overflow = 'hidden'
  }
  const bodyEnabledScroll = () => {
    document.body.style.removeProperty('overflow')
    document.body.classList.remove('map-open')
  }
  const closeBox = () => {
    onClose()
    bodyEnabledScroll()
  }

  useEffect(() => {
    changeSize()
    window.addEventListener('resize', changeSize)

    return () => {
      document.body.style.removeProperty('overflow')
      document.body.classList.remove('map-open')
      window.removeEventListener('resize', changeSize)
    }
  }, [])

  useEffect(() => {
    if (width < 1440) {
      if (media === 'all' || width <= media) {
        if (!active) bodyEnabledScroll()
        else bodyDisabledScroll()
      }
    }

    if (width >= 1400) bodyEnabledScroll()
  }, [active, width, media])

  if (media === 'all' || width <= media) {
    // Phone.
    if (width <= 767 && responsives.phone) {
      return (
        <BottomSheet isOpen={active} onClose={closeBox}>
          <BottomSheet.Container
            isOpen={active}
            onClose={closeBox}
            className={style.bottom_sheet_content}
            classNameWrapper={style.bottom_sheet_wrapper}
          >
            {children}
          </BottomSheet.Container>
        </BottomSheet>
      )
    }
    // Tablet.
    if (width >= 768 && width < 1440 && responsives.tablet) {
      return (
        <Drawer
          BackdropProps={{
            style: {
              backgroundColor: '#11142D',
              opacity: '0.5',
            },
          }}
          anchor="left"
          classes={{ paper: style.drawer_paper }}
          onClose={closeBox}
          open={active}
        >
          {children}
        </Drawer>
      )
    }
    // Desktop.
    if (width > 1439 && responsives.desktop) {
      return <div className={style.left_block}>{children}</div>
    }
  }
  return null
}
