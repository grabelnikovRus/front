import { ReactElement, SVGProps } from 'react'
export const SvgCallMobile = (props: SVGProps<SVGSVGElement>): ReactElement => (
  <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
    <path
      className="call-mobile_svg__blue"
      d="M14.551 2.75a7.66 7.66 0 016.767 6.758M14.551 6.155a4.254 4.254 0 013.364 3.364"
      stroke="#fff"
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      className="call-mobile_svg__blue"
      clipRule="evenodd"
      d="M8.158 15.771C1.53 9.141 2.472 6.105 3.171 5.127c.09-.158 2.302-3.47 4.674-1.527 5.888 4.848-1.566 4.163 3.378 9.108 4.945 4.943 4.258-2.51 9.107 3.376 1.944 2.373-1.369 4.586-1.526 4.675-.978.7-4.015 1.642-10.646-4.988z"
      stroke="#fff"
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
)
