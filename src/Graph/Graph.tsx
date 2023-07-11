import React, { useState } from 'react'

import { Stack, Box } from '@mui/material'
import { DrawingLayer } from './components/DrawingLayer'
import { GraphHeader } from './components/Header/GraphHeader'
import { SwitchAgentHeader } from './components/Header/SwitchAgentHeader'
import {
  CompareHeaderButtons,
  DrawingHeaderButtons,
} from './components/Header/GraphButtons'
import { CompareViewGraph } from './components/CompareViewGraph'
import { SelectAlgoModal } from './components/SelectAlgoModal'
import { Slice, Segment, Preferences, SectionLabel } from '../types'
import { GraphContext } from './GraphContext'
import { createScales, isDrawingComplete } from './graphUtils'
import {
  AlgoName,
  defaultGraphHeight,
  defaultGraphWidth,
  getInnerWidth,
  getInnerHeight,
  defaultCakeSize,
  margin,
} from './graphConstants'
import { runDivisionAlgorithm } from './algorithm/run'
import { LoadingModal } from '../components/LoadingModal'
import { getAgentColor } from '../constants'
import { ResultsView } from './components/ResultsView/ResultsView'

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
// import useMediaQuery from '@mui/material/useMediaQuery';

// export default function SimpleMediaQuery() {
//   const matches = useMediaQuery('(min-width:600px)');

//   return <span>{`(min-width:600px) matches: ${matches}`}</span>;
// }

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

const testResults = [
  {
    start: 0.9356060606060607,
    end: 1.8712121212121213,
    value: 7.08219696969697,
    values: [8.233333333333334, 4.210227272727273, 7.08219696969697],
    owner: 2,
    valuePercent: 0.5324960127591707,
  },
  {
    start: 2.510438689217759,
    end: 3,
    value: 4.2102272727272725,
    values: [3.4758853065539106, 4.2102272727272725, 1.125991014799154],
    owner: 1,
    valuePercent: 0.23921745867768593,
  },
  {
    start: 0,
    end: 0.9356060606060607,
    value: 8.233333333333334,
    values: [8.233333333333334, 4.210227272727273, 2.9003787878787883],
    owner: 0,
    valuePercent: 0.3333333333333333,
  },
  {
    start: 2.1928396707213698,
    end: 2.510438689217759,
    value: 2.7313515590689477,
    values: [2.2549530313243635, 2.7313515590689477, 0.7304777425416953],
    owner: 1,
    valuePercent: 0.15519042949255382,
  },
  {
    start: 1.8712121212121213,
    end: 1.9636776582427158,
    value: 0.7304777425416963,
    values: [0.8136967258692313, 0.41609491663767506, 0.7304777425416963],
    owner: 2,
    valuePercent: 0.054923138536969646,
  },
  {
    start: 1.9636776582427158,
    end: 2.1928396707213698,
    value: 1.6887982695858264,
    values: [1.6887982695858264, 1.8218717061115588, 0.7304777425416957],
    owner: 0,
    valuePercent: 0.06837239957837353,
  },
]

export const Graph = () => {
  const cakeSize = defaultCakeSize
  const { yScale, xScale } = createScales({
    innerWidth: getInnerWidth(defaultGraphWidth),
    innerHeight: getInnerHeight(defaultGraphHeight),
    cakeSize,
  })

  const [algoResults, setAlgoResults] = useState<Slice[] | []>(testResults)
  // const [algoResults, setAlgoResults] = useState<Slice[] | []>(null)
  const [preferences, setPreferences] = useState<Preferences>(temp2)
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

    const results = await runDivisionAlgorithm(preferences, algo, cakeSize)
    setAlgoResults(results.sort((a, b) => a.start - b.start))

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
    body = <ResultsView results={algoResults} preferences={preferences} />
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
              setNewData={setNewData}
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
                setNewData={setNewData}
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
