import React, { ReactEventHandler, useCallback, useState } from 'react'
import { line, path, min, max } from 'd3'
import { useMousePosition } from '../hooks/useMousePosition'
import { margin, innerHeight, innerWidth } from '../spacing'

/**
 *
 */
export const DrawingLayer = () => {
  const [lineCoords, setLineCoords] = useState<[number, number][]>([])
  const [lastX, lastY] = lineCoords[lineCoords.length - 1] ?? [0, innerHeight]
  const { x, y, bind } = useMousePosition()

  const sloped = false
  const xPos = max([x - margin.left, lastX])
  const yPos = y - margin.top

  // M = move, L = draw line
  const drawnLine = [
    `M 0,${innerHeight}`,
    ...lineCoords.map(([x, y]) => `L ${x},${y}`),
  ].join(' ')

  const shading =
    drawnLine +
    (sloped ? '' : `M ${lastX},${yPos}`) +
    `L ${xPos},${yPos} L ${xPos},${innerHeight} L ${0},${innerHeight}`

  const onClick: React.MouseEventHandler = useCallback(() => {
    setLineCoords([...lineCoords, [xPos, yPos]])
  }, [lineCoords, setLineCoords, xPos, yPos])

  return (
    <g>
      <text>{'debug: ' + xPos + ' ' + yPos}</text>
      {/* currently drawing line segment */}
      {sloped ? (
        <line x1={lastX} y1={lastY} x2={xPos} y2={yPos} stroke="black" />
      ) : (
        <line x1={lastX} y1={yPos} x2={xPos} y2={yPos} stroke="black" />
      )}

      {/* drawn line segments */}
      <path stroke="black" fill="none" d={drawnLine} />

      {/* shading under the lines */}
      <path fill="#666" fillOpacity={0.5} d={shading} />

      {/* invisible bounding box for mouse x,y coordinate capture */}
      <rect
        fill="transparent"
        {...bind}
        onClick={onClick}
        height={innerHeight}
        width={innerWidth}
      ></rect>
    </g>
  )
}
