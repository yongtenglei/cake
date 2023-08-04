import {
  AccordionDetails,
  AccordionSummary,
  Accordion,
  Box,
  Button,
  Stack,
} from '@mui/material'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'

import { AlgoName, Algorithms, Result } from '../../algorithm/types'
import { useContext, useState } from 'react'
import { GraphContext } from '../../GraphContext'
import { getAgentColor } from '../../../colors'
import { Slice } from '../../../types'

interface ResultsStepsProps {
  algoUsed: AlgoName
  result: Result
}

// This should be more centrally located and less fragile
const getText = (piece: Slice) => {
  if (piece.note === 'trimming' && piece.id === 4) {
    return 'T'
  }
  return piece.id
}

export const ResultsSteps = ({ algoUsed, result }: ResultsStepsProps) => {
  const { width, height, xScale, names = [] } = useContext(GraphContext)

  return (
    <Box component={'section'} marginTop={2}>
      <h2>Algorithm Steps</h2>

      <Accordion defaultExpanded sx={{ marginTop: 2 }}>
        <AccordionSummary
          sx={{ borderRadius: 0 }}
          expandIcon={<ExpandMoreIcon />}
          aria-controls="steps-content"
          id="steps-header"
        >
          <h3 style={{ margin: 0 }}>{Algorithms[algoUsed].name} Steps</h3>
        </AccordionSummary>
        <AccordionDetails>
          <ol style={{ fontSize: 18, margin: 0 }}>
            {result.steps.map(([person, action, pieces]) => (
              <li key={action}>
                <div>
                  <strong>{names?.[person] ?? `Person ${person + 1}`}:</strong> {action}.
                </div>

                {pieces ? (
                  <svg width={width} height={height}>
                    {pieces.map((piece) => {
                      const { start, end } = piece
                      const x = xScale(start)
                      const width = xScale(end) - xScale(start)
                      return (
                        <g key={x}>
                          <rect
                            x={x}
                            width={width}
                            y={0}
                            height={height}
                            fill={getAgentColor(person)}
                            strokeWidth={1}
                            stroke="#555"
                          />
                          <text
                            textAnchor="middle"
                            dominantBaseline="central"
                            x={x + width / 2}
                            y="50%"
                          >
                            {getText(piece)}
                          </text>
                        </g>
                      )
                    })}
                    <rect
                      x={0.5}
                      y={0.5}
                      width={width - 1}
                      height={height - 1}
                      stroke="#555"
                      fill="none"
                      strokeWidth={1}
                    />
                  </svg>
                ) : null}
              </li>
            ))}
          </ol>
        </AccordionDetails>
      </Accordion>
    </Box>
  )
}
