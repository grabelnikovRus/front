import { ReactElement, SVGProps } from 'react'
export const SvgWalletGrad = (props: SVGProps<SVGSVGElement>): ReactElement => (
  <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
    <path
      d="M21.107 14.412H17.24a2.55 2.55 0 01-2.549-2.553 2.55 2.55 0 012.55-2.55h3.835M17.677 11.801h-.296M7.615 7.91h4.038"
      stroke="currentColor"
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      clipRule="evenodd"
      d="M2.75 12c0-6.375 2.312-8.5 9.25-8.5 6.938 0 9.25 2.125 9.25 8.5s-2.312 8.5-9.25 8.5c-6.938 0-9.25-2.125-9.25-8.5z"
      stroke="currentColor"
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <defs>
      <linearGradient
        id="wallet-grad_svg__paint0_linear"
        x1={14.692}
        y1={9.308}
        x2={19.665}
        y2={15.559}
        gradientUnits="userSpaceOnUse"
      >
        <stop stopColor="currentColor" />
        <stop offset={1} stopColor="currentColor" />
      </linearGradient>
      <linearGradient
        id="wallet-grad_svg__paint1_linear"
        x1={17.055}
        y1={11.327}
        x2={18.003}
        y2={12.275}
        gradientUnits="userSpaceOnUse"
      >
        <stop stopColor="currentColor" />
        <stop offset={1} stopColor="currentColor" />
      </linearGradient>
      <linearGradient
        id="wallet-grad_svg__paint2_linear"
        x1={7.615}
        y1={7.435}
        x2={8.037}
        y2={9.232}
        gradientUnits="userSpaceOnUse"
      >
        <stop stopColor="currentColor" />
        <stop offset={1} stopColor="currentColor" />
      </linearGradient>
      <linearGradient
        id="wallet-grad_svg__paint3_linear"
        x1={2.75}
        y1={3.5}
        x2={19.689}
        y2={21.934}
        gradientUnits="userSpaceOnUse"
      >
        <stop stopColor="currentColor" />
        <stop offset={1} stopColor="currentColor" />
      </linearGradient>
    </defs>
  </svg>
)
