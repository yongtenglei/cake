import { Segment, Division } from '../../types'
import { divideAndChoose } from './divideAndChoose'
import { genFlatSeg, genSlopeSeg } from './testUtil'
import { getValueForInterval } from './getValue'

const testIfEnvyFree = (person1: Segment[], person2: Segment[], result: Division[]) => {
  const [firstSlice, secondSlice] = result
  const firstPrefs = firstSlice.owner === 1 ? person1 : person2
  // Using the start and end of the slice *not* selected, 
  // test if it's worth less than the slice selected for this agent.
  expect(getValueForInterval(firstPrefs, secondSlice.start, secondSlice.end)).toBeLessThanOrEqual(firstSlice.value)
  
  // Do the same for the other agent.
  const secondPrefs = secondSlice.owner === 1 ? person1 : person2
  expect(getValueForInterval(secondPrefs, firstSlice.start, firstSlice.end)).toBeLessThanOrEqual(secondSlice.value)
}

test('splits a uniform flat value graph evenly in half', () => {
  const person1 = [genFlatSeg(0, 100, 10)] // 1000
  const person2 = [genFlatSeg(0, 100, 10)] // 1000
  const result = divideAndChoose([person1, person2])
  expect(result).toHaveLength(2)
  // Each agent values the cake uniformly for a total of 1000 value.
  // The results should be an even 500/500 split.
  // Actual order doesn't matter but it's difficult to test that.
  expect(result[0]).toMatchObject({ owner: 2, start: 0, end: 50, value: 500 })
  expect(result[1]).toMatchObject({ owner: 1, start: 50, end: 100, value: 500 })
  testIfEnvyFree(person1, person2, result)
})

test('splits a seesaw-like graph in an envy-free way', () => {
  const person1 = [genFlatSeg(0, 50, 10), genFlatSeg(50, 100, 5)] // 750, halfway point is 37.5%
  const person2 = [genFlatSeg(0, 50, 5), genFlatSeg(50, 100, 10)] // 750, halfway point is 67.5%
  const result = divideAndChoose([person1, person2])
  expect(result).toHaveLength(2)
  // The slices should be 375 value on both sides for person 1, 
  // but the second slice is better for person 2.
  // Note that the 100 point "resolution" rounds the result slightly.
  expect(result[0]).toMatchObject({ owner: 1, start: 0, end: 38, value: 380 })
  expect(result[1]).toMatchObject({ owner: 2, start: 38, end: 100, value: 560 })
  testIfEnvyFree(person1, person2, result)
})


test('splits a seesaw-like sloped graph in an envy-free way', () => {
  const person1 = [genSlopeSeg(0, 100, 10, 0)] // 500, halfway point is ~30%
  const person2 = [genSlopeSeg(0, 100, 0, 10)] // 500, halfway point is ~70%
  const result = divideAndChoose([person1, person2])
  expect(result).toHaveLength(2)
  expect(result[0]).toMatchObject({ owner: 1, start: 0, end: 30, value: 255 })
  expect(result[1]).toMatchObject({ owner: 2, start: 30, end: 100, value: 455 })
  testIfEnvyFree(person1, person2, result)
})