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
import { TextContainer } from '../../../Layouts'

const spaceBetween = 20
const cuttingLineExtension = 10

const margin = {
  top: 25,
  bottom: cuttingLineExtension + 32,
  left: 170,
  right: 100,
}

interface ResultsGraphsProps {
  preferences: Preferences
  results: Portion[]
  names?: string[]
  namesPossessive?: string[]
}

const getPortionSize = (result: Portion, cakeSize: number) => {
  const totalArea = result.edges.reduce((total, [start, end]) => total + end - start, 0)
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
  const [showAllPreferences, setShowAllPreferences] = useState(false)

  const innerHeight =
    height * preferences.length + spaceBetween * (preferences.length - 1)
  const totalHeight = innerHeight + margin.top + margin.bottom
  const totalWidth = width + margin.left + margin.right

  const allCutlines = results
    .reduce((acc, result) => [...acc, ...result.edges.map((edge) => edge[0])], [])
    .sort()

  // remove initial zero
  allCutlines.shift()

  return (
    <section>
      <h2>Resource Split</h2>
      <TextContainer>
        <p>
          This shows where to divide the resource, the portion each person receives, and
          the value each person marked.
        </p>
      </TextContainer>
      <Box>
        {labels.length ? (
          <FormControlLabel
            control={
              <Switch
                onChange={(e) => setShowLabels(e.target.checked)}
                checked={showLabels}
              />
            }
            label="Show labels"
          />
        ) : null}

        <FormControlLabel
          control={
            <Switch
              onChange={(e) => setShowAllPreferences(e.target.checked)}
              checked={showAllPreferences}
            />
          }
          label="Show all values"
        />
      </Box>

      <Box component="svg" width={totalWidth} height={totalHeight} sx={{ fontSize: 18 }} marginBottom={6}>
        
        {/* Section labels. Off by default because they clutter up the visual */}
        {showLabels ? <TinySectionLabels margin={margin} height={innerHeight} /> : null}

        {/* Portion Size (percentage) label */}
        <text textAnchor="end" x={totalWidth} y={0} dominantBaseline={'hanging'}>
         % of Total
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
                  showAllPreferences={showAllPreferences}
                />

                {/* Graph owner */}
                <text textAnchor="end" x={-12} y={height / 2}>
                  {(namesPossessive[i] ?? `Person ${i + 1}'s`) + ' Portion'}
                </text>
              </g>
            )
          })}

          <text
            textAnchor="end"
            x={-12}
            y={innerHeight + cuttingLineExtension}
            dominantBaseline="hanging"
          >
            Dividing Points
          </text>

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
            const offset = i % 2 === 0 ? cuttingLineExtension : cuttingLineExtension + 15
            const point = 100 * cut / cakeSize
            return (
              <g transform={`translate(${xScale(cut)}, 0)`} key={cut}>
                <line
                  y1={-margin.top}
                  y2={innerHeight + offset}
                  strokeDasharray={6}
                  stroke="#666"
                  strokeWidth={1.5}
                />
                <text
                  y={innerHeight + offset}
                  textAnchor="middle"
                  dominantBaseline="hanging"
                >
                  <title>{formatNumber(point)}</title>
                  {point.toFixed(0)}%
                  {/* {cut.toFixed(cakeSize >= 10 ? 0 : 1)} */}
                </text>
              </g>
            )
          })}

          {/* Numbers at beginning and end of cake to give cut lines some context */}
          {/* <text
            x={0}
            y={innerHeight + cuttingLineExtension}
            textAnchor="middle"
            dominantBaseline="hanging"
          >
            0
          </text>
          <text
            x={width}
            y={innerHeight + cuttingLineExtension}
            textAnchor="middle"
            dominantBaseline="hanging"
          >
            {cakeSize}
          </text> */}
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
                  <TableCell sx={{ fontWeight: 'bold' }}>Start - End Point</TableCell>
                  <TableCell sx={{ fontWeight: 'bold' }}>Percent of Total</TableCell>
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
                            range.map((edge) => formatNumber(100*edge/cakeSize)+ '%').join(' - ') +
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
  showAllPreferences: boolean
}

const TinyGraph = ({
  segments,
  height,
  result,
  agent,
  showAllPreferences,
}: TinyGraphProps) => {
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
      {showAllPreferences ? (
        <g fill={Color(getAgentColor(agent)).desaturate(0.6).lightness(88)}>{segSvg}</g>
      ) : null}

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
