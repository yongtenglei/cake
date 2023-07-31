import { Button, Stack } from '@mui/material'
import { useState } from 'react'
import { ErrorBoundary } from 'react-error-boundary'
import { LoadingModal } from '../../../components/LoadingModal'
import { SectionErrorDisplay } from '../../../components/SectionErrorDisplay'
import { Portion, Preferences, SectionLabel } from '../../../types'
import { downloadScreenshot } from '../../../utils/export'
import { GraphContext } from '../../GraphContext'
import { AlgoName, Result } from '../../algorithm/types'
import { createScales } from '../../graphUtils'
import { ResultsGraphs } from './ResultsGraphs'
import { ResultsSteps } from './ResultsSteps'
import { ResultsTable } from './ResultsTable'
import { SolutionInfo } from './SolutionInfo'

interface ResultsViewProps {
  preferences: Preferences
  result: Result
  algoUsed: AlgoName
  sectionLabels: SectionLabel[]
  cakeSize: number
}

export const ResultsView = ({
  result,
  preferences,
  algoUsed,
  sectionLabels,
  cakeSize,
}: ResultsViewProps) => {
  const graphWidth = 560
  const graphHeight = 120
  const stepWidth = 300
  const stepHeight = 80

  const [loading, setLoading] = useState<boolean>(false)

  const onClickExportImage = async () => {
    setLoading(true)
    await downloadScreenshot('results')
    setLoading(false)
  }

  // The subsections do a lot of work, so in case there are bugs
  // the error boundaries will prevent errors from ruining the whole page.
  return (
    <>
      <LoadingModal open={loading} title="Exporting Image" />
      <Stack spacing={8} marginTop={2} id="results">
        <ErrorBoundary FallbackComponent={SectionErrorDisplay}>
          <GraphContext.Provider
            value={{
              ...createScales({
                innerWidth: stepWidth,
                innerHeight: stepHeight,
                cakeSize,
              }),
              width: stepWidth,
              height: stepHeight,
              labels: sectionLabels,
              cakeSize,
            }}
          >
            <ResultsSteps algoUsed={algoUsed} result={result} />
          </GraphContext.Provider>
        </ErrorBoundary>
        <ErrorBoundary FallbackComponent={SectionErrorDisplay}>
          <GraphContext.Provider
            value={{
              ...createScales({
                innerWidth: graphWidth,
                innerHeight: graphHeight,
                cakeSize,
              }),
              width: graphWidth,
              height: graphHeight,
              labels: sectionLabels,
              cakeSize,
            }}
          >
            <ResultsGraphs solution={result.solution} preferences={preferences} />
          </GraphContext.Provider>
        </ErrorBoundary>

        <ErrorBoundary FallbackComponent={SectionErrorDisplay}>
          <ResultsTable solution={result.solution} preferences={preferences} />
        </ErrorBoundary>
        <ErrorBoundary FallbackComponent={SectionErrorDisplay}>
          <SolutionInfo algoUsed={algoUsed} solution={result.solution} />
        </ErrorBoundary>
      </Stack>
      <Stack alignItems="center" marginTop={6}>
        <Button onClick={onClickExportImage} variant="outlined">
          Download Results as Image
        </Button>
      </Stack>
    </>
  )
}
