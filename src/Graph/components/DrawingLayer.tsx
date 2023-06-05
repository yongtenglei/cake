import React, { useContext, useCallback, useState, useEffect } from 'react'
import clamp from 'lodash.clamp'
import { height, width, margin, innerHeight, innerWidth } from '../spacing'
import { GraphContext } from '../GraphContext'
import { ValueBubbles } from './Value'
import { AxisLeft, AxisBottom } from './Axes'
import { ValueBrackets } from './Bracket/ValueBrackets'
import { Segment, DrawnSegment } from '../../types'
import { Segments } from './Segments'
import {
  useConvertSegToPixels,
  useConvertSegFromPixels,
  roundValue,
  isDrawingComplete,
} from '../graphUtils'

// ids starting at 0. To make these unique, increment the number each time you use one.
let id = 0

interface DrawingLayerProps {
  segments: Segment[]
  setSegments: (segment: Segment[]) => void
}

export const DrawingLayer = ({segments, setSegments}) => {
  const convertToPixels = useConvertSegToPixels()
  const convertFromPixels = useConvertSegFromPixels()
  const { yScale } = useContext(GraphContext)

  const [mouseX, setMouseX] = useState(0)
  const [mouseY, setMouseY] = useState(0)
  const onMouseMove = useCallback(
    (event: React.MouseEvent) => {
      setMouseX(event.nativeEvent.offsetX - margin.left)
      setMouseY(event.nativeEvent.offsetY - margin.top)
    },
    [setMouseX, setMouseY, yScale]
  )

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
  const isDrawing = !isDrawingComplete(segments)

  const sloped = false // whether lines must be flat or can be angled

  // Don't let mouseX go more left than previous line
  let xPos = clamp(mouseX, leftX, innerWidth)
  let yPos = clamp(mouseY, 0, innerHeight)
  // Snap to end if mouse within 10 pixels
  if (xPos + 10 > innerWidth) {
    xPos = innerWidth
  }
  // set upper left point of shape to be same as mouse Y when drawing rectangles
  leftY = sloped ? leftY : yPos

  const [movingId, setMovingId] = useState<number | null>(null)
  useEffect(() => {
    if (movingId) {
      const newValue = roundValue(yScale.invert(yPos))
      const newSegments = segments.map((seg) => {
        if (seg.id === movingId) {
          return { ...seg, y1: newValue, y2: newValue }
        }
        return seg
      })
      setSegments(newSegments)
    }
  }, [yPos, movingId])

  const onClick = useCallback(() => {
    if (isDrawing && leftX !== xPos) {
      // segment has non-zero width
      setSegments([
        ...segments,
        convertFromPixels({
          x1: leftX,
          y1: leftY,
          x2: xPos,
          y2: yPos,
          id: ++id,
          type: 'drawn',
        }),
      ])
    }
  }, [segments, setSegments, xPos, yPos, leftX, leftY, convertFromPixels])

  const setSegmentLength = useCallback(
    (id: number, newWidth: number) => {
      let delta: number | null = null

      const newSegments = segments.map((seg) => {
        if (seg.id === id) {
          // this is the changed segment.

          // truncate anything outside the bounds of the graph
          const endpoint = Math.min(seg.x1 + newWidth, 100)
          delta = endpoint - seg.x2
          if (newWidth < 0) {
            return null
          }
          // alter width of changed segment
          return { ...seg, x2: endpoint }
        }
        if (delta !== null) {
          // if delta is not null, this segment is after the changed one
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
        x2: xPos,
        y2: yPos,
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
    <div
      onMouseMove={onMouseMove}
      onClick={onClick}
      onMouseUp={() => setMovingId(null)}
    >
      <svg width={width} height={height}>
        <g transform={`translate(${margin.left},${margin.top})`}>
          <AxisBottom />
          <AxisLeft />

          <Segments segments={pixelSegmentsWithCurrent} />

          {/* bubbles displaying values. Must be after other items to display on top */}
          <ValueBubbles
            segments={pixelSegmentsWithCurrent}
            editable={!isDrawing}
            setMovingId={setMovingId}
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
