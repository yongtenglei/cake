import { useState } from 'react'

import { Box } from '@mui/material'
import { C_PRIMARY_LIGHT, getAgentColor } from '../colors'
import { LoadingModal } from '../components/LoadingModal'
import { Preferences, SectionLabel, Segment } from '../types'
import { GraphContext } from './GraphContext'
import { SectionConfig } from './SectionConfig'
import { runDivisionAlgorithm } from './algorithm/run'
import { AlgoName, Result } from './algorithm/types'
import { CompareViewGraph } from './components/CompareViewGraph'
import { DrawingLayer } from './components/DrawingLayer'
import {
  CompareHeaderButtons,
  DrawingHeaderButtons,
  ResultsButtons,
} from './components/Header/GraphButtons'
import { GraphHeader } from './components/Header/GraphHeader'
import { SwitchAgentHeader } from './components/Header/SwitchAgentHeader'
import { ResultsView } from './components/ResultsView/ResultsView'
import { SelectAlgoModal } from './components/SelectAlgoModal'
import {
  defaultCakeSize,
  defaultGraphHeight,
  defaultGraphWidth,
  getInnerHeight,
  getInnerWidth,
} from './graphConstants'
import { createScales, isDrawingComplete } from './graphUtils'
import { sampleLabels3Flavor } from './sampleData'

