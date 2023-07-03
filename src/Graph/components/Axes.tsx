import { useContext } from 'react'
import {
  tickOffset,
  innerWidth,
  innerHeight,
  xAxisLabelOffset,
  yAxisLabelOffset,
} from '../graphConstants'
import { GraphContext } from '../GraphContext'

const gridColor = '#999'
const labelColor = 'black'
const labelSize = '2.5em'
export const AxisLeft = () => {
  const { yScale } = useContext(GraphContext)
  return (
    <>
      <text
        className="axis-label"
        textAnchor="middle"
        transform={`translate(${-yAxisLabelOffset},${
          innerHeight / 2
        }) rotate(-90)`}
        fill={labelColor}
        style={{fontSize: labelSize}}
      >
        Value
      </text>
      {yScale.ticks().map((tickValue) => (
        <g
          className="tick"
          transform={`translate(0, ${yScale(tickValue)})`}
          key={tickValue}
        >
          <line x2={innerWidth} stroke={gridColor} />
          <text
            key={tickValue}
            style={{ textAnchor: 'end' }}
            fill={labelColor}
            x={-tickOffset}
            dy=".32em"
          >
            {tickValue}
          </text>
        </g>
      ))}
    </>
  )
}

export const AxisBottom = () => {
  const { xScale } = useContext(GraphContext)
  return (
    <>
      <text
        className="axis-label"
        x={innerWidth / 2}
        y={innerHeight + xAxisLabelOffset}
        textAnchor="middle"
        fill={labelColor}
        style={{fontSize: labelSize}}
      >
        Portion
      </text>
      {xScale.ticks().map((tickValue) => (
        <g
          className="tick"
          key={tickValue}
          transform={`translate(${xScale(tickValue)},0)`}
        >
          <line y2={innerHeight}  stroke={gridColor}  />
          <text
            style={{ textAnchor: 'middle' }}
            dy=".7em"
            y={innerHeight + tickOffset}
            fill={labelColor}

          >
            {tickValue}
          </text>
        </g>
      ))}
    </>
  )
}
