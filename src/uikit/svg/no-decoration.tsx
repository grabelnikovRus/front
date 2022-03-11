import { ReactElement, SVGProps } from 'react'
export const SvgNoDecoration = (props: SVGProps<SVGSVGElement>): ReactElement => (
  <svg viewBox="0 0 26 24" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
    <path
      clipRule="evenodd"
      d="M1 15.5c0-2.813 3-3.75 12-3.75 9.001 0 12 .937 12 3.75 0 2.811-2.999 3.75-12 3.75-9 0-12-.939-12-3.75z"
      stroke="currentColor"
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M13 10.142c0-2.813 1.091-3.75 4.364-3.75 3.273 0 4.363.937 4.363 3.75 0 2.812-1.09 3.75-4.363 3.75-3.273 0-4.364-.938-4.364-3.75z"
      fill="#fff"
      stroke="currentColor"
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M4.273 10.142c0-2.813 1.091-3.75 4.364-3.75 3.273 0 4.364.937 4.364 3.75 0 2.812-1.09 3.75-4.364 3.75-3.273 0-4.364-.938-4.364-3.75z"
      fill="#fff"
      stroke="currentColor"
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M3.894 21.262l.527-1.929M21.703 21.262l-.526-1.929"
      stroke="currentColor"
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
)
