import React, { ReactEventHandler, useCallback, useState } from 'react'
import { useMousePosition } from '../hooks/useMousePosition'
import { margin, innerHeight as bottom, innerWidth } from '../spacing'
import { ValueBubble } from './Value'
import { ValueBrackets } from './Bracket/ValueBrackets'
import { Segment, DrawnSegment } from '../types'
import { Segments } from './Segments'
import {
  useConvertSegToPixels,
  useConvertSegFromPixels,
} from '../utils/graphUtils'

// ids starting at 0. Increment every time you use one.
let id = 0

interface DrawingLayerProps {}

export const DrawingLayer = ({}: DrawingLayerProps) => {
  const convertToPixels = useConvertSegToPixels()
  const convertFromPixels = useConvertSegFromPixels()

  const [segments, setSegments] = useState<Segment[]>([])
  const [isDrawing, setIsDrawing] = useState(true)

  const lastDrawnSegment = convertToPixels(
    segments[segments.length - 1] ?? {
      x1: 0,
      y1: 0,
      x2: 0,
      y2: 0,
      id: 0,
      type: 'value',
    }
  )
  let { x2: leftX, y2: leftY } = lastDrawnSegment

  const sloped = false // whether lines must be flat or can be angled

  // Annoyingly, need to compensate for graph margins when calculating mouse coordinates.
  const { x, y, bind } = useMousePosition()
  // Don't let mouseX go more left than previous line
  let mouseX = Math.max(x - margin.left, leftX)
  // Snap to end if mouse within 10 pixels
  if (mouseX + 10 > innerWidth) {
    mouseX = innerWidth
  }
  const mouseY = y - margin.top
  // set upper left point of shape to be same as mouse Y when drawing rectangles
  leftY = sloped ? leftY : mouseY

  const onClick = useCallback(() => {
    // segment has non-zero width
    if (leftX !== mouseX) {
      setSegments([
        ...segments,
        convertFromPixels({
          x1: leftX,
          y1: leftY,
          x2: mouseX,
          y2: mouseY,
          id: ++id,
          type: 'drawn',
        }),
      ])
    }
    // this is the final segment
    if (mouseX === innerWidth) {
      setIsDrawing(false)
    }
  }, [segments, setSegments, mouseX, mouseY, leftX, leftY, convertFromPixels])

  const setSegmentLength = useCallback(
    (id: number, newWidth: number) => {
      let delta: number | null = null

      const newSegments = segments.map((seg) => {
        if (seg.id === id) {
          // don't allow endpoint to go over 100
          const endpoint = Math.min(seg.x1 + newWidth, 100)
          delta = endpoint - seg.x2
          if (newWidth <= 0) {
            return null
          }
          // alter width of changed segment
          return { ...seg, x2: endpoint }
        }
        if (delta !== null) {
          const newX1 = seg.x1 + delta
          const newX2 = Math.min(seg.x2 + delta, 100)
          // alter position of all segments after changed one
          if (newX1 >= 100) {
            // segment has gone off the end so omit it
            return null
          }
          // cut endpoint to 100 so nothing goes off end
          return { ...seg, x1: newX1, x2: newX2 }
        }
        return seg
      })

      // filter out nulls and set segments to new values
      setSegments(newSegments.filter((_) => _))
    },
    [segments, setSegments]
  )

  const pixelSegmentsWithCurrent: DrawnSegment[] = [...segments].map(
    convertToPixels
  )

  if (isDrawing) {
    // the segment we are currently drawing
    pixelSegmentsWithCurrent.push({
      id: id + 1,
      x1: leftX,
      y1: leftY,
      x2: mouseX,
      y2: mouseY,
      type: 'drawn',
    })
  }

  return (
    <g>
      <text>{'debug: ' + mouseX + ' ' + mouseY}</text>

      <Segments segments={pixelSegmentsWithCurrent} />

      {/* bubbles displaying values. Must be after other items to display on top */}
      {pixelSegmentsWithCurrent.map(({ x2, y2, id }) => (
        <ValueBubble x={x2} y={y2} value={y2} key={id} />
      ))}
      {/* {isDrawing && <ValueBubble x={mouseX} y={mouseY} value={mouseY} />} */}

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
