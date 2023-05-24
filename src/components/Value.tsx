import { useContext } from 'react'
import { GraphContext } from '../GraphContext'
import { DrawnSegment } from '../types'

interface ValueBubblesProps {
  segments: DrawnSegment[]
}

export const ValueBubbles = ({ segments }: ValueBubblesProps) => (
  <>
    {segments.map(({ x1, x2, y2, id }) => (
      <ValueBubble x={x1 + (x2 - x1) / 2} y={y2} value={y2} key={id} />
    ))}
  </>
)

interface ValueBubbleProps {
  x: number
  y: number
  value: number
}

export const ValueBubble = ({ x, y, value }: ValueBubbleProps) => {
  const { yScale } = useContext(GraphContext)
  const formatValue = (val: number) => yScale.invert(val).toFixed(1)
  return (
    <g transform={`translate(${x} ${y})`} key={x}>
      <circle r={15} fill={'#ccc'} className={'bubble'} />
      <text dominantBaseline="middle" textAnchor="middle">
        {formatValue(value)}
      </text>
    </g>
  )
}
