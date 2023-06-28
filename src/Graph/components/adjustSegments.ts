import clamp from 'lodash.clamp'
import { ScaleLinear } from 'd3'
import { Segment } from '../../types'
import { roundValue } from '../graphUtils'

const clampY = (val: number) => roundValue(clamp(val, 0, 10))

export const changeSegmentFlatValue = (
  segments: Segment[],
  id: number,
  yScale: ScaleLinear<number, number, never>,
  mouseY: number
) => {
  const newYValue = clampY(yScale.invert(mouseY))
  return segments.map((seg) => {
    if (seg.id === id) {
      return { ...seg, startValue: newYValue, endValue: newYValue }
    }
    return seg
  })
}

export const changeSegmentCornerValue = (
  segments: Segment[],
  cornerMovingId: [number, number],
  yScale: ScaleLinear<number, number, never>,
  mouseY: number
) => {
  const value = clampY(yScale.invert(mouseY))
  const [id, corner] = cornerMovingId
  return segments.map((seg) => {
    if (seg.id === id) {
      const field = corner === 1 ? 'startValue' : 'endValue'
      return { ...seg, [field]: value }
    }
    return seg
  })
}


export const changeSegmentWidth = (
  segments: Segment[],
  id: number,
  xScale: ScaleLinear<number, number, never>,
  mouseX: number,
  cakeSize: number
) => {
  const changingSeg = segments.find((seg) => seg.id === id)
  const constrainedXValue = Math.max(xScale.invert(mouseX), changingSeg.start)
  const newEndpoint = Math.round(constrainedXValue)
  return changeSegmentWidthNumerically(segments, id, newEndpoint, cakeSize)
}
export const changeSegmentWidthNumerically = (
  segments: Segment[],
  id: number,
  newEnd: number,
  cakeSize: number
) => {
  const changedIndex = segments.findIndex((seg) => seg.id === id)
  const newSegs = segments.map((seg, i) => {
    // set the new end value for changed segment
    const end = i === changedIndex ? Math.min(newEnd, cakeSize) : seg.end

    let start = seg.start
    if (i - 1 === changedIndex && seg.start !== newEnd) {
      // force the segment after the changed one to expand or shrink
      start = newEnd
    } else if (i > changedIndex && seg.start < newEnd) {
      // force segments beyond that to shrink
      start = newEnd
    }
    return { ...seg, end, start }
  })
  // filter out empty segs
  return newSegs.filter((seg) => seg.start < seg.end)
}

export const changeSegmentWithKeyboard = (
  event: React.KeyboardEvent<HTMLInputElement>,
  segments: Segment[],
  xMovingId: number | null,
  yMovingId: number | null,
  cornerMovingId: [number, number] | null,
  cakeSize: number
) => {
  // horizontal bar
  if (xMovingId) {
    let val = 0
    if (event.key === 'ArrowRight') {
      val = event.shiftKey ? 10 : 1
    } else if (event.key === 'ArrowLeft') {
      val = event.shiftKey ? -10 : -1
    }
    if (!val) {
      return
    }
    const seg = segments.find((seg) => seg.id === xMovingId)
    const newEnd = seg.end + val
    return changeSegmentWidthNumerically(segments, xMovingId, newEnd, cakeSize)
  }

  // corner or flat
  if (yMovingId || cornerMovingId) {
    let val = 0
    if (event.key === 'ArrowUp') {
      val = event.shiftKey ? 1 : 0.1
    } else if (event.key === 'ArrowDown') {
      val = event.shiftKey ? -1 : -0.1
    }
    if (!val) {
      return
    }
    // flat
    if (yMovingId) {
      return segments.map((seg) => {
        if (seg.id === yMovingId) {
          return {
            ...seg,
            startValue: clampY(seg.startValue + val),
            endValue: clampY(seg.endValue + val),
          }
        }
        return seg
      })
    } else {
      // corner
      const seg = segments.find(seg => seg.id === cornerMovingId[0])
      return segments.map((seg) => {
        if (seg.id === cornerMovingId[0]) {
          const corner = cornerMovingId[1] === 1 ? 'startValue' : 'endValue'
          return {
            ...seg,
            [corner]: clampY(seg[corner] + val),
          }
        }
        return seg
      })
    }
  }
}
