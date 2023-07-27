import { useContext } from 'react'
import { GraphContext } from './GraphContext'
import { Segment, DrawnSegment, Preferences } from '../types'
import { defaultCakeSize, getInnerHeight, getInnerWidth } from './graphConstants'
import { scaleLinear } from 'd3'

interface createScalesParams {
  innerWidth: number
  innerHeight: number
  cakeSize: number
}
export const createScales = ({
  innerWidth,
  innerHeight,
  cakeSize,
}: createScalesParams) => {
  const yScale = scaleLinear().domain([0, 10]).range([innerHeight, 0])
  const xScale = scaleLinear().domain([0, cakeSize]).range([0, innerWidth])
  return { yScale, xScale }
}

export const useConvertSegToPixels = () => {
  const { xScale, yScale } = useContext(GraphContext)
  return (seg: Segment): DrawnSegment => {
    const { start, startValue, end, endValue, id } = seg
    return {
      x1: xScale(start),
      x2: xScale(end),
      y1: yScale(startValue),
      y2: yScale(endValue),
      id,
    }
  }
}

// Easy way to round decimals without floating point issues.
export const roundValue = (num: number) => Math.round(num * 10) / 10

export const useConvertSegFromPixels = () => {
  const { xScale, yScale } = useContext(GraphContext)
  return (seg: DrawnSegment): Segment => {
    const { x1, y1, x2, y2, id } = seg
    return {
      start: Math.ceil(xScale.invert(x1)),
      startValue: roundValue(yScale.invert(y1)),
      end: Math.ceil(xScale.invert(x2)),
      endValue: roundValue(yScale.invert(y2)),
      id,
    }
  }
}

export const isDrawingComplete = (segments: Segment[], cakeSize: number) => {
  const seg = segments[segments.length - 1]
  return seg?.end === cakeSize
}

export const isAllInputComplete = (preferences: Preferences, cakeSize: number) => (
  preferences.every(segments => isDrawingComplete(segments, cakeSize))
)