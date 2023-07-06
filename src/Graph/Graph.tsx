import React, { useState } from 'react'
import { scaleLinear } from 'd3'
import { Stack } from '@mui/material'
import { DrawingLayer } from './components/DrawingLayer'
import { GraphHeader } from './components/Header/GraphHeader'
import { CompareViewGraph } from './components/CompareViewGraph'
import { SelectAlgoModal } from './components/SelectAlgoModal'
import { Slice, Segment, Preferences } from '../types'
import { GraphContext } from './GraphContext'
import { isDrawingComplete } from './graphUtils'
import { AlgoName, innerHeight, innerWidth, defaultCakeSize } from './graphConstants'
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
  const yScale = scaleLinear().domain([0, 10]).range([innerHeight, 0]).nice()
  const xScale = scaleLinear()
    .domain([0, defaultCakeSize])
    .range([0, innerWidth])
    .nice()

  const [algoResults, setAlgoResults] = useState<Slice[] | []>(null)
  // const [preferences, setPreferences] = useState<Preferences>(temp)
  const [preferences, setPreferences] = useState<Preferences>([[]])
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
    
    setAlgoResults(await runDivisionAlgorithm(preferences, algo, defaultCakeSize))
    
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
      }}
    >
      <Stack>
        <GraphHeader
          totalAgents={preferences.length}
          isComplete={isComplete}
          currentAgent={currentAgent}
          onClickDone={onClickDone}
          onChangeIndex={onChangeIndex}
          onClickCreateAgent={onClickCreateAgent}
          onClickCompare={onClickCompare}
          compareMode={compareMode}
          preferences={preferences} 
          setNewData={setNewData}
        />
        {compareMode ? (
          <CompareViewGraph preferences={preferences} />
        ) : (
          <DrawingLayer
            segments={currentAgentPrefs}
            setSegments={setCurrentAgentPrefs}
          />
        )}

        {algoResults ? <CakeSliceResults results={algoResults} /> : null}
      </Stack>
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
