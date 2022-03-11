import { ReactElement, SVGProps } from 'react'
export const SvgSuggestOther = (props: SVGProps<SVGSVGElement>): ReactElement => (
  <svg viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
    <circle cx={6} cy={6} r={5} fill="#B2B3BD" />
    <circle cx={6} cy={5.999} r={0.833} fill="#fff" />
    <circle cx={3.5} cy={5.999} r={0.833} fill="#fff" />
    <circle cx={8.5} cy={5.999} r={0.833} fill="#fff" />
  </svg>
)
