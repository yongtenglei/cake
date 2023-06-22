import { useContext, useState } from 'react'
import { GraphContext } from '../GraphContext'
import { DrawnSegment } from '../../types'
import { roundValue } from '../graphUtils'
import { innerHeight, innerWidth } from '../constants'

interface ValueBubblesProps {
  segments: DrawnSegment[]
  editable: boolean
  setMovingId: (id: number) => void
}

export const ValueBubbles = ({
  segments,
  editable,
  setMovingId,
}: ValueBubblesProps) => {
  const { yScale } = useContext(GraphContext)
  const formatValue = (val: number) => roundValue(yScale.invert(val))

  return (
    <g x={0} y={0} height={innerHeight} width={innerWidth}>
      {segments.map(({ x1, x2, y2, id }) => {
        const x = x1 + (x2 - x1) / 2
        return (
          <g
            transform={`translate(${x} ${y2})`}
            key={id}
            style={{
              cursor: editable ? 'ns-resize' : 'default',
              userSelect: 'none',
            }}
            onMouseDown={editable ? () => setMovingId(id) : null}
          >
            <circle r={15} fill="#ccc" stroke="black" />
            <text dominantBaseline="middle" textAnchor="middle">
              {formatValue(y2)}
            </text>
          </g>
        )
      })}
    </g>
  )
}
