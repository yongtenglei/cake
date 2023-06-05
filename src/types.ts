// a segment is defined by the y height [0-10] and the x width [0-100]
export type Segment = {
  id: number
  x1: number
  x2: number
  y1: number
  y2: number
  type: 'value'
}

// a drawn segment is the pixel version of a segment, its values are in absolute pixels
export type DrawnSegment = {
  id: number
  x1: number
  x2: number
  y1: number
  y2: number
  type: 'drawn'
}