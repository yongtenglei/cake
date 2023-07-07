// See graphUtils for converting between Segment and DrawnSegment

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

export type Preferences = Segment[][]

/** `UnassignedSlice`s don't belong to anyone, so store a `values` array with the
 * slice value for each of the agents.
 * Use `.assign()` to turn a `UnassignedSlice` into a `Slice`.
 * `Slice`s are assigned to given agent but still keep the `values` array for all agents.
 *
 * Note that `UnassignedSlice` and `Slice` cannot be turned back into `Segment`
 * objects and are immutable.
 */
export type UnassignedSlice = {
  start: number
  end: number
  values: number[]
  assign: (agent: number) => Readonly<Slice>
}

export type Slice = {
  owner: number
  start: number
  end: number
  value: number
  valuePercent: number
  values: number[]
}
