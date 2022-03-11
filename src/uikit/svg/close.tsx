import { ReactElement, SVGProps } from 'react'
export const SvgClose = (props: SVGProps<SVGSVGElement>): ReactElement => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" {...props}>
    <path stroke="currentColor" strokeLinecap="round" strokeWidth={1.5} d="M17 7L7 17m10 0L7 7" />
  </svg>
)
