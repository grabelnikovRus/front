import { ReactElement, SVGProps } from 'react'
export const SvgTrash = (props: SVGProps<SVGSVGElement>): ReactElement => (
  <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
    <path
      d="M18.6 9.554c0 8.019 1.154 11.644-6.61 11.644S5.404 17.573 5.404 9.554M20.076 6.48H3.926M15.425 6.48s.528-3.766-3.426-3.766c-3.953 0-3.425 3.766-3.425 3.766"
      stroke="#11142d"
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path d="M14 12l-4 4M14 16l-4-4" stroke="#11142d" strokeWidth={1.5} strokeLinecap="round" />
  </svg>
)
