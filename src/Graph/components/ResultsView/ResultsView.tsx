import { Stack } from '@mui/material'
import { ErrorBoundary } from 'react-error-boundary'
import { SectionErrorDisplay } from '../../../components/SectionErrorDisplay'
import { Portion, Preferences, SectionLabel } from '../../../types'
import { GraphContext } from '../../GraphContext'
import { AlgoName } from '../../graphConstants'
import { createScales } from '../../graphUtils'
import { ResultsGraphs } from './ResultsGraphs'
import { ResultsTable } from './ResultsTable'
import { SolutionInfo } from './SolutionInfo'

interface ResultsViewProps {
  preferences: Preferences
  results: Portion[]
  algoUsed: AlgoName
  sectionLabels: SectionLabel[]
  cakeSize: number
}

export const ResultsView = ({
  results,
  preferences,
  algoUsed,
  sectionLabels,
  cakeSize,
}: ResultsViewProps) => {
  const width = 560
  const height = 100
  const { yScale, xScale } = createScales({
    innerWidth: width,
    innerHeight: height,
    cakeSize,
  })

  // The subsections do a lot of work, so in case there are bugs
  // the error boundaries will prevent errors from ruining the whole page.
  return (
    <Stack spacing={8} marginTop={8}>
      <ErrorBoundary FallbackComponent={SectionErrorDisplay}>
        <GraphContext.Provider
          value={{
            yScale,
            xScale,
            height,
            width,
            labels: sectionLabels,
            cakeSize,
          }}
        >
          <ResultsGraphs results={results} preferences={preferences} />
        </GraphContext.Provider>
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
