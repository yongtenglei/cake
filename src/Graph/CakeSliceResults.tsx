import React, { useContext } from 'react'
import { Tooltip, Box } from '@mui/material'
import { getValueForInterval } from './algorithm/getValue'
import { Division, Segment } from '../types'
import { margin, innerWidth } from './graphConstants'
import { GraphContext } from './GraphContext'
import { getAgentColor } from '../constants'

interface CakeSliceResultsProps {
  results: Division[]
}

const boxHeight = 30

export const CakeSliceResults = ({ results }: CakeSliceResultsProps) => {
  const { xScale } = useContext(GraphContext)

  return (
    <Box
      sx={{
        position: 'relative',
        width: innerWidth,
        height: '50px',
        left: margin.left,
        cursor: 'pointer',
      }}
    >
      {results.map((slice, i) => {
        const percentValue = (slice.valuePercent * 100).toFixed(1)
        return (
          <Tooltip
            key={slice.start}
            title={`To person ${slice.owner}, this slice is worth ${percentValue}% of the whole.`}
          >
            <Box
              sx={{
                position: 'absolute',
                height: '100%',
                left: xScale(slice.start),
                width: xScale(slice.end - slice.start),
                textAlign: 'center',
              }}
            >
              Person {slice.owner}
              <Box
                sx={{
                  width: '100%',
                  height: boxHeight,
                  borderLeft: '0.5px solid white',
                  borderRight: '0.5px solid white',
                  backgroundColor: getAgentColor(slice.owner),
                }}
              >
                <span>{percentValue} %</span>
              </Box>
              <Box
                sx={{
                  position: 'absolute',
                  transform: 'translateX(-50%)',
                  left: 0,
                }}
              >
                {slice.start}
              </Box>
              {i + 1 === results.length ? (
                <Box
                  sx={{
                    position: 'absolute',
                    transform: 'translateX(50%)',
                    right: 0,
                  }}
                >
                  {slice.end}
                </Box>
              ) : null}
            </Box>
          </Tooltip>
        )
      })}
    </Box>
  )
}
