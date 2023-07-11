import { useContext } from 'react'
import { getAgentColor } from '../../constants'
import { Preferences, Segment, Slice } from '../../types'
import { GraphContext } from '../GraphContext'
import { useConvertSegToPixels, createScales } from '../graphUtils'
import { Segments } from './Segments'

const width = 400
const height = 100
const spaceBetween = 20
const cuttingLineExtension = 25

const margin = {
  top: cuttingLineExtension,
  bottom: cuttingLineExtension,
  left: 150,
  right: 70,
}

interface ResultsGraphsProps {
  preferences: Preferences
  results: Slice[]
}

export const ResultsGraphs = ({ results, preferences }: ResultsGraphsProps) => {
  const { labels, cakeSize } = useContext(GraphContext)
  const { yScale, xScale } = createScales({
    innerWidth: width,
    innerHeight: height,
    cakeSize,
  })

  const totalHeight =
    (height + spaceBetween) * preferences.length + margin.top + margin.bottom
  const totalWidth = width + margin.left + margin.right
  return (
    <GraphContext.Provider
      value={{
        yScale,
        xScale,
        height,
        width,
        labels,
        cakeSize,
      }}
    >
      <svg width={totalWidth} height={totalHeight} style={{ border: '1px solid red' }}>
        <text textAnchor="end" x={totalWidth} y={0} dominantBaseline={'hanging'}>
          Portion Size
        </text>

        <g transform={`translate(${margin.left}, ${margin.top})`}>
          {preferences.map((segments, i) => {
            const slices = results.filter((slice) => slice.owner === i)
            const totalShareSize = slices.reduce(
              (acc, slice) => acc + (slice.end - slice.start),
              0
            )
            const totalSharePercent = (totalShareSize / cakeSize) * 100
            return (
              <g transform={`translate(${0},${(height + spaceBetween) * i})`} key={i}>
                {/* Graphs */}
                <TinyGraph
                  segments={segments}
                  height={height}
                  results={slices}
                  agent={i}
                />

                {/* Graph Owner */}
                <text textAnchor="end" x={-10} y={height / 2}>
                  Person {i + 1}'s Portion
                </text>

                {/* Percentages */}
                <text
                  x={width + margin.right/2}
                  y={height / 2}
                  textAnchor="middle"
                  dominantBaseline="middle"
                >
                  {totalSharePercent.toFixed(1)}%
                </text>
              </g>
            )
          })}
        </g>

        {/* Cut lines */}
        {results.map(({ start }, i) => {
          return i === 0 ? null : (
            <g transform={`translate(${xScale(start) + margin.left}, 0)`}>
              <line
                key={start}
                y2={totalHeight - cuttingLineExtension}
                strokeDasharray={8}
                stroke="black"
                strokeWidth={2}
              />
              <text y={totalHeight - 5} textAnchor="middle">
                {start.toFixed(cakeSize >= 10 ? 1 : 2)}
              </text>
            </g>
          )
        })}
      </svg>
    </GraphContext.Provider>
  )
}

interface TinyGraphProps {
  segments: Segment[]
  height: number
  results: Slice[]
  agent: number
}

const TinyGraph = ({ segments, height, results, agent }: TinyGraphProps) => {
  const { width, xScale } = useContext(GraphContext)
  const convertToPixels = useConvertSegToPixels()
  const maskId = `resultMask${agent}`

  const segSvg = segments
    .map(convertToPixels)
    .map(({ x1, x2, y1, y2 }) => (
      <path
        key={x1}
        fill={'#ddd'}
        d={`M${x1},${y1} L${x2},${y2} L${x2},${height} L${x1},${height}`}
      />
    ))

  return (
    <>
      {/* Segments display in gray */}
      <g fillOpacity={0.5}>{segSvg}</g>

      {/* Mask colored sections to match segments */}
      <mask id={maskId}>{segSvg}</mask>

      {/* Colored sections */}
      {results.map((slice) => (
        <rect
          key={slice.start}
          x={xScale(slice.start)}
          width={xScale(slice.end)}
          y={0}
          height={height}
          fill={getAgentColor(agent)}
          mask={`url(#${maskId})`}
        />
      ))}

      {/* Border for the whole graph */}
      <rect width={width} height={height} stroke="#333" fill="none" strokeWidth={1} />
    </>
  )
}
