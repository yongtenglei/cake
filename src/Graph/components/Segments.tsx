import React, { useState } from 'react'
import { innerHeight as bottom } from '../spacing'
import { DrawnSegment } from '../../types'

interface SegmentsProps {
  segments: DrawnSegment[]
}

export const Segments = ({ segments }: SegmentsProps) => {
  // console.log(x)
  // Don't let mouseX go more left than previous line
  // let mouseX = Math.max(x - margin.left, leftX)


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
              fill="#666"
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
