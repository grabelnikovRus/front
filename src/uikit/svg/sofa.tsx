import { ReactElement, SVGProps } from 'react'
export const SvgSofa = (props: SVGProps<SVGSVGElement>): ReactElement => (
  <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
    <path
      clipRule="evenodd"
      d="M2 13.59c0-2.344 2.5-3.125 10-3.125s10 .781 10 3.125-2.5 3.125-10 3.125-10-.781-10-3.125z"
      stroke="url(#sofa_svg__paint0_linear)"
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M12 9.125C12 6.781 12.91 6 15.636 6c2.728 0 3.637.781 3.637 3.125s-.91 3.125-3.637 3.125S12 11.469 12 9.125z"
      fill="#fff"
      stroke="url(#sofa_svg__paint1_linear)"
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M4.727 9.125C4.727 6.781 5.636 6 8.363 6c2.728 0 3.636.781 3.636 3.125s-.909 3.125-3.636 3.125c-2.727 0-3.636-.781-3.636-3.125z"
      fill="#fff"
      stroke="url(#sofa_svg__paint2_linear)"
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M4.412 18.392l.439-1.608"
      stroke="url(#sofa_svg__paint3_linear)"
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M19.254 18.392l-.439-1.607"
      stroke="url(#sofa_svg__paint4_linear)"
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <defs>
      <linearGradient
        id="sofa_svg__paint0_linear"
        x1={2}
        y1={10.465}
        x2={5.559}
        y2={21.853}
        gradientUnits="userSpaceOnUse"
      >
        <stop stopColor="currentColor" />
        <stop offset={1} stopColor="currentColor" />
      </linearGradient>
      <linearGradient
        id="sofa_svg__paint1_linear"
        x1={12}
        y1={6}
        x2={18.179}
        y2={13.19}
        gradientUnits="userSpaceOnUse"
      >
        <stop stopColor="currentColor" />
        <stop offset={1} stopColor="currentColor" />
      </linearGradient>
      <linearGradient
        id="sofa_svg__paint2_linear"
        x1={4.727}
        y1={6}
        x2={10.905}
        y2={13.19}
        gradientUnits="userSpaceOnUse"
      >
        <stop stopColor="currentColor" />
        <stop offset={1} stopColor="currentColor" />
      </linearGradient>
      <linearGradient
        id="sofa_svg__paint3_linear"
        x1={4.441}
        y1={16.677}
        x2={5.557}
        y2={17.684}
        gradientUnits="userSpaceOnUse"
      >
        <stop stopColor="currentColor" />
        <stop offset={1} stopColor="currentColor" />
      </linearGradient>
      <linearGradient
        id="sofa_svg__paint4_linear"
        x1={18.406}
        y1={16.893}
        x2={19.889}
        y2={17.201}
        gradientUnits="userSpaceOnUse"
      >
        <stop stopColor="currentColor" />
        <stop offset={1} stopColor="currentColor" />
      </linearGradient>
    </defs>
  </svg>
)
