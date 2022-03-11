import { ReactElement, SVGProps } from 'react'
export const SvgSuggestMetro = (props: SVGProps<SVGSVGElement>): ReactElement => (
  <svg viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
    <g clipPath="url(#suggest-metro_svg__clip0)">
      <path
        d="M11.175 9.095L8.37 2 6 6.146 3.64 2 .824 9.095H0v1.075h4.244V9.095H3.61l.615-1.766L6 10.246l1.775-2.917.615 1.766h-.634v1.075H12V9.095h-.825z"
        fill="#B2B3BD"
      />
    </g>
    <defs>
      <clipPath id="suggest-metro_svg__clip0">
        <path fill="#fff" transform="translate(0 2)" d="M0 0h12v8.245H0z" />
      </clipPath>
    </defs>
  </svg>
)
