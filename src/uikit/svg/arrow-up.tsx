import { ReactElement, SVGProps } from 'react'
export const SvgArrowUp = (props: SVGProps<SVGSVGElement>): ReactElement => (
  <svg viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
    <path
      d="M16 7.498V24m-5.333-11.141S13.505 7.497 16 7.497s5.333 5.362 5.333 5.362"
      stroke="currentColor"
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
)
