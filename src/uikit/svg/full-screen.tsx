import { ReactElement, SVGProps } from 'react'
export const SvgFullScreen = (props: SVGProps<SVGSVGElement>): ReactElement => (
  <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
    <path d="M4.617 19.383L9.54 14.46" stroke="#80919A" strokeWidth={1.5} strokeLinecap="round" />
    <path
      d="M4.617 14.695v4.69h4.689"
      stroke="#80919A"
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path d="M19.385 4.617L14.46 9.54" stroke="#80919A" strokeWidth={1.5} strokeLinecap="round" />
    <path
      d="M14.695 4.617h4.69v4.689"
      stroke="#80919A"
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
)
