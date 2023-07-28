import { Segment } from '../../types'

type BoundaryOptions = { startBound: number; endBound: number }

export const findCutLineByPercent = (
  segments: Segment[],
  targetPercentVal: number,
  options?: BoundaryOptions
) => {
  const start = options?.startBound ?? 0
  const end = options?.endBound ?? Infinity
  const totalCakeValue = getValueForInterval(segments, start, end)
  const targetValue = totalCakeValue * targetPercentVal
  return findCutLineByValue(segments, targetValue, options)
}

export const findCutLineByValue = (
  segments: Segment[],
  targetValue: number,
  options?: BoundaryOptions
): number => {
  let runningTotal = 0
  for (const seg of segments) {
    const segValue = options
      ? measurePartialSegment(seg, options.startBound, options.endBound)
      : measureSegment(seg)

    if (runningTotal + segValue >= targetValue) {
      return findSegmentCutline(seg, targetValue - runningTotal, options)
    } else {
      runningTotal += segValue
    }
  }
  throw 'No cut line in segment'
}

/**
 * Finds the cutline up to ~10e-13 precision which is the error with floating point numbers.
 * Could get more precise with a math library but that's already extremely good.
 */
const findSegmentCutline = (
  seg: Segment,
  targetArea: number,
  options?: BoundaryOptions
): number => {
  // sanity check so we don't expand the scope of the segment
  if (options) {
    options.startBound = Math.max(options.startBound, seg.start)
    options.endBound = Math.min(options.endBound, seg.end)
  }
  const slope = (seg.endValue - seg.startValue) / (seg.end - seg.start)

  const start = options?.startBound ?? seg.start
  const end = options?.endBound ?? seg.end

  if (seg.startValue === seg.endValue) {
    // Flat segment
    const segValue = options
      ? measurePartialSegment(seg, options.startBound, options.endBound)
      : measureSegment(seg)
    const targetAreaPercent = targetArea / segValue
    return start + (end - start) * targetAreaPercent
  } else {
    // Sloped segment
    let startVal = seg.startValue
    if (options?.startBound) {
      startVal += options.startBound ? (options.startBound - seg.start) * slope : 0
    }
    // Thanks to Bence Szilágyi for help with the math here.
    // The formula is the result of adding a triangle and rectangle together,
    // then solving for the width and one side (endValue):
    // triangle area = (endValue * width) / 2
    // rectangle area = startValue * width
    // total area = (endValue * width) / 2 + (startValue * width)
    // The endValue can be found with the width and slope:
    // endValue = width * slope
    //
    // The rectangle and triangle definitions "assume" that the slope is positive
    // but this actually works even if the slope is negative because in that case the
    // area of the triangle will be negative.
    const targetEnd =
      (-startVal + Math.sqrt(startVal ** 2 + 2 * slope * targetArea)) / slope
    return start + targetEnd
  }
}

export const getTotalValue = (segments: Segment[]): number =>
  getValueForInterval(segments, 0, Infinity)

/**
 * Returns the total value of an interval,
 * even if covers several segments or splits segments in half.
 */
export const getValueForInterval = (
  segments: Segment[],
  start: number,
  end: number
): number => {
  let total = 0
  for (const seg of segments) {
    if (seg.end <= start || seg.start >= end) {
      // this segment not relevant
      continue
    }

    total += measurePartialSegment(seg, start, end)
  }
  return total
}

/**
 * Measures the area of a segment
 * Works with flat or sloped sections, whole numbers and decimals.
 */
const measurePartialSegment = (seg: Segment, start: number, end: number) => {
  const startCap = Math.max(start, seg.start)
  const endCap = Math.min(end, seg.end)
  const measuringWidth = endCap - startCap

  if (measuringWidth <= 0) {
    // Nothing to measure
    return 0
  }
  // flat section
  if (seg.startValue === seg.endValue) {
    return seg.startValue * measuringWidth
  }
  // sloped section
  const segmentWidth = seg.end - seg.start
  const slope = (seg.endValue - seg.startValue) / segmentWidth

  const startVal = seg.startValue + slope * (startCap - seg.start)
  const endVal = seg.endValue - slope * (seg.end - endCap)
  const avgValue = (startVal + endVal) / 2
  return measuringWidth * avgValue
}

export const measureSegment = (seg: Segment) => {
  return measurePartialSegment(seg, seg.start, seg.end)
}

export const getValueAtPoint = (segments: Segment[], point: number) => {
  for (const seg of segments) {
    if (seg.end <= point || seg.start >= point) {
      continue
    }
    if (seg.startValue === seg.endValue) {
      return seg.startValue
    } else {
      const slope = (seg.endValue - seg.startValue) / (seg.end - seg.start)
      return seg.startValue + slope * (point - seg.start)
    }
  }
}
