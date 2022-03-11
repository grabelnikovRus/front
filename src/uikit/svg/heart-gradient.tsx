import { ReactElement, SVGProps } from 'react'
export const SvgHeartGradient = (props: SVGProps<SVGSVGElement>): ReactElement => (
  <svg viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
    <path
      clipRule="evenodd"
      d="M4.472 16.849c-1.356-4.211.23-9.446 4.672-10.869 2.338-.75 5.222-.124 6.86 2.124 1.545-2.331 4.513-2.87 6.847-2.124 4.442 1.423 6.036 6.658 4.682 10.869-2.11 6.674-9.471 10.15-11.529 10.15-2.057 0-9.352-3.398-11.532-10.15z"
      stroke="url(#heart-gradient_svg__paint0_linear)"
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M20.797 10.712c1.525.156 2.478 1.359 2.422 3.044"
      stroke="url(#heart-gradient_svg__paint1_linear)"
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <defs>
      <linearGradient
        id="heart-gradient_svg__paint0_linear"
        x1={4.002}
        y1={5.667}
        x2={25.187}
        y2={29.5}
        gradientUnits="userSpaceOnUse"
      >
        <stop stopColor="#43B5E9" />
        <stop offset={1} stopColor="#8CCC98" />
      </linearGradient>
      <linearGradient
        id="heart-gradient_svg__paint1_linear"
        x1={20.797}
        y1={10.712}
        x2={23.764}
        y2={13.075}
        gradientUnits="userSpaceOnUse"
      >
        <stop stopColor="#43B5E9" />
        <stop offset={1} stopColor="#8CCC98" />
      </linearGradient>
    </defs>
  </svg>
)
