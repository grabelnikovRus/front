import { ReactElement, SVGProps } from 'react'
export const SvgHeating = (props: SVGProps<SVGSVGElement>): ReactElement => (
  <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
    <path
      d="M16.278 9l-.348.209A1.604 1.604 0 0016 12v0c1.1.587 1.14 2.15.07 2.791l-.348.209M12.278 9l-.348.209A1.604 1.604 0 0012 12v0c1.1.587 1.14 2.15.07 2.791l-.348.209"
      stroke="#11142D"
      strokeWidth={1.5}
      strokeLinecap="round"
    />
    <path
      d="M8.664 9.643a.75.75 0 00-.772-1.286l.772 1.286zm-1.328 4.714a.75.75 0 10.772 1.286l-.772-1.286zm.734.434l.386.643-.386-.643zm-.178-6.434l-.348.209.771 1.286.349-.209-.772-1.286zm-.207 5.791l-.349.209.772 1.286.348-.209-.771-1.286zm-.038-1.486a.854.854 0 01.038 1.486l.771 1.286c1.57-.941 1.512-3.235-.103-4.096l-.706 1.324zm-.103-4.096c-1.57.941-1.512 3.235.103 4.096l.706-1.324a.854.854 0 01-.038-1.486l-.771-1.286z"
      fill="#11142D"
    />
    <path
      clipRule="evenodd"
      d="M2.75 12c0-6.937 2.313-9.25 9.25-9.25 6.937 0 9.25 2.313 9.25 9.25 0 6.937-2.313 9.25-9.25 9.25-6.937 0-9.25-2.313-9.25-9.25z"
      stroke="#11142D"
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
)
