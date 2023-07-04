import { Preferences, Division, Segment } from '../../types'
import { getValueForInterval, getTotalValue } from './getValue'
import { defaultCakeSize } from '../graphConstants'

// need to rework this to be exact and subdivide increments
export const cutAndChoose = async (
  preferences: Preferences,
  cakeSize = defaultCakeSize
): Promise<Division[]> => {
  if (preferences.length !== 2) {
    throw 'Divide and choose only works with two agents'
  }

  const person1Pref = preferences[0]

  const agent1CakeValue = getTotalValue(person1Pref)

  // agent 1 cuts
  // Note that a smarter way would be to do a binary search or perphaps pre-measure
  // each increment of `cakeSize` so `getValueForInterval` would be run `cakeSize` * `agents` times.
  // The second approach is more applicable to methods are require more measuring.
  let cutPoint = 1
  while (cutPoint < cakeSize) {
    const value = getValueForInterval(person1Pref, 0, cutPoint)
    if (value >= agent1CakeValue / 2) {
      // cut
      break
    }
    cutPoint++
  }

  const p1Slice1 = cutSlice(1, preferences, 0,        cutPoint)
  const p1Slice2 = cutSlice(1, preferences, cutPoint, cakeSize)
  const p2Slice1 = cutSlice(2, preferences, 0,        cutPoint)
  const p2Slice2 = cutSlice(2, preferences, cutPoint, cakeSize)
  console.log('slices are worth', p1Slice1, p1Slice2, p2Slice1, p2Slice2)
  // agent 2 chooses
  if (p2Slice1.value >= p2Slice2.value) {
    return [p2Slice1, p1Slice2]
  } else {
    return [p1Slice1, p2Slice2]
  }
}

const findCutLine = (preference: Segment[], targetPercentVal: number) => {



}

const cutSlice = (
  agent: number,
  preferences: Preferences,
  start: number,
  end: number,
): Division => {
  const totalCakeValue = getTotalValue(preferences[agent - 1])

  // Getting and saving every agent's evaluations for this slice makes later calculation much simpler
  const allEvaluationsForSlice = preferences.map(segments => getValueForInterval(segments, start, end))
  const value = allEvaluationsForSlice[agent - 1]
  return {
    owner: agent,
    start,
    end,
    value,
    values: allEvaluationsForSlice,
    valuePercent: value / totalCakeValue,
  }
}
