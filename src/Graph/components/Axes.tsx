import { useContext } from 'react'
import {
  tickOffset,
  getInnerHeight,
  getInnerWidth,
  yAxisLabelOffset,
} from '../graphConstants'
import { GraphContext } from '../GraphContext'

const gridColor = '#ddd'
const labelColor = '#333'
const labelSize = '22px'

interface AxisProps {
  simple?: boolean
}

export const AxisLeft = ({ simple = false }: AxisProps) => {
  const { yScale, width, height } = useContext(GraphContext)
  const innerHeight = getInnerHeight(height)
  const innerWidth = getInnerWidth(width)
  return (
    <g style={{ userSelect: 'none' }}>
      <text
        className="axis-label"
        textAnchor="middle"
        transform={`translate(${-yAxisLabelOffset},${innerHeight / 2}) rotate(-90)`}
        fill={labelColor}
        style={{ fontSize: labelSize }}
      >
        Preference Value
      </text>

      {yScale.ticks(simple ? 5 : 10).map((tickValue) => (
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
    </g>
  )
}

export const AxisBottom = ({ simple = false }: AxisProps) => {
  const { xScale, width, height } = useContext(GraphContext)
  const innerHeight = getInnerHeight(height)
  // const innerWidth = getInnerWidth(width)
  
  const [min, max] = xScale.domain()

  let tickNum = 10
  if(simple) {
    tickNum = 5
  }
  if(max < 10) {
    tickNum = max
  }
  const ticks = xScale.ticks(tickNum)
  // ensure there's always an ending tick
  if(ticks[ticks.length-1] !== max) {
    ticks.push(max)
  }
  return (
    <g style={{ userSelect: 'none' }}>
      {/* <text
        className="axis-label"
        x={innerWidth / 2}
        y={innerHeight + xAxisLabelOffset}
        textAnchor="middle"
        fill={labelColor}
        style={{ fontSize: labelSize }}
      >
        Portion
      </text> */}
      {ticks.map((tickValue) => (
        <g
          className="tick"
          key={tickValue}
          transform={`translate(${xScale(tickValue)},0)`}
        >
          <line y2={innerHeight} stroke={gridColor} />
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
    </g>
  )
}
