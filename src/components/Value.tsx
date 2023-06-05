import { useContext, useState } from 'react'
import { GraphContext } from '../GraphContext'
import { DrawnSegment } from '../types'
import { roundValue } from '../utils/graphUtils'
import { innerHeight, innerWidth } from '../spacing'
import './Value.css'

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

  // use `editable`
  return (
    <g x={0} y={0} height={innerHeight} width={innerWidth}>
      {segments.map(({ x1, x2, y2, id }) => {
        const x = x1 + (x2 - x1) / 2
        return (
          <g
            transform={`translate(${x} ${y2})`}
            key={id}
            className="vertGrabArea"
            onMouseDown={() => setMovingId(id)}
          >
            <circle r={15} fill="#ccc" className="bubble" />
            <text dominantBaseline="middle" textAnchor="middle">
              {formatValue(y2)}
            </text>
          </g>
        )
      })}
    </g>
  )
}
