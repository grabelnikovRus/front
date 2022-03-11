import cn from 'classnames'
import { KeyboardEvent, useEffect, useRef, useState, VFC } from 'react'

import { trackEvent } from '@/lib/tracking'
import { ContactsEntity } from '@/modules/contacts'
import { isTextField, WidgetFields } from '@/modules/widgets'
import { SvgClose, SvgSearch } from '@/uikit'
import { useMenuMobile } from '@components/menu-mobile/use-menu-mobile.hook'

import classes from './location.module.scss'
import { Map } from './map'

export interface LocationProps {
  contacts: ContactsEntity
  fields: WidgetFields
  open: boolean
  openLocation: () => void
}

export const Location: VFC<LocationProps> = ({ contacts, fields, open, openLocation }) => {
  const [active, setActive] = useState<number | null>(null)
  const [searchData, setSearchData] = useState<string>('')
  const [positionTop, setPositionTop] = useState<number>(76)
  const [tab, setTab] = useState<number>(0)
  const [width, setWidth] = useState<number>(0)
  const cityList = useRef<HTMLUListElement | null>(null)

  const menuMobileState = useMenuMobile()

  const scrollEvent = () => {
    const { current } = cityList

    if (current) {
      const top = current.scrollTop

      if (top > current.scrollHeight - current.offsetHeight - 10) {
        current.classList.add('hiddenAfter')
      } else current.classList.remove('hiddenAfter')
    }
  }
  const scrollPosition = () => {
    setPositionTop(window.scrollY <= 76 ? 76 - window.scrollY : 0)
  }
  const resizePosition = () => {
    setWidth(window.innerWidth)
  }
  const search = (event: KeyboardEvent<HTMLInputElement>) => {
    const target = event.target as HTMLInputElement

    if (target) setSearchData(target.value.toLowerCase())
  }
  const selectMapObject = (id: number) => {
    setActive(id)
    setTab(1)
  }
  const selectTab = (index: number) => setTab(index)
  const onCloseMap = () => {
    openLocation()
    trackEvent({
      category: 'MAP',
      label: 'Icon to close the map',
      name: 'Click on the icon to close the map',
    })
  }
  useEffect(() => {
    setActive(Number(contacts.initialCityId))
    resizePosition()
    window.addEventListener('scroll', scrollPosition, false)
    window.addEventListener('resize', resizePosition, false)

    return function cleanDisabledScroll() {
      document.body.classList.remove('modal-open')
    }
  }, [contacts.initialCityId])
  useEffect(() => {
    const { current } = cityList

    if (current) current.addEventListener('scroll', scrollEvent, false)
  }, [cityList])

  return (
    <div
      className={`${classes.location__wrap} ${open ? classes.openedLocation : ''}`}
      style={
        width < 768
          ? {
              top: positionTop + 'px',
              height: open ? `calc(100% - ${positionTop}px)` : 0,
            }
          : {}
      }
    >
      <div className={classes.location__content}>
        <div className={`${classes.location__content_main} ${tab === 1 ? classes.showMap : ''}`}>
          <div className={classes.location__content_main_map}>
            <Map
              active={active}
              data={contacts.cities}
              open={open}
              selectMapObject={selectMapObject}
              tab={tab}
            />
          </div>
        </div>
        <div className={classes.location__content_aside}>
          <div className={classes.location__content_aside_top}>
            <button
              className={classes.location__content_aside_top_close}
              onClick={onCloseMap}
              type="button"
              data-testid="location__close"
            >
              <SvgClose />
            </button>
            {isTextField(fields.heading) && (
              <h2 className={classes.location__content_aside_top_title}>
                {fields.heading.value}
              </h2>
            )}
            <div className={classes.location__content_aside_top_mobileTabs}>
              <button
                className={cn(classes.location__content_aside_top_mobileTabs_btn, {
                  [classes.location__content_aside_top_mobileTabs_btn__active]: tab === 0,
                })}
                onClick={() => selectTab(0)}
              >
                <span>Списком</span>
              </button>
              <button
                className={cn(classes.location__content_aside_top_mobileTabs_btn, {
                  [classes.location__content_aside_top_mobileTabs_btn__active]: tab === 1,
                })}
                onClick={() => selectTab(1)}
              >
                <span>На карте</span>
              </button>
            </div>
            <form className={classes.location__content_aside_top_search} method="dialog">
              <input
                className={classes.location__content_aside_top_search_field}
                onBlur={() => {
                  menuMobileState.openMenu()
                  trackEvent({
                    category: 'MAP',
                    label: 'Name of the city in the search in Map',
                    name: 'Entered the Name of the Sity in the search',
                  })
                }}
                onFocus={() => {
                  menuMobileState.closeMenu()
                  setTimeout(() => {
                    window.scrollTo(0, 0)
                    document.body.scrollTop = 0
                  }, 50)
                }}
                onKeyUp={search}
                placeholder={
                  isTextField(fields.search_placeholder) ? fields.search_placeholder.value : ''
                }
                data-testid="location__search"
              />
              <SvgSearch className={classes.location__content_aside_top_search_btn} />
            </form>
          </div>
          <ul className={classes.location__content_aside_list} ref={cityList}>
            {contacts.cities
              .filter((city) => city.name.toLowerCase().includes(searchData))
              .map((city) => (
                <li
                  className={classes.location__content_aside_list_li}
                  id={'line_' + city.id}
                  key={city.id}
                >
                  <button
                    className={cn(classes.location__content_aside_list_btn, {
                      [classes.location__content_aside_list_btn_active]: active === city.id,
                    })}
                    onClick={() => {
                      selectMapObject(city.id)
                      trackEvent({
                        category: 'MAP',
                        label: 'Name of the City in the list in Map',
                        name: 'Selected the Name of the City in the list',
                      })
                    }}
                  >
                    <strong className={classes.location__content_aside_list_name}>
                      {city.name}
                    </strong>
                    {city.subtitle && (
                      <span className={classes.location__content_aside_list_sub}>
                        {city.subtitle}
                      </span>
                    )}
                  </button>
                </li>
              ))}
          </ul>
        </div>
      </div>
    </div>
  )
}
