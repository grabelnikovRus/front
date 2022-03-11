import { ReactElement, SVGProps } from 'react'
export const SvgHouseGrad = (props: SVGProps<SVGSVGElement>): ReactElement => (
  <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
    <path
      clipRule="evenodd"
      d="M3 13.597c0-5.287.576-4.918 3.68-7.795C8.036 4.709 10.15 2.6 11.973 2.6c1.823 0 3.978 2.098 5.348 3.202C20.424 8.679 21 8.31 21 13.597c0 7.78-1.84 7.78-9 7.78s-9 0-9-7.78z"
      stroke="currentColor"
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M9.196 17.622v-4.633a1 1 0 011-1h3.633a1 1 0 011 1v4.633"
      stroke="url(#house-grad_svg__paint1_linear)"
      strokeWidth={1.5}
      strokeLinecap="round"
    />
    <defs>
      <linearGradient
        id="house-grad_svg__paint0_linear"
        x1={3}
        y1={2.6}
        x2={21.761}
        y2={20.584}
        gradientUnits="userSpaceOnUse"
      >
        <stop stopColor="currentColor" />
        <stop offset={1} stopColor="currentColor" />
      </linearGradient>
      <linearGradient
        id="house-grad_svg__paint1_linear"
        x1={9.196}
        y1={11.989}
        x2={14.829}
        y2={17.622}
        gradientUnits="userSpaceOnUse"
      >
        <stop stopColor="currentColor" />
        <stop offset={1} stopColor="currentColor" />
      </linearGradient>
    </defs>
  </svg>
)
