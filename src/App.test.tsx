import React from 'react'
import { render, screen } from '@testing-library/react'
import { Graph } from './Graph/Graph'

// jest has trouble with this package so mock it to return a string instead
jest.mock('mui-color-input', () => ({MuiColorInput: () => 'color input'}))

// This is just an example
test('renders header', () => {
  render(<Graph />)
  // queries by role can be a bit slow in large projects, but doesn't matter here
  screen.getByRole('heading', {name: 'Resource Setup'})

  screen.getByRole('button', {name: 'Use Sample Values'})
  screen.getByRole('checkbox', {name: 'Sections'})
  screen.getByRole('button', {name: 'Add section'})
  screen.getByRole('textbox', {name: 'Name'})
  screen.getByRole('spinbutton', {name: 'Size'})
})
