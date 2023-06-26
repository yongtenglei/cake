// See graphUtils for converting between these two types

// startValue and endValue [0-10] (increments of 0.1)
// start and end [0-100] (increments of 1)
export type Segment = {
  id: number
  start: number
  end: number
  startValue: number
  endValue: number
}

// a drawn segment is the pixel version of a segment, its values are in absolute pixels
export type DrawnSegment = {
  id: number
  x1: number
  x2: number
  y1: number
  y2: number
}

export type Division = {
  owner: number
  start: number
  end: number
  value: number
}