import { ReactElement, SVGProps } from 'react'
export const SvgKey = (props: SVGProps<SVGSVGElement>): ReactElement => (
  <svg viewBox="0 0 34 34" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
    <path
      clipRule="evenodd"
      d="M15.428 17.13a2.224 2.224 0 11-2.224-2.225h.003a2.223 2.223 0 012.22 2.225z"
      stroke="url(#key_svg__paint0_linear)"
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M15.434 17.13h7.587v2.223"
      stroke="url(#key_svg__paint1_linear)"
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M19.626 19.353V17.13"
      stroke="url(#key_svg__paint2_linear)"
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      clipRule="evenodd"
      d="M3.896 17.32c0-9.855 3.276-13.139 13.103-13.139 9.828 0 13.105 3.284 13.105 13.139 0 9.854-3.277 13.138-13.105 13.138-9.827 0-13.103-3.284-13.103-13.138z"
      stroke="url(#key_svg__paint3_linear)"
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <defs>
      <linearGradient
        id="key_svg__paint0_linear"
        x1={10.979}
        y1={14.905}
        x2={15.428}
        y2={19.354}
        gradientUnits="userSpaceOnUse"
      >
        <stop stopColor="#43B5E9" />
        <stop offset={1} stopColor="#8CCC98" />
      </linearGradient>
      <linearGradient
        id="key_svg__paint1_linear"
        x1={15.434}
        y1={17.129}
        x2={16.634}
        y2={21.226}
        gradientUnits="userSpaceOnUse"
      >
        <stop stopColor="#43B5E9" />
        <stop offset={1} stopColor="#8CCC98" />
      </linearGradient>
      <linearGradient
        id="key_svg__paint2_linear"
        x1={19.025}
        y1={17.129}
        x2={20.885}
        y2={18.133}
        gradientUnits="userSpaceOnUse"
      >
        <stop stopColor="#43B5E9" />
        <stop offset={1} stopColor="#8CCC98" />
      </linearGradient>
      <linearGradient
        id="key_svg__paint3_linear"
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
