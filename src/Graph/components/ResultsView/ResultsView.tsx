import { Stack } from '@mui/material'
import { SectionErrorDisplay } from '../../../components/SectionErrorDisplay'
import { Portion, Preferences } from '../../../types'
import { AlgoName } from '../../graphConstants'
import { ResultsGraphs } from './ResultsGraphs'
import { ResultsTable } from './ResultsTable'
import { SolutionInfo } from './SolutionInfo'
import { ErrorBoundary } from "react-error-boundary";

interface ResultsViewProps {
  preferences: Preferences
  results: Portion[]
  algoUsed: AlgoName
}

export const ResultsView = ({ results, preferences, algoUsed }: ResultsViewProps) => {
  // The subsections do a lot of work, so in case there are bugs
  // the error boundaries will prevent errors from ruining the whole page.
  return (
    <Stack spacing={8} marginTop={8}>
      <ErrorBoundary FallbackComponent={SectionErrorDisplay}>
        <ResultsGraphs results={results} preferences={preferences} />
      </ErrorBoundary>
      <ErrorBoundary FallbackComponent={SectionErrorDisplay}>
        <ResultsTable results={results} preferences={preferences} />
      </ErrorBoundary>
      <ErrorBoundary FallbackComponent={SectionErrorDisplay}>
        <SolutionInfo algoUsed={algoUsed} results={results} />
      </ErrorBoundary>
    </Stack>
  )
}
