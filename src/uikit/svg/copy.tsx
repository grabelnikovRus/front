import { ReactElement, SVGProps } from 'react'
export const SvgCopy = (props: SVGProps<SVGSVGElement>): ReactElement => (
  <svg viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
    <path
      clipRule="evenodd"
      d="M12.529 7.418a2.46 2.46 0 110-4.919 2.46 2.46 0 010 4.92zm0 10.082a2.46 2.46 0 110-4.919 2.46 2.46 0 010 4.919zm-8.403-5.04a2.46 2.46 0 110-4.92 2.46 2.46 0 010 4.92z"
      stroke="#888993"
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M10.344 6.7L6.706 8.802m3.638 5.04l-3.638-2.1"
      stroke="#888993"
      strokeWidth={1.5}
      strokeLinecap="round"
    />
  </svg>
)
