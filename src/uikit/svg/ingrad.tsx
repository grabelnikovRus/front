import { ReactElement, SVGProps } from 'react'
export const SvgIngrad = (props: SVGProps<SVGSVGElement>): ReactElement => (
  <svg viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
    <g filter="url(#ingrad_svg__filter0_i_25008_83409)">
      <circle cx={20} cy={20} r={20} fill="#fff" />
    </g>
    <path
      d="M29.842 19.971c.011-.005.016-.01.02-.01.824.007 1.655-.097 2.469.074.827.174 1.417.745 1.6 1.648.12.6.092 1.186-.137 1.756-.233.575-.648.955-1.215 1.131a3.755 3.755 0 01-.95.156c-.558.024-1.12.007-1.68.007-.034 0-.066-.004-.109-.008V19.97h.002zm.985 2.365v1.353c0 .078-.004.145.106.142.303-.01.61.01.911-.02.447-.044.81-.25.997-.695.169-.398.18-.817.096-1.238-.116-.59-.509-.956-1.089-1.003-.293-.024-.588-.013-.881-.028-.117-.006-.144.039-.142.151.004.447.002.893.002 1.338zm-6.559 2.398c-.392 0-.745.001-1.099-.004-.034 0-.075-.036-.099-.067-.376-.5-.746-1.001-1.125-1.497a.307.307 0 00-.198-.101c-.155-.016-.6-.008-.6-.008s-.005.039-.004.144c.004.446.001.892.001 1.338v.184h-.985v-4.76c.039-.004.072-.011.104-.011.679.001 1.358-.004 2.037.008.34.005.663.1.96.28.403.245.597.623.629 1.088a2.25 2.25 0 01-.047.625c-.096.444-.382.731-.78.909l-.167.077 1.374 1.796-.001-.001zM21.143 22.2h.925c.08 0 .162 0 .24-.017.395-.08.594-.322.578-.694-.016-.356-.238-.59-.633-.621-.336-.026-.674-.013-1.012-.02-.074-.003-.1.03-.099.103.003.186 0 .373 0 .56v.688zm8.238 2.532c-.33 0-.644.003-.956-.004-.035 0-.084-.058-.1-.1a15.04 15.04 0 01-.252-.669c-.03-.085-.071-.12-.164-.12-.627.004-1.254.004-1.88 0-.097 0-.143.031-.175.127-.08.23-.173.455-.266.68-.016.035-.06.081-.092.083-.313.007-.625.003-.96.003.107-.276.204-.534.307-.79.511-1.29 1.025-2.579 1.533-3.87.036-.09.08-.125.175-.122.28.006.562.004.841.002.072 0 .12.011.152.094.603 1.531 1.207 3.062 1.812 4.592l.026.095v-.002zm-2.42-3.74c-.247.663-.492 1.32-.74 1.991h1.486c-.251-.67-.497-1.33-.747-1.992zm-15.426 3.743h-.987v-4.769c.304 0 .602-.003.898.004.03 0 .067.046.09.08.617.887 1.231 1.776 1.846 2.665l.241.341v-3.084h.98v4.77c-.3 0-.598.003-.894-.004-.034-.001-.074-.055-.1-.092-.66-.952-1.318-1.905-1.977-2.858-.022-.033-.05-.063-.095-.118l-.002 3.065zm-3.3-4.764h.977v4.76h-.978v-4.76zm10.906 4.47c0 .04-.05.104-.092.12-.54.295-1.465.382-2.223.172-.885-.246-1.47-.816-1.646-1.754-.155-.821-.053-1.607.509-2.266.338-.395.778-.614 1.27-.727.668-.152 1.315-.068 1.95.178.1.038.133.094.129.203-.008.26-.003.52-.003.802-.054-.025-.086-.038-.118-.054-.578-.299-1.177-.392-1.802-.19-.655.21-1.034.804-.991 1.513.024.371.096.721.338 1.01.276.328.645.46 1.049.495.19.016.323.015.439-.007.157-.031.249-.032.253-.289-.005-.22-.005-.46-.005-.7H17.4v-.923h.798v-.003c.231 0 .454 0 .673.003h.124c.025.002.05.001.075.002.062 0 .07.06.07.095.004.723.004 1.596-.001 2.32h.001z"
      fill="#2C2E35"
    />
    <path
      d="M6.979 26.006v-7.722l6.644-3.622v4.034h.979V13L6 17.688V27h8.602v-.994H6.979z"
      fill="#FFC141"
    />
    <defs>
      <filter
        id="ingrad_svg__filter0_i_25008_83409"
        x={0}
        y={0}
        width={40}
        height={48}
        filterUnits="userSpaceOnUse"
        colorInterpolationFilters="sRGB"
      >
        <feFlood floodOpacity={0} result="BackgroundImageFix" />
        <feBlend in="SourceGraphic" in2="BackgroundImageFix" result="shape" />
        <feColorMatrix
          in="SourceAlpha"
          values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
          result="hardAlpha"
        />
        <feOffset dy={8} />
        <feGaussianBlur stdDeviation={4} />
        <feComposite in2="hardAlpha" operator="arithmetic" k2={-1} k3={1} />
        <feColorMatrix values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.05 0" />
        <feBlend in2="shape" result="effect1_innerShadow_25008_83409" />
      </filter>
    </defs>
  </svg>
)