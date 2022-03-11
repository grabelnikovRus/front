import { VFC } from 'react'

import { Popup } from '@/uikit/popup/popup'
import { SvgTooltip } from '@/uikit/svg'

import styles from './tooltip.module.scss'

export interface TooltipProps {
  body?: string
  title?: string
}

export const Tooltip: VFC<TooltipProps> = ({ body, title }) => (
  <Popup
    className={styles.tooltip}
    title={title ? <div className={styles.tooltip_title}>{title}</div> : null}
    body={body ? <div className={styles.tooltip_body}>{body}</div> : null}
    renderButton={({ togglePopup, innerRef }) => (
      <button
        className={styles.tooltip_button}
        onClick={togglePopup}
        type="button"
        ref={innerRef}
      >
        <SvgTooltip />
      </button>
    )}
  />
)
