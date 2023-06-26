import { Segment, Division } from '../../types'
import { getValueForInterval, validateSegments } from './getValue'
import { defaultCakeSize } from '../constants'

export const divideAndChoose = (preferences: Segment[][], cakeSize = defaultCakeSize): Division[] => {
  if (preferences.length !== 2) {
    throw 'Divide and choose only works with two agents'
  }
  validateSegments(preferences, cakeSize)
  
  const [agent1Pref, agent2Pref] = preferences

  const agent1HalfValue = getValueForInterval(agent1Pref, 0, cakeSize) / 2
  const agent2HalfValue = getValueForInterval(agent2Pref, 0, cakeSize) / 2

  // agent 1 cuts
  // Note that a smarter way would be to do a binary search or perphaps pre-measure 
  // each increment of `cakeSize` so `getValueForInterval` would be run `cakeSize` * `agents` times.
  // The second approach is more applicable to methods are require more measuring.
  let cutPoint = 1
  while (cutPoint < cakeSize) {
    const value = getValueForInterval(agent1Pref, 0, cutPoint)
    if (value >= agent1HalfValue) {
      // cut
      break
    }
    cutPoint++
  }

  // agent 2 chooses
  if (getValueForInterval(agent2Pref, 0, cutPoint) >= agent2HalfValue) {
    // first part looks good to agent 2
    return [
      cutSlice(2, preferences, 0, cutPoint),
      cutSlice(1, preferences, cutPoint, cakeSize),
    ]
  } else {
    // second part looks good to agent 2
    return [
      cutSlice(1, preferences, 0, cutPoint),
      cutSlice(2, preferences, cutPoint, cakeSize),
    ]
  }
}

const cutSlice = (
  agent: number,
  preferences: Segment[][],
  start: number,
  end: number
) => {
  return {
    owner: agent,
    start,
    end,
    value: getValueForInterval(preferences[agent - 1], start, end),
  }
}
