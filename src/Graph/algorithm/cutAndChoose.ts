import { Preferences, Slice } from '../../types'
import { findCutLineByPercent } from './getValue'
import { cutSlice } from './sliceUtils'
import { defaultCakeSize } from '../graphConstants'

export const cutAndChoose = (
  preferences: Preferences,
  cakeSize = defaultCakeSize
): Slice[] => {
  if (preferences.length !== 2) {
    throw 'Cut and choose only works with two agents'
  }

  // agent 0 cuts
  const cutPoint = findCutLineByPercent(preferences[0], 0.5)

  const slice1 = cutSlice(preferences, 0, cutPoint)
  const slice2 = cutSlice(preferences, cutPoint, cakeSize)

  // agent 1 chooses
  if (slice1.values[1] >= slice2.values[1]) {
    return [slice1.assign(1), slice2.assign(0)]
  } else {
    return [slice1.assign(0), slice2.assign(1)]
  }
}
