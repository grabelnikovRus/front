import { ILocalStoredData } from '../sell-request-form.types'

export const getStoredData = (key: string): ILocalStoredData => {
  const storedString = localStorage.getItem(key)
  if (!storedString) return {}
  let storedItem = {}
  try {
    storedItem = JSON.parse(storedString)
  } catch (error) {
    return {}
  }
  return storedItem as ILocalStoredData
}

export const setStoredData = (key: string, storedData: ILocalStoredData): void => {
  localStorage.setItem(key, JSON.stringify(storedData))
}

export const clearStoredData = (key: string): void => {
  localStorage.removeItem(key)
}
