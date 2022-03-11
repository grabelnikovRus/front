import { ReactElement, SVGProps } from 'react'
export const SvgShieldGradient = (props: SVGProps<SVGSVGElement>): ReactElement => (
  <svg viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M15.979 2.917c-2.474 0-4.819.7-6.636 1.493-1.796.783-3.168 1.697-3.673 2.203a2.185 2.185 0 00-.613 1.055c-.106.41-.135.921-.14 1.59-.004.545.008 1.246.025 2.154l.012.719c.022 1.273.045 2.912.045 5.04 0 4.506 1.889 7.619 4.213 9.593 2.292 1.946 5.018 2.794 6.767 2.794 1.749 0 4.475-.848 6.767-2.794 2.324-1.974 4.212-5.087 4.212-9.592a282.179 282.179 0 01.058-5.764 93.65 93.65 0 00.025-2.15c-.005-.669-.034-1.18-.14-1.59a2.184 2.184 0 00-.611-1.054c-.506-.506-1.878-1.42-3.675-2.204-1.818-.793-4.162-1.493-6.636-1.493zM6.73 7.673c.315-.315 1.493-1.139 3.211-1.888 1.697-.74 3.832-1.368 6.037-1.368 2.204 0 4.34.628 6.037 1.368 1.717.749 2.896 1.572 3.212 1.888a.7.7 0 01.22.37c.056.214.088.558.093 1.226.004.523-.008 1.197-.025 2.1l-.013.736a283.57 283.57 0 00-.045 5.067c0 4.034-1.67 6.74-3.683 8.448-2.044 1.737-4.432 2.438-5.796 2.438-1.364 0-3.752-.701-5.796-2.438-2.013-1.709-3.684-4.414-3.684-8.448a283.97 283.97 0 00-.058-5.798c-.016-.905-.028-1.581-.024-2.105.005-.668.037-1.012.092-1.225a.7.7 0 01.221-.37zm14.033 6.017a.75.75 0 00-1.06-1.06l-4.667 4.668-1.993-1.995a.75.75 0 10-1.061 1.06l2.523 2.527a.75.75 0 001.06 0l5.198-5.2z"
      fill="url(#shield-gradient_svg__paint0_linear)"
    />
    <defs>
      <linearGradient
        id="shield-gradient_svg__paint0_linear"
        x1={4.916}
        y1={2.917}
        x2={31.103}
        y2={24.667}
        gradientUnits="userSpaceOnUse"
      >
        <stop stopColor="#43B5E9" />
        <stop offset={1} stopColor="#8CCC98" />
      </linearGradient>
    </defs>
  </svg>
)
