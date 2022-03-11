import { ReactElement, SVGProps } from 'react'
export const SvgInteractiveMobile = (props: SVGProps<SVGSVGElement>): ReactElement => (
  <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M7.786 2.657c-1.454.344-2.634.93-3.543 1.842C2.574 6.17 2 8.755 2 12.274c0 3.52.575 6.104 2.242 7.775C5.91 21.721 8.49 22.3 12 22.3c3.511 0 6.09-.578 7.758-2.25C21.425 18.38 22 15.794 22 12.274c0-3.52-.575-6.104-2.243-7.775-1.03-1.032-2.406-1.647-4.135-1.967a1.465 1.465 0 01.196 1.573c1.274.294 2.201.775 2.877 1.453 1.224 1.227 1.805 3.28 1.805 6.716 0 3.437-.581 5.49-1.805 6.716-1.223 1.226-3.269 1.808-6.696 1.808-3.426 0-5.472-.582-6.694-1.808C4.08 17.764 3.5 15.711 3.5 12.274c0-3.437.581-5.49 1.805-6.716.595-.597 1.386-1.042 2.437-1.34a1.465 1.465 0 01.043-1.56z"
      fill="#fff"
    />
    <path
      d="M14.489 2H9.01a1.472 1.472 0 000 2.943h5.478a1.472 1.472 0 100-2.943z"
      stroke="#fff"
      strokeWidth={1.5}
    />
    <path
      d="M7.268 10.677l1.358 1.039L10.37 9.6M7.268 15.264l1.358 1.039 1.745-2.116"
      stroke="#fff"
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M12.804 11.016h3.79M12.804 15.22h3.79"
      stroke="#fff"
      strokeWidth={1.5}
      strokeLinecap="round"
    />
  </svg>
)
