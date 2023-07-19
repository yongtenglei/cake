import { useContext } from 'react'
import { GraphContext } from '../../GraphContext'
import { roundValue } from '../../graphUtils'

interface BubbleProps {
  y: number
}
const Bubble = ({ y }: BubbleProps) => {
  const { yScale } = useContext(GraphContext)
  return (
    <>
      <circle r={15} fill="#ddd" stroke="black" />
      <text dominantBaseline="middle" textAnchor="middle">
        {roundValue(yScale.invert(y))}
      </text>
    </>
  )
}

interface ValueBubbleProps {
  x: number
  y: number
}

export const ValueBubble = ({ x, y }: ValueBubbleProps) => (
  <g transform={`translate(${x} ${y})`}>
    <Bubble y={y} />
  </g>
)

interface MovableValueBubbleProps {
  x: number
  y: number
  onMouseDown: VoidFunction
  className?: string
}

export const MovableValueBubble = ({
  x,
  y,
  onMouseDown,
  className,
}: MovableValueBubbleProps) => (
  <g
    transform={`translate(${x} ${y})`}
    onFocus={onMouseDown}
    onMouseDown={onMouseDown}
    className={className}
    tabIndex={0}
  >
    <Bubble y={y} />
  </g>
)
