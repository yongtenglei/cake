import React, { useContext, useCallback, useState, useEffect } from 'react'
import clamp from 'lodash.clamp'
import { margin, getInnerWidth, getInnerHeight, defaultCakeSize } from '../graphConstants'
import { getAgentColor } from '../../constants'
import { GraphContext } from '../GraphContext'
import { AxisLeft, AxisBottom } from './Axes'
import { EditableValueBrackets } from './Bracket/ValueBrackets'
import { Segment, DrawnSegment } from '../../types'
import { Segments } from './Segments'
import {
  useConvertSegToPixels,
  useConvertSegFromPixels,
  isDrawingComplete,
} from '../graphUtils'
import { HorizontalResizeHandles, VerticalResizeBubbles } from './ResizeHandles'
import {
  changeSegmentFlatValue,
  changeSegmentWidth,
  changeSegmentWidthNumerically,
  changeSegmentCornerValue,
  changeSegmentWithKeyboard,
} from './adjustSegments'

// Simple unique ids. Increment the number on each use.
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
  const [isMouseDown, setIsMouseDown] = useState(false)
  const [yMovingId, setYMovingId] = useState<number | null>(null)
  const [xMovingId, setXMovingId] = useState<number | null>(null)
  const [cornerMovingId, setCornerMovingId] = useState<[number, number] | null>(null)
  const { xScale, yScale, currentAgent, height, width } = useContext(GraphContext)

  const cakeSize = defaultCakeSize
  const isDrawing = !isDrawingComplete(segments)

  const lastDrawnSegment = convertToPixels(
    segments[segments.length - 1] ?? {
      start: 0,
      startValue: 0,
      end: 0,
      endValue: 0,
      id: 0,
    }
  )
  const lastSegmentEnd = lastDrawnSegment.x2

  // The event handlers rely too much on mouse movements for `useCallback` to be a performance boost.
  const onMouseMove = (event: React.MouseEvent) => {
    const x = event.nativeEvent.offsetX - margin.left
    const y = event.nativeEvent.offsetY - margin.top
    const constrainedX = clamp(x, 0, getInnerWidth(width))
    const constrainedY = clamp(y, 0, getInnerHeight(height))
    setMouseX(constrainedX)
    setMouseY(constrainedY)

    // putting this in a `useEffect` greatly complicates things, best to keep it here.
    if (isMouseDown) {
      let segsWithDrawing = [...segments]
      segsWithDrawing = yMovingId
        ? changeSegmentFlatValue(segsWithDrawing, yMovingId, yScale, constrainedY)
        : segsWithDrawing

      segsWithDrawing = xMovingId
        ? changeSegmentWidth(segsWithDrawing, xMovingId, xScale, constrainedX, cakeSize)
        : segsWithDrawing

      segsWithDrawing = cornerMovingId
        ? changeSegmentCornerValue(segsWithDrawing, cornerMovingId, yScale, constrainedY)
        : segsWithDrawing

      setSegments(segsWithDrawing)
    }
  }

  const onKeyUp = (event: React.KeyboardEvent<HTMLInputElement>) => {
    const segs = changeSegmentWithKeyboard(
      event,
      segments,
      xMovingId,
      yMovingId,
      cornerMovingId,
      cakeSize
    )
    if (segs) {
      setSegments(segs)
    }
  }

  const onBlur = () => {
    setYMovingId(null)
    setXMovingId(null)
    setCornerMovingId(null)
  }

  // keeping track of mouse down/up helps mouse and keyboard play nice with each other
  const onMouseDown = () => setIsMouseDown(true)

  const onClick = () => {
    setIsMouseDown(false)
    if (isDrawing && mouseX > lastSegmentEnd) {
      const newSegment = {
        x1: lastSegmentEnd,
        y1: mouseY,
        x2: mouseX,
        y2: mouseY,
        id: ++id,
      }
      setSegments([...segments, convertFromPixels(newSegment)])
    }
  }

  const setSegmentWidth = (id: number, newEnd: number) => {
    setSegments(changeSegmentWidthNumerically(segments, id, newEnd, cakeSize))
  }

  let segsWithDrawing = [...segments]
  // Add the segment currently being drawn to the display data
  // but only if the user is in drawing mode and mouse is in undrawn territory
  if (isDrawing && mouseX > lastSegmentEnd) {
    segsWithDrawing.push(
      convertFromPixels({
        id: id + 1,
        x1: lastSegmentEnd,
        y1: mouseY,
        x2: mouseX,
        y2: mouseY,
      })
    )
  }
  const pixelSegs: DrawnSegment[] = segsWithDrawing.map(convertToPixels)

  return (
    <>
      {/* HTML container listens for events at top level. This is *much* harder with pure SVG. */}
      <div
        onMouseMove={onMouseMove}
        onMouseDown={onMouseDown}
        onClick={onClick}
        onKeyUp={onKeyUp}
        onBlur={onBlur}
      >
        <svg width={width} height={height}>
          <g transform={`translate(${margin.left},${margin.top})`}>
            <AxisBottom />
            <AxisLeft />

            <Segments segments={pixelSegs} color={getAgentColor(currentAgent)} />

            <HorizontalResizeHandles
              segments={pixelSegs}
              setXMovingId={setXMovingId}
              isDrawing={isDrawing}
            />

            <VerticalResizeBubbles
              segments={pixelSegs}
              setCornerMovingId={setCornerMovingId}
              setYMovingId={setYMovingId}
              isDrawing={isDrawing}
            />
          </g>
        </svg>
      </div>

      {/* <EditableValueBrackets
        segments={segsWithDrawing}
        setSegmentWidth={setSegmentWidth}
      /> */}
    </>
  )
}
