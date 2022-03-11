import { ReactElement, SVGProps } from 'react'
export const SvgPreloaderSlider = (props: SVGProps<SVGSVGElement>): ReactElement => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 39.1 22.1" {...props}>
    <path
      fill="none"
      stroke="#000"
      strokeDasharray={50}
      strokeDashoffset={400}
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeMiterlimit={10}
      strokeWidth={2.1}
      d="M28.4 6.3c1.2.9 1.7 2.3 1.7 3.8v6.7c0 2.4-2 4.3-4.5 4.3h-12c-2.5 0-4.5-1.9-4.5-4.3v-6.7c0-1.8.4-2.8 1.7-3.7s5.6-4 5.6-4c2.3-1.9 4.4-1.6 6.5 0l2.7 2V1.6"
    >
      <animate
        fill="remove"
        accumulate="none"
        additive="replace"
        attributeName="stroke-dashoffset"
        calcMode="linear"
        dur="10s"
        repeatCount="indefinite"
        restart="always"
        values="400;0"
      />
    </path>
  </svg>
)
