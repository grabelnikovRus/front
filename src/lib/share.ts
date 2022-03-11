export const share = (title: string, link: string): void => {
  const url = window.location.origin + link
  if (navigator.share) {
    navigator.share({ title, url })
  } else {
    const text = document.createElement('textarea')
    document.body.appendChild(text)
    text.value = url
    text.select()
    document.execCommand('copy')
    document.body.removeChild(text)
  }
}
