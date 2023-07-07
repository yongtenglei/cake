import { createContext } from 'react'
import { ScaleLinear, scaleLinear } from 'd3'
import { height, width } from './graphConstants'

interface Graph {
  yScale: ScaleLinear<number, number, never>
  xScale: ScaleLinear<number, number, never>
  currentAgent: number
  height: number
  width: number
}

export const GraphContext = createContext<Graph>({
  yScale: scaleLinear(),
  xScale: scaleLinear(),
  currentAgent: 0,
  height: height,
  width: width,
})
