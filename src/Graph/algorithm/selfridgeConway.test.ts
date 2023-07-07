import { selfridgeConway } from './selfridgeConway'
import {
  genFlatSeg,
  genSlopedSeg,
  testIfEnvyFree,
  genRandomSegs,
} from './testUtil'
import { defaultCakeSize } from '../graphConstants'

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

test('splits a simple "trimming needed" cake fairly', () => {
  const person0 = [
    genFlatSeg(0, 30, 10),
    genFlatSeg(30, 60, 5),
    genFlatSeg(60, 90, 10),
  ]
  const person1 = [genFlatSeg(0, 90, 10)]
  const person2 = [genFlatSeg(0, 60, 5), genFlatSeg(60, 90, 10)]
  const result = selfridgeConway([person0, person1, person2], 90)

  testIfEnvyFree(3, result)
})

/* Walkthrough of above example. There are a lot of ties in this example
  so feel free to make a better one.

  initial cut, post-sorting by P1
  [
    { end: 65, start: 25, values: [250, 400, 225] },
    { end: 25, start: 0,  values: [250, 250, 125] },
    { end: 90, start: 65, values: [250, 250, 250] }
  ]

  P1 post trimming (slice 0 trimmed down, see the hole from 25-40)
  [
    { end: 65, start: 40, values: [150, 250, 150] },
    { end: 25, start: 0, values: [250, 250, 125] },
  ]

  P2 chooses { end: 90, start: 65, values: [250, 250, 250] },
  leaves the following
  [
    { end: 65, start: 40, values: [150, 250, 150] },
    { end: 25, start: 0, values: [250, 250, 125] }
  ]

  P1 must choose the piece they trimmed,
  so takes { end: 65, start: 40, values: [150, 250, 150] },
  and leaves the following
  [{ end: 65, start: 40, values: [150, 250, 150] }]

  P0 takes the last piece

  then the trimmings are split by P2 (the non-trimmed piece picker)
  [
    { end: 30, start: 25, values: [50, 50, 25] },
    { end: 35, start: 30, values: [25, 50, 25] },
    { end: 40, start: 35, values: [25, 50, 25] }
  ]

  P1 takes a slice
  { start: 25, end: 30, values: [50, 50, 25]}
  
  Then P0
  { start: 30, end: 35, values: [25, 50, 25] }
  
  P2 gets the remaining
  { end: 40, start: 35, values: [25, 50, 25] }
*/

// This test is non-probablistic, so run it many times 
// to ensure edge cases are (probably) covered.
test('splits randomly generated preferences fairly', () => {
  const segs = [
    genRandomSegs(defaultCakeSize),
    genRandomSegs(defaultCakeSize),
    genRandomSegs(defaultCakeSize),
  ]
  const result = selfridgeConway(segs, defaultCakeSize)
  testIfEnvyFree(3, result)
})
