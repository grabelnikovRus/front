import { ReactElement, SVGProps } from 'react'
export const SvgYearBuilding = (props: SVGProps<SVGSVGElement>): ReactElement => (
  <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
    <path
      clipRule="evenodd"
      d="M2.75 12.225c0-6.956 2.313-9.274 9.25-9.274 6.937 0 9.25 2.318 9.25 9.274 0 6.957-2.313 9.275-9.25 9.275-6.937 0-9.25-2.318-9.25-9.275z"
      stroke="#11142D"
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M3.023 8.774h17.96M14.5 13s-2.488 3.15-2.75 3.15S10 14.5 10 14.5M15.999 1.5v3.262M8.01 1.5v3.262"
      stroke="#11142D"
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
)
