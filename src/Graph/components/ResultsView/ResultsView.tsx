import { useContext } from 'react'
import { Stack, Box, IconButton, Tooltip } from '@mui/material'
import { getAgentColor } from '../../../constants'
import { Portion, Preferences, Segment, Slice } from '../../../types'
import { GraphContext } from '../../GraphContext'
import { useConvertSegToPixels, createScales } from '../../graphUtils'
import { ResultsGraphs } from './ResultsGraphs'
import { ResultsTable } from './ResultsTable'

interface ResultsViewProps {
  preferences: Preferences
  results: Portion[]
}

export const ResultsView = ({ results, preferences }: ResultsViewProps) => {
  console.log(results)
  return (
    <Stack maxWidth={'700px'} spacing={8}>
        <ResultsGraphs results={results} preferences={preferences} />

        <ResultsTable results={results} preferences={preferences} />

        solution info
    </Stack>
  )
}
