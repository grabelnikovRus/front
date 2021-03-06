import { ReactElement, SVGProps } from 'react'
export const SvgTooltip = (props: SVGProps<SVGSVGElement>): ReactElement => (
  <svg fill="none" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 15 15" {...props}>
    <path
      fill="currentColor"
      d="M6.592 8.869H8v-.114c.008-.649.268-.952.854-1.268.694-.37 1.147-.86 1.147-1.642C10 4.679 8.953 4 7.48 4 6.132 4 5.033 4.633 5 5.965h1.514c.023-.543.472-.833.958-.833.501 0 .906.3.906.763 0 .436-.353.726-.81.986-.623.353-.972.709-.976 1.874v.114zM7.324 11c.475 0 .887-.356.89-.8-.003-.435-.415-.792-.89-.792-.49 0-.895.357-.891.793-.004.443.4.799.89.799z"
    />
  </svg>
)
