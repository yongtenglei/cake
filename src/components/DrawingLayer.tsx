import React, { useContext, useCallback, useState, useMemo } from 'react'
import { useMousePosition } from '../hooks/useMousePosition'
import { height, width, margin, innerHeight, innerWidth } from '../spacing'
import { GraphContext } from '../GraphContext'
import { ValueBubbles } from './Value'
import { AxisLeft, AxisBottom } from './Axes'
import { ValueBrackets } from './Bracket/ValueBrackets'
import { Segment, DrawnSegment } from '../types'
import { Segments } from './Segments'
import {
  useConvertSegToPixels,
  useConvertSegFromPixels,
  roundValue,
} from '../utils/graphUtils'

// ids starting at 0. Increment every time you use one.
let id = 0

export const DrawingLayer = () => {
  const convertToPixels = useConvertSegToPixels()
  const convertFromPixels = useConvertSegFromPixels()
  const { yScale } = useContext(GraphContext)

  const [segments, setSegments] = useState<Segment[]>([])
  const [isDrawing, setIsDrawing] = useState(true)

  const [movingId, setMovingId] = useState<number | null>(null)
  const [mouseX, setMouseX] = useState(0)
  const [mouseY, setMouseY] = useState(0)
  const onMouseMove = useCallback((event: React.MouseEvent) => {
    const x = event.clientX - margin.left
    const y = event.clientY - margin.top
    setMouseX(x)
    setMouseY(y)
    if(movingId) {
      const newValue = roundValue(yScale.invert(y))
      const newSegments = segments.map((seg) => {
        if (seg.id === movingId) {
          return { ...seg, y1: newValue, y2: newValue }
        }
        return seg
      })
      setSegments(newSegments)
    }
  }, [setMouseX, setMouseY, setSegments, yScale, segments, movingId])

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

  // Don't let mouseX go more left than previous line
  let constrainedMouseX = Math.max(mouseX, leftX)
  // Snap to end if mouse within 10 pixels
  if (constrainedMouseX + 10 > innerWidth) {
    constrainedMouseX = innerWidth
  }
  // set upper left point of shape to be same as mouse Y when drawing rectangles
  leftY = sloped ? leftY : mouseY

  const onClick = useCallback(() => {
    // segment has non-zero width
    if (leftX !== constrainedMouseX) {
      setSegments([
        ...segments,
        convertFromPixels({
          x1: leftX,
          y1: leftY,
          x2: constrainedMouseX,
          y2: mouseY,
          id: ++id,
          type: 'drawn',
        }),
      ])
    }
    // this is the final segment
    if (constrainedMouseX === innerWidth) {
      setIsDrawing(false)
    }
  }, [segments, setSegments, constrainedMouseX, mouseY, leftX, leftY, convertFromPixels])

  const setSegmentLength = useCallback(
    (id: number, newWidth: number) => {
      let delta: number | null = null

      const newSegments = segments.map((seg) => {
        if (seg.id === id) {
          // don't allow endpoint to go over 100
          const endpoint = Math.min(seg.x1 + newWidth, 100)
          delta = endpoint - seg.x2
          if (newWidth < 0) {
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

  const segmentsWithCurrent: Segment[] = [...segments]
  if (isDrawing) {
    segmentsWithCurrent.push(
      convertFromPixels({
        id: id + 1,
        x1: leftX,
        y1: leftY,
        x2: constrainedMouseX,
        y2: mouseY,
        type: 'drawn',
      })
    )
  }
  const pixelSegmentsWithCurrent: DrawnSegment[] = [...segmentsWithCurrent].map(
    convertToPixels
  )

  return (
    // HTML container listens for events at top level.
    // This is much harder with pure SVG.
    <div onMouseMove={onMouseMove} onClick={onClick} onMouseUp={() => setMovingId(null)}>
      <svg width={width} height={height}>
        <g transform={`translate(${margin.left},${margin.top})`}>
          <AxisBottom />
          <AxisLeft />

          <Segments segments={pixelSegmentsWithCurrent} />

          {/* bubbles displaying values. Must be after other items to display on top */}
          <ValueBubbles
            segments={pixelSegmentsWithCurrent}
            editable={!isDrawing}
            setMovingId={(id) => setMovingId(id)}
          />

          <ValueBrackets
            segments={segmentsWithCurrent}
            setSegmentLength={setSegmentLength}
          />
          {/* invisible bounding box for capturing mouse x and y */}
        </g>
      </svg>
    </div>
  )
}
