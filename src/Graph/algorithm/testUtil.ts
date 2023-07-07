import { Segment, Slice } from '../../types'

export const halfwayPointOfTriangleArea = 70.710678

let id = 0
export const genFlatSeg = (
  start: number,
  end: number,
  value: number
): Segment => {
  return {
    id: ++id,
    start,
    end,
    startValue: value,
    endValue: value,
  }
}

export const genSlopeSeg = (
  start: number,
  end: number,
  startValue: number,
  endValue: number
): Segment => {
  return {
    id: ++id,
    start,
    end,
    startValue,
    endValue,
  }
}

export const testIfEnvyFree = (numPeople: number, result: Slice[]) => {
  // We can't get to 100% accuracy when using floating point math
  const fudgeFactor = 0.1

  for (let a = 0; a < numPeople; a++) {
    // Using person `a`'s evaluations, collect each person's slice
    // values into an array.
    const totalValues = result.reduce((acc, slice) => {
      acc[slice.owner] += slice.values[a]
      return acc
    }, new Array(numPeople).fill(0))
    
    // The value of `a`'s slices
    const obtainedValue = totalValues[a]
   
    totalValues.forEach((value, i) => {
      // Assert that all other people's slice total value
      // is worth less (to person `a`) than their own slice.
      expect(
        value - fudgeFactor,
        `Person ${a} envies person ${i}'s slices`
      ).toBeLessThanOrEqual(obtainedValue)
    })
  }
}
