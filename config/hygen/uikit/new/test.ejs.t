---
to: src/uikit/<%= name %>/<%= name %>.test.tsx
---

import { cleanup, render, screen } from '@testing-library/react'

import { Default } from './<%= name %>.stories'

const element = <Default>children</Default>

describe('<%= h.changeCase.pascal(name) %>', () => {
  afterEach(() => {
    cleanup()
  })

  it('should render', () => {
    render(element)
    expect(screen.getByText(/children/i)).toBeInTheDocument()
  })
})
