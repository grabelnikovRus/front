import { ReactElement, SVGProps } from 'react'
export const SvgPreloader = (props: SVGProps<SVGSVGElement>): ReactElement => (
  <svg viewBox="0 0 30 30" xmlns="http://www.w3.org/2000/svg" {...props}>
    <path
      d="M20.8 7.2c1.2.9 1.7 2.3 1.7 3.8v6.7c0 2.4-2 4.3-4.5 4.3H6c-2.5 0-4.5-1.9-4.5-4.3V11c0-1.8.4-2.8 1.7-3.7s5.6-4 5.6-4c2.3-1.9 4.4-1.6 6.5 0l2.7 2V2.5"
      fill="none"
      stroke="#000"
      strokeWidth={2.1}
      strokeLinejoin="round"
      strokeMiterlimit={10}
      strokeLinecap="round"
      strokeDashoffset={400}
      strokeDasharray={50}
    >
      <animate
        attributeName="stroke-dashoffset"
        dur="10s"
        repeatCount="indefinite"
        values="400;0"
      />
    </path>
  </svg>
)
