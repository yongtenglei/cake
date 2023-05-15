import React, { ReactEventHandler, useCallback, useState } from 'react'
import { line, path, min, max } from 'd3'
import { useMousePosition } from '../hooks/useMousePosition'
import { margin, innerHeight as bottom, innerWidth } from '../spacing'

// a segment is defined by the upper left and upper right corners
// [x1, y1, x2, y2]
type Segment = [number, number, number, number]

/**
 *
 */
export const DrawingLayer = () => {
  const [segments, setSegments] = useState<Segment[]>([])
  const lastSegment = segments[segments.length - 1] ?? [0, bottom, 0, bottom]
  let [_prevX, _prevY, leftX, leftY] = lastSegment
  
  const sloped = false // whether lines must be flat or can be angled
  
  const { x, y, bind } = useMousePosition()
  // annoyingly, need to compensate for graph margins when calculating mouse coordinates
  const mouseX = max([x - margin.left, leftX])
  const mouseY = y - margin.top
  // set upper left point of shape to be same as mouse Y when drawing rectangles
  leftY = sloped ? leftY : mouseY 

  const onClick: React.MouseEventHandler = useCallback(() => {
    setSegments([...segments, [leftX, leftY, mouseX, mouseY]])
  }, [segments, setSegments, mouseX, mouseY, leftX, leftY])

  return (
    <g>
      <text>{'debug: ' + mouseX + ' ' + mouseY}</text>

      {segments.map(([x1, y1, x2, y2]) => (
        <>
          {/* top line for previous segments */}
          <line stroke="black" x1={x1} y1={y1} x2={x2} y2={y2} />

          {/* fill for previous segments */}
          <path
            fill="#666"
            fillOpacity={0.5}
            d={`M${x1},${y1} L${x2},${y2} L${x2},${bottom} L${x1},${bottom}`}
          />
        </>
      ))}

      {/* current segment */}
      <line
        x1={leftX}
        y1={leftY}
        x2={mouseX}
        y2={mouseY}
        stroke="black"
      />
      {/* fill for current segment  */}
      <path
        fill="#666"
        fillOpacity={0.5}
        d={`M ${leftX},${leftY} L${mouseX},${mouseY} L${xPos},${bottom} L${leftX},${bottom}`}
      />

      {/* invisible bounding box for mouse x,y coordinate capture */}
      <rect
        fill="transparent"
        {...bind}
        onClick={onClick}
        height={bottom}
        width={innerWidth}
      ></rect>
    </g>
  )
}
