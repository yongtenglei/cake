import { cutAndChoose } from './cutAndChoose'
import { genFlatSeg, genSlopeSeg } from './testUtil'
import { testIfEnvyFree } from './testUtil'

test('splits a uniform flat value graph evenly in half', async () => {
  const person1 = [genFlatSeg(0, 100, 10)] // 1000
  const person2 = [genFlatSeg(0, 100, 10)] // 1000
  const result = await cutAndChoose([person1, person2])
  expect(result).toHaveLength(2)
  // Each agent values the cake uniformly for a total of 1000 value.
  // The results should be an even 500/500 split.
  // Actual order doesn't matter but it's difficult to test that.
  expect(result[0]).toMatchObject({ owner: 2, start: 0, end: 50, value: 500 })
  expect(result[1]).toMatchObject({ owner: 1, start: 50, end: 100, value: 500 })
  testIfEnvyFree(2, result)
})

test('splits a seesaw-like graph in an envy-free way', async () => {
  const person1 = [genFlatSeg(0, 50, 10), genFlatSeg(50, 100, 5)] // 750, halfway point is 37.5%
  const person2 = [genFlatSeg(0, 50, 5), genFlatSeg(50, 100, 10)] // 750, halfway point is 67.5%
  const result = await cutAndChoose([person1, person2])
  expect(result).toHaveLength(2)
  // The slices should be 375 value on both sides for person 1,
  // but the second slice is better for person 2.
  // Note that the 100 point "resolution" rounds the result slightly.
  expect(result[0]).toMatchObject({ owner: 1, start: 0, end: 38, value: 380 })
  expect(result[1]).toMatchObject({ owner: 2, start: 38, end: 100, value: 560 })
  testIfEnvyFree(2, result)
})

test('splits a seesaw-like sloped graph in an envy-free way', async() => {
  const person1 = [genSlopeSeg(0, 100, 10, 0)] // 500, halfway point is ~30%
  const person2 = [genSlopeSeg(0, 100, 0, 10)] // 500, halfway point is ~70%
  const result = await cutAndChoose([person1, person2])
  expect(result).toHaveLength(2)
  expect(result[0]).toMatchObject({ owner: 1, start: 0, end: 30, value: 255 })
  expect(result[1]).toMatchObject({ owner: 2, start: 30, end: 100, value: 455 })
  testIfEnvyFree(2, result)
})

test('splits a tricky case in an envy-free way', async() => {
  const person1 = [
    genFlatSeg(0, 40, 1),
    genFlatSeg(40, 65, 8.3),
    genFlatSeg(65, 100, 1),
  ]
  const person2 = [
    genFlatSeg(0, 30, 4),
    genFlatSeg(30, 50, 8),
    genFlatSeg(50, 70, 6),
    genFlatSeg(70, 90, 8),
    genFlatSeg(90, 100, 0),
  ]
  const result = await cutAndChoose([person1, person2])
  expect(result).toHaveLength(2)
  testIfEnvyFree(2, result)
})

//   Solution slices for the above look like this. 
//   The split is unfair due to the cake resolution of 100 parts.
//{
//   owner: 1,
//   start: 0,
//   end: 53,
//   value: 147.9,
//   valuePercent: 0.5235398230088496
// } {
//   owner: 1,
//   start: 53,
//   end: 100,
//   value: 134.60000000000002,
//   valuePercent: 0.4764601769911505
// } {
//   owner: 2,
//   start: 0,
//   end: 53,
//   value: 298,
//   valuePercent: 0.5321428571428571
// } {
//   owner: 2,
//   start: 53,
//   end: 100,
//   value: 262,
//   valuePercent: 0.46785714285714286
// }

test('splits a tricky sloped case in an envy-free way', async() => {
  const person1 = [
    genFlatSeg(0, 45, 3.5),
    genSlopeSeg(45, 100, 7.5, 6.5),
  ]
  const person2 = [
    genSlopeSeg(0, 60, 8, 9.5),
    genSlopeSeg(60, 100, 2.5, 5.5)
  ]
  const result = await cutAndChoose([person1, person2])
  expect(result).toHaveLength(2)
  testIfEnvyFree(2, result)
})

// The following experimental results created the above test case
// [
// [
//   {
//       "start": 0,
//       "startValue": 3.5,
//       "end": 46,
//       "endValue": 3.5,
//       "id": 1
//   },
//   {
//       "start": 46,
//       "startValue": 7.444444444444445,
//       "end": 100,
//       "endValue": 6.694444444444445,
//       "id": 2
//   }
// ],
// [
//   {
//       "start": 0,
//       "startValue": 7.9,
//       "end": 63,
//       "endValue": 9.36111111111111,
//       "id": 1
//   },
//   {
//       "start": 63,
//       "startValue": 2.666666666666667,
//       "end": 100,
//       "endValue": 5.5,
//       "id": 2
//   }
// ]
// ]