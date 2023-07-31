import {
  Box,
  Button,
  Stack
} from '@mui/material'

import ReplayIcon from '@mui/icons-material/Replay'

import { useState } from 'react'
import { GraphContext } from '../../Graph/GraphContext'
import { findCutLineByPercent } from '../../Graph/algorithm/getValue'
import { runDivisionAlgorithm } from '../../Graph/algorithm/run'
import { Result } from '../../Graph/algorithm/types'
import { DrawingLayer } from '../../Graph/components/DrawingLayer'
import { ViewGraph } from '../../Graph/components/ViewGraph'
import { getInnerHeight, getInnerWidth } from '../../Graph/graphConstants'

import { ResultsSteps } from '../../Graph/components/ResultsView/ResultsSteps'
import { createScales } from '../../Graph/graphUtils'
import cake2PrefAki from '../../images/aki-two-flavor.png'
import { Portion, Segment } from '../../types'
import { formatNumber } from '../../utils/formatUtils'
import { CakeImage, CharacterImage, ImageContainer } from './Images'
import { C_STRAWBERRY, C_VANILLA } from '../../colors'

const akisPreferences = [
  { id: 1, start: 0, end: 1, startValue: 7, endValue: 7 },
  { id: 2, start: 1, end: 2, startValue: 5, endValue: 5 },
]
const label0 = {
  id: 1,
  name: 'Strawberry',
  start: 0,
  end: 1,
  color: C_STRAWBERRY,
}

const label1 = {
  id: 2,
  name: 'Vanilla',
  start: 0,
  end: 1,
  color: C_VANILLA,
}


