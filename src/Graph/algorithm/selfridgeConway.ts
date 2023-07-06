import { Preferences, Slice } from '../../types'
import {
  getValueForInterval,
  getTotalValue,
  cutSlice,
  findCutLine,
  findBestSlice,
  sortSlicesDecending,
  removeBestSlice,
} from './getValue'
import { defaultCakeSize } from '../graphConstants'

export const selfridgeConway = (
  preferences: Preferences,
  cakeSize = defaultCakeSize
): Slice[] => {
  if (preferences.length !== 3) {
    throw 'Divide and choose only works with three agents'
  }

  const [p0Prefs, p1Prefs, p2Prefs] = preferences
  // P0 cuts
  const firstCut = findCutLine(p0Prefs, 1 / 3)
  const secondCut = findCutLine(p0Prefs, 2 / 3)

  const p1SortedSlices = sortSlicesDecending(1, [
    cutSlice(preferences, 0, firstCut),
    cutSlice(preferences, firstCut, secondCut),
    cutSlice(preferences, secondCut, cakeSize),
  ])

  // P1 decides if two largest are equal
  if (p1SortedSlices[0].values[1] === p1SortedSlices[1].values[1]) {
    // no trimming
    // P2 picks slice, then P1, then P0 then done
    const [p2BestSlice, remainingSlices1] = removeBestSlice(2, p1SortedSlices)
    const [p1BestSlice, remainingSlices2] = removeBestSlice(1, remainingSlices1)
    const p0BestSlice = remainingSlices2[0]
    return [p2BestSlice.assign(2), p1BestSlice.assign(1), p0BestSlice.assign(0)]
  }
  
  const trimmings = []
  // ELSE
  // P1 trims so the two largest slices are equal, trimmings set aside
  // P2 takes a slice
  //  - if trimmed piece, set `choseTrimmed` to `true` else `false`
  // P1 takes a slice
  //  - must be trimmed piece if available,
  //  - if trimmed piece, set `choseTrimmed` to `true` else `false`
  // P0 takes a slice
  //  - note, `choseTrimmed` is not set for this person

  // `choseTrimmed=false` person cuts trimming into three pieces
  // `choseTrimmed=true`  person takes a slice
  // P0 takes a slice
  // `choseTrimmed=false` person takes a slice
  throw 'not implemented'
}
