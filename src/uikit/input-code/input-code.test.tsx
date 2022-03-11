import { cleanup, render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'

import { Default } from './input-code.stories'

const element = <Default {...(Default.args as any)} />

describe('InputCode', () => {
  afterEach(() => {
    cleanup()
  })

  it('should focus on first input', () => {
    render(element)

    expect(screen.getAllByRole('spinbutton')[0]).toHaveFocus()
  })

  it('should focus on next field on input one symbol', () => {
    render(element)

    userEvent.keyboard('1')

    expect(screen.getAllByRole('spinbutton')[1]).toHaveFocus()
  })

  it('should focus on prev field on delete empty field', () => {
    render(element)

    userEvent.keyboard('123{Backspace}')

    const inputs = screen.getAllByRole('spinbutton') as HTMLInputElement[]
    expect(inputs[2]).toHaveFocus()
    expect(inputs.map((input) => input.value).join('')).toBe('12')
  })
})
