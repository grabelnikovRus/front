import { ReactElement, SVGProps } from 'react'
export const SvgClockGradGradient = (props: SVGProps<SVGSVGElement>): ReactElement => (
  <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
    <path
      d="M15 14L12 12.1V8"
      stroke="url(#clock-grad-gradient_svg__paint0_linear)"
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      clipRule="evenodd"
      d="M2.75 12.226c0-6.956 2.313-9.274 9.25-9.274 6.937 0 9.25 2.318 9.25 9.274 0 6.956-2.313 9.274-9.25 9.274-6.937 0-9.25-2.318-9.25-9.274z"
      stroke="url(#clock-grad-gradient_svg__paint1_linear)"
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <defs>
      <linearGradient
        id="clock-grad-gradient_svg__paint0_linear"
        x1={12}
        y1={8}
        x2={16.8}
        y2={10.4}
        gradientUnits="userSpaceOnUse"
      >
        <stop stopColor="#43B5E9" />
        <stop offset={1} stopColor="#8CCC98" />
      </linearGradient>
      <linearGradient
        id="clock-grad-gradient_svg__paint1_linear"
        x1={2.75}
        y1={2.952}
        x2={21.298}
        y2={21.451}
        gradientUnits="userSpaceOnUse"
      >
        <stop stopColor="#43B5E9" />
        <stop offset={1} stopColor="#8CCC98" />
      </linearGradient>
    </defs>
  </svg>
)
