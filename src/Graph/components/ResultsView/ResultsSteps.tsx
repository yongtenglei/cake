import { Box } from '@mui/material'
import { AlgoName, Algorithms, Result } from '../../algorithm/types'
import { useContext } from 'react'
import { GraphContext } from '../../GraphContext'
import { getAgentColor } from '../../../colors'

interface ResultsStepsProps {
  algoUsed: AlgoName
  result: Result
}

export const ResultsSteps = ({ algoUsed, result }: ResultsStepsProps) => {
  const { width, height, xScale, names = []  } = useContext(GraphContext)

  return (
    <Box component={'section'}>
      <h2>Algorithm Steps</h2>
      <h3>{Algorithms[algoUsed].name}</h3>

      <ol style={{ fontSize: 18 }}>
        {result.steps.map(([person, action, pieces]) => (
          <li key={action}>
            <div>
              <strong>{names?.[person] ?? `Person ${person + 1}`}:</strong> {action}.
            </div>

            {pieces ? (
              <svg width={width} height={height}>
                {pieces.map(({ start, end }) => (
                  <rect
                    key={start}
                    x={xScale(start)}
                    width={xScale(end) - xScale(start)}
                    y={0}
                    height={height}
                    fill={getAgentColor(person)}
                    strokeWidth={1}
                    stroke="#555"
                  />
                ))}
                <rect
                  x={0.5}
                  y={0.5}
                  width={width-1}
                  height={height-1}
                  stroke="#555"
                  fill="none"
                  strokeWidth={1}
                />
              </svg>
            ) : null}
          </li>
        ))}
      </ol>
    </Box>
  )
}
