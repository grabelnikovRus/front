import cn from 'classnames'
import { VFC } from 'react'

import { Svg5Percent, SvgPrimary, SvgSecondary } from '@/uikit/svg'

import styles from './apartment-popup.module.scss'

export enum ModePopup {
  TRADE = 'trade',
  PRIMARY = 'primary',
  SECONDARY = 'secondary',
}

export interface ApartmentPopupProps {
  mode: ModePopup
}

export const ApartmentPopup: VFC<ApartmentPopupProps> = ({ mode }) => {
  const infoPopup = {
    [ModePopup.TRADE]: {
      icon: <Svg5Percent />,
      title: 'Скидка до 5%',
      description: 'Скидка до 5% на все объекты только в июне! *Цены указаны без учета скидки',
    },
    [ModePopup.PRIMARY]: {
      icon: <SvgPrimary />,
      title: 'Первчика',
      description:
        'Первичная недвижимость – жильё в новостройках, которое мы приобрели по праву переуступки. В этих квартирах еще никто не жил',
    },
    [ModePopup.SECONDARY]: {
      icon: <SvgSecondary />,
      title: 'Вторичка',
      description:
        'Вторичная недвижимость – жильё, которое мы купили у собственников. Эти квартиры, как правило, готовы к переезду',
    },
  }

  return (
    <div className={cn(styles.apartment_popup, styles[`apartment_popup--${mode}`])}>
      <header>
        {infoPopup[mode].icon} {infoPopup[mode].title}
      </header>
      <p>{infoPopup[mode].description}</p>
    </div>
  )
}
