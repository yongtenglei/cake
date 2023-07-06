import { Segment, Preferences, UnassignedSlice, Slice } from '../../types'

export const findCutLine = (segments: Segment[], targetPercentVal: number) => {
  const totalCakeValue = getTotalValue(segments)
  const targetArea = totalCakeValue * targetPercentVal
  let runningTotal = 0
  for (const seg of segments) {
    const segmentVal = measureSegment(seg)
    if (runningTotal + segmentVal >= targetArea) {
      return findSegmentCutline(seg, targetArea - runningTotal)
    } else {
      runningTotal += segmentVal
    }
  }
  throw 'No cutline in segment'
}

// Finds the cutline up to about 0.01 precision.
// Could get more precise with a math library, or just multiplying the numbers
// by 100 or 1000 to get them out of floating point range.
const findSegmentCutline = (seg: Segment, targetArea: number) => {
  const segValue = measureSegment(seg)
  const width = seg.end - seg.start
  const slope = (seg.endValue - seg.startValue) / width

  if (seg.startValue === seg.endValue) {
    // Flat segment
    const targetAreaPercent = targetArea / segValue
    return seg.start + width * targetAreaPercent
  } else {
    // Sloped segment
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
      (-seg.startValue +
        Math.sqrt(seg.startValue ** 2 + 2 * slope * targetArea)) /
      slope
    return seg.start + targetEnd
  }
}

// could wrap this with lodash's `memorize` to cache results
export const getTotalValue = (segments: Segment[]) =>
  getValueForInterval(segments, 0, Infinity)

// Returns the total value of an interval,
// even if covers several segments or splits segments in half.
export const getValueForInterval = (
  segments: Segment[],
  start,
  end
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

// Measures the area of a segment
// Works with flat or sloped sections, whole numbers and decimals.
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

export const measureSegment = (seg: Segment) => {
  return measurePartialSegment(seg, seg.start, seg.end)
}

export const cutSlice = (
  preferences: Preferences,
  start: number,
  end: number
): UnassignedSlice => {
  // Getting and saving every agent's evaluations for this slice makes later calculation much simpler
  const allEvaluationsForSlice = preferences.map((segments) =>
    getValueForInterval(segments, start, end)
  )
  return {
    start,
    end,
    values: allEvaluationsForSlice,
    assign: (agent: number): Slice => {
      const totalCakeValue = getTotalValue(preferences[agent])
      const value = allEvaluationsForSlice[agent]
      return {
        start,
        end,
        value,
        values: allEvaluationsForSlice,
        owner: agent,
        valuePercent: value / totalCakeValue,
      }
    },
  }
}
