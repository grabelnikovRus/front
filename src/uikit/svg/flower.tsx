import { ReactElement, SVGProps } from 'react'
export const SvgFlower = (props: SVGProps<SVGSVGElement>): ReactElement => (
  <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
    <path
      d="M6.864 3.072a.05.05 0 01.058-.058l3.193.609A2.259 2.259 0 0111.95 5.84v0A2.259 2.259 0 019.692 8.1v0a2.259 2.259 0 01-2.22-1.835l-.608-3.193z"
      stroke="url(#flower_svg__paint0_linear)"
      strokeWidth={1.5}
    />
    <path
      d="M17.886 4.772a.05.05 0 00-.058-.058l-3.737.713a2.635 2.635 0 00-2.141 2.588v0a2.635 2.635 0 002.635 2.635v0a2.635 2.635 0 002.588-2.141l.713-3.737z"
      stroke="url(#flower_svg__paint1_linear)"
      strokeWidth={1.5}
    />
    <path d="M11.95 5.975v6.8" stroke="url(#flower_svg__paint2_linear)" strokeWidth={1.5} />
    <path
      d="M6.038 14.94a.25.25 0 00.243.31h11.438a.25.25 0 00.243-.31l-.406-1.622a.75.75 0 00-.727-.568H7.17a.75.75 0 00-.727.568l-.406 1.621z"
      stroke="url(#flower_svg__paint3_linear)"
      strokeWidth={1.5}
    />
    <path
      d="M7.6 19.541a.25.25 0 00.247.209h8.429a.25.25 0 00.247-.215l.612-4.285H6.885l.716 4.291z"
      stroke="url(#flower_svg__paint4_linear)"
      strokeWidth={1.5}
    />
    <defs>
      <linearGradient
        id="flower_svg__paint0_linear"
        x1={6.85}
        y1={3}
        x2={11.95}
        y2={8.1}
        gradientUnits="userSpaceOnUse"
      >
        <stop stopColor="#43B5E9" />
        <stop offset={1} stopColor="#8CCC98" />
      </linearGradient>
      <linearGradient
        id="flower_svg__paint1_linear"
        x1={17.9}
        y1={4.7}
        x2={11.95}
        y2={10.65}
        gradientUnits="userSpaceOnUse"
      >
        <stop stopColor="#43B5E9" />
        <stop offset={1} stopColor="#8CCC98" />
      </linearGradient>
      <linearGradient
        id="flower_svg__paint2_linear"
        x1={11.95}
        y1={5.975}
        x2={13.908}
        y2={6.263}
        gradientUnits="userSpaceOnUse"
      >
        <stop stopColor="#43B5E9" />
        <stop offset={1} stopColor="#8CCC98" />
      </linearGradient>
      <linearGradient
        id="flower_svg__paint3_linear"
        x1={5}
        y1={16}
        x2={7.113}
        y2={8.604}
        gradientUnits="userSpaceOnUse"
      >
        <stop stopColor="#43B5E9" />
        <stop offset={1} stopColor="#8CCC98" />
      </linearGradient>
      <linearGradient
        id="flower_svg__paint4_linear"
        x1={6}
        y1={20.5}
        x2={10.8}
        y2={10.9}
        gradientUnits="userSpaceOnUse"
      >
        <stop stopColor="#43B5E9" />
        <stop offset={1} stopColor="#8CCC98" />
      </linearGradient>
    </defs>
  </svg>
)
