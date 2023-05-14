import React, { ReactEventHandler, useCallback, useState } from 'react'
import { line, path } from 'd3'
import { useMousePosition } from '../hooks/useMousePosition'
import { margin, innerHeight, innerWidth } from '../spacing'

/**
 * 
 */
export const DrawingLayer = () => {
  const [lineCoords, setLineCoords] = useState<[number, number][]>([])
  const { x, y, bind } = useMousePosition()
  const xPos = x - margin.left
  const yPos = y - margin.top

  const onClick: React.MouseEventHandler = useCallback((e) => {
    setLineCoords([...lineCoords, [e.clientX - margin.left, e.clientY - margin.top]])
  }, [lineCoords, setLineCoords])

  const lastCoords = lineCoords[lineCoords.length-1] ?? [0, innerHeight]
  // M = move, L = draw line
  const drawnLine = [`M 0,${innerHeight}`, ...lineCoords.map(([x,y]) => `L ${x},${y}`)].join( ' ')
  const shading = drawnLine + ` L ${lastCoords[0]},${innerHeight}`
  
  return (
    <g>
      <text>{'debug: ' + xPos + ' ' + yPos}</text>
      {/* currently drawing line segment */}
      <line x1={lastCoords[0]} x2={xPos} y1={lastCoords[1]} y2={yPos} stroke="black" />
      
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
