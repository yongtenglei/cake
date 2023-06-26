import { useContext } from 'react'
import { GraphContext } from './GraphContext'
import { Segment, DrawnSegment } from '../types'

export const useConvertSegToPixels = () => {
  const { xScale, yScale } = useContext(GraphContext)
  return (seg: Segment): DrawnSegment => {
    const { start, startValue, end, endValue, id } = seg
    return {
      x1: xScale(start),
      y1: yScale(startValue),
      x2: xScale(end),
      y2: yScale(endValue),
      id,
    }
  }
}

// Easy way to round decimals to nearest tenth
export const roundValue = (num: number) => Math.round(num * 10) / 10

export const useConvertSegFromPixels = () => {
  const { xScale, yScale } = useContext(GraphContext)
  return (seg: DrawnSegment): Segment => {
    const { x1, y1, x2, y2, id } = seg
    return {
      start: Math.round(xScale.invert(x1)),
      startValue: roundValue(yScale.invert(y1)),
      end: Math.round(xScale.invert(x2)),
      endValue: roundValue(yScale.invert(y2)),
      id
    }
  }
}

export const isDrawingComplete = (segments: Segment[]) => {
  const seg = segments[segments.length - 1]
  return seg?.end === 100
}