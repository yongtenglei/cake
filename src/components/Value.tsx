import { useContext } from 'react'
import { GraphContext } from '../GraphContext'

interface ValueBubbleProps {
  x: number
  y: number
  value: number
}

export const ValueBubble = ({ x, y, value }: ValueBubbleProps) => {
  const { yScale } = useContext(GraphContext)
  const formatValue = (val: number) => yScale.invert(val).toFixed(1)
  return (
    <g transform={`translate(${x} ${y - 10})`} key={x}>
      <circle r={15} fill={'#ccc'} className={'bubble'} />
      <text dominantBaseline="middle" textAnchor="middle">
        {formatValue(value)}
      </text>
    </g>
  )
}
