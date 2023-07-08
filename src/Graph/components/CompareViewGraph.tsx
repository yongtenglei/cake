import React, { useContext, useState } from 'react'
import clamp from 'lodash.clamp'
import { Stack, Box } from '@mui/material'
import { getInnerHeight, getInnerWidth, margin } from '../graphConstants'
import { getAgentColor } from '../../constants'
import { AxisLeft, AxisBottom } from './Axes'
import { Segments } from './Segments'
import { createScales, useConvertSegToPixels } from '../graphUtils'
import { Preferences } from '../../types'
import { ValueBrackets } from './Bracket/ValueBrackets'
import { ValueBubbles } from './ResizeHandles'
import { GraphContext } from '../GraphContext'
import { Segment } from '../../types'
import { getValueAtPoint } from '../algorithm/getValue'
import { ValueBubble } from './ResizeHandles/ValueBubble'

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

  const [mouseX, setMouseX] = useState<number | null>(0)

  const onMouseMove = (event: React.MouseEvent) => {
    const x = event.nativeEvent.offsetX - margin.left
    const constrainedX = clamp(x, 0, getInnerWidth(graphWidth))
    setMouseX(constrainedX)
  }
  const onMouseLeave = () => setMouseX(null)

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
            <SmallGraph
              segments={segments}
              agent={i}
              onMouseMove={onMouseMove}
              onClick={onMouseMove}
              onMouseLeave={onMouseLeave}
              x={mouseX}
            />
          </GraphContext.Provider>
        )
      })}
    </Stack>
  )
}

interface SmallGraphProps {
  segments: Segment[]
  agent: number
  onMouseMove: (event: React.MouseEvent) => void
  onClick: (event: React.MouseEvent) => void
  onMouseLeave: VoidFunction
  x: number | null
}
const SmallGraph = ({
  segments,
  agent,
  onMouseMove,
  onMouseLeave,
  onClick,
  x,
}: SmallGraphProps) => {
  const { height, width, yScale, xScale } = useContext(GraphContext)
  const convertToPixels = useConvertSegToPixels()
  const pixelSegs = segments.map(convertToPixels)
  const comparisonLineValue = yScale(getValueAtPoint(segments, xScale.invert(x)))
  const hideComparisonBar = isNaN(comparisonLineValue)

  return (
    <Stack alignItems={'center'}>
      <h3 style={{ marginBottom: 0 }}>Person {agent + 1}</h3>

      {/* Track mouse to show comparison line. `onClick` is for touch users who have no move event */}
      <div onMouseMove={onMouseMove} onMouseLeave={onMouseLeave} onClick={onClick}>
        <svg width={width} height={height}>
          <g transform={`translate(${margin.left},${margin.top})`}>
            <AxisBottom simple />
            <AxisLeft simple />

            <Segments key={agent} segments={pixelSegs} color={getAgentColor(agent)} />

            {hideComparisonBar ? (
              <ValueBubbles segments={pixelSegs} />
            ) : (
              <>
                <line y2={getInnerHeight(height)} x1={x} x2={x} stroke={'black'} />
                <ValueBubble x={x} y={comparisonLineValue} />
              </>
            )}
          </g>
        </svg>
      </div>
      <ValueBrackets segments={segments} />
    </Stack>
  )
}
