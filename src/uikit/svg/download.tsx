import { ReactElement, SVGProps } from 'react'
export const SvgDownload = (props: SVGProps<SVGSVGElement>): ReactElement => (
  <svg viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
    <path
      d="M15.839 19.721V3.667m3.888 12.152l-3.888 3.904-3.888-3.904"
      stroke="currentColor"
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M21.827 9.678c4.772.44 6.507 2.227 6.507 9.334 0 9.466-3.082 9.466-12.334 9.466-9.254 0-12.333 0-12.333-9.466 0-7.107 1.733-8.894 6.507-9.334"
      stroke="currentColor"
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
)
