import maxBy from 'lodash.maxby'
import remove from 'lodash.remove'
import { Segment, Preferences, UnassignedSlice, Slice } from '../../types'
import { getValueForInterval, getTotalValue } from './getValue'

/**
 * Creates an `UnassignedSlice` from between the start and end value.
 * See the type definition in `types.ts` for more info.
 */
export const cutSlice = (
  preferences: Preferences,
  start: number,
  end: number,
  type?: string
): Readonly<UnassignedSlice> => {
  if (start > end) {
    console.trace()
    throw `Start cannot be before end. Start ${start}, end ${end}, preferences ${JSON.stringify(
      preferences
    )}`
  }
  // Getting and saving every agent's evaluations for this slice makes later calculation much simpler
  const allEvaluationsForSlice = preferences.map((segments) =>
    getValueForInterval(segments, start, end)
  )
  // Freeze the created `UnassignedSlice` to enforce immutability.
  return Object.freeze({
    start,
    end,
    values: allEvaluationsForSlice,
    assign: (agent: number): Slice => {
      const value = allEvaluationsForSlice[agent]
      return Object.freeze({
        start,
        end,
        value,
        values: allEvaluationsForSlice,
        owner: agent,
      })
    },
  })
}

/**
 * Sorts big to small by one agent's value function
 */
export const sortSlicesDescending = (
  agent: number,
  slices: UnassignedSlice[]
) => {
  return [...slices].sort((a, b) => b.values[agent] - a.values[agent])
}
/**
 * Finds the best slice by value for a given user.
 */
export const findBestSlice = (
  agent: number,
  slices: UnassignedSlice[]
): UnassignedSlice => {
  return maxBy(slices, (slice: UnassignedSlice) => slice.values[agent])
}

/**
 * Returns an array of two items.
 * The slice removed and the remaining slices
 */
export const removeSlice = (
  slice: UnassignedSlice,
  slices: UnassignedSlice[]
): [UnassignedSlice, UnassignedSlice[]] => {
  // `remove` mutates the array so make a copy of it first
  const remaining = [...slices]
  const removed: UnassignedSlice = remove(remaining, slice)[0]
  return [removed, remaining]
}

/**
 * Returns an array of two items.
 * The best slice for the given agent and the remaining slices
 * [bestSlice, remainingSlices]
 */
export const removeBestSlice = (agent: number, slices: UnassignedSlice[]) => {
  return removeSlice(findBestSlice(agent, slices), slices)
}
