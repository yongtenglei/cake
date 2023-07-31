import { Box } from '@mui/material'
import { Portion } from '../../../types'
import { AlgoName, Algorithms, Result } from '../../algorithm/types'

interface ResultsStepsProps {
  algoUsed: AlgoName
  result: Result
}

export const ResultsSteps = ({ algoUsed, result }: ResultsStepsProps) => {
  return (
    <Box component={'section'}>
      <h2>Steps Used in {Algorithms[algoUsed].name}</h2>
      <ol>
        {/* {result.steps.map(([person, action], i) => (
          <li key={i}><strong>Person {person}:</strong> {action}</li>
        ))} */}
      </ol>
    </Box>
  )
}
