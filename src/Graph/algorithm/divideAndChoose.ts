import { Segment, Division } from '../../types'
import { getValueForInterval } from './getValue'
import { defaultCakeSize } from '../constants'

export const divideAndChoose = (
  preferences: Segment[][],
  cakeSize = defaultCakeSize
): Division[] => {
  if (preferences.length !== 2) {
    throw 'Divide and choose only works with two agents'
  }

  const [person1Pref, person2Pref] = preferences

  const agent1CakeValue = getValueForInterval(person1Pref, 0, cakeSize)
  const agent2CakeValue = getValueForInterval(person2Pref, 0, cakeSize)

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

  const p1Slice1 = cutSlice(1, preferences, 0,        cutPoint, agent1CakeValue)
  const p1Slice2 = cutSlice(1, preferences, cutPoint, cakeSize, agent1CakeValue)
  const p2Slice1 = cutSlice(2, preferences, 0,        cutPoint, agent2CakeValue)
  const p2Slice2 = cutSlice(2, preferences, cutPoint, cakeSize, agent2CakeValue)
  console.log('slices are worth', p1Slice1, p1Slice2, p2Slice1, p2Slice2)
  // agent 2 chooses
  if (p2Slice1.value >= p2Slice2.value) {
    return [p2Slice1, p1Slice2]
  } else {
    return [p1Slice1, p2Slice2]
  }
}

const cutSlice = (
  agent: number,
  preferences: Segment[][],
  start: number,
  end: number,
  cakeValue: number
): Division => {
  const value = getValueForInterval(preferences[agent - 1], start, end)
  return {
    owner: agent,
    start,
    end,
    value,
    valuePercent: value / cakeValue,
  }
}
