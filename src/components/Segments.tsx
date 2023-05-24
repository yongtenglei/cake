import React, { useState } from 'react'
import { innerHeight as bottom } from '../spacing'
import { DrawnSegment } from '../types'

interface SegmentsProps {
  segments: DrawnSegment[]
  mouseX: number
  mouseY: number
}

export const Segments = ({ segments, mouseX, mouseY }: SegmentsProps) => {
  // console.log(x)
  // Don't let mouseX go more left than previous line
  // let mouseX = Math.max(x - margin.left, leftX)
  const [isMoving, setIsMoving] = useState(false)
  const onMouseDown = () => {
    console.log(mouseX)
    setIsMoving(true)
  }
  const onMouseMove = () => {
    if(isMoving) {
        console.log(mouseX)
    }
  }

  return (
    <>
      {segments.map(({ x1, y1, x2, y2, id }) => (
        <React.Fragment key={id}>
          {/* top line */}
          <line stroke="black" x1={x1} y1={y1} x2={x2} y2={y2} onClick={onMouseDown} onMouseMove={onMouseMove}/>

          {/* fill */}
          <path
            fill="#666"
            fillOpacity={0.5}
            d={`M${x1},${y1} L${x2},${y2} L${x2},${bottom} L${x1},${bottom}`}
            onClick={onMouseDown}
          />
          {/* right line */}
          <line stroke="black" x1={x2} y1={0} x2={x2} y2={bottom}  />
        </React.Fragment>
      ))}
    </>
  )
}
