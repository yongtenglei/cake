import React, { useContext, useCallback, useState, useEffect } from 'react'
import clamp from 'lodash.clamp'
import { height, width, margin, innerHeight, innerWidth, getAgentColor } from '../constants'
import { GraphContext } from '../GraphContext'
import { ValueBubbles } from './Value'
import { AxisLeft, AxisBottom } from './Axes/Axes'
import { EditableValueBrackets } from './Bracket/ValueBrackets'
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

export const DrawingLayer = ({ segments, setSegments }: DrawingLayerProps) => {
  const convertToPixels = useConvertSegToPixels()
  const convertFromPixels = useConvertSegFromPixels()
  const [mouseX, setMouseX] = useState(0)
  const [mouseY, setMouseY] = useState(0)
  const { yScale, currentAgent } = useContext(GraphContext)
  
  const onMouseMove = useCallback(
    (event: React.MouseEvent) => {
      // add a check here for out of bounds?
      // we get weird numbers when mousing down over the buttons
      setMouseX(event.nativeEvent.offsetX - margin.left)
      setMouseY(event.nativeEvent.offsetY - margin.top)
    },
    [setMouseX, setMouseY]
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
  }, [yPos, movingId, setSegments, segments])

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
      const changedSeg = segments.find(_ => _.id === id)
      changedSeg.x2 = changedSeg.x1 + newWidth

      let lastEndpoint = 0
      const newSegs = segments.map((seg) => {
        // force following segment(s) to expand so there's no gaps
        if(seg.x1 !== lastEndpoint) {
          seg.x1 = lastEndpoint
        }
        // segment has no width, delete
        if(seg.x1 >= seg.x2) {
          return null
        }
        lastEndpoint = seg.x2
        return {...seg}
      })
      // filter out nulls and set segments to new values
      setSegments(newSegs.filter(_ => _))
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

          <Segments segments={pixelSegmentsWithCurrent} color={getAgentColor(currentAgent)} />

          {/* bubbles displaying values. Must be after other items to display on top */}
          <ValueBubbles
            segments={pixelSegmentsWithCurrent}
            editable={true}
            setMovingId={setMovingId}
          />

          <EditableValueBrackets
            segments={segmentsWithCurrent}
            setSegmentLength={setSegmentLength}
          />
        </g>
      </svg>
    </div>
  )
}
