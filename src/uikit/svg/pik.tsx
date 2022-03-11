import { ReactElement, SVGProps } from 'react'
export const SvgPik = (props: SVGProps<SVGSVGElement>): ReactElement => (
  <svg viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
    <g filter="url(#pik_svg__filter0_i_25008_83434)">
      <circle cx={20} cy={20} r={20} fill="#fff" />
    </g>
    <path
      d="M7 24v-8h7.727v8h-2.185v-6.064H9.186V24H7zm14.433-4.7l-3.63 4.7h-1.966v-8h2.186v4.7l3.63-4.7h1.966v8h-2.186v-4.7zm5.481 1.42V24H24.73v-8h2.185v3.388L29.644 16h2.56l-3.177 3.882L33 24h-2.971l-3.115-3.28z"
      fill="#EA5929"
    />
    <defs>
      <filter
        id="pik_svg__filter0_i_25008_83434"
        x={0}
        y={0}
        width={40}
        height={48}
        filterUnits="userSpaceOnUse"
        colorInterpolationFilters="sRGB"
      >
        <feFlood floodOpacity={0} result="BackgroundImageFix" />
        <feBlend in="SourceGraphic" in2="BackgroundImageFix" result="shape" />
        <feColorMatrix
          in="SourceAlpha"
          values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
          result="hardAlpha"
        />
        <feOffset dy={8} />
        <feGaussianBlur stdDeviation={4} />
        <feComposite in2="hardAlpha" operator="arithmetic" k2={-1} k3={1} />
        <feColorMatrix values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.05 0" />
        <feBlend in2="shape" result="effect1_innerShadow_25008_83434" />
      </filter>
    </defs>
  </svg>
)
