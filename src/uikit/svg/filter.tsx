import { ReactElement, SVGProps } from 'react'
export const SvgFilter = (props: SVGProps<SVGSVGElement>): ReactElement => (
  <svg viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
    <path
      clipRule="evenodd"
      d="M9.003 17c-1.788 0-1.795-1.783-1.795-4.8C7.208 9.181 1 7.069 1 3.755 1 .958 3.48 1 9 1s8-.042 8 2.756c0 3.313-6.207 5.426-6.207 8.444 0 3.017-.003 4.8-1.79 4.8z"
      stroke="currentColor"
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
)
