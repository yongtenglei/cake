import { getValueForInterval } from './getValue'
import { Segment } from '../../types'
import { genFlatSeg, genSlopeSeg } from './testUtil'

describe('flat segments', () => {
  test('gets the value for a single flat interval', () => {
    const segments: Segment[] = [genFlatSeg(0, 100, 5)]
    expect(getValueForInterval(segments, 0, 100)).toBe(500)
  })
  
  test('gets the value for a multiple flat intervals', () => {
    const segments: Segment[] = [
      genFlatSeg(0, 10, 1), // 10
      genFlatSeg(10, 50, 10), // 400
      genFlatSeg(50, 100, 5), // 250
    ]
    expect(getValueForInterval(segments, 0, 100)).toBe(10 + 400 + 250)
  })
  
  test('gets the middle value when provided with an exact matching start and end', () => {
    const segments: Segment[] = [
      genFlatSeg(0, 10, 1), // 10
      genFlatSeg(10, 50, 10), // 400
      genFlatSeg(50, 100, 5), // 250
    ]
    expect(getValueForInterval(segments, 10, 50),).toBe(400)
  })
  
  
  test('gets the middle value when provided with a start and end and divide the segments mid way', () => {
    const segments: Segment[] = [
      genFlatSeg(0, 10, 1), // 10
      genFlatSeg(10, 50, 10), // 400
      genFlatSeg(50, 100, 5), // 250
    ]
    expect(getValueForInterval(segments, 40, 60),).toBe(100 + 50)
  })
})

describe('sloped segments', () => {
  test('gets the value of a sloped segment', () => {
    const segments: Segment[] = [
      genSlopeSeg(0, 100, 0, 10), // 500
    ]
    expect(getValueForInterval(segments, 0, 100),).toBe(500)
  })
  test('gets the middle value in a sloped segment', () => {
    const segments: Segment[] = [
      genSlopeSeg(0, 100, 0, 10), // 500
    ]
    expect(getValueForInterval(segments, 40, 60)).toBe(100)
  })


  test('gets the middle value in a series of sloped and flat segments', () => {
    const segments: Segment[] = [
      genSlopeSeg(0, 40, 0, 10),
      genFlatSeg(40, 60, 10), // 200
      genSlopeSeg(60, 100, 10, 0)
    ]
    expect(getValueForInterval(segments, 20, 80)).toBe(150 + 200 + 150)
  })
})