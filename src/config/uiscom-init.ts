// uiscom calltracking initialization

export function reInitUISCOMCalltracking(uiscomKey: string): void {
  window.__isComagicScriptLoaded = window.__cs = window.Comagic = window.ComagicWidget = undefined
  document
    .querySelectorAll('head script[src^="https://app.uiscom.ru"]')
    .forEach((s) => s.remove())
  document.querySelectorAll('head link[href^="https://app.uiscom.ru"]').forEach((s) => s.remove())
  window.__cs = []
  window.__cs.push(['disableWidgets', true])
  window.__cs.push(['setCsAccount', uiscomKey])
  const script = document.createElement('script')
  script.type = 'text/javascript'
  script.src = 'https://app.uiscom.ru/static/cs.min.js'
  script.async = true
  document.head.appendChild(script)
}
