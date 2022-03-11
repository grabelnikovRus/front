import { ReactElement, SVGProps } from 'react'
export const SvgDrop = (props: SVGProps<SVGSVGElement>): ReactElement => (
  <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
    <path
      d="M17.448 10.932l-.618.424.618-.424zm-5.464-7.91l.619.425-.619-.424zm.032 0l-.619.425.619-.424zm-.65-.424l-5.432 7.91 1.236.848 5.433-7.909-1.237-.849zm6.7 7.91l-5.432-7.91-1.237.85 5.433 7.908 1.236-.849zm-1.59 10.007a7.36 7.36 0 001.59-10.008l-1.236.85a5.86 5.86 0 01-1.266 7.967l.912 1.19zm-8.952 0a7.36 7.36 0 008.952 0l-.912-1.19a5.86 5.86 0 01-7.128 0l-.912 1.19zm-1.59-10.008a7.36 7.36 0 001.59 10.008l.912-1.19a5.86 5.86 0 01-1.266-7.969l-1.236-.849zm6.669-7.06a.731.731 0 01-1.206 0l1.237-.849a.769.769 0 00-1.268 0l1.237.85z"
      fill="#11142D"
    />
  </svg>
)