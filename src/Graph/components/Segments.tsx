import React, { useContext } from 'react'
import { getInnerHeight } from '../graphConstants'
import { DrawnSegment } from '../../types'
import { shadeHexColor } from '../../utils/colorUtils'
import { GraphContext } from '../GraphContext'

interface SegmentsProps {
  segments: DrawnSegment[]
  color: string
  partial?: boolean
}

export const Segments = ({
  segments,
  color,
  partial = false,
}: SegmentsProps) => {
  const { height } = useContext(GraphContext)
  const bottom = getInnerHeight(height)

  // These are drawn as: the top line, the shading under the line, the right line
  // The left line comes from the previous segment.

  // Still worth iterating on this
  const strokeWidth = 1 //partial ? 1.5 : 1
  return (
    <>
      {segments.map(({ x1, y1, x2, y2, id }, i) => {
        // when `partial` is true, don't fill the area, just "underline" the top line
        const bottomFillLeft = partial ? Math.min(bottom, y1 + 15) : bottom
        const bottomFillRight = partial ? Math.min(bottom, y2 + 15) : bottom
        const lineColor = shadeHexColor(color, -0.5) // : lineColor

        return (
          <React.Fragment key={id}>
            {/* top line */}
            <line
              strokeWidth={strokeWidth}
              stroke={lineColor}
              x1={x1}
              y1={y1}
              x2={x2}
              y2={y2}
            />

            {/* fill */}
            <path
              fill={color}
              fillOpacity={0.5}
              d={`M${x1},${y1} L${x2},${y2} L${x2},${bottomFillRight} L${x1},${bottomFillLeft}`}
            />

            {/* version of right line that extends to the top */}
            {/* <line stroke={vertLineColor} x1={x2} y1={0} x2={x2} y2={bottom} /> */}

            {/* left line */}
            <line
              strokeWidth={strokeWidth}
              stroke={lineColor}
              strokeLinecap="square"
              x1={x1}
              y1={y1}
              x2={x1}
              y2={bottom}
            />
            {/* right line */}
            <line
              strokeWidth={strokeWidth}
              stroke={lineColor}
              strokeLinecap="square"
              x1={x2}
              y1={y2}
              x2={x2}
              y2={bottom}
            />
          </React.Fragment>
        )
      })}
    </>
  )
}
