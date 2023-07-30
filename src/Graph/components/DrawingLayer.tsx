import clamp from 'lodash.clamp'
import React, { useContext, useState } from 'react'
import { getAgentColor } from '../../colors'
import { DrawnSegment, Segment } from '../../types'
import { GraphContext } from '../GraphContext'
import { getInnerHeight, getInnerWidth, margin } from '../graphConstants'
import { useConvertSegFromPixels, useConvertSegToPixels } from '../graphUtils'
import { AxisBottom, AxisLeft } from './Axes'
import { HorizontalResizeHandles, VerticalResizeBubbles } from './ResizeHandles'
import { SectionLabels } from './SectionLabels'
import { Segments } from './Segments'
import {
  changeSegmentCornerValue,
  changeSegmentFlatValue,
  changeSegmentWidth,
  changeSegmentWithKeyboard,
} from './adjustSegments'

// Simple unique ids. Increment the number on each use.
let id = 0

interface DrawingLayerProps {
  segments: Segment[]
  setSegments: (segment: Segment[]) => void
  currentAgent: number
  isComplete: boolean
}

export const DrawingLayer = ({
  segments,
  setSegments,
  currentAgent,
  isComplete,
}: DrawingLayerProps) => {
  const convertToPixels = useConvertSegToPixels()
  const convertFromPixels = useConvertSegFromPixels()
  const [mouseX, setMouseX] = useState(0)
  const [mouseY, setMouseY] = useState(0)
  const [isMouseDown, setIsMouseDown] = useState(false)
  const [yMovingId, setYMovingId] = useState<number | null>(null)
  const [xMovingId, setXMovingId] = useState<number | null>(null)
  const [cornerMovingId, setCornerMovingId] = useState<[number, number] | null>(null)
  const { xScale, yScale, height, width, cakeSize } = useContext(GraphContext)

  const isDrawing = !isComplete

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

  const onKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
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

  let segsWithDrawing = [...segments]

  const pixelSegs: DrawnSegment[] = segsWithDrawing.map(convertToPixels)
  // Add the segment currently being drawn to the display data
  // but only if the user is in drawing mode and mouse is in undrawn territory
  if (isDrawing && mouseX > lastSegmentEnd) {
    // convert back and forth to get proper rounding
    const drawnSeg = convertToPixels(
      convertFromPixels({
        id: id + 1,
        x1: lastSegmentEnd,
        x2: mouseX,
        y1: mouseY,
        y2: mouseY,
      })
    )
    drawnSeg.currentlyDrawing = true
    pixelSegs.push(drawnSeg)
  }

  return (
    <>
      {/* HTML container listens for events at top level. This is *much* harder with pure SVG. */}
      <div
        onMouseMove={onMouseMove}
        onMouseDown={onMouseDown}
        onClick={onClick}
        onKeyDown={onKeyDown}
        onBlur={onBlur}
      >
        <svg width={width} height={height}>
          <g transform={`translate(${margin.left},${margin.top})`}>
            <SectionLabels />
            <AxisBottom />
            <AxisLeft />

            <Segments
              segments={pixelSegs}
              color={getAgentColor(currentAgent)}
              showWidth={cakeSize > 10}
            />

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
    </>
  )
}
