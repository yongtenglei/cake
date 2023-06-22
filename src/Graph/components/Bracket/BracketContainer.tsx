import React, { useState, useContext } from 'react'
import { GraphContext } from '../../GraphContext'
import { Segment } from '../../../types'
import { Bracket } from './Bracket'

interface BracketContainerProps {
  focused: boolean
  segment: Segment
  children?: React.ReactNode
}

export const BracketContainer = ({
  focused,
  segment: { x1, x2 },
  children,
}: BracketContainerProps) => {
  const { xScale } = useContext(GraphContext)
  const slicesize = x2 - x1

  return (
    <div
      style={{
        left: xScale(x1),
        width: 'min-content',
        position: 'absolute',
        zIndex: focused ? 10 : 0,
      }}
    >
      <Bracket width={xScale(slicesize)} />
      {children}
    </div>
  )
}
