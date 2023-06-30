import { selfridgeConway } from './selfridgeConway'
import { genFlatSeg, genSlopeSeg } from './testUtil'
import { getValueForInterval } from './getValue'
import { testIfEnvyFree } from './testUtil'

test('splits a "no trimming needed" uniform evaluation cake into even (almost) thirds', async () => {
  // Use a cake size of 90 so it's evenly divisible into thirds.
  const person1 = [genFlatSeg(0, 90, 10)] // 900
  const person2 = [genFlatSeg(0, 90, 10)] // 900
  const person3 = [genFlatSeg(0, 90, 10)] // 900
  const result = await selfridgeConway([person1, person2, person3], 90)

  expect(result).toHaveLength(3)
  expect(result[0]).toMatchObject({ owner: 1, start: 0, end: 30, value: 300 })
  expect(result[1]).toMatchObject({ owner: 2, start: 30, end: 60, value: 300 })
  expect(result[2]).toMatchObject({ owner: 3, start: 60, end: 90, value: 300 })
})

test('splits a "no trimming needed" asymetrical evaluation cake fairly', async () => {
  // Person 1 has no preference so will divide evenly
  const person1 = [genFlatSeg(0, 90, 10)] // 900
  // Person 2 will have a tie for largest so won't trim
  const person2 = [genFlatSeg(0, 30, 5), genFlatSeg(30, 90, 10)] // 750
  // Person 3 prefers the last third
  const person3 = [genFlatSeg(0, 60, 5), genFlatSeg(60, 90, 10)] // 600
  const result = await selfridgeConway([person1, person2, person3], 90)
  expect(result).toHaveLength(3)
  
  expect(result[0]).toMatchObject({ owner: 1, start: 0, end: 30, value: 300 })
  expect(result[1]).toMatchObject({ owner: 2, start: 30, end: 60, value: 300 })
  expect(result[2]).toMatchObject({ owner: 3, start: 60, end: 90, value: 300 })
})