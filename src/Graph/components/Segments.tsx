import React from 'react'
import { innerHeight as bottom, getAgentColor } from '../constants'
import { DrawnSegment } from '../../types'
import { shadeHexColor } from '../../utils/colorUtils'

interface SegmentsProps {
  segments: DrawnSegment[]
  color: string
  partial?: boolean
}

// const lineColor = "#333"

export const Segments = ({
  segments,
  color,
  partial = false,
}: SegmentsProps) => {
  // These are drawn as: the top line, the shading under the line, the right line
  // There is no bottom line and the left line comes from the previous segment.

  // WIP
  const strokeWidth = 1 //partial ? 1.5 : 1
  return (
    <>
      {segments.map(({ x1, y1, x2, y2, id }, i) => {
        // when `partial` is true, don't fill the area, just "underline" the top line
        const bottomFillLeft = partial ? Math.min(bottom, y1 + 15) : bottom
        const bottomFillRight = partial ? Math.min(bottom, y2 + 15) : bottom
        const lineColor = shadeHexColor(color, -0.4) // : lineColor

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
              // onClick={onMouseDown}
              // onMouseMove={onMouseMove}
            />

            {/* fill */}
            <path
              fill={color}
              fillOpacity={0.5}
              d={`M${x1},${y1} L${x2},${y2} L${x2},${bottomFillRight} L${x1},${bottomFillLeft}`}
            />

            {/* Grab handle */}
            {/* <rect
              className="vertGrabArea"
              stroke="none"
              fill="transparent"
              x={x1}
              y={(moving ? mouseY : y1) - 5}
              width={x2 - x1}
              height={10}
              onMouseDown={() => onMouseDown(id)}
              onMouseUp={() => setMovingId(null)}
            /> */}

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
