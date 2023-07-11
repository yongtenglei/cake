import React from 'react'
import { styled } from '@mui/material/styles'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import { Portion, Preferences, Slice } from '../../../types'
import { getAgentColor } from '../../../constants'
import { useContext } from 'react'
import { GraphContext } from '../../GraphContext'
import { Box } from '@mui/material'

interface ResultsTableProps {
  preferences: Preferences
  results: Portion[]
}

export const ResultsTable = ({ preferences, results }: ResultsTableProps) => {
  const numPeople = preferences.length

  return (
    <section>
      <h2>Portion Values</h2>
      <TableContainer>
        <Table
          sx={{
            th: { border: 'none', paddingTop: 0, fontSize: 18 },
            td: {
              border: '2px solid black',
              borderLeft: 'none',
              borderRight: 'none',
              padding: 4,
              fontSize: 18,
            },
            '.valueLabel': { borderRight: '2px solid black', maxWidth: 120 },
          }}
        >
          <TableHead>
            <TableRow>
              <TableCell colSpan={2} />
              <TableCell colSpan={numPeople} align="center">
                Portion Value
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell colSpan={2}>{}</TableCell>
              {results.map((portion, i) => {
                return (
                  <TableCell key={i}>
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
                  {rowAgent === 0 ? (
                    <TableCell rowSpan={numPeople} className="valueLabel" align="center">
                      Perceived Value
                    </TableCell>
                  ) : null}

                  <TableCell sx={{ position: 'relative' }}>
                    Person {rowAgent + 1}
                    <Box
                      sx={{
                        position: 'absolute',
                        right: 12,
                        top: '10%',
                        backgroundColor: color,
                        width: 6,
                        height: '80%',
                      }}
                    />
                  </TableCell>
                  {results.map((portion, colAgent) => {
                    return (
                      <TableCell
                        align="center"
                        key={colAgent}
                        sx={{
                          backgroundColor: colAgent === rowAgent ? color : null,
                        }}
                      >
                        {(portion.percentValues[colAgent] * 100).toFixed()}%
                      </TableCell>
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
