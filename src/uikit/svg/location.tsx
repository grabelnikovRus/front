import { ReactElement, SVGProps } from 'react'
export const SvgLocation = (props: SVGProps<SVGSVGElement>): ReactElement => (
  <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
    <path
      clipRule="evenodd"
      d="M15 11a3 3 0 10-6 0 3 3 0 006 0z"
      stroke="#4895EB"
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      clipRule="evenodd"
      d="M12 21C9.1 21 4.5 15.959 4.5 10.599 4.5 6.402 7.857 3 12 3c4.142 0 7.5 3.402 7.5 7.599C19.5 15.959 14.899 21 12 21z"
      stroke="#4895EB"
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
)
