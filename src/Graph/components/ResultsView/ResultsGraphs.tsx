import { useContext } from 'react'
import { getAgentColor } from '../../../constants'
import { Portion, Preferences, Segment, Slice } from '../../../types'
import { GraphContext } from '../../GraphContext'
import { useConvertSegToPixels, createScales } from '../../graphUtils'

const width = 500
const height = 100
const spaceBetween = 20
const cuttingLineExtension = 25

const margin = {
  top: cuttingLineExtension,
  bottom: cuttingLineExtension + 10,
  left: 150,
  right: 70,
}

interface ResultsGraphsProps {
  preferences: Preferences
  results: Portion[]
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

  const allCutlines = results
    .reduce((acc, result) => [...acc, ...result.edges.map((edge) => edge[0])], [])
    .sort()
  // remove initial zero
  allCutlines.shift()
  return (
    <section>
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
        <h2>Resource Split</h2>
        <svg width={totalWidth} height={totalHeight}>
          {/* Portion Size (percentage) label */}
          <text textAnchor="end" x={totalWidth} y={0} dominantBaseline={'hanging'}>
            Portion Size
          </text>

          <g transform={`translate(${margin.left}, ${margin.top})`}>
            {preferences.map((segments, i) => {
              return (
                <g transform={`translate(${0},${(height + spaceBetween) * i})`} key={i}>
                  {/* Graphs */}
                  <TinyGraph
                    segments={segments}
                    height={height}
                    result={results[i]}
                    agent={i}
                  />

                  {/* Graph Owner */}
                  <text textAnchor="end" x={-10} y={height / 2}>
                    Person {i + 1}'s Portion
                  </text>
                </g>
              )
            })}

            {/* Percentages */}
            {results.map((result, i) => {
              const totalSharePercent = result.percentValues[i] * 100
              return (
                <g
                  transform={`translate(${width},${(height + spaceBetween) * i})`}
                  key={i}
                >
                  <text
                    x={margin.right / 2}
                    y={height / 2}
                    textAnchor="middle"
                    dominantBaseline="middle"
                  >
                    <title>{totalSharePercent.toFixed(2)}%</title>
                    {totalSharePercent.toFixed(1)}%
                  </text>
                </g>
              )
            })}

            {/* Cut lines */}
            {allCutlines.map((cut, i) => {
              const offset = i % 2 === 0 ? 0 : 18
              return (
                <g transform={`translate(${xScale(cut)}, ${-margin.top})`} key={cut}>
                  <line
                    y2={totalHeight - cuttingLineExtension - offset}
                    strokeDasharray={8}
                    stroke="black"
                    strokeWidth={2}
                  />
                  <text y={totalHeight - offset - 12} textAnchor="middle">
                    <title>{cut.toFixed(2)}</title>
                    {cut.toFixed(cakeSize >= 10 ? 0 : 1)}
                  </text>
                </g>
              )
            })}
          </g>
        </svg>
      </GraphContext.Provider>
    </section>
  )
}

interface TinyGraphProps {
  segments: Segment[]
  height: number
  result: Portion
  agent: number
}

const TinyGraph = ({ segments, height, result, agent }: TinyGraphProps) => {
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
      {result.edges.map(([start, end]) => (
        <rect
          key={start}
          x={xScale(start)}
          width={xScale(end) - xScale(start)}
          y={0}
          height={height}
          fill={getAgentColor(agent)}
          mask={`url(#${maskId})`}
        />
      ))}

      {/* Border for the whole graph */}
      <rect width={width} height={height} stroke="#666" fill="none" strokeWidth={1} />
    </>
  )
}
