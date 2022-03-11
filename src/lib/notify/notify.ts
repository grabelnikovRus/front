import { ReactNode } from 'react'

interface Message {
  message: string
  description?: ReactNode
  imageUrl?: string
}

export interface Notify extends Message {
  type: 'SUCCESS' | 'ERROR'
}

type Id = string & { __type__: 'Id' }
type Listener = (notification: Notify) => void

const generateId = () => Math.random().toString(36).substr(2, 9) as Id

class NotifyService {
  private listeners: Map<Id, Listener>

  constructor() {
    this.listeners = new Map()
  }

  success(message: Message) {
    this.listeners.forEach((listener) => listener({ ...message, type: 'SUCCESS' }))
  }

  error(message: Message) {
    this.listeners.forEach((listener) => listener({ ...message, type: 'ERROR' }))
  }

  subscribe(listener: Listener) {
    const id = generateId()
    this.listeners.set(id, listener)
    return id
  }

  unsubscribe(id: Id) {
    this.listeners.delete(id)
  }
}

export const notify = new NotifyService()
