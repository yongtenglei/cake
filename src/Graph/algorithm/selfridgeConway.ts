import remove from 'lodash.remove'
import { Preferences, Slice, UnassignedSlice } from '../../types'
import { findCutLineByValue, findCutLineByPercent } from './getValue'
import { cutSlice, sortSlicesDecending, removeBestSlice } from './sliceUtils'

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
  let p0BestSlice = null
  let p1BestSlice = null
  let p2BestSlice = null
  let slices = []

  const [p0Prefs, p1Prefs] = preferences

  // P0 cuts
  const firstCut = findCutLineByPercent(p0Prefs, 1 / 3)
  const secondCut = findCutLineByPercent(p0Prefs, 2 / 3)

  const tempSlices = [
    cutSlice(preferences, 0, firstCut),
    cutSlice(preferences, firstCut, secondCut),
    cutSlice(preferences, secondCut, cakeSize),
  ]
  console.log('Slices are ', tempSlices)

  // P1 assesses the two largest slices
  slices = sortSlicesDecending(1, tempSlices)
  const p1LargestValue = slices[0].values[1]
  const p1SecondLargestValue = slices[1].values[1]

  // P1 decides if two largest are equal
  if (p1LargestValue === p1SecondLargestValue) {
    // No trimming needed, easy path!
    console.log(
      '2nd person considers two largest slices as equal, splitting the easy way.'
    )
    ;[p2BestSlice, slices] = removeBestSlice(2, slices) // P2 picks slice
    ;[p1BestSlice, slices] = removeBestSlice(1, slices) // P1 picks slice
    p0BestSlice = slices[0] // P0 picks last slice
    return [p2BestSlice.assign(2), p1BestSlice.assign(1), p0BestSlice.assign(0)]
  }

  // P1 trims largest slice so two largest slices are equal, trimmings set aside
  const { start, end } = slices[0]

  console.log('Trimming piece', {...slices[0]})
  const cutLine = findCutLineByValue(
    p1Prefs,
    p1LargestValue - p1SecondLargestValue,
    {
      startBound: start,
      endBound: end,
    }
  )
  const trimming = cutSlice(preferences, start, cutLine)
  
  // Note, this thrown the "end == start" error if the second biggest piece is worth nothing
  // because it's trying to cut a 0-value piece. Will find a way to fix this at some point.
  const trimmedPiece = cutSlice(preferences, cutLine, end) 
  slices[0] = trimmedPiece

  console.log('Picking slices')
  // P2 picks a slice
  ;[p2BestSlice, slices] = removeBestSlice(2, slices)

  // Keep track of who picked the trimmed piece. It's always P1 or P2.
  let trimmedPicker = null
  if (p2BestSlice === trimmedPiece) {
    trimmedPicker = 2
    // Trimmed piece already taken so P1 picks their favorite slice
    ;[p1BestSlice, slices] = removeBestSlice(1, slices)
  } else {
    // Trimmed piece still available so P1 must pick it
    trimmedPicker = 1
    p1BestSlice = trimmedPiece
    remove(slices, trimmedPiece)
  }

  // P0 takes last slice
  p0BestSlice = slices.pop()

  // Assign slices to their agents
  let results = [
    p2BestSlice.assign(2),
    p1BestSlice.assign(1),
    p0BestSlice.assign(0),
  ]

  // Assign trimmings and return results
  return [...results, ...assignTrimmings(trimming, trimmedPicker, preferences)]
}

const assignTrimmings = (
  trimming: UnassignedSlice,
  trimmedPicker: number,
  preferences: Preferences
): Slice[] => {
  console.log('Dividing trimming', trimming)
  const nonTrimmedPicker = trimmedPicker === 1 ? 2 : 1
  const cutterPrefs = preferences[nonTrimmedPicker]

  // Non-trimmed picker (P1 or P2) cuts trimming into three pieces
  const cut1 = findCutLineByPercent(cutterPrefs, 1 / 3, {
    startBound: trimming.start,
    endBound: trimming.end,
  })
  const cut2 = findCutLineByPercent(cutterPrefs, 2 / 3, {
    startBound: trimming.start,
    endBound: trimming.end,
  })
  const piece1 = cutSlice(preferences, trimming.start, cut1)
  const piece2 = cutSlice(preferences, cut1, cut2)
  const piece3 = cutSlice(preferences, cut2, trimming.end)

  console.log('Trimming divided into', [piece1, piece2, piece3])
  
  // Trimmed picker (P1 or P2) takes a slice
  const [trimmedPickerSlice, remainingSlices1] = removeBestSlice(
    trimmedPicker,
    [piece1, piece2, piece3]
  )
  // P0 takes a slice
  const [p0Slice, remainingSlices2] = removeBestSlice(0, remainingSlices1)
  
  // Non-trimmed picker takes a slice
  const nonTrimmedPickerSlice = remainingSlices2[0]
  return [
    trimmedPickerSlice.assign(trimmedPicker),
    nonTrimmedPickerSlice.assign(nonTrimmedPicker),
    p0Slice.assign(0),
  ]
}
