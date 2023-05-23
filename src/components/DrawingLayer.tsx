import React, { ReactEventHandler, useCallback, useState } from 'react'
import { ScaleLinear } from 'd3'
import clamp from 'lodash/clamp'
import { useMousePosition } from '../hooks/useMousePosition'
import { margin, innerHeight as bottom, innerWidth } from '../spacing'
import { ValueBubble } from './Value'
import { ValueBrackets } from './Bracket/ValueBrackets'
import { Segment } from '../types'
import { Segments } from './Segments'

// ids starting at 0. Increment every time you use one.
let id = 0

interface DrawingLayerProps {
  yScale: ScaleLinear<number, number, never>
}

export const DrawingLayer = ({ yScale }: DrawingLayerProps) => {
  const [segments, setSegments] = useState<Segment[]>([])
  const [isDrawing, setIsDrawing] = useState(true)
  const lastSegment = segments[segments.length - 1] ?? {
    x1: 0,
    y1: bottom,
    x2: 0,
    y2: bottom,
    id: 0,
  }
  let { x1: _prevX, y1: _prevY, x2: leftX, y2: leftY } = lastSegment

  const sloped = false // whether lines must be flat or can be angled

  const { x, y, bind } = useMousePosition()
  // annoyingly, need to compensate for graph margins when calculating mouse coordinates
  let mouseX = Math.max(x - margin.left, leftX)
  const mouseY = y - margin.top
  // set upper left point of shape to be same as mouse Y when drawing rectangles
  leftY = sloped ? leftY : mouseY

  // Snap to end if mouse within 10 pixels
  if (mouseX + 10 > innerWidth) {
    mouseX = innerWidth
  }

  const onClick = useCallback(() => {
    // segment has width
    if (leftX !== mouseX) {
      setSegments([
        ...segments,
        { x1: leftX, y1: leftY, x2: mouseX, y2: mouseY, id: ++id },
      ])
    }
    // this is the final segment
    if (mouseX === innerWidth) {
      setIsDrawing(false)
    }
  }, [segments, setSegments, mouseX, mouseY, leftX, leftY])

  const setSegmentLength = useCallback(
    (id: number, newWidth: number) => {
      let delta: number | null = null

      const newSegments = segments.map((seg) => {
        if (seg.id === id) {
          const endpoint = seg.x1 + newWidth
          delta = endpoint - seg.x2
          if (newWidth <= 0) {
            return null
          }
          // alter width of changed segment
          return { ...seg, x2: endpoint }
        }
        if (delta !== null) {
          const newX1 = seg.x1 + delta
          const newX2 = seg.x2 + delta
          // alter position of all segments after altered one
          if(newX1 >= 1000) {
            // segment has gone off the end so omit it
            return null
          }
          // cut endpoint to 100 so nothing goes off end
          return { ...seg, x1: newX1, x2: clamp(newX2, 1000) }
        }
        return seg
      })
      
      // filter out nulls and set segments to new values
      setSegments(newSegments.filter(_ => _))
    },
    [segments, setSegments]
  )

  return (
    <g>
      <text>{'debug: ' + mouseX + ' ' + mouseY}</text>

      <Segments segments={segments}/>

      {/* current segment */}
      {isDrawing && (
        <line x1={leftX} y1={leftY} x2={mouseX} y2={mouseY} stroke="black" />
      )}

      {/* fill for current segment  */}
      {isDrawing && (
        <path
          fill="#666"
          fillOpacity={0.5}
          d={`M ${leftX},${leftY} L${mouseX},${mouseY} L${mouseX},${bottom} L${leftX},${bottom}`}
        />
      )}

      {/* bubbles displaying values. Must be last to be on top */}
      {segments.map(({ x1, y1, x2, y2 }) => (
        <ValueBubble x={x2} y={y2} value={y2} yScale={yScale} key={x2} />
      ))}
      {isDrawing && (
        <ValueBubble x={mouseX} y={mouseY} value={mouseY} yScale={yScale} />
      )}

      <ValueBrackets segments={segments} setSegmentLength={setSegmentLength} />

      {/* invisible bounding box for capturing mouse x and y
          must be last so it's on top of everything */}
      <rect
        fill="transparent"
        {...bind}
        onClick={onClick}
        height={bottom}
        width={innerWidth + 10}
      ></rect>
    </g>
  )
}
