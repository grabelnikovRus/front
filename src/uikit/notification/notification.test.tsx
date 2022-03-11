import { cleanup, render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'

import { Default } from './notification.stories'

const element = <Default {...(Default.args as any)} />

describe('Notification', () => {
  afterEach(() => {
    cleanup()
  })

  it('should close by esc', async () => {
    render(element)
    expect(screen.queryByText(/Заявка успешно отправлена/i)).toBeInTheDocument()
    userEvent.keyboard('{esc}')
    await waitFor(() => {
      expect(screen.queryByText(/Заявка успешно отправлена/i)).not.toBeInTheDocument()
    })
  })
})
