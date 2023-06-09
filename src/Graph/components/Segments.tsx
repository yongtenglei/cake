import React, { useState, useContext } from 'react'
import { innerHeight as bottom, getAgentColor } from '../constants'
import { GraphContext } from '../GraphContext'
import { DrawnSegment } from '../../types'

interface SegmentsProps {
  segments: DrawnSegment[]
  color: string
}

export const Segments = ({ segments, color }: SegmentsProps) => {
  // These are drawn as: the top line, the shading under the line, the right line
  // There is no bottom line and the left line comes from the previous segment.
  return (
    <>
      {segments.map(({ x1, y1, x2, y2, id }) => {
        return (
          <React.Fragment key={id}>
            {/* top line */}
            <line
              stroke="black"
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
              d={`M${x1},${y1} L${x2},${y2} L${x2},${bottom} L${x1},${bottom}`}
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

            {/* right line */}
            <line stroke="black" x1={x2} y1={0} x2={x2} y2={bottom} />
          </React.Fragment>
        )
      })}
    </>
  )
}
