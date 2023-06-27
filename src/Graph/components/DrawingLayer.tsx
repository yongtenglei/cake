import React, { useContext, useCallback, useState, useEffect } from 'react'
import clamp from 'lodash.clamp'
import { ScaleLinear } from 'd3'
import {
  height,
  width,
  margin,
  innerHeight,
  innerWidth,
  getAgentColor,
  defaultCakeSize,
} from '../constants'
import { GraphContext } from '../GraphContext'
import { ValueBubbles } from './Value'
import { AxisLeft, AxisBottom } from './Axes'
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

const changeMovingSegmentValue = (
  segments: Segment[],
  movingId: number,
  yScale: ScaleLinear<number, number, never>,
  yPos: number
) => {
  const newYValue = roundValue(yScale.invert(yPos))
  return segments.map((seg) => {
    if (seg.id === movingId) {
      return { ...seg, startValue: newYValue, endValue: newYValue }
    }
    return seg
  })
}

export const DrawingLayer = ({ segments, setSegments }: DrawingLayerProps) => {
  const convertToPixels = useConvertSegToPixels()
  const convertFromPixels = useConvertSegFromPixels()
  const [mouseX, setMouseX] = useState(0)
  const [mouseY, setMouseY] = useState(0)
  const { yScale, currentAgent } = useContext(GraphContext)
  const cakeSize = defaultCakeSize

  const lastDrawnSegment = convertToPixels(
    segments[segments.length - 1] ?? {
      start: 0,
      startValue: 0,
      end: 0,
      endValue: 0,
      id: 0,
    }
  )
  let { x2: leftX, y2: leftY } = lastDrawnSegment
  const isDrawing = !isDrawingComplete(segments)

  const sloped = false // flat (piecewise constant) or sloped (piecewise linear)

  let xPos = clamp(mouseX, innerWidth)
  let yPos = clamp(mouseY, 0, innerHeight)
  // set upper left point of shape to be same as mouse Y when drawing rectangles
  leftY = sloped ? leftY : yPos

  const [movingId, setMovingId] = useState<number | null>(null)

  // The mouse event handlers rely too much on mouse movements for `useCallback` to be a performance boost.
  const onMouseMove = (event: React.MouseEvent) => {
    setMouseX(event.nativeEvent.offsetX - margin.left)
    setMouseY(event.nativeEvent.offsetY - margin.top)
  }

  const onMouseUp = () => {
    const segs = changeMovingSegmentValue(segments, movingId, yScale, yPos)
    setSegments(segs)
    setMovingId(null)
  }

  const onClick = () => {
    if (isDrawing && xPos > leftX) {
      setSegments([
        ...segments,
        convertFromPixels({
          x1: leftX,
          y1: leftY,
          x2: xPos,
          y2: yPos,
          id: ++id,
        }),
      ])
    }
  }

  const setSegmentLength = useCallback(
    (id: number, newWidth: number) => {
      let previousEndpoint = 0
      const newSegs = segments.map((seg) => {
        // force the segment following the changed one to expand or shrink
        if (seg.start !== previousEndpoint) {
          seg.start = previousEndpoint
        }
        // set the new end value for changed segment
        const end =
          seg.id === id ? Math.min(seg.start + newWidth, cakeSize) : seg.end

        previousEndpoint = end
        return { ...seg, end }
      })
      // filter out empty segs
      setSegments(newSegs.filter((seg) => seg.start < seg.end))
    },
    [segments, setSegments]
  )

  // We can't call `setSegments` on every mouse move because it would cause a circular dependency
  // so when the user is changing a segments values, we display a different visual than the `segment` state.
  const movableSegs = movingId
    ? changeMovingSegmentValue(segments, movingId, yScale, yPos)
    : [...segments]

  // Add the segment currently being drawn to display data 
  // but only if the user is in drawing mode and mouse is in "drawing territory"
  if (isDrawing && xPos > leftX) {
    movableSegs.push(
      convertFromPixels({
        id: id + 1,
        x1: leftX,
        y1: leftY,
        x2: xPos,
        y2: yPos,
      })
    )
  }
  const pixelSegs: DrawnSegment[] = movableSegs.map(convertToPixels)

  return (
    <>
      {/* HTML container listens for events at top level. This is *much* harder with pure SVG. */}
      <div onMouseMove={onMouseMove} onClick={onClick} onMouseUp={onMouseUp}>
        <svg width={width} height={height}>
          <g transform={`translate(${margin.left},${margin.top})`}>
            <AxisBottom />
            <AxisLeft />

            <Segments
              segments={pixelSegs}
              color={getAgentColor(currentAgent)}
            />

            {/* bubbles displaying values. Must be after other items to display on top */}
            <ValueBubbles
              segments={pixelSegs}
              editable={true}
              setMovingId={setMovingId}
            />
          </g>
        </svg>
      </div>

      <EditableValueBrackets
        segments={movableSegs}
        setSegmentLength={setSegmentLength}
      />
    </>
  )
}
