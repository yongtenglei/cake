import React from 'react'
import { innerHeight as bottom } from '../spacing'
import { DrawnSegment } from '../types'

interface SegmentsProps {
  segments: DrawnSegment[]
}

export const Segments = ({ segments }: SegmentsProps) => {
  return (
    <>
      {segments.map(({ x1, y1, x2, y2 }) => (
        <React.Fragment key={x1}>
          {/* top line for previous segments */}
          <line stroke="black" x1={x1} y1={y1} x2={x2} y2={y2} />

          {/* fill for previous segments */}
          <path
            fill="#666"
            fillOpacity={0.5}
            d={`M${x1},${y1} L${x2},${y2} L${x2},${bottom} L${x1},${bottom}`}
          />
          {/* right line for previous segments */}
          <line stroke="black" x1={x2} y1={0} x2={x2} y2={bottom} />
        </React.Fragment>
      ))}
    </>
  )
}
