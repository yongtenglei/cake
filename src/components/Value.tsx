import { ScaleLinear } from 'd3'

interface ValueBubbleProps {
  x: number
  y: number
  value: number
  yScale: ScaleLinear<number, number, never>
}

export const ValueBubble = ({ x, y, value, yScale }: ValueBubbleProps) => {
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
