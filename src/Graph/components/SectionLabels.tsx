import React, { useContext } from 'react'
import { GraphContext } from '../GraphContext'
import { margin, getInnerHeight } from '../graphConstants'

const offset = 30
export const SectionLabels = () => {
  const { height, yScale, xScale, labels } = useContext(GraphContext)

  return (
    <>
      <g transform={`translate(0,-${offset})`}>
        {labels.map((label) => {
          const x1 = xScale(label.start)
          const x2 = xScale(label.end)
          const width = x2 - x1
          const middle = x1 + width / 2
          //shadeHexColor
          return (
            <React.Fragment key={label.id}>
              <rect x={x1} y={0} width={width} height={offset} fill={label.color} />
              <text
                y={offset / 2}
                x={middle}
                dominantBaseline="middle"
                textAnchor="middle"
                fontSize={14}
              >
                {label.name}
              </text>
              <rect
                y={offset}
                x={x1}
                width={width}
                height={getInnerHeight(height)}
                fill={label.color}
                fillOpacity={0.4}
              />
            </React.Fragment>
          )
        })}
      </g>
    </>
  )
}
