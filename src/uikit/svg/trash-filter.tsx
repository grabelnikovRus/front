import { ReactElement, SVGProps } from 'react'
export const SvgTrashFilter = (props: SVGProps<SVGSVGElement>): ReactElement => (
  <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
    <path
      d="M18.89 9.554c0 8.019 1.154 11.644-6.61 11.644-7.765 0-6.587-3.625-6.587-11.644M20.365 6.48H4.215m11.5 0s.528-3.766-3.426-3.766c-3.953 0-3.425 3.766-3.425 3.766"
      stroke="currentColor"
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
)
