import { ReactElement, SVGProps } from 'react'
export const SvgViewWindow = (props: SVGProps<SVGSVGElement>): ReactElement => (
  <svg viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
    <g stroke="#222" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round">
      <path d="M7.5 2.453c-3.113.455-4.596 1.938-5.05 5.05m10.05-5.05c3.112.455 4.596 1.938 5.05 5.05m0 5c-.454 3.113-1.938 4.596-5.05 5.051m-5 0c-3.113-.454-4.596-1.938-5.05-5.05" />
      <path
        clipRule="evenodd"
        d="M9.601 7.303a1.467 1.467 0 11-2.934.001 1.467 1.467 0 012.934 0z"
      />
      <path d="M15 12.5c-1.5-1.507-2.276-2.46-4.166-2.08-1.667.333-3.028 1.633-4.834 3.578" />
    </g>
  </svg>
)
