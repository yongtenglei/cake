import { createContext } from 'react'
import { ScaleLinear, scaleLinear } from 'd3'

interface Graph {
  yScale: ScaleLinear<number, number, never>
  xScale: ScaleLinear<number, number, never>
  currentAgent: number
}

export const GraphContext = createContext<Graph>({
  yScale: scaleLinear(),
  xScale: scaleLinear(),
  currentAgent: 0
})
