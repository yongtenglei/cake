import { selfridgeConway } from './selfridgeConway'
import { genFlatSeg, genSlopeSeg } from './testUtil'
import { getValueForInterval } from './getValue'
import { testIfEnvyFree } from './testUtil'

test('splits a "no trimming needed" uniform evaluation cake into even (almost) thirds', () => {
  // Use a cake size of 90 so it's evenly divisible into thirds.
  const person0 = [genFlatSeg(0, 90, 10)] // 900
  const person1 = [genFlatSeg(0, 90, 10)] // 900
  const person2 = [genFlatSeg(0, 90, 10)] // 900
  const result = selfridgeConway([person0, person1, person2], 90)

  expect(result).toHaveLength(3)
  // not checking owner because order doesn't matter
  expect(result).toContainEqual(
    expect.objectContaining({ start: 0, end: 30, value: 300 })
  )
  expect(result).toContainEqual(
    expect.objectContaining({ start: 30, end: 60, value: 300 })
  )
  expect(result).toContainEqual(
    expect.objectContaining({ start: 60, end: 90, value: 300 })
  )
  testIfEnvyFree(3, result)
})

test('splits a "no trimming needed" asymetrical evaluation cake fairly', () => {
  // Person 0 has no preference so will divide evenly
  const person0 = [genFlatSeg(0, 90, 10)] // 900
  // Person 1 will have a tie for largest so won't trim
  const person1 = [genFlatSeg(0, 30, 5), genFlatSeg(30, 90, 10)] // 750
  // Person 2 prefers the last third
  const person2 = [genFlatSeg(0, 60, 5), genFlatSeg(60, 90, 10)] // 600
  const result = selfridgeConway([person0, person1, person2], 90)

  expect(result).toHaveLength(3)
  expect(result).toContainEqual(
    expect.objectContaining({ start: 0, end: 30, value: 300, owner: 0 })
  )
  expect(result).toContainEqual(
    expect.objectContaining({ start: 30, end: 60, value: 300, owner: 1 })
  )
  expect(result).toContainEqual(
    expect.objectContaining({ start: 60, end: 90, value: 300, owner: 2 })
  )
  testIfEnvyFree(3, result)
})

test('splits a more complex cake fairly', () => {
  const person0 = [genFlatSeg(0, 90, 10)] // 900
  const person1 = [genFlatSeg(0, 30, 5), genFlatSeg(30, 90, 10)]
  const person2 = [genFlatSeg(0, 60, 5), genFlatSeg(60, 90, 10)]
  const result = selfridgeConway([person0, person1, person2], 90)

  expect(result).toHaveLength(3)
  testIfEnvyFree(3, result)
})
