import { ReactElement, SVGProps } from 'react'
export const SvgSearch = (props: SVGProps<SVGSVGElement>): ReactElement => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" {...props}>
    <g
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={1.5}
      opacity={0.5}
    >
      <circle cx={11.805} cy={11.807} r={7.49} />
      <path d="M17.016 17.406l2.936 2.929" />
    </g>
  </svg>
)
