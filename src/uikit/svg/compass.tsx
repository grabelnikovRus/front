import { ReactElement, SVGProps } from 'react'
export const SvgCompass = (props: SVGProps<SVGSVGElement>): ReactElement => (
  <svg viewBox="0 0 38 38" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
    <path
      clipRule="evenodd"
      d="M14.25 23.75l2.264-7.236 7.236-2.264-2.264 7.236-7.236 2.264z"
      stroke="currentColor"
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <circle
      cx={19}
      cy={19}
      r={14.25}
      stroke="currentColor"
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
)
