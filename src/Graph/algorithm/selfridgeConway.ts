import remove from 'lodash.remove'
import { Preferences, Slice } from '../../types'
import {
  findCutLineByValue,
  getValueForInterval,
  getTotalValue,
  findCutLineByPercent,
} from './getValue'
import {
  cutSlice,
  findBestSlice,
  sortSlicesDecending,
  removeBestSlice,
} from './sliceUtils'

import { defaultCakeSize } from '../graphConstants'

// Keep in mind that this is written with a 0-based index, but descriptions of the 
// Selfridge-Conway method use a 1-based index because that's, you know, normal.
export const selfridgeConway = (
  preferences: Preferences,
  cakeSize = defaultCakeSize
): Slice[] => {
  if (preferences.length !== 3) {
    throw 'Divide and choose only works with three agents'
  }

  const [p0Prefs, p1Prefs] = preferences
  // P0 cuts
  const firstCut = findCutLineByPercent(p0Prefs, 1 / 3)
  const secondCut = findCutLineByPercent(p0Prefs, 2 / 3)

  const slices = sortSlicesDecending(1, [
    cutSlice(preferences, 0, firstCut),
    cutSlice(preferences, firstCut, secondCut),
    cutSlice(preferences, secondCut, cakeSize),
  ])

  const p1s0value = slices[0].values[1]
  const p1s1value = slices[1].values[1]

  // P1 decides if two largest are equal
  if (p1s0value === p1s1value) {
    // No trimming needed, easy path!
    const [p2BestSlice, remainingSlices1] = removeBestSlice(2, slices) // P2 picks slice
    const [p1BestSlice, remainingSlices2] = removeBestSlice(1, remainingSlices1) // then P1
    const p0BestSlice = remainingSlices2[0] // then P0
    return [p2BestSlice.assign(2), p1BestSlice.assign(1), p0BestSlice.assign(0)]
  }

  const trimmings = []
  // P1 trims largest slice so two largest slices are equal, trimmings set aside
  const sliceToTrim = p1s0value > p1s1value ? 0 : 1
  const { start, end } = slices[sliceToTrim]
  const cutLine = findCutLineByValue(p1Prefs, Math.abs(p1s0value - p1s1value), {
    startBound: start,
    endBound: end,
  })
  trimmings.push(cutSlice(preferences, start, cutLine))
  const trimmedPiece = cutSlice(preferences, cutLine, end)
  slices[sliceToTrim] = trimmedPiece

  // P2 takes a slice
  let [p2BestSlice, remainingSlices] = removeBestSlice(2, slices) // P2 picks slice
  let trimmedPicker = null
  if(p2BestSlice === trimmedPiece) {
    trimmedPicker = 2
  }

  // P1 takes a slice
  //  - must take trimmed piece if available,
  let p1BestSlice = null
  if(trimmedPicker === null) {
    // P1 picks trimmed slice
    p1BestSlice = trimmedPiece
    remainingSlices = remove(remainingSlices, trimmedPiece)
    trimmedPicker = 1
  } else {
    // P1 picks best slice
    [p1BestSlice, remainingSlices] = removeBestSlice(1, remainingSlices) 
  }

  // P0 takes last slice
  const p0BestSlice = remainingSlices[0]
  let results = [p2BestSlice.assign(2), p1BestSlice.assign(1), p0BestSlice.assign(0)]

  // Non-trimmer P1 or P2 cuts trimming into three pieces

  // Trimmer P1 or P2 takes a slice
  // P0 takes a slice
  // Non-trimmer P1 or P2 takes a slice
  return results
  throw 'not implemented'
}
