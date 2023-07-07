import React, { useContext, useState } from 'react'
import { Stack, Box } from '@mui/material'
import { scaleLinear } from 'd3'
import { getInnerWidth, width, margin } from '../graphConstants'
import { getAgentColor } from '../../constants'
import { AxisLeft, AxisBottom } from './Axes'
import { Segments } from './Segments'
import { useConvertSegToPixels } from '../graphUtils'
import { Preferences } from '../../types'
import { ValueBrackets } from './Bracket/ValueBrackets'
import { ValueBubbles } from './ResizeHandles'
import { GraphContext } from '../GraphContext'
import { Segment } from '../../types'

const graphHeight = 300

interface CompareViewGraphProps {
  preferences: Preferences
  cakeSize: number
}

export const CompareViewGraph = ({
  preferences,
  cakeSize,
}: CompareViewGraphProps) => {
  const yScale = scaleLinear().domain([0, 10]).range([graphHeight, 0]).nice()
  const xScale = scaleLinear()
    .domain([0, cakeSize])
    .range([0, getInnerWidth(width)])
    .nice()

  return (
    <Stack direction="row" spacing={1}>
      {preferences.map((segments, i) => {
        if (i > 0) return null
        return (
          <GraphContext.Provider
            key={i}
            value={{
              yScale,
              xScale,
              currentAgent: i,
              height: graphHeight,
              width: 960,
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
    <div>
      <svg width={width} height={height}>
        <g transform={`translate(${margin.left},${margin.top})`}>
          <AxisBottom />
          <AxisLeft />

          <Segments
            key={agent}
            segments={pixelSegs}
            color={getAgentColor(agent)}
            partial
          />

          <ValueBubbles segments={pixelSegs} />
        </g>
      </svg>
      <ValueBrackets segments={segments} />
    </div>
  )
}
