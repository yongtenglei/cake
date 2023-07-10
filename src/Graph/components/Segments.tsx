import React, { useContext } from 'react'
import memoize from 'lodash.memoize'
import { getInnerHeight } from '../graphConstants'
import { DrawnSegment } from '../../types'
import { shadeHexColor } from '../../utils/colorUtils'
import { GraphContext } from '../GraphContext'

interface SegmentsProps {
  segments: DrawnSegment[]
  color: string
  partial?: boolean
}

const arrowColor = '#333'
const arrowShape = '-12 -6.7 0 0 -12 6.7 -12 -6.7'
const strokeWidth = 1.5

export const Segments = ({ segments, color, partial = false }: SegmentsProps) => {
  const height = getInnerHeight(useContext(GraphContext).height)

  // The math with y coordinates is tricky because 0 means top, positive numbers mean further down.
  return (
    <>
      {segments.map(({ x1, y1, x2, y2, id }, i) => {
        // when `partial` is true, don't fill the area, just "underline" the top line
        const bottomFillLeft = partial ? Math.min(height, y1 + 15) : height
        const bottomFillRight = partial ? Math.min(height, y2 + 15) : height
        const lineColor = shadeHexColor(color, -0.5) // : lineColor

        return (
          <React.Fragment key={id}>
            {/* fill */}
            <path
              fill={color}
              fillOpacity={0.5}
              d={`M${x1},${y1} L${x2},${y2} L${x2},${bottomFillRight} L${x1},${bottomFillLeft}`}
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
            <WidthDisplay x1={x1} y1={y1} x2={x2} y2={y2} height={height} />
          </React.Fragment>
        )
      })}
    </>
  )
}

const WidthDisplay = ({ x1, y1, x2, y2, height }) => {
  const { xScale } = useContext(GraphContext)
  const width = x2 - x1
  if (width < 50) {
    return null
  }

  const textPadding = 20
  const widthLineHeight = getWidthDisplayHeight(y1, y2, height)
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
      <text x={width / 2} dominant-baseline="middle" text-anchor="middle">
        {Math.round(xScale.invert(width))}%
      </text>

      <polygon fill={arrowColor} transform={`scale(-1 1)`} points={arrowShape} />

      <polygon
        fill={arrowColor}
        transform={`translate(${width} 0)`}
        points={arrowShape}
      />
    </g>
  )
}
// Prevent width measuring bar from overlapping with other things.
const getWidthDisplayHeight = memoize((y1: number, y2: number, height: number) => {
  if (y1 > height - 50 && y2 > height - 50) {
    return height / 2
  }
  const yMiddle = (height + Math.max(y1, y2)) / 2
  return Math.min(yMiddle, height - 20)
})
