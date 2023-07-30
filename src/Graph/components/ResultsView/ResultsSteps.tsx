import { Box } from '@mui/material'
import { Portion } from '../../../types'
import { AlgoName, Algorithms } from '../../algorithm/types'

interface ResultsStepsProps {
  algoUsed: AlgoName
  results: Portion[]
}

export const ResultsSteps = ({ algoUsed, results }: ResultsStepsProps) => {
  return (
    <Box component={'section'}>
      <h2>Steps Used in {Algorithms[algoUsed].name}</h2>
      <ol>
        {/* {steps.map(([person, action], i) => (
          <li key={i}><strong>Person {person}:</strong> {action}</li>
        ))} */}
      </ol>
    </Box>
  )
}
