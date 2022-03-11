import { forwardRef, ReactNode } from 'react'

export interface NotificationContainerDesktopProps {
  className: string
  children: ReactNode
}

export const NotificationContainerDesktop = forwardRef<
  HTMLDivElement,
  NotificationContainerDesktopProps
>(function NotificationContainerDesktop({ className, children }, containerRef) {
  return (
    <div className={className} ref={containerRef}>
      {children}
    </div>
  )
})
