import { useContext } from 'react'
import { getAgentColor } from '../../colors'
import { Segment } from '../../types'
import { GraphContext } from '../GraphContext'
import { margin } from '../graphConstants'
import { useConvertSegToPixels } from '../graphUtils'
import { AxisBottom, AxisLeft } from './Axes'
import { ValueBubbles } from './ResizeHandles'
import { SectionLabels } from './SectionLabels'
import { Segments } from './Segments'

interface ViewGraphProps {
  segments: Segment[]
  agent: number
  simple?: boolean
}
/**
 * A very simple, view-only graph
 */
export const ViewGraph = ({ segments, agent, simple = false }: ViewGraphProps) => {
  const { height, width } = useContext(GraphContext)

  const convertToPixels = useConvertSegToPixels()
  const pixelSegs = segments.map(convertToPixels)

  return (
    <svg width={width} height={height}>
      <g transform={`translate(${margin.left},${margin.top})`}>
        <SectionLabels />

        <AxisBottom simple={simple} />
        <AxisLeft simple={simple} />

        <Segments key={agent} segments={pixelSegs} color={getAgentColor(agent)} />

        <ValueBubbles segments={pixelSegs} />
      </g>
    </svg>
  )
}
