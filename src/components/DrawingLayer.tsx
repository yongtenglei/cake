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
  const [lastX1, lastY1, lastX2, lastY2] = segments[segments.length - 1] ?? [
    0,
    bottom,
    0,
    bottom,
  ]
  const { x, y, bind } = useMousePosition()

  const sloped = false // whether lines must be flat or can be angled
  const xPos = max([x - margin.left, lastX2])
  const yPos = y - margin.top

  const onClick: React.MouseEventHandler = useCallback(() => {
    if (sloped) {
      setSegments([...segments, [lastX2, lastY2, xPos, yPos]])
    } else {
      setSegments([...segments, [lastX2, yPos, xPos, yPos]])
    }
  }, [segments, setSegments, xPos, yPos, sloped])

  return (
    <g>
      <text>{'debug: ' + xPos + ' ' + yPos}</text>

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
        x1={lastX2}
        y1={sloped ? lastY2 : yPos}
        x2={xPos}
        y2={yPos}
        stroke="black"
      />
      {/* fill for current segment  */}
      <path
        fill="#666"
        fillOpacity={0.5}
        d={`M ${lastX2},${
          sloped ? lastY2 : yPos
        } L${xPos},${yPos} L${xPos},${bottom} L${lastX2},${bottom}`}
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
