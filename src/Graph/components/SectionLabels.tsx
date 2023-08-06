import React, { useContext } from 'react'
import { GraphContext } from '../GraphContext'
import { getInnerHeight, getInnerWidth } from '../graphConstants'

const offset = 30
export const SectionLabels = () => {
  const { height, width, xScale, labels } = useContext(GraphContext)

  return (
    <g transform={`translate(0,-${offset})`} style={{ userSelect: 'none' }}>
      {labels.length === 0 ? (
        <rect x={0} y={0} width={getInnerWidth(width)} height={offset} fill="#ddd" />
      ) : (
        labels.map((label) => {
          const x1 = xScale(label.start)
          const x2 = xScale(label.end)
          const labelWidth = x2 - x1
          const middle = x1 + labelWidth / 2
          return (
            <React.Fragment key={label.id}>
              <rect x={x1} y={0} width={labelWidth} height={offset} fill={label.color} />
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
                width={labelWidth}
                height={getInnerHeight(height)}
                fill={label.color}
                fillOpacity={0.2}
              />
            </React.Fragment>
          )
        })
      )}
    </g>
  )
}

interface TinySectionLabelsProps {
  margin: {
    top: number
    left: number
    bottom: number
  }
  height: number
  full: boolean
}

export const TinySectionLabels = ({ margin, height, full }: TinySectionLabelsProps) => {
  const { xScale, labels } = useContext(GraphContext)
  return (
    <g transform={`translate(${margin.left},0)`}>
      {labels.map((label) => {
        const x1 = xScale(label.start)
        const x2 = xScale(label.end)
        const width = x2 - x1
        const middle = x1 + width / 2
        return (
          <React.Fragment key={label.id}>
            <rect x={x1} y={0} width={width} height={margin.top} fill={label.color} />
            <text
              y={margin.top / 2}
              x={middle}
              dominantBaseline="middle"
              textAnchor="middle"
              fontSize={12}
            >
              {label.name}
            </text>
            {full ? (
              <rect
                y={margin.top}
                x={x1}
                width={width}
                height={height}
                fill={label.color}
                fillOpacity={0.4}
              />
            ) : null}
          </React.Fragment>
        )
      })}
    </g>
  )
}
