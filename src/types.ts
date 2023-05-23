// a segment is defined by the upper left and upper right corners
export type Segment = {
  id: number
  x1: number
  x2: number
  y1: number
  y2: number
  type: 'value'
}

// this is an alias of segment for now, but could change
export type DrawnSegment = {
  id: number
  x1: number
  x2: number
  y1: number
  y2: number
  type: 'drawn'
}