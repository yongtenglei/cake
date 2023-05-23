import {tickOffset, innerWidth, innerHeight, xAxisLabelOffset, yAxisLabelOffset} from '../spacing'
import './Axes.css'

export const AxisLeft = ({ yScale }) => (
  <>
    <text
      className="axis-label"
      textAnchor="middle"
      transform={`translate(${-yAxisLabelOffset},${innerHeight / 2}) rotate(-90)`}
    >
      Value
    </text>
    {yScale.ticks().map((tickValue) => (
      <g
        className="tick"
        transform={`translate(0, ${yScale(tickValue)})`}
        key={tickValue}
      >
        <line x2={innerWidth} />
        <text
          key={tickValue}
          style={{ textAnchor: 'end' }}
          x={-tickOffset}
          dy=".32em"
        >
          {tickValue}
        </text>
      </g>
    ))}
  </>
)

export const AxisBottom = ({ xScale }) => {
  return null
  return (
  <>
    <text
      className="axis-label"
      x={innerWidth / 2}
      y={innerHeight + xAxisLabelOffset}
      textAnchor="middle"
    >
      Portion
    </text>
    {xScale.ticks().map((tickValue) => (
      <g
        className="tick"
        key={tickValue}
        transform={`translate(${xScale(tickValue)},0)`}
      >
        <line y2={innerHeight} />
        <text
          style={{ textAnchor: 'middle' }}
          dy=".7em"
          y={innerHeight + tickOffset}
        >
          {tickValue}
        </text>
      </g>
    ))}
  </>
)}
