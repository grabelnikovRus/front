import { ReactElement, SVGProps } from 'react'
export const SvgClock = (props: SVGProps<SVGSVGElement>): ReactElement => (
  <svg viewBox="0 0 34 34" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
    <path
      d="M21.25 19.833L17 17.14v-5.807"
      stroke="url(#clock_svg__paint0_linear)"
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      clipRule="evenodd"
      d="M3.896 17.32c0-9.855 3.276-13.139 13.103-13.139 9.828 0 13.105 3.284 13.105 13.139 0 9.854-3.277 13.138-13.105 13.138-9.827 0-13.103-3.284-13.103-13.138z"
      stroke="url(#clock_svg__paint1_linear)"
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <defs>
      <linearGradient
        id="clock_svg__paint0_linear"
        x1={17}
        y1={11.333}
        x2={23.8}
        y2={14.733}
        gradientUnits="userSpaceOnUse"
      >
        <stop stopColor="#43B5E9" />
        <stop offset={1} stopColor="#8CCC98" />
      </linearGradient>
      <linearGradient
        id="clock_svg__paint1_linear"
        x1={3.896}
        y1={4.181}
        x2={30.172}
        y2={30.389}
        gradientUnits="userSpaceOnUse"
      >
        <stop stopColor="#43B5E9" />
        <stop offset={1} stopColor="#8CCC98" />
      </linearGradient>
    </defs>
  </svg>
)