export const MeasuringStep = () => {
  const drawingWidth = 300
  const drawingHeight = 300
  const drawingInnerWidth = getInnerWidth(drawingWidth)
  const drawingScales = createScales({
    innerWidth: drawingInnerWidth,
    innerHeight: getInnerHeight(drawingHeight),
    cakeSize: 1,
  })
  const outputWidth = 300
  const outputHeight = 80

  // Draw each half cake individually. A bit of a hack but helpful for learners.
  const [segment0, setSegment0] = useState<Segment[]>([])
  const [segment1, setSegment1] = useState<Segment[]>([])

  const [algoResults, setAlgoResults] = useState<Result | undefined>(undefined)
  const [cutPoint, setCutPoint] = useState<number | undefined>(undefined)
  const segments = [...segment0, ...segment1.map((seg) => ({ ...seg, start: 1, end: 2 }))]
  const redoMarking = () => {
    setSegment0([])
    setSegment1([])
    setCutPoint(undefined)
    setAlgoResults(undefined)
  }
  const onChangeSegments = (flavor: number) => (segs: Segment[]) => {
    const s = segs.filter((seg) => seg.end > seg.start)
    flavor === 0 ? setSegment0(s) : setSegment1(s)
    setCutPoint(undefined)
    setAlgoResults(undefined)
  }
  const runCutAlgo = () => {
    setCutPoint(findCutLineByPercent(segments, 0.5))
  }
  const runAlgo = async () => {
    const results = await runDivisionAlgorithm(
      [segments, akisPreferences],
      'cutAndChoose',
      2
    )
    setAlgoResults(results)
  }
  const drawingComplete = segments.length === 2

  const cutPointPercent = (100 * cutPoint) / 2 // 2 is cake size

  const activeCutlineProps = {
    role: 'button',
    tabIndex: 0,
    onClick: runAlgo,
    'aria-label': `Cut the cake here, at ${cutPointPercent}%`,
  }
  const akiLikesLeft =
    algoResults?.solution.find((result) => result.owner === 1)?.edges[0][0] === 0

  return (
    <>
      <h2>Measuring Preference</h2>

      <p>Here's a strawberry and vanilla cake</p>
      <ImageContainer>
        <CakeImage flavor="strawberry" width={drawingInnerWidth} />
        <CakeImage flavor="vanilla" width={drawingInnerWidth} />
      </ImageContainer>
      <p>This time you cut and Aki chooses.</p>

      {cutPoint ? null : (
        <p>
          First, <strong>mark</strong> how much you like each flavor on the graph below
          with 0 meaning being "hate it" and 10 meaning "love it".
        </p>
      )}

      <Stack
        direction="row"
        marginX="auto"
        justifyContent="center"
        flexWrap={{ xs: 'wrap', md: 'nowrap' }}
      >
        <GraphContext.Provider
          value={{
            ...drawingScales,
            height: drawingHeight,
            width: drawingWidth,
            labels: [label0],
            cakeSize: 1,
          }}
        >
          {cutPoint ? (
            <ViewGraph segments={segment0} agent={0} />
          ) : (
            <DrawingLayer
              segments={segment0}
              setSegments={onChangeSegments(0)}
              currentAgent={0}
              isComplete={drawingComplete}
            />
          )}
        </GraphContext.Provider>
        <GraphContext.Provider
          value={{
            ...drawingScales,
            height: drawingHeight,
            width: drawingWidth,
            labels: [label1],
            cakeSize: 1,
          }}
        >
          {cutPoint ? (
            <ViewGraph segments={segment1} agent={0} />
          ) : (
            <DrawingLayer
              segments={segment1}
              setSegments={onChangeSegments(1)}
              currentAgent={0}
              isComplete={drawingComplete}
            />
          )}
        </GraphContext.Provider>
      </Stack>

      <Stack
        justifyContent={'center'}
        direction="row"
        spacing={2}
        marginTop={2}
        marginBottom={6}
      >
        <Button variant="outlined" disabled={!drawingComplete} onClick={redoMarking}>
          Redo
        </Button>
        <Button
          variant="contained"
          disabled={!drawingComplete || !!cutPoint}
          onClick={runCutAlgo}
        >
          Done marking
        </Button>
      </Stack>

      {cutPoint ? (
        <>
          <p>
            Based on <strong>how you marked your preferences</strong>, the cake on both
            sides of this dotted line are each worth <sup>1</sup>
            &frasl;
            <sub>2</sub> of the total cake to you. Remember, we don't know which piece Aki
            will choose yet.
          </p>
          <p>
            If you wouldn't be happy receiving the left or right piece, feel free to REDO
            your preferences.
          </p>

          <Box width="fit-content" marginX="auto" position="relative">
            <CakeImage flavor="strawberry" width="200px" />
            <CakeImage flavor="vanilla" width="200px" />
            {/* Dotted line for cutting */}
            <Box
              {...(algoResults ? {} : activeCutlineProps)}
              position="absolute"
              left={cutPointPercent + '%'}
              top={0}
              sx={{
                cursor: 'pointer',
                transform: 'translateX(-50%)',
                '&:hover, &:focus': {
                  transform: 'translateX(-50%) scaleX(1.5)',
                },
              }}
              paddingX={2}
              height="100%"
            >
              <Box borderLeft="4px dashed black" height="100%" />
            </Box>
          </Box>
          <p>
            Now click the dotted line to <strong>cut the cake!</strong>
          </p>
        </>
      ) : null}

      {algoResults ? (
        <>
          <Box component="p" marginTop={4}>
            Nice! Let's see which piece Aki chooses:
          </Box>

          <CharacterImage character="Aki" sx={{ marginY: 2, marginX: 'auto' }} />

          {/* This is a bit of a magic trick and took a lot of experimenting to get right. */}
          {/* The outer container hides anything outside its bounds. */}
          <Box
            width="fit-content"
            marginX="auto"
            position="relative"
            overflow="hidden"
            sx={{
              transform: `translateX(${
                (-1 * (akiLikesLeft ? 100 - cutPointPercent : -cutPointPercent)) / 2
              }%)`,
            }}
          >
            {/* The inner container moves based on the cut line and which piece aki chooses 
              so that only Aki's piece is visible.
              Unfortunately, this doesn't work well on small screen sizes so may need adjustments.
            */}
            <Box
              display="flex"
              sx={{
                transform: `translateX(${
                  akiLikesLeft ? 100 - cutPointPercent : -cutPointPercent
                }%)`,
              }}
            >
              <CakeImage flavor="strawberry" width="200px" />
              <CakeImage flavor="vanilla" width="200px" />
            </Box>
          </Box>

          <p>
            It turns out Aki likes strawberry more than vanilla
            {akiLikesLeft ? (
              <>
                {' '}
                so she chose the <strong>left piece</strong>.
              </>
            ) : (
              <>
                , yet despite that, the <strong>right piece</strong> looks better to her
                based on where you cut the cake.
              </>
            )}
          </p>
          <p>
            She says although her piece is physically{' '}
            {formatNumber(akiLikesLeft ? cutPointPercent : 100 - cutPointPercent, 2)}% of
            the cake, it's worth{' '}
            {formatNumber(
              algoResults.solution.find((portion: Portion) => portion.owner === 1)
                .percentValues[1] * 100,
              2
            )}
            % of the total cake value to her.
          </p>

          <p>If you are curious, these are Aki's preferences:</p>

          <img
            src={cake2PrefAki}
            alt=""
            style={{ maxHeight: 300, margin: 'auto', display: 'block' }}
          />

          <Box component="p" marginTop={8}>
            Here's the steps showing how we arrived at this solution.
          </Box>

          <GraphContext.Provider
            value={{
              ...createScales({
                innerWidth: outputWidth,
                innerHeight: outputHeight,
                cakeSize: 2,
              }),
              height: outputHeight,
              width: outputWidth,
              labels: [label0, { ...label1, start: 1, end: 2 }],
              cakeSize: 2,
              names: ['You', 'Aki'],
              namesPossessive: ['Your', "Aki's"],
            }}
          >
            <ResultsSteps algoUsed="cutAndChoose" result={algoResults} />
          </GraphContext.Provider>

          <p>Feel free to experiment with different values. </p>
          <Stack alignItems={'center'}>
            <Button variant="contained" disabled={!drawingComplete} onClick={redoMarking}>
              <ReplayIcon sx={{ marginRight: 1 / 2 }} />
              Reset
            </Button>
          </Stack>
        </>
      ) : null}
    </>
  )
}
