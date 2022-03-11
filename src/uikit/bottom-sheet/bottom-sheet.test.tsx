import { cleanup, render, screen } from '@testing-library/react'

import { Default } from './bottom-sheet.stories'

const element = (
  <Default isOpen onClose={jest.fn()}>
    children
  </Default>
)

describe('BottomSheet', () => {
  afterEach(() => {
    cleanup()
  })

  it('should render', () => {
    render(element)
    expect(screen.getByText(/children/i)).toBeInTheDocument()
  })
})
