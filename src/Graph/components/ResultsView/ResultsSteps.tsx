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
      <h2>Steps Used</h2>
      <h3>{Algorithms[algoUsed].name}</h3>
      <ol style={{fontSize: 18}}>
        {result.steps.map(([person, action], i) => (
          <li key={i}><strong>Person {person+1}:</strong> {action}</li>
        ))}
      </ol>
    </Box>
  )
}
