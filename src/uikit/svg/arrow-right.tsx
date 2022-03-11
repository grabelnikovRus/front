import { ReactElement, SVGProps } from 'react'
export const SvgArrowRight = (props: SVGProps<SVGSVGElement>): ReactElement => (
  <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
    <path
      d="M18.377 12H6M14.356 8s4.022 2.129 4.022 4-4.022 4-4.022 4"
      stroke="currentColor"
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
)
