import {
  getValueForInterval,
  findCutLineByPercent,
  findCutLineByValue,
} from './getValue'
import { Segment } from '../../types'
import { genFlatSeg, genSlopedSeg, halfwayPointOfTriangleArea } from './testUtil'

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
    expect(getValueForInterval(segments, 10, 50)).toBe(400)
  })

  test('gets the middle value when provided with a start and end and divide the segments mid way', () => {
    const segments: Segment[] = [
      genFlatSeg(0, 10, 1), // 10
      genFlatSeg(10, 50, 10), // 400
      genFlatSeg(50, 100, 5), // 250
    ]
    expect(getValueForInterval(segments, 40, 60)).toBe(100 + 50)
  })
})

describe('sloped segments', () => {
  test('gets the value of a sloped segment', () => {
    const segments: Segment[] = [
      genSlopedSeg(0, 100, 0, 10), // 500
    ]
    expect(getValueForInterval(segments, 0, 100)).toBe(500)
  })
  test('gets the middle value in a sloped segment', () => {
    const segments: Segment[] = [
      genSlopedSeg(0, 100, 0, 10), // 500
    ]
    expect(getValueForInterval(segments, 40, 60)).toBe(100)
  })

  test('gets the middle value in a series of sloped and flat segments', () => {
    const segments: Segment[] = [
      genSlopedSeg(0, 40, 0, 10),
      genFlatSeg(40, 60, 10), // 200
      genSlopedSeg(60, 100, 10, 0),
    ]
    expect(getValueForInterval(segments, 20, 80)).toBe(150 + 200 + 150)
  })
})

describe('findCutLineByPercent', () => {
  test('finds the middle line on an unsloped chunk', () => {
    const segments: Segment[] = [genFlatSeg(0, 100, 10)]
    const line = findCutLineByPercent(segments, 0.5)
    expect(line).toBe(50)
  })

  test('finds the 1/3rd line on an unsloped chunk', () => {
    const segments: Segment[] = [genFlatSeg(0, 100, 10)]
    const line = findCutLineByPercent(segments, 1 / 3)
    expect(line).toBeCloseTo(33.333)
  })

  test('finds the middle line on a symmetrical segments', () => {
    const segments: Segment[] = [
      genFlatSeg(0, 10, 10),
      genFlatSeg(10, 40, 5),
      genFlatSeg(40, 60, 8),
      genFlatSeg(60, 90, 5),
      genFlatSeg(90, 100, 10),
    ]
    const line = findCutLineByPercent(segments, 0.5)
    expect(line).toBe(50)
  })

  test('finds the middle line on a positive slope single segment', () => {
    const segments: Segment[] = [genSlopedSeg(0, 100, 0, 10)] // 500
    const line = findCutLineByPercent(segments, 0.5)
    expect(getValueForInterval(segments, 0, line)).toBeCloseTo(250)
    expect(line).toBeCloseTo(halfwayPointOfTriangleArea)
  })

  test('finds the middle line on a negative slope single segment', () => {
    const segments: Segment[] = [genSlopedSeg(0, 100, 10, 0)] // 500
    const line = findCutLineByPercent(segments, 0.5)
    expect(getValueForInterval(segments, 0, line)).toBeCloseTo(250)
    expect(line).toBeCloseTo(100 - halfwayPointOfTriangleArea)
  })

  test('finds the middle line on a sloped segment between two flat ones', () => {
    const segments: Segment[] = [
      genFlatSeg(0, 25, 10), // 250
      genSlopedSeg(25, 75, 0, 10), // 250
      genFlatSeg(75, 100, 10), // 250
    ]
    const line = findCutLineByPercent(segments, 0.5)
    expect(getValueForInterval(segments, 0, line)).toBeCloseTo(750 / 2)
    expect(line).toBeCloseTo(25 + halfwayPointOfTriangleArea * 0.5)
  })
})

describe('findCutLineByValue', () => {
  test('finds the 25 line when 1/4th of value requested', () => {
    const segments: Segment[] = [genFlatSeg(0, 100, 10)] // 1000
    const line = findCutLineByValue(segments, 250)
    expect(line).toBe(25)
  })

  test('finds the middle line when given boundary constraints', () => {
    const segments: Segment[] = [genFlatSeg(0, 100, 10)] // 1000
    const line = findCutLineByValue(segments, 100, {
      startBound: 50,
      endBound: 70,
    })
    expect(line).toBe(60)
  })

  test('finds the middle line in a slope', () => {
    const segments: Segment[] = [genSlopedSeg(0, 100, 0, 10)] // 500

    const line = findCutLineByValue(segments, 250)

    expect(line).toBeCloseTo(halfwayPointOfTriangleArea)
  })
  
  test('finds the middle line in a slope when given boundary constraints', () => {
    const segments: Segment[] = [genSlopedSeg(0, 100, 0, 10)] // 500
    const areaFrom50To70 = 120

    const line = findCutLineByValue(segments, areaFrom50To70 / 2, {
      startBound: 50,
      endBound: 70,
    })
    const part1 = getValueForInterval(segments, 50, line)
    const part2 = getValueForInterval(segments, line, 70)

    expect(line).toBeCloseTo(60.83)
    expect(part1).toBeCloseTo(part2)
  })
})
