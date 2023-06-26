import { Segment } from '../../types'

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
