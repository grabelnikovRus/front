import { ReactElement, SVGProps } from 'react'
export const SvgUpDownButton = (props: SVGProps<SVGSVGElement>): ReactElement => (
  <svg viewBox="0 0 38 38" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
    <path
      clipRule="evenodd"
      d="M4.354 19.357c0-11.014 3.662-14.684 14.645-14.684 10.984 0 14.646 3.67 14.646 14.684S29.983 34.041 19 34.041c-10.983 0-14.645-3.67-14.645-14.684z"
      stroke="currentColor"
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M15.834 15.833l3.167-3.167 3.166 3.167M15.834 22.166l3.167 3.167 3.166-3.167"
      stroke="currentColor"
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
)
