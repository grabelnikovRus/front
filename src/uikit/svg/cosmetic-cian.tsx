import { ReactElement, SVGProps } from 'react'
export const SvgCosmeticCian = (props: SVGProps<SVGSVGElement>): ReactElement => (
  <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
    <rect
      x={3.758}
      y={5}
      width={15.429}
      height={5.143}
      rx={2.571}
      stroke="currentColor"
      strokeWidth={1.5}
    />
    <rect
      x={11.9}
      y={17.857}
      width={5.143}
      height={2.571}
      rx={1.286}
      transform="rotate(90 11.9 17.857)"
      stroke="currentColor"
      strokeWidth={1.5}
    />
    <path
      d="M18.615 7.571h.786a1.5 1.5 0 011.5 1.5v2.357a3 3 0 01-3 3h-5.286a2 2 0 00-2 2v1.429M4.025 12.2l1.516 2.23a1.832 1.832 0 01-.22 2.325v0a1.832 1.832 0 01-2.591 0v0a1.832 1.832 0 01-.22-2.325l1.515-2.23z"
      stroke="currentColor"
      strokeWidth={1.5}
    />
  </svg>
)
