import { useContext } from 'react'
import { GraphContext } from '../GraphContext'
import { Segment, DrawnSegment } from '../types'
import { innerWidth } from '../spacing'

export const useConvertSegToPixels = () => {
  const { xScale, yScale } = useContext(GraphContext)
  return (seg: Segment): DrawnSegment => {
    const { x1, y1, x2, y2, id } = seg
    return {
      x1: xScale(x1),
      y1: yScale(y1),
      x2: xScale(x2),
      y2: yScale(y2),
      id,
      type: 'drawn'
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
      x1: Math.round(xScale.invert(x1)),
      y1: roundValue(yScale.invert(y1)),
      x2: Math.round(xScale.invert(x2)),
      y2: roundValue(yScale.invert(y2)),
      id,
      type: 'value'
    }
  }
}

export const isDrawingComplete = (segments: Segment[]) => {
  const seg = segments[segments.length - 1]
  return seg?.x2 === 100
}