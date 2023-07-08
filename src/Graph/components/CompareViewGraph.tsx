import React, { useContext, useState } from 'react'
import { Stack, Box } from '@mui/material'
import { margin } from '../graphConstants'
import { getAgentColor } from '../../constants'
import { AxisLeft, AxisBottom } from './Axes'
import { Segments } from './Segments'
import { createScales, useConvertSegToPixels } from '../graphUtils'
import { Preferences } from '../../types'
import { ValueBrackets } from './Bracket/ValueBrackets'
import { ValueBubbles } from './ResizeHandles'
import { GraphContext } from '../GraphContext'
import { Segment } from '../../types'

const graphHeight = 300
const graphWidth = 560

interface CompareViewGraphProps {
  preferences: Preferences
  cakeSize: number
}

export const CompareViewGraph = ({ preferences, cakeSize }: CompareViewGraphProps) => {
  const { yScale, xScale } = createScales({
    width: graphWidth,
    height: graphHeight,
    cakeSize,
  })
  return (
    <Stack direction="row" flexWrap="wrap" spacing={1}>
      {preferences.map((segments, i) => {
        return (
          <GraphContext.Provider
            key={i}
            value={{
              yScale,
              xScale,
              currentAgent: i,
              height: graphHeight,
              width: graphWidth,
            }}
          >
            <SmallGraph segments={segments} agent={i} />
          </GraphContext.Provider>
        )
      })}
    </Stack>
  )
}

interface SmallGraphProps {
  segments: Segment[]
  agent: number
}
const SmallGraph = ({ segments, agent }: SmallGraphProps) => {
  const { height, width } = useContext(GraphContext)
  const convertToPixels = useConvertSegToPixels()
  const pixelSegs = segments.map(convertToPixels)
  return (
    <Stack alignItems={'center'}>
      <h3 style={{ marginBottom: 0 }}>Person {agent + 1}</h3>
      <svg width={width} height={height}>
        <g transform={`translate(${margin.left},${margin.top})`}>
          <AxisBottom simple />
          <AxisLeft simple />

          <Segments key={agent} segments={pixelSegs} color={getAgentColor(agent)} />

          <ValueBubbles segments={pixelSegs} />
        </g>
      </svg>
      <ValueBrackets segments={segments} />
    </Stack>
  )
}
