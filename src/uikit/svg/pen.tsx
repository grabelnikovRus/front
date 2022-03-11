import { ReactElement, SVGProps } from 'react'
export const SvgPen = (props: SVGProps<SVGSVGElement>): ReactElement => (
  <svg viewBox="0 0 21 20" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
    <path
      clipRule="evenodd"
      d="M15.52 4.602a2.412 2.412 0 00-3.405.207l-5.913 6.68c-1.524 1.72-.407 4.097-.407 4.097s2.516.797 4.018-.9l5.914-6.679a2.413 2.413 0 00-.207-3.405z"
    />
    <path d="M10.979 6.105l3.612 3.199" />
  </svg>
)
