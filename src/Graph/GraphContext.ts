import { createContext } from 'react'
import { ScaleLinear, scaleLinear } from 'd3'
import { defaultCakeSize, defaultGraphHeight, defaultGraphWidth } from './graphConstants'
import { SectionLabel } from '../types'

interface Graph {
  yScale: ScaleLinear<number, number, never>
  xScale: ScaleLinear<number, number, never>
  height: number
  width: number
  labels: SectionLabel[]
  cakeSize: number
  names?: string[] | undefined
  namesPossessive?: string[] | undefined
}
export const GraphContext = createContext<Graph>({
  yScale: scaleLinear(),
  xScale: scaleLinear(),
  height: defaultGraphHeight,
  width: defaultGraphWidth,
  labels: [],
  cakeSize: defaultCakeSize,
  names: [],
  namesPossessive: []
})
