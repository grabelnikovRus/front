import { ReactElement, SVGProps } from 'react'
export const SvgPrint = (props: SVGProps<SVGSVGElement>): ReactElement => (
  <svg viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
    <path
      d="M8.667 26.562c-4.378-.555-6-2.406-6-8.5 0-8.729 3.33-8.729 13.333-8.729 10.005 0 13.333 0 13.333 8.728 0 6.095-1.62 7.946-6 8.501"
      stroke="currentColor"
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      clipRule="evenodd"
      d="M8.6 22.026c0-1.722.083-2.393.309-3.626h14.233c.247 1.233.247 2.213.247 3.626 0 7.474-1.511 7.474-7.394 7.474-5.884 0-7.395 0-7.395-7.474z"
      stroke="currentColor"
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M16 21.977h-3.7m4.933 3.7H12.3M8.6 8.933C8.6 5.233 10.45 4 16 4c5.55 0 7.4 1.234 7.4 4.933"
      stroke="currentColor"
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
)
