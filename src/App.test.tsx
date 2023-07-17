import React from 'react'
import { render, screen } from '@testing-library/react'
import { Graph } from './Graph/Graph'

// Need to fix this and add more.
test('renders header', () => {
  render(<Graph />)
  // queries by role can be a bit slow in large projects, but doesn't matter here
  screen.getByRole('heading', {name: 'Person 1'})

  screen.getByRole('button', {name: 'Previous person'})
  screen.getByRole('button', {name: 'Next person'})
})
