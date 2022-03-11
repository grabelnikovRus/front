import { ReactElement, SVGProps } from 'react'
export const SvgEuroCian = (props: SVGProps<SVGSVGElement>): ReactElement => (
  <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
    <path d="M3 7a4 4 0 014-4h10a4 4 0 014 4v4H3V7z" stroke="currentColor" strokeWidth={1.5} />
    <rect x={5} y={7} width={7} height={4} rx={2} stroke="currentColor" strokeWidth={1.5} />
    <rect x={12} y={7} width={7} height={4} rx={2} stroke="currentColor" strokeWidth={1.5} />
    <path
      d="M1 15a4 4 0 014-4h14a4 4 0 014 4v2a2 2 0 01-2 2H3a2 2 0 01-2-2v-2z"
      stroke="currentColor"
      strokeWidth={1.5}
    />
    <path d="M4 19v2M20 19v2" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" />
  </svg>
)
