declare global {
  interface Window {
    dataLayer?: unknown[]
    digitalData?: {
      events: unknown[]
      changes: unknown[]
    }
    __isComagicScriptLoaded?: boolean
    __cs?: unknown[][]
    Comagic?: unknown
    ComagicWidget?: unknown
  }
}

export default Window
