import { Preferences, Slice } from '../../types'
import { cutSlice, findCutLine } from './getValue'
import { defaultCakeSize } from '../graphConstants'

export const cutAndChoose = async (
  preferences: Preferences,
  cakeSize = defaultCakeSize
): Promise<Slice[]> => {
  if (preferences.length !== 2) {
    throw 'Cut and choose only works with two agents'
  }

  // agent 1 cuts
  const cutPoint = findCutLine(preferences[0], 0.5)

  const slice1 = cutSlice(preferences, 0, cutPoint)
  const slice2 = cutSlice(preferences, cutPoint, cakeSize)

  // agent 2 chooses
  if (slice1.values[1] >= slice2.values[1]) {
    return [slice1.assign(2), slice2.assign(1)]
  } else {
    return [slice1.assign(1), slice2.assign(2)]
  }
}
