import { ReactElement, SVGProps } from 'react'
export const SvgRepair = (props: SVGProps<SVGSVGElement>): ReactElement => (
  <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
    <rect
      x={5.418}
      y={4}
      width={14.025}
      height={4.675}
      rx={2.338}
      stroke="#11142D"
      strokeWidth={1.5}
    />
    <rect
      x={12.82}
      y={15.688}
      width={4.675}
      height={2.338}
      rx={1.169}
      transform="rotate(90 12.82 15.688)"
      stroke="#11142D"
      strokeWidth={1.5}
    />
    <path
      d="M18.925 6.337h.578a1.5 1.5 0 011.5 1.5v1.734a3 3 0 01-3 3h-4.35a2 2 0 00-2 2v1.117M5.66 10.545l1.378 2.027c.449.661.365 1.549-.2 2.114v0c-.65.65-1.705.65-2.355 0v0a1.665 1.665 0 01-.2-2.114l1.377-2.027z"
      stroke="#11142D"
      strokeWidth={1.5}
    />
  </svg>
)
