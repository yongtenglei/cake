import {
  Box,
  Table,
  TableBody,
  TableHead,
  TableCell,
  TableContainer,
  TableRow,
  Tooltip,
} from '@mui/material'
import React, { useContext } from 'react'
import { getAgentColor } from '../../../colors'
import { Portion, Preferences } from '../../../types'
import { GraphContext } from '../../GraphContext'
import { formatNumber } from '../../../utils/formatUtils'

interface ResultsTableProps {
  preferences: Preferences
  results: Portion[]
}

export const ResultsTable = ({ preferences, results }: ResultsTableProps) => {
  const numPeople = preferences.length

  return (
    <section>
      <h2>Portion Values</h2>
      <TableContainer sx={{marginTop: 4}}>
        <Table
          sx={{
            maxWidth: results.length > 3 ? 'none' : '700px',
            th: { border: 'none', paddingTop: 0, fontSize: 22 },
            td: {
              border: '2px solid black',
              borderLeft: 'none',
              borderRight: 'none',
              paddingX: 2,
              paddingY: 4,
              fontSize: 18,
              minWidth: 140,
            },
            '.valueLabel': { borderRight: '2px solid black', width: 120, minWidth: 120 },
            '.rowLabel': { position: 'relative', paddingRight: 4 },
          }}
        >
          <TableHead>
            <TableRow>
              <TableCell />
              <TableCell colSpan={numPeople} align="center">
                Perceived Portion Value
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell />
              {results.map((portion, i) => {
                return (
                  <TableCell key={i}>
                    <div
                      style={{
                        fontSize: 14,
                        lineHeight: 1.1,
                        textAlign: 'center',
                        marginBottom: 4,
                      }}
                    >
                      Person {i + 1}'s Portion
                    </div>
                    <TinyChart portion={portion} color={getAgentColor(i)} />
                  </TableCell>
                )
              })}
            </TableRow>
          </TableHead>
          <TableBody>
            {results.map((_, rowAgent) => {
              const color = getAgentColor(rowAgent)
              return (
                <TableRow key={rowAgent}>
                  {/* {rowAgent === 0 ? (
                    <TableCell rowSpan={numPeople} className="valueLabel" align="center">
                      {/* Perceived Value
                    </TableCell>
                  ) : null} */}

                  <TableCell className="rowLabel">
                    Person {rowAgent + 1}
                    <PersonCellLabel color={color} />
                  </TableCell>
                  {results.map((portion, colAgent) => {
                    const selected = colAgent === rowAgent
                    return (
                      <Tooltip
                        describeChild
                        key={colAgent}
                        title={
                          selected
                            ? `Person ${
                                rowAgent + 1
                              } received this portion because it is worth the most to them`
                            : null
                        }
                      >
                        <TableCell
                          align="center"
                          sx={{
                            backgroundColor: selected ? color : null,
                          }}
                        >
                          {/* This index in the solution is `rowAgent`, not `colAgent` */}
                          {formatNumber(portion.percentValues[rowAgent] * 100, 3)}%
                        </TableCell>
                      </Tooltip>
                    )
                  })}
                </TableRow>
              )
            })}
          </TableBody>
        </Table>
      </TableContainer>
    </section>
  )
}

interface TinyChartProps {
  portion: Portion
  color: string
}
const TinyChart = ({ portion, color }: TinyChartProps) => {
  const { cakeSize } = useContext(GraphContext)

  return (
    <Box
      sx={{
        position: 'relative',
        width: '100%',
        height: 20,
        backgroundColor: '#ddd',
        border: '1px solid black',
      }}
    >
      {portion.edges.map(([start, end]) => (
        <React.Fragment key={start}>
          <Box
            key={start}
            sx={{
              position: 'absolute',
              height: '100%',
              top: 0,
              left: (100 * start) / cakeSize + '%',
              width: (100 * (end - start)) / cakeSize + '%',
              backgroundColor: color,
            }}
          />
          <TinyChartLine x={(100 * start) / cakeSize} />
          <TinyChartLine x={(100 * end) / cakeSize} />
        </React.Fragment>
      ))}
    </Box>
  )
}

// Looks much cleaner if we draw the lines on rather than use borders.
// Annoyingly, this would be easy in SVG if stroke-location were supported in browsers.
const TinyChartLine = ({ x }: { x: number }) =>
  x === 0 || x === 100 ? null : (
    <Box
      sx={{
        position: 'absolute',
        height: '100%',
        width: '1px',
        transform: 'translateX(-50%)',
        backgroundColor: 'black',
        left: x + '%',
      }}
    />
  )

export const PersonCellLabel = ({ color }) => (
  <Box
    sx={{
      position: 'absolute',
      right: 8,
      top: '10%',
      backgroundColor: color,
      width: 6,
      height: '80%',
    }}
  />
)
