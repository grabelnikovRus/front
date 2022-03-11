import { ReactElement, SVGProps } from 'react'
export const SvgLk = (props: SVGProps<SVGSVGElement>): ReactElement => (
  <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
    <path
      clipRule="evenodd"
      d="M12 20c-4.045 0-7.5-.63-7.5-3.152C4.5 14.328 7.933 12 12 12c4.045 0 7.5 2.305 7.5 4.826 0 2.52-3.433 3.173-7.5 3.173zM12 12a4 4 0 10-4-4 3.986 3.986 0 003.972 4H12z"
      stroke="#fff"
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
)
