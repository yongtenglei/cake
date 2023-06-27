import React, { useContext, useCallback, useState, useEffect } from 'react'
import clamp from 'lodash.clamp'
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

export const DrawingLayer = ({ segments, setSegments }: DrawingLayerProps) => {
  const convertToPixels = useConvertSegToPixels()
  const convertFromPixels = useConvertSegFromPixels()
  const [mouseX, setMouseX] = useState(0)
  const [mouseY, setMouseY] = useState(0)
  const { yScale, currentAgent } = useContext(GraphContext)
  const cakeSize = defaultCakeSize

  const onMouseMove = useCallback(
    (event: React.MouseEvent) => {
      // add a check here for out of bounds?
      // we get weird numbers when mousing down over the buttons
      setMouseX(event.nativeEvent.offsetX - margin.left)
      setMouseY(event.nativeEvent.offsetY - margin.top)
    },
    [setMouseX, setMouseY]
  )

  const onMouseUp = useCallback(() => {
    // setSegments()
    setMovingId(null)
  }, [])

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

  const sloped = false // whether lines must be flat or can be angled

  let xPos = clamp(mouseX, innerWidth)
  // don't need this snapping with current resolution, but could be useful later?
  // // Snap to end if mouse within 10 pixels
  // if (xPos + 10 > innerWidth) {
  //   xPos = innerWidth
  // }
  let yPos = clamp(mouseY, 0, innerHeight)
  // set upper left point of shape to be same as mouse Y when drawing rectangles
  leftY = sloped ? leftY : yPos

  const [movingId, setMovingId] = useState<number | null>(null)

  const onClick = useCallback(() => {
    if (isDrawing && xPos > leftX) {
      // segment has non-zero width
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
  }, [
    segments,
    setSegments,
    xPos,
    yPos,
    leftX,
    leftY,
    convertFromPixels,
    isDrawing,
  ])

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

  let movableSegs = [...segments]
  if (movingId) {
    // user is currently adjusting the value of a segment
    const newYValue = roundValue(yScale.invert(yPos))
    movableSegs = segments.map((seg) => {
      if (seg.id === movingId) {
        return { ...seg, startValue: newYValue, endValue: newYValue }
      }
      return seg
    })
  }

  // only show the segment currently being drawn
  // if in drawing mode and mouse is in undrawn territory
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
      {/* HTML container listens for events at top level.
          This is *much* harder with pure SVG. */}
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
