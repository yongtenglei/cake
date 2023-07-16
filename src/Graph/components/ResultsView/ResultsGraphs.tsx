import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  FormControlLabel,
  Switch,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from '@mui/material'
import Color from 'color'
import { useContext, useState } from 'react'
import { getAgentColor } from '../../../colors'
import { Portion, Preferences, Segment } from '../../../types'
import { formatNumber } from '../../../utils/formatUtils'
import { GraphContext } from '../../GraphContext'
import { useConvertSegToPixels } from '../../graphUtils'
import { TinySectionLabels } from '../SectionLabels'

const spaceBetween = 20
const cuttingLineExtension = 25

const margin = {
  top: cuttingLineExtension,
  bottom: cuttingLineExtension + 10,
  left: 165,
  right: 110,
}

interface ResultsGraphsProps {
  preferences: Preferences
  results: Portion[]
  names?: string[]
  namesPossessive?: string[]
}

const getPortionSize = (result: Portion, cakeSize: number) => {
  const totalArea = result.edges.reduce(
    (total, [start, end]) => total + end - start,
    0
  )
  return (totalArea / cakeSize) * 100
}

export const ResultsGraphs = ({
  results,
  preferences,
  names = [],
  namesPossessive = [],
}: ResultsGraphsProps) => {
  const { labels, cakeSize, width, height, xScale } = useContext(GraphContext)

  const [showLabels, setShowLabels] = useState(false)

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
      <h2>Resource Split</h2>
      {labels.length ? (
        <Box>
          <FormControlLabel
            control={
              <Switch
                onChange={(e) => setShowLabels(e.target.checked)}
                checked={showLabels}
              />
            }
            label="Show labels"
          />
        </Box>
      ) : null}
      <Box component="svg" width={totalWidth} height={totalHeight} sx={{ fontSize: 18 }}>
        {/* Portion Size (percentage) label */}
        <text textAnchor="end" x={totalWidth} y={0} dominantBaseline={'hanging'}>
          Portion Size
        </text>

        {showLabels ? <TinySectionLabels margin={margin} height={totalHeight} /> : null}

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
                  {(namesPossessive[i] ?? `Person ${i + 1}'s`) + ' Portion'}
                </text>
              </g>
            )
          })}

          {/* Percentages */}
          {results.map((result, i) => {
            const totalSharePercent = getPortionSize(result, cakeSize)
            return (
              <g transform={`translate(${width},${(height + spaceBetween) * i})`} key={i}>
                <text
                  x={margin.right / 2}
                  y={height / 2}
                  textAnchor="middle"
                  dominantBaseline="middle"
                >
                  <title>{formatNumber(totalSharePercent)}%</title>
                  {formatNumber(totalSharePercent, 2)}%
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
                  stroke="#666"
                  strokeWidth={1.5}
                />
                <text y={totalHeight - offset - 10} textAnchor="middle">
                  <title>{formatNumber(cut)}</title>
                  {cut.toFixed(cakeSize >= 10 ? 0 : 1)}
                </text>
              </g>
            )
          })}
        </g>
      </Box>

      <Accordion sx={{ maxWidth: totalWidth }}>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="details-panel"
          id="details-panel-header"
        >
          Resource Split Details
        </AccordionSummary>
        <AccordionDetails>
          <TableContainer>
            <Table size="small">
              <TableHead>
                <TableRow>
                  <TableCell sx={{ fontWeight: 'bold' }}>Portion Owner</TableCell>
                  <TableCell sx={{ fontWeight: 'bold' }}>Range [start - end]</TableCell>
                  <TableCell sx={{ fontWeight: 'bold' }}>Portion Size</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {results.map((result) => (
                  <TableRow key={result.owner}>
                    <TableCell>
                      {names[result.owner] ?? 'Person ' + (result.owner + 1)}
                    </TableCell>
                    <TableCell sx={{ whiteSpace: 'pre' }}>
                      {result.edges
                        .map(
                          (range) =>
                            '[' +
                            range.map((edge) => formatNumber(edge)).join(' - ') +
                            ']'
                        )
                        .join('\n')}
                    </TableCell>
                    <TableCell>
                      {formatNumber(getPortionSize(result, cakeSize))}%
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </AccordionDetails>
      </Accordion>
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
      <path key={x1} d={`M${x1},${y1} L${x2},${y2} L${x2},${height} L${x1},${height}`} />
    ))

  return (
    <>
      {/* Segments display in semi-gray */}
      <g fill={Color(getAgentColor(agent)).desaturate(0.5).lightness(85)}>{segSvg}</g>

      {/* Mask colored sections to match segments */}
      <mask id={maskId}>
        <g fill="#fff">{segSvg}</g>
      </mask>

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
