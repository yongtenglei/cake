import React from 'react'
import { render, screen } from '@testing-library/react'
import { Graph } from './Graph/Graph'

test('renders header', () => {
  render(<Graph />)
  // queries by role can be a bit slow, 
  // but it doesn't matter for a project of this size
  screen.getByRole('heading', {name: 'Person 1'})

  screen.getByRole('button', {name: 'Previous person'})
  screen.getByRole('button', {name: 'Next person'})
})
