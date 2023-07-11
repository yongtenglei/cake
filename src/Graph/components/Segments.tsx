import React, { memo, useContext } from 'react'
import { DrawnSegment } from '../../types'
import { shadeHexColor } from '../../utils/colorUtils'
import { GraphContext } from '../GraphContext'
import { getInnerHeight } from '../graphConstants'

interface SegmentsProps {
  segments: DrawnSegment[]
  color: string
}

const arrowColor = '#333'
const arrowShape = '-12 -6.7 0 0 -12 6.7 -12 -6.7'
const strokeWidth = 1.5

export const Segments = ({ segments, color }: SegmentsProps) => {
  const height = getInnerHeight(useContext(GraphContext).height)

  // The math with y coordinates is tricky because 0 means top, positive numbers mean further down.
  return (
    <>
      {segments.map((seg, i) => {
        const { x1, y1, x2, y2, id } = seg
        const lineColor = shadeHexColor(color, -0.5)

        return (
          <React.Fragment key={id}>
            {/* fill */}
            <path
              fill={color}
              fillOpacity={0.7}
              d={`M${x1},${y1} L${x2},${y2} L${x2},${height} L${x1},${height}`}
            />

            {/* top line */}
            <line
              strokeWidth={strokeWidth}
              stroke={lineColor}
              x1={x1}
              y1={y1}
              x2={x2}
              y2={y2}
            />

            {/* left line */}
            <line
              strokeWidth={strokeWidth}
              stroke={lineColor}
              strokeLinecap="square"
              x1={x1}
              y1={y1}
              x2={x1}
              y2={height}
            />
            {/* right line */}
            <line
              strokeWidth={strokeWidth}
              stroke={lineColor}
              strokeLinecap="square"
              x1={x2}
              y1={y2}
              x2={x2}
              y2={height}
            />

            {/* width measuring lines */}
            <WidthDisplay {...seg} height={height} />
          </React.Fragment>
        )
      })}
    </>
  )
}

type WidthDisplayProps = DrawnSegment & { height: number }

const WidthDisplay = memo<WidthDisplayProps>(({ x1, y1, x2, y2, height }) => {
  const { xScale, cakeSize } = useContext(GraphContext)
  const width = x2 - x1
  if (width < 50) {
    return null
  }

  const textPadding = 20
  const widthLineHeight = getWidthDisplayHeight(y1, y2, height)
  const percent = Math.round((100 * xScale.invert(width)) / cakeSize)
  return (
    <g transform={`translate(${x1},${widthLineHeight})`}>
      <line
        stroke={arrowColor}
        strokeWidth={strokeWidth}
        x1={2}
        x2={width / 2 - textPadding}
      />
      <line
        stroke={arrowColor}
        strokeWidth={strokeWidth}
        x1={width / 2 + textPadding}
        x2={width - 2}
      />
      <text x={width / 2} dominantBaseline="middle" textAnchor="middle">
        {percent}%
      </text>

      <polygon fill={arrowColor} transform={`scale(-1 1)`} points={arrowShape} />

      <polygon
        fill={arrowColor}
        transform={`translate(${width} 0)`}
        points={arrowShape}
      />
    </g>
  )
})
// Prevent width measuring bar from overlapping with other things.
const getWidthDisplayHeight = (y1: number, y2: number, height: number) => {
  if (y1 > height - 50 && y2 > height - 50) {
    return height / 2
  }
  const yMiddle = (height + Math.max(y1, y2)) / 2
  return Math.min(yMiddle, height - 20)
}
