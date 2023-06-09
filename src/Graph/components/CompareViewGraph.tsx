import React from 'react'
import { height, width, margin, getAgentColor } from '../constants'
import { AxisLeft, AxisBottom } from './Axes/Axes'
import { Segments } from './Segments'
import { useConvertSegToPixels } from '../graphUtils'
import { Segment } from '../../types'

interface CompareViewGraphProps {
  preferences: Segment[][]
}

export const CompareViewGraph = ({ preferences }: CompareViewGraphProps) => {
  const convertToPixels = useConvertSegToPixels()
  return (
    <svg width={width} height={height}>
      <g transform={`translate(${margin.left},${margin.top})`}>
        <AxisBottom />
        <AxisLeft />

        {preferences.map((segments, i) => (
          <Segments
            key={i}
            segments={segments.map(convertToPixels)}
            color={getAgentColor(i + 1)}
          />
        ))}

        {/* bubbles displaying values. Must be after other items to display on top */}
        {/* <ValueBubbles
          segments={pixelSegmentsWithCurrent}
          editable={false}
          setMovingId={setMovingId}
        /> */}
      </g>
    </svg>
  )
}
