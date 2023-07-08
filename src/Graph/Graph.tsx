import React, { useState } from 'react'
import { Stack, Box } from '@mui/material'
import { DrawingLayer } from './components/DrawingLayer'
import { GraphHeader } from './components/Header/GraphHeader'
import { GraphDrawingButtons } from './components/Header/GraphDrawingButtons'
import { CompareViewGraph } from './components/CompareViewGraph'
import { SelectAlgoModal } from './components/SelectAlgoModal'
import { Slice, Segment, Preferences } from '../types'
import { GraphContext } from './GraphContext'
import { createScales, isDrawingComplete } from './graphUtils'
import {
  AlgoName,
  defaultGraphHeight,
  defaultGraphWidth,
  getInnerWidth,
  getInnerHeight,
  defaultCakeSize,
} from './graphConstants'
import { runDivisionAlgorithm } from './algorithm/run'
import { CakeSliceResults } from './CakeSliceResults'
import { LoadingModal } from '../components/LoadingModal'

const temp: Preferences = [
  [
    {
      start: 0,
      startValue: 6.5,
      end: 47,
      endValue: 6.5,
      id: 1,
    },
    {
      start: 47,
      startValue: 8.4,
      end: 100,
      endValue: 8.4,
      id: 2,
    },
  ],
  [
    {
      start: 0,
      startValue: 4.6,
      end: 41,
      endValue: 4.6,
      id: 3,
    },
    {
      start: 41,
      startValue: 7.1,
      end: 100,
      endValue: 7.1,
      id: 4,
    },
  ],
]

// import useMediaQuery from '@mui/material/useMediaQuery';

// export default function SimpleMediaQuery() {
//   const matches = useMediaQuery('(min-width:600px)');

//   return <span>{`(min-width:600px) matches: ${matches}`}</span>;
// }

export const Graph = () => {
  const cakeSize = defaultCakeSize
  const { yScale, xScale } = createScales({
    width: defaultGraphWidth,
    height: defaultGraphHeight,
    cakeSize,
  })

  const [algoResults, setAlgoResults] = useState<Slice[] | []>(null)
  const [preferences, setPreferences] = useState<Preferences>(temp)
  // const [preferences, setPreferences] = useState<Preferences>([[]])
  const setNewData = (pref: Preferences) => {
    setPreferences(pref)
    setCurrentAgent(1)
    setCompareMode(true)
    setAlgoResults(null)
  }
  // Agents are zero-index in the code, but 1-indexed when displaying to users
  const [currentAgent, setCurrentAgent] = useState<number>(0)
  const [algoModalOpen, setAlgoModalOpen] = useState<boolean>(false)
  const [compareMode, setCompareMode] = useState<boolean>(false)
  const [loading, setLoading] = useState<boolean>(false)
  const onClickCompare = () => setCompareMode(!compareMode)

  const setCurrentAgentPrefs = (segs: Segment[]) => {
    const prefs = [...preferences]
    prefs[currentAgent] = segs
    setPreferences(prefs)
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

    setAlgoResults(await runDivisionAlgorithm(preferences, algo, cakeSize))

    setLoading(false)
    setCompareMode(true)
  }

  const currentAgentPrefs = preferences[currentAgent]
  const isComplete = isDrawingComplete(currentAgentPrefs)

  return (
    <GraphContext.Provider
      value={{
        yScale,
        xScale,
        currentAgent,
        height: defaultGraphHeight,
        width: defaultGraphWidth,
      }}
    >
      <div>
        <Box sx={{ width: defaultGraphWidth }}>
          <GraphHeader
            totalAgents={preferences.length}
            currentAgent={currentAgent}
            onChangeIndex={onChangeIndex}
            compareMode={compareMode}
            buttons={
              <GraphDrawingButtons
                totalAgents={preferences.length}
                isComplete={isComplete}
                onClickCreateAgent={onClickCreateAgent}
                onClickCompare={onClickCompare}
                onClickDone={onClickDone}
                compareMode={compareMode}
                preferences={preferences}
                setNewData={setNewData}
              />
            }
          />
        </Box>
        <Box sx={{ position: 'relative', zIndex: 1 }}>
          {compareMode ? (
            <CompareViewGraph preferences={preferences} cakeSize={cakeSize} />
          ) : (
            <DrawingLayer
              segments={currentAgentPrefs}
              setSegments={setCurrentAgentPrefs}
            />
          )}
        </Box>
        {algoResults ? <CakeSliceResults results={algoResults} /> : null}
      </div>
      <SelectAlgoModal
        open={algoModalOpen}
        onCancel={() => setAlgoModalOpen(false)}
        onConfirm={onClickRunAlgo}
        totalAgents={preferences.length}
      />
      <LoadingModal open={loading} title={'Running Algorithm'} />
    </GraphContext.Provider>
  )
}
