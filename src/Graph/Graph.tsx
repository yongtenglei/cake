import { useState } from 'react'

import { Box, Button } from '@mui/material'
import { LoadingModal } from '../components/LoadingModal'
import { getAgentColor } from '../constants'
import { Portion, Preferences, SectionLabel, Segment } from '../types'
import { GraphContext } from './GraphContext'
import { runDivisionAlgorithm } from './algorithm/run'
import { CompareViewGraph } from './components/CompareViewGraph'
import { DrawingLayer } from './components/DrawingLayer'
import {
  CompareHeaderButtons,
  DrawingHeaderButtons,
} from './components/Header/GraphButtons'
import { GraphHeader } from './components/Header/GraphHeader'
import { SwitchAgentHeader } from './components/Header/SwitchAgentHeader'
import { ResultsView } from './components/ResultsView/ResultsView'
import { SelectAlgoModal } from './components/SelectAlgoModal'
import {
  AlgoName,
  defaultCakeSize,
  defaultGraphHeight,
  defaultGraphWidth,
  getInnerHeight,
  getInnerWidth
} from './graphConstants'
import { createScales, isDrawingComplete } from './graphUtils'

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

const temp2: Preferences = [
  [
    {
      start: 0,
      startValue: 8.8,
      end: 2,
      endValue: 8.8,
      id: 1,
    },
    {
      start: 2,
      startValue: 7.1,
      end: 3,
      endValue: 7.1,
      id: 2,
    },
  ],
  [
    {
      start: 0,
      startValue: 4.5,
      end: 2,
      endValue: 4.5,
      id: 3,
    },
    {
      start: 2,
      startValue: 8.6,
      end: 3,
      endValue: 8.6,
      id: 4,
    },
  ],
  [
    {
      start: 0,
      startValue: 3.1,
      end: 1,
      endValue: 3.1,
      id: 1,
    },
    {
      start: 1,
      startValue: 7.9,
      end: 2,
      endValue: 7.9,
      id: 2,
    },
    {
      start: 2,
      startValue: 2.3,
      end: 3,
      endValue: 2.3,
      id: 3,
    },
  ],
]
const testPortions: Portion[] = [
  {
    owner: 0,
    percentValues: [0.40170573291170686, 0.3427328965249336, 0.2729967316105627],
    edges: [
      [0, 0.9356060606060607],
      [1.9636776582427158, 2.1928396707213698],
    ],
  },
  {
    owner: 1,
    percentValues: [0.2320177464728046, 0.39440788817023975, 0.13958411709329693],
    edges: [
      [2.510438689217759, 3],
      [2.1928396707213698, 2.510438689217759],
    ],
  },
  {
    owner: 2,
    percentValues: [0.36627652061548843, 0.2628592153048266, 0.5874191512961403],
    edges: [
      [0.9356060606060607, 1.8712121212121213],
      [1.8712121212121213, 1.9636776582427158],
    ],
  },
]

const labels: SectionLabel[] = [
  {
    name: 'Strawberry',
    start: 0,
    end: 1,
    color: '#F2CADF',
    id: 1,
  },
  {
    name: 'Vanilla',
    start: 1,
    end: 2,
    color: '#F2F1A1',
    id: 2,
  },
  {
    name: 'Chocolate',
    start: 2,
    end: 3,
    color: '#A57C52',
    id: 3,
  },
]

export const Graph = () => {
  const cakeSize = defaultCakeSize
  const { yScale, xScale } = createScales({
    innerWidth: getInnerWidth(defaultGraphWidth),
    innerHeight: getInnerHeight(defaultGraphHeight),
    cakeSize,
  })

  const [algoUsed, setAlgoUsed] = useState<AlgoName | null>('selfridgeConway')
  const [algoResults, setAlgoResults] = useState<Portion[] | []>(testPortions)
  // const [algoResults, setAlgoResults] = useState<Portion[] | []>(null)
  const [preferences, setPreferences] = useState<Preferences>(temp2)
  // const [preferences, setPreferences] = useState<Preferences>([[]])
  const resetData = (pref: Preferences = [[]]) => {
    setPreferences(pref)
    setCurrentAgent(0)
    setCompareMode(false)
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
    prefs[currentAgent] = segs.filter((seg) => seg.end > seg.start)
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

    setAlgoUsed(algo)
    const results = await runDivisionAlgorithm(preferences, algo, cakeSize)
    setAlgoResults(results)

    setLoading(false)
    setCompareMode(true)
  }
  const onClickEdit = (agent: number) => {
    setCompareMode(false)
    setCurrentAgent(agent)
  }
  const currentAgentPrefs = preferences[currentAgent]
  const isComplete = isDrawingComplete(currentAgentPrefs)

  let body = null
  if (algoResults) {
    body = (
      <Box>
        {/* <Button onClick={}>Edit</Button> */}
        <Button onClick={() => resetData()} variant="contained">Start Over</Button>
        {/* <IconButton onClick={() => resetData()}>
          <LoopIcon />
          Start Over
        </IconButton> */}
        <ResultsView results={algoResults} preferences={preferences} algoUsed={algoUsed} />
      </Box>
    )
  } else if (compareMode) {
    body = (
      <>
        <GraphHeader
          color={'#ccc'}
          heading={<h2>Compare</h2>}
          buttons={
            <CompareHeaderButtons
              totalAgents={preferences.length}
              isComplete={isComplete}
              onClickCompare={onClickCompare}
              onClickDone={onClickDone}
              preferences={preferences}
              setNewData={resetData}
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
                navigationDisabled={preferences.length < 2}
                onChangeIndex={onChangeIndex}
                currentAgent={currentAgent}
              />
            }
            buttons={
              <DrawingHeaderButtons
                totalAgents={preferences.length}
                isComplete={isComplete}
                onClickCreateAgent={onClickCreateAgent}
                onClickCompare={onClickCompare}
                onClickDone={onClickDone}
                compareMode={compareMode}
                preferences={preferences}
                setNewData={resetData}
              />
            }
          />
        </Box>
        <Box sx={{ position: 'relative', zIndex: 1, top: -10 }}>
          <DrawingLayer
            segments={currentAgentPrefs}
            setSegments={setCurrentAgentPrefs}
            currentAgent={currentAgent}
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
          labels,
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
