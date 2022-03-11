import { ReactElement, SVGProps } from 'react'
export const SvgCombinedWcs = (props: SVGProps<SVGSVGElement>): ReactElement => (
  <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
    <path
      d="M2.75 14c0-.69.56-1.25 1.25-1.25h16c.69 0 1.25.56 1.25 1.25v.75c0 2.9-2.35 5.25-5.25 5.25H8a5.25 5.25 0 01-5.25-5.25V14z"
      stroke="#11142D"
      strokeWidth={1.5}
    />
    <path
      d="M17.3 19.93l.497 1.385M6.225 21.315l.49-1.371M8.878 7.624l2.5-2.5M9.5 5.75v0c-1.384-1.384-3.75-.404-3.75 1.553v5.322"
      stroke="#11142D"
      strokeWidth={1.5}
      strokeLinecap="round"
    />
  </svg>
)
