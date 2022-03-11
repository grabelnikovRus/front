import { useEffect, useState, VFC } from 'react'

import { Notification } from '@/uikit'

import errorPng from './assets/error.png'
import successPng from './assets/success.png'
import { notify, Notify } from './notify'

export const getNotificationImage = (notificationType: Notify['type']): string => {
  switch (notificationType) {
    case 'SUCCESS': {
      return successPng
    }
    case 'ERROR': {
      return errorPng
    }
  }
}

export const NotifyContainer: VFC = () => {
  const [isOpen, setIsOpen] = useState(false)
  const [notification, setNotification] = useState<Notify>()

  const closeModal = () => {
    setIsOpen(false)
  }

  const cleanModal = () => {
    setNotification(undefined)
  }

  const openModal = (notification: Notify) => {
    setIsOpen(true)
    setNotification(notification)
  }

  useEffect(() => {
    const id = notify.subscribe(openModal)
    return () => notify.unsubscribe(id)
  }, [])

  if (notification === undefined) {
    return null
  }

  return (
    <Notification
      isOpen={isOpen}
      mode={notification.type}
      title={notification.message}
      description={notification.description}
      image={notification.imageUrl ?? getNotificationImage(notification.type)}
      onClose={closeModal}
      afterClose={cleanModal}
    />
  )
}
