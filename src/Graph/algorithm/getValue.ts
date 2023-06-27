import { Segment } from '../../types'

// Returns the total value of an interval, 
// even if covers several segments or splits segments in half.
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

const measurePartialSegment = (seg: Segment, start: number, end: number) => {
  const startCap = Math.max(start, seg.start)
  const endCap = Math.min(end, seg.end)
  const measuringWidth = endCap - startCap

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
