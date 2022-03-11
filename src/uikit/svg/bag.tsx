import { ReactElement, SVGProps } from 'react'
export const SvgBag = (props: SVGProps<SVGSVGElement>): ReactElement => (
  <svg viewBox="0 0 36 36" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
    <path
      d="M17.941 24.775v-3.942M31.634 17.216l-.044.032c-3.633 2.238-8.43 3.59-13.656 3.59-5.226 0-10.01-1.352-13.64-3.59l-.046-.032"
      stroke="currentColor"
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      clipRule="evenodd"
      d="M4.125 20.026c0-9.228 3.455-12.304 13.817-12.304 10.363 0 13.816 3.076 13.816 12.304s-3.453 12.305-13.816 12.305c-10.363 0-13.817-3.077-13.817-12.305z"
      stroke="currentColor"
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M22.836 8.054v-.945c0-1.896-1.384-3.434-3.09-3.434H16.14c-1.706 0-3.09 1.538-3.09 3.434v.945"
      stroke="currentColor"
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
)
