import { ReactElement, SVGProps } from 'react'
export const SvgCalendar = (props: SVGProps<SVGSVGElement>): ReactElement => (
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
      d="M4.79 13.892h28.436M25.954 20.126h.015M19.007 20.126h.014M12.046 20.126h.014M25.954 26.225h.015M19.007 26.225h.014M12.046 26.225h.014M25.33 2.375V7.54M12.684 2.375V7.54"
      stroke="currentColor"
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
)
