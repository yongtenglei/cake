import { useContext } from 'react'
import { GraphContext } from '../../GraphContext'
import { roundValue } from '../../graphUtils'

interface ValueBubbleProps {
  editable: boolean
  onMouseDown: VoidFunction | null
  x: number
  y: number
  className?: string
}

export const ValueBubble = ({
  editable,
  onMouseDown,
  x,
  y,
  className,
}: ValueBubbleProps) => {
  const { yScale } = useContext(GraphContext)
  const formatValue = (val: number) => roundValue(yScale.invert(val))

  return (
    <g
      transform={`translate(${x} ${y})`}
      style={{
        cursor: editable ? 'ns-resize' : 'default',
        userSelect: 'none',
      }}
      onMouseDown={onMouseDown}
      className={className}
      tabIndex={editable ? 0 : null}
    >
      <circle r={15} fill="#ccc" stroke="black" />
      <text dominantBaseline="middle" textAnchor="middle">
        {formatValue(y)}
      </text>
    </g>
  )
}
