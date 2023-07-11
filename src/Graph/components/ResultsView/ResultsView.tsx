import { useContext } from 'react'
import { Stack, Box, IconButton, Tooltip } from '@mui/material'
import { getAgentColor } from '../../../constants'
import { Preferences, Segment, Slice } from '../../../types'
import { GraphContext } from '../../GraphContext'
import { useConvertSegToPixels, createScales } from '../../graphUtils'
import { ResultsGraphs } from './ResultsGraphs'

interface ResultsViewProps {
  preferences: Preferences
  results: Slice[]
}

export const ResultsView = ({ results, preferences }: ResultsViewProps) => {
  console.log(results)
  return (
    <Stack>
        <ResultsGraphs results={results} preferences={preferences} />

        table

        solution info
    </Stack>
  )
}
