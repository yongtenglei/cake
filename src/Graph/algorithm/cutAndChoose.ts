import { Preferences, Division } from '../../types'
import { getTotalValue, cutSlice, findCutLine } from './getValue'
import { defaultCakeSize } from '../graphConstants'

// need to rework this to be exact and subdivide increments
export const cutAndChoose = async (
  preferences: Preferences,
  cakeSize = defaultCakeSize
): Promise<Division[]> => {
  if (preferences.length !== 2) {
    throw 'Cut and choose only works with two agents'
  }

  // agent 1 cuts
  const cutPoint = findCutLine( preferences[0], 0.5)

  const p1Slice1 = cutSlice(1, preferences, 0,        cutPoint)
  const p1Slice2 = cutSlice(1, preferences, cutPoint, cakeSize)

  const p2Slice1 = cutSlice(2, preferences, 0,        cutPoint)
  const p2Slice2 = cutSlice(2, preferences, cutPoint, cakeSize)
  
  // agent 2 chooses
  if (p2Slice1.value >= p2Slice2.value) {
    return [p2Slice1, p1Slice2]
  } else {
    return [p1Slice1, p2Slice2]
  }
}