export const Graph = () => {
  const [cakeSize, setCakeSize] = useState<number>(defaultCakeSize)
  const [sectionLabels, setSectionLabels] = useState<SectionLabel[]>([
    sampleLabels3Flavor[0],
  ])
  const [algoUsed, setAlgoUsed] = useState<AlgoName | null>(null)
  const [algoResults, setAlgoResults] = useState<Result | null>(null)
  const [preferences, setPreferences] = useState<Preferences>([[]])

  // Agents are zero-index in the code, but 1-indexed when displaying to users
  const [currentAgent, setCurrentAgent] = useState<number>(0)
  const [algoModalOpen, setAlgoModalOpen] = useState<boolean>(false)
  const [highlightedHandle, setHighlightedHandle] = useState<boolean>(false)
  const [viewMode, setViewMode] = useState<'setup' | 'edit' | 'compare' | 'results'>(
    'setup'
  )
  const [loading, setLoading] = useState<boolean>(false)

  const { yScale, xScale } = createScales({
    innerWidth: getInnerWidth(defaultGraphWidth),
    innerHeight: getInnerHeight(defaultGraphHeight),
    cakeSize,
  })

  const onCompleteSetup = (sectionLabels: SectionLabel[], cakeSize?: number) => {
    if (cakeSize) {
      setCakeSize(cakeSize)
    } else if (sectionLabels.length) {
      setCakeSize(sectionLabels[sectionLabels.length - 1].end)
    } else {
      setCakeSize(defaultCakeSize)
    }
    // truncate any segments ending outside the cake
    // and remove any that end up with 0 width.
    const prefsScopeToCakeSize = preferences.map((segments) =>
      segments
        .map((seg) => ({ ...seg, end: Math.min(seg.end, cakeSize) }))
        .filter((seg) => seg.end > seg.start)
    )
    setPreferences(prefsScopeToCakeSize)
    setSectionLabels(sectionLabels)
    setViewMode('edit')
  }

  const uploadInput = (pref: Preferences) => {
    resetInput()
    let maxEndpoint = 0
    pref.forEach((segs: Segment[]) => {
      segs.forEach((seg: Segment) => {
        maxEndpoint = Math.max(maxEndpoint, seg.end)
      })
    })
    setPreferences(pref)
    setCakeSize(maxEndpoint)
  }

  const resetInput = () => {
    setPreferences([[]])
    setCurrentAgent(0)
    setAlgoResults(null)
    setViewMode('edit')
  }

  const onClickSetLabels = () => setViewMode('setup')

  const onClickCompare = () => setViewMode('compare')

  const onClickShowHandles = () => setHighlightedHandle(!highlightedHandle)

  const setCurrentAgentPrefs = (segs: Segment[]) => {
    const prefs = [...preferences]
    prefs[currentAgent] = segs.filter((seg) => seg.end > seg.start)
    setPreferences(prefs)
    if (algoResults) {
      setAlgoUsed(null)
      setAlgoResults(null)
    }
  }
  const onClickDone = () => setAlgoModalOpen(true)
  const onClickCreateAgent = () => {
    setCurrentAgent(preferences.length)
    setPreferences([...preferences, []])
  }
  const onChangeIndex = (i: number) => {
    const nextAgent = currentAgent + i
    if (nextAgent >= preferences.length) {
      setCurrentAgent(0)
    } else if (nextAgent < 0) {
      setCurrentAgent(preferences.length - 1)
    } else {
      setCurrentAgent(nextAgent)
    }
  }

  const onClickRunAlgo = async (algo: AlgoName) => {
    setLoading(true)
    setAlgoModalOpen(false)
    setAlgoUsed(algo)

    try {
      const results = await runDivisionAlgorithm(preferences, algo, cakeSize)
      setAlgoResults(results)
      setViewMode('results')
    } catch (e) {
      console.error(e)
      alert('Sorry, something has gone wrong\n\n' + e.message)
    }

    setLoading(false)
  }

  const onClickEdit = (agent = 0) => {
    setViewMode('edit')
    setCurrentAgent(agent)
  }
  const currentAgentPrefs = preferences[currentAgent]
  const isComplete = isDrawingComplete(currentAgentPrefs, cakeSize)

  let body = null
  if (viewMode === 'setup') {
    body = (
      <SectionConfig
        onCompleteSetup={onCompleteSetup}
        initialSections={sectionLabels}
        cakeSize={cakeSize}
      />
    )
  } else if (viewMode === 'results') {
    body = (
      <>
        <GraphHeader
          color={C_PRIMARY_LIGHT}
          heading={<h2>Results</h2>}
          fullWidth
          buttons={
            <ResultsButtons
              preferences={preferences}
              uploadInput={uploadInput}
              resetInput={resetInput}
              onClickEdit={onClickEdit}
            />
          }
        />

        <ResultsView
          result={algoResults}
          preferences={preferences}
          algoUsed={algoUsed}
          cakeSize={cakeSize}
          sectionLabels={sectionLabels}
        />
      </>
    )
  } else if (viewMode === 'compare') {
    body = (
      <>
        <GraphHeader
          color={'#ddd'}
          heading={<h2>Compare</h2>}
          buttons={
            <CompareHeaderButtons
              onClickSetLabels={onClickSetLabels}
              onClickEdit={onClickEdit}
              onClickDone={onClickDone}
              preferences={preferences}
              uploadInput={uploadInput}
              resetInput={resetInput}
            />
          }
        />
        <CompareViewGraph preferences={preferences} onClickEdit={onClickEdit} />
      </>
    )
  } else {
    body = (
      <>
        <Box sx={{ width: defaultGraphWidth }}>
          <GraphHeader
            color={getAgentColor(currentAgent)}
            heading={
              <SwitchAgentHeader
                onClickCreateAgent={onClickCreateAgent}
                onChangeIndex={onChangeIndex}
                currentAgent={currentAgent}
                preferences={preferences}
              />
            }
            buttons={
              <DrawingHeaderButtons
                onClickSetLabels={onClickSetLabels}
                onClickCompare={onClickCompare}
                onClickDone={onClickDone}
                onClickShowHandles={onClickShowHandles}
                highlightedHandle={highlightedHandle}
                preferences={preferences}
                uploadInput={uploadInput}
                currentAgent={currentAgent}
                cakeSize={cakeSize}
                resetInput={resetInput}
              />
            }
          />
        </Box>
        <Box sx={{ position: 'relative', top: -10 }}>
          <DrawingLayer
            segments={currentAgentPrefs}
            setSegments={setCurrentAgentPrefs}
            currentAgent={currentAgent}
            isComplete={isComplete}
            highlightedHandle={highlightedHandle}
          />
        </Box>
      </>
    )
  }

  return (
    <div>
      <GraphContext.Provider
        value={{
          yScale,
          xScale,
          height: defaultGraphHeight,
          width: defaultGraphWidth,
          labels: sectionLabels,
          cakeSize,
        }}
      >
        {body}
      </GraphContext.Provider>
      <SelectAlgoModal
        open={algoModalOpen}
        onCancel={() => setAlgoModalOpen(false)}
        onConfirm={onClickRunAlgo}
        totalAgents={preferences.length}
      />
      <LoadingModal open={loading} title={'Running Algorithm'} />
    </div>
  )
}
