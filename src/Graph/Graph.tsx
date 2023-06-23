import React, { useState } from 'react'
import { scaleLinear } from 'd3'
import { Stack } from '@mui/material'
import { DrawingLayer } from './components/DrawingLayer'
import { GraphHeader } from './components/Header/GraphHeader'
import { CompareViewGraph } from './components/CompareViewGraph'
import { SelectAlgoModal } from './components/SelectAlgoModal'
import { Segment } from '../types'
import { GraphContext } from './GraphContext'
import { isDrawingComplete } from './graphUtils'
import {
  AlgoName,
  innerHeight,
  innerWidth,
} from './constants'
// import CakeRoundedIcon from '@mui/icons-material/CakeRounded';

const temp:Segment[][] = [
  [
    {
      "x1": 0,
      "y1": 6.5,
      "x2": 47,
      "y2": 6.5,
      "id": 1,
      "type": "value"
    },
    {
      "x1": 47,
      "y1": 8.4,
      "x2": 100,
      "y2": 8.4,
      "id": 2,
      "type": "value"
    }
  ],
  [
    {
      "x1": 0,
      "y1": 4.6,
      "x2": 41,
      "y2": 4.6,
      "id": 3,
      "type": "value"
    },
    {
      "x1": 41,
      "y1": 7.1,
      "x2": 100,
      "y2": 7.1,
      "id": 4,
      "type": "value"
    }
  ]
]

export const Graph = () => {
  const yScale = scaleLinear().domain([0, 10]).range([innerHeight, 0]).nice()
  const xScale = scaleLinear().domain([0, 100]).range([0, innerWidth]).nice()

  // const [preferences, setPreferences] = useState<Segment[][]>(temp)
  const [preferences, setPreferences] = useState<Segment[][]>([[]])
  
  const [currentAgent, setCurrentAgent] = useState<number>(1) // Note: This is 1 indexed
  const [algoModalOpen, setAlgoModalOpen] = useState<boolean>(false)
  const [compareMode, setCompareMode] = useState<boolean>(false)

  const onClickCompare = () => setCompareMode(!compareMode)

  const setCurrentAgentPrefs = (segs: Segment[]) => {
    const prefs = [...preferences]
    prefs[currentAgent - 1] = segs
    setPreferences(prefs)
  }
  const onClickDone = () => setAlgoModalOpen(true)
  const onClickCreateAgent = () => {
    setCurrentAgent(preferences.length + 1)
    setPreferences([...preferences, []])
  }
  const onChangeIndex = (i: number) => {
    const nextAgent = currentAgent + i
    if (nextAgent > preferences.length) {
      setCurrentAgent(1)
    } else if (nextAgent < 1) {
      setCurrentAgent(preferences.length)
    } else {
      setCurrentAgent(nextAgent)
    }
  }
  const onClickRunAlgo = (algo: AlgoName) => {
    setAlgoModalOpen(false)
    console.log('running ' + algo)
  }

  const currentAgentPrefs = preferences[currentAgent - 1]
  const isComplete = isDrawingComplete(currentAgentPrefs)

  return (
    <GraphContext.Provider
      value={{
        yScale,
        xScale,
        currentAgent,
      }}
    >
      <Stack margin={3}>
        <GraphHeader
          totalAgents={preferences.length}
          isComplete={isComplete}
          currentAgent={currentAgent}
          onClickDone={onClickDone}
          onChangeIndex={onChangeIndex}
          onClickCreateAgent={onClickCreateAgent}
          onClickCompare={onClickCompare}
          compareMode={compareMode}
        />
        {compareMode ? (
            <CompareViewGraph preferences={preferences} />
        ) : (
          <DrawingLayer
            segments={currentAgentPrefs}
            setSegments={setCurrentAgentPrefs}
          />
        )}
      </Stack>
      <SelectAlgoModal
        open={algoModalOpen}
        onCancel={() => setAlgoModalOpen(false)}
        onConfirm={onClickRunAlgo}
        totalAgents={preferences.length}
      />
    </GraphContext.Provider>
  )
}
