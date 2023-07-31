import maxBy from 'lodash.maxby'
import remove from 'lodash.remove'
import { Preferences, UnassignedSlice, AssignedSlice } from '../../types'
import { getValueForInterval } from './getValue'

/**
 * Creates an `UnassignedSlice` from between the start and end value.
 * See the type definition in `types.ts` for more info.
 * Zero-width slices are technically valid as some methods require them in edge cases.
 */
export const cutSlice = (
  preferences: Preferences,
  start: number,
  end: number,
  note?: string
): Readonly<UnassignedSlice> => {
  if (start > end) {
    console.trace()
    throw `Start cannot be before end. Start ${start}, end ${end}, preferences ${JSON.stringify(
      preferences
    )}`
  }
  // Getting and saving every agent's evaluations for this slice makes later calculation much simpler
  const values = preferences.map((segments) =>
    getValueForInterval(segments, start, end)
  )
  // Freeze the created `UnassignedSlice` to enforce immutability.
  return Object.freeze({
    start,
    end,
    values,
    note,
    assign: (agent: number, noteOverride?: string): AssignedSlice => {
      return Object.freeze({
        start,
        end,
        values,
        owner: agent,
        note: noteOverride ?? note
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
