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
import { ResizeHandles } from './ResizeHandles'

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
  const [yMovingId, setYMovingId] = useState<number | null>(null)
  const [xMovingId, setXMovingId] = useState<number | null>(null)

  const { xScale, yScale, currentAgent } = useContext(GraphContext)
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
  let { x2: leftX } = lastDrawnSegment
  const isDrawing = !isDrawingComplete(segments)

  let xPos = clamp(mouseX, 0, innerWidth)
  let yPos = clamp(mouseY, 0, innerHeight)

  // The mouse event handlers rely too much on mouse movements for `useCallback` to be a performance boost.
  const onMouseMove = (event: React.MouseEvent) => {
    setMouseX(event.nativeEvent.offsetX - margin.left)
    setMouseY(event.nativeEvent.offsetY - margin.top)
  }

  const onMouseUp = () => {
    let segs = segments
    if (yMovingId) {
      segs = changeSegmentValue(segs, yMovingId, yScale, yPos)
      setYMovingId(null)
    }
    if (xMovingId) {
      segs = changeSegmentWidth(segs, xMovingId, xScale, xPos, cakeSize)
      setXMovingId(null)
    }
    setSegments(segs)
  }

  const onClick = () => {
    if (isDrawing && xPos > leftX) {
      setSegments([
        ...segments,
        convertFromPixels({
          x1: leftX,
          y1: yPos,
          x2: xPos,
          y2: yPos,
          id: ++id,
        }),
      ])
    }
  }

  const setSegmentWidth = useCallback(
    (id: number, newEnd: number) => {
      setSegments(changeSegmentWidthNumerically(segments, id, newEnd, cakeSize))
    },
    [segments, setSegments]
  )

  // We can't call `setSegments` on every mouse move because it would cause a circular dependency
  // so when the user is draging to change a segments width/value,
  // we display a different visual than the `segment` state.
  let movableSegs = [...segments]

  movableSegs = yMovingId
    ? changeSegmentValue(segments, yMovingId, yScale, yPos)
    : movableSegs

  movableSegs = xMovingId
    ? changeSegmentWidth(segments, xMovingId, xScale, xPos, cakeSize)
    : movableSegs

  // Add the segment currently being drawn to display data
  // but only if the user is in drawing mode and mouse is in "drawing territory"
  if (isDrawing && xPos > leftX) {
    movableSegs.push(
      convertFromPixels({
        id: id + 1,
        x1: leftX,
        y1: yPos,
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

            <ResizeHandles segments={pixelSegs} setXMovingId={setXMovingId} xMovingId={xMovingId} />

            {/* bubbles displaying values. Must be after other items to display on top */}
            <ValueBubbles
              segments={pixelSegs}
              editable={true}
              setMovingId={setYMovingId}
            />
          </g>
        </svg>
      </div>

      <EditableValueBrackets
        segments={movableSegs}
        setSegmentWidth={setSegmentWidth}
      />
    </>
  )
}



const changeSegmentValue = (
  segments: Segment[],
  id: number,
  yScale: ScaleLinear<number, number, never>,
  yPos: number
) => {
  const newYValue = roundValue(yScale.invert(yPos))
  return segments.map((seg) => {
    if (seg.id === id) {
      return { ...seg, startValue: newYValue, endValue: newYValue }
    }
    return seg
  })
}

const changeSegmentWidth = (
  segments: Segment[],
  id: number,
  xScale: ScaleLinear<number, number, never>,
  xPos: number,
  cakeSize: number
) => {
  const changingSeg = segments.find(seg => seg.id === id)
  const constrainedXValue = Math.max(xScale.invert(xPos), changingSeg.start)
  const newEndpoint = Math.round(constrainedXValue)
  return changeSegmentWidthNumerically(
    segments,
    id,
    newEndpoint,
    cakeSize
  )
}
const changeSegmentWidthNumerically = (
  segments: Segment[],
  id: number,
  newEnd: number,
  cakeSize: number
) => {
  const changedIndex = segments.findIndex(seg => seg.id === id)
  const newSegs = segments.map((seg, i) => {
    // set the new end value for changed segment
    const end = i === changedIndex ? Math.min(newEnd, cakeSize) : seg.end
    
    let start = seg.start
    if(i - 1 === changedIndex && seg.start !== newEnd) {
      // force the segment after the changed one to expand or shrink
      start = newEnd
    } else 
    if (i > changedIndex && seg.start < newEnd) {
      // force segments beyond that to shrink
      start = newEnd
    }
    return { ...seg, end, start }
  })
  // filter out empty segs
  return newSegs.filter((seg) => seg.start < seg.end)
}
