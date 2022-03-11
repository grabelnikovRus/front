import { ReactElement, SVGProps } from 'react'
export const SvgArrows = (props: SVGProps<SVGSVGElement>): ReactElement => (
  <svg viewBox="0 0 36 36" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
    <path
      d="M10.469 6.902v18.927M4.35 13.05S7.603 6.9 10.467 6.9c2.862 0 6.117 6.15 6.117 6.15M25.36 29.141V10.214M31.478 22.993s-3.255 6.15-6.117 6.15-6.117-6.15-6.117-6.15"
      stroke="currentColor"
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
)
