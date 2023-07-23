import { Box, Button, Stack, Tooltip } from '@mui/material'

import ArrowBackIcon from '@mui/icons-material/ArrowBackIos'
import ArrowForwardIcon from '@mui/icons-material/ArrowForwardIos'
import ReplayIcon from '@mui/icons-material/Replay'

import { useEffect, useState } from 'react'
import { useLocation, useParams } from 'react-router-dom'
import { GraphContext } from '../../Graph/GraphContext'
import { findCutLineByPercent } from '../../Graph/algorithm/getValue'
import { runDivisionAlgorithm } from '../../Graph/algorithm/run'
import { DrawingLayer } from '../../Graph/components/DrawingLayer'
import { ResultsGraphs } from '../../Graph/components/ResultsView/ResultsGraphs'
import { ViewGraph } from '../../Graph/components/ViewGraph'
import {
  Algorithms,
  getInnerHeight,
  getInnerWidth,
  margin,
} from '../../Graph/graphConstants'
import { createScales, isDrawingComplete } from '../../Graph/graphUtils'
import { InteractionContainer } from '../../Layouts'
import { C_STRAWBERRY, C_VANILLA } from '../../colors'
import { ButtonLink, Link } from '../../components/Link'
import cake3PrefAki from '../../images/preference/aki.png'
import cake3PrefBruno from '../../images/preference/bruno.png'
import cake3PrefChloe from '../../images/preference/chloe.png'
import selfridgeResults from '../../images/results/selfridgeresults.png'
import simple3Results from '../../images/results/simple3results.png'
import toolExample from '../../images/tool example.png'
import { Portion, Segment } from '../../types'
import { formatNumber } from '../../utils/formatUtils'
import { CakeFlavor, CakeImage, CharacterImage } from './Images'

interface CommonProps {
  preferredFlavor: CakeFlavor | null
  setPreferredFlavor: (flavor: CakeFlavor) => void
}

export const LearningPath = () => {
  const { step } = useParams()

  // scroll to top when navigating between steps
  const { pathname } = useLocation()
  useEffect(() => {
    if (pathname === '/learn') {
      // scroll to top on initial load
      window.scrollTo(0, 0)
    } else {
      // otherwise scroll to container
      document.getElementById('container')?.scrollIntoView()
    }
  }, [pathname])

  const [preferredFlavor, setPreferredFlavor] = useState<CakeFlavor | undefined>(
    undefined
  )

  let stepNum = Number(step)
  if (isNaN(stepNum) || stepNum < 1) {
    stepNum = 1
  }

  const stepProps: CommonProps = { preferredFlavor, setPreferredFlavor }

  const steps: [any, string][] = [
    [null, ''], // step 0
    [WhatLearn, "What You'll Learn"],
    [FairDivision, 'Fair Division'],
    [SimpleCakeDivision, 'Simple Cake Division'],
    [MeaningOfFair, 'Meaning of Fair'],
    [TwoFlavorCake, '2-Flavor Cake'],
    [BetterThanHalf, 'Better Than Half'],
    [CutAndChoose, 'Cut and Choose'],
    [MeasuringPreference, 'Measuring Preference'],
    [Recap1, 'Recap'],
    [EnterPlayer3, 'Enter Player 3'],
    [EnvyFree, 'Envy Free'],
    [SelfridgeConway, 'The Selfridge-Conway Method'],
    [ThreeWayDivision, '3-Way Division'],
    [ParetoOptimal, 'Pareto-Optimal Solutions'],
    [Recap2, 'Final Recap'],
    [Ending, 'End'],
  ]
  const [CurrentStep] = steps[stepNum]
  return (
    <InteractionContainer
      id="container"
      minHeight={600}
      display="flex"
      flexDirection="column"
      sx={{
        '& p, & dt, & dd,& ol,& ul': {
          fontSize: 18,
        },
      }}
    >
      <Box flexGrow={1}>
        <CurrentStep {...stepProps} />
      </Box>
      <Box
        marginTop={4}
        display="grid"
        gridTemplateColumns={{ xs: '50% 50%', sm: '1fr 4fr 1fr' }}
        alignItems="center"
        // justifyContent="space-between"
        justifyItems="center"
      >
        {/* Put the buttons next to each other for better accessibility, then the dots */}
        <Box order={1}>
          {stepNum <= 1 ? null : (
            <ButtonLink
              variant="outlined"
              href={'/learn/' + (stepNum - 1)}
              sx={{ justifySelf: 'flex-start' }}
            >
              <ArrowBackIcon fontSize="small" />
              Previous
            </ButtonLink>
          )}
        </Box>
        <Box order={{ xs: 2, sm: 3 }}>
          {stepNum >= steps.length - 1 ? null : (
            <ButtonLink
              variant="contained"
              href={'/learn/' + (stepNum + 1)}
              sx={{ justifySelf: 'flex-end' }}
            >
              Next
              <ArrowForwardIcon fontSize="small" />
            </ButtonLink>
          )}
        </Box>
        <Stack
          order={2}
          direction="row"
          spacing={1}
          justifySelf="center"
          component="ol"
          margin={0}
          padding={0}
          sx={{ listStyle: 'none', display: { xs: 'none', sm: 'flex' } }}
          alignItems="center"
          flexWrap="wrap"
          justifyContent="center"
          paddingX={2}
        >
          {steps.map(([_, stepName], i) => {
            const current = stepNum === i
            return i === 0 ? null : (
              <Tooltip title={stepName} key={i}>
                <li style={{ margin: 0 }}>
                  <Link
                    href={`/learn/${i}`}
                    aria-label={current ? 'Current page' : `Go to ${stepName}`}
                    // wrapping the navigation circle like this creates a larger click target
                    sx={{
                      display: 'block',
                      padding: '6px',
                      ':hover>div,:focus>div': {
                        transform: 'scale(1.2)',
                      },
                    }}
                  >
                    <Box
                      sx={{
                        display: 'block',
                        borderRadius: '50%',
                        backgroundColor: (theme) =>
                          current ? theme.palette.secondary.main : '#666',
                        height: 12,
                        width: 12,
                      }}
                    />
                  </Link>
                </li>
              </Tooltip>
            )
          })}
        </Stack>
      </Box>
    </InteractionContainer>
  )
}

const ImageContainer = ({ children }) => (
  <Stack direction="row" justifyContent="center" marginY={2} sx={{ clear: 'both' }}>
    {children}
  </Stack>
)

const WhatLearn = () => (
  <>
    <h2>Fair Division Interactive Course</h2>
    {/* flavor image here */}
    <p>Time: about 10 minutes</p>
    <h3>What you'll learn</h3>
    <ol>
      <li>What is fair division</li>
      <li>Divisible vs indivisible resources</li>
      <li>Proportional fairness and envy-free fairness</li>
      <li>The Cut and Choose Method for fair division</li>
      <li>The Selfridge-Conway Method for fair division</li>
    </ol>
    <p>Let's begin.</p>
  </>
)

const FairDivision = () => {
  return (
    <>
      <h2>Fair Division</h2>
      <p>
        <strong>Fair division</strong> means dividing a resource in a way that everyone
        involved believes is fair.
      </p>
      <p>
        Generally speaking, there are two types of resources: divisible and indivisible.
      </p>
      <p>
        <strong>Divisible resources</strong> are resources which can be divided any number
        of times, in any number of places. This could be land, time, airwaves, or anything
        else arbitrarily divisible. When speaking abstractly, we usually refer to a
        divisible resources as a <strong>cake</strong>.
      </p>
      <p>
        Cakes are good examples because they can be cut at any place, as many times as
        necessary, and are usually shared equally.
      </p>
      <CakeImage
        flavor="chocolate"
        width={200}
        sx={{ display: 'block', margin: 'auto' }}
      />

      <p>
        In contrast, <strong>indivisible resources</strong> can't be split. This could be
        a laptop or a car, the kind of thing you really shouldn't cut in half.
      </p>
      <p>
        For this discussion, we'll focus on <strong>divisible resources</strong>.
      </p>
      <p>Let's explore an example.</p>
    </>
  )
}

const SimpleCakeDivision = () => {
  const [selected, setSelected] = useState(false)
  return (
    <>
      <h2>Simple Cake Division</h2>
      <CharacterImage character="Aki" sx={{ float: 'right' }} />
      <p>
        You and your friend Aki have a small chocolate cake. She's divided it into two
        pieces. Which piece do you want?
      </p>

      <ImageContainer>
        <CakeImage flavor="chocolate" width="200px" onClick={() => setSelected(true)} />
        <CakeImage flavor="chocolate" width="200px" onClick={() => setSelected(true)} />
      </ImageContainer>
      {selected ? (
        <>
          <p>Yum!</p>
          <p>Since both pieces are identical, you get a fair portion either way.</p>
          <p>
            This cake division solution is fair because both you and Aki receive{' '}
            <sup>1</sup>
            &frasl;
            <sub>2</sub> of the cake.
          </p>
        </>
      ) : null}
    </>
  )
}

const MeaningOfFair = () => {
  return (
    <>
      <h2>The Meaning of Fair</h2>
      <p>But what does “fair” really mean?</p>
      <p>
        One way to define fair is <strong>proportionality</strong>. A solution to a
        division problem is <strong>proportional</strong> if for <em>n</em> people, each
        person receives <sup>1</sup>&frasl;<sub>n</sub> of the resource.
      </p>
      <p>
        For example, with 2 people each get <sup>1</sup>&frasl;
        <sub>2</sub> of the resource, with 3 people, each get <sup>1</sup>&frasl;
        <sub>3</sub>.
      </p>
      <p>
        With a <strong>homogenous</strong> cake (made of the same thing) all the pieces
        are identical so this is simple. But this gets tricky when a cake has multiple
        flavors.
      </p>
    </>
  )
}

const TwoFlavorCake = ({ preferredFlavor, setPreferredFlavor }: CommonProps) => {
  return (
    <>
      <h2>2-Flavor Cake</h2>
      <p>
        This cake is <strong>heterogenous</strong> (made of different things).
      </p>
      <CharacterImage character="Aki" sx={{ float: 'right' }} />

      <p>
        One half of the cake is chocolate, and the other is vanilla. Aki has divided the
        cake into two pieces right where the flavors meet.
      </p>
      <p>
        <em>Which piece do you want?</em>
      </p>

      <ImageContainer>
        <CakeImage
          flavor="vanilla"
          width="200px"
          onClick={() => setPreferredFlavor('vanilla')}
        />
        <CakeImage
          flavor="chocolate"
          width="200px"
          onClick={() => setPreferredFlavor('chocolate')}
        />
      </ImageContainer>
      {preferredFlavor && (
        <>
          <p>
            Cool. So you prefer <strong>{preferredFlavor}</strong>?
          </p>
          <p>
            Aki is happy to take the other piece because she likes both flavors equally.
          </p>
          <p>
            This solution is <strong>proportional</strong> because Aki got a piece worth{' '}
            <sup>1</sup>&frasl;
            <sub>2</sub> the cake to her and you got a piece worth <sup>1</sup>&frasl;
            <sub>2</sub> the cake to you.
          </p>
        </>
      )}
    </>
  )
}

const BetterThanHalf = ({ preferredFlavor = 'chocolate' }: CommonProps) => {
  const otherFlavor = preferredFlavor === 'chocolate' ? 'vanilla' : 'chocolate'
  return (
    <>
      <h2>Better Than Half</h2>
      <p>
        Since Aki likes chocolate and vanilla equally, she values both pieces of the cake
        at <sup>1</sup>&frasl;
        <sub>2</sub> of the whole.
      </p>
      <Stack direction="row" alignItems="flex-start" justifyContent="center">
        <CakeImage flavor={preferredFlavor} width="200px" />
        <Box fontSize={150}>&gt;</Box>
        <CakeImage flavor={otherFlavor} width="200px" />
      </Stack>
      <p>
        If you like both flavors equally, then this division is <sup>1</sup>&frasl;
        <sub>2</sub> and <sup>1</sup>&frasl;
        <sub>2</sub> for you as well.
      </p>
      <p>
        However, if you like <strong>{preferredFlavor}</strong> more than{' '}
        <strong>{otherFlavor}</strong>, the piece you received is worth{' '}
        <em>
          more than <sup>1</sup>&frasl;
          <sub>2</sub> the cake's value
        </em>
        .
      </p>
      <p>
        Either way, this solution is still <strong>proportionally fair</strong> to Aki
        because she only expected to receive <sup>1</sup>&frasl;
        <sub>2</sub> the value.
      </p>
    </>
  )
}

const CutAndChoose = () => {
  return (
    <>
      <h2>Cut and Choose</h2>
      <p>
        This method of splitting a resource between 2 people is called{' '}
        <strong>Cut and Choose</strong>. It works like this:
      </p>
      <ol>
        <li>
          One person <strong>cuts</strong> the resource into two portions which{' '}
          <strong>they judge to have equal value</strong>. Both portions are equal to them
          so they will accept either one.
        </li>
        <li>
          The second person <strong>chooses</strong> which piece they personally prefer.
          This piece may be worth more to them than <sup>1</sup>&frasl;
          <sub>2</sub> of cake.
        </li>
      </ol>
      <p>
        Cut and Choose is <strong>proportionally fair</strong> to both people. However, if
        the chooser values parts of the cake differently than the cutter, one piece may be
        worth more than half. Therefore, with Cut and Choose, it's better to be the
        chooser.
      </p>
    </>
  )
}

const akisPreferences = [
  { id: 1, start: 0, end: 1, startValue: 10, endValue: 10 },
  { id: 2, start: 1, end: 2, startValue: 5, endValue: 5 },
]
const MeasuringPreference = () => {
  const cakeSize = 2
  const labels = [
    {
      id: 1,
      name: 'strawberry',
      start: 0,
      end: 1,
      color: C_STRAWBERRY,
    },
    {
      id: 2,
      name: 'vanilla',
      start: 1,
      end: 2,
      color: C_VANILLA,
    },
  ]
  const drawingWidth = 500
  const drawingHeight = 300
  const drawingInnerWidth = getInnerWidth(drawingWidth)
  const drawingScales = createScales({
    innerWidth: drawingInnerWidth,
    innerHeight: getInnerHeight(drawingHeight),
    cakeSize,
  })
  const outputWidth = 400
  const outputHeight = 150

  const [algoResults, setAlgoResults] = useState<Portion[] | []>(null)
  const [segments, setSegments] = useState<Segment[]>([])
  const [cutPoint, setCutPoint] = useState<number | undefined>(undefined)
  const redoMarking = () => {
    setSegments([])
    setCutPoint(undefined)
    setAlgoResults(null)
  }
  const onChangeSegments = (segs: Segment[]) => {
    setSegments(segs.filter((seg) => seg.end > seg.start))
    setCutPoint(undefined)
    setAlgoResults(null)
  }
  const runCutAlgo = () => {
    setCutPoint(findCutLineByPercent(segments, 0.5))
  }
  const runAlgo = async () => {
    const results = await runDivisionAlgorithm(
      [segments, akisPreferences],
      'cutAndChoose',
      cakeSize
    )
    setAlgoResults(results)
  }
  const drawingComplete = isDrawingComplete(segments, cakeSize)
  return (
    <>
      <h2>Measuring Preference</h2>

      <p>Here's a strawberry and vanilla cake</p>
      <ImageContainer>
        <CakeImage flavor="strawberry" width={drawingInnerWidth / 2} />
        <CakeImage
          flavor="vanilla"
          width={drawingInnerWidth / 2}
          // makes the pieces look attached
          sx={{ marginLeft: '-2px' }}
        />
      </ImageContainer>
      <p>This time you cut and Aki chooses.</p>

      {cutPoint ? null : (
        <p>
          First, <strong>mark</strong> how much you like each flavor on the graph below.
          The scale goes from 0-10 with higher numbers meaning that flavor is higher value
          to you.
        </p>
      )}

      <GraphContext.Provider
        value={{
          ...drawingScales,
          height: drawingHeight,
          width: drawingWidth,
          labels,
          cakeSize,
        }}
      >
        <Box
          position="relative"
          marginX="auto"
          paddingRight={margin.left - margin.right + 'px'}
          width="fit-content"
        >
          {cutPoint ? (
            <ViewGraph segments={segments} agent={0} />
          ) : (
            <DrawingLayer
              segments={segments}
              setSegments={onChangeSegments}
              currentAgent={0}
              isComplete={drawingComplete}
            />
          )}
          {/* Dotted line for cutting */}
          {cutPoint ? (
            <Box
              role="button"
              tabIndex={0}
              position="absolute"
              onClick={runAlgo}
              left={drawingScales.xScale(cutPoint) + margin.left}
              top={0}
              aria-label={`Cut the cake here, at ${(cutPoint / cakeSize) * 100}%`}
              sx={{
                cursor: 'pointer',
                transform: {
                  xs: 'translateX(-50%)',
                },
                '&:hover, &:focus': {
                  transform: 'translateX(-50%) scaleX(1.5)',
                },
              }}
              paddingX={2}
              height="100%"
            >
              <Box borderLeft="4px dashed black" height="100%" />
            </Box>
          ) : null}
        </Box>
      </GraphContext.Provider>

      {cutPoint && !algoResults ? (
        <p>
          Based on your preferences, this dotted line is where you should cut the cake so
          that each piece is worth <sup>1</sup>
          &frasl;
          <sub>2</sub> the cake to you. This way you'll get a fair portion of the cake no
          matter which part Aki chooses.
        </p>
      ) : null}

      {cutPoint ? null : (
        <Stack justifyContent={'center'} direction="row" spacing={2} marginY={2}>
          <Button variant="outlined" disabled={!drawingComplete} onClick={redoMarking}>
            Redo
          </Button>
          <Button variant="contained" disabled={!drawingComplete} onClick={runCutAlgo}>
            Done marking
          </Button>
        </Stack>
      )}

      {algoResults ? (
        <>
          <Box component="p" marginTop={4}>
            Nice! Let's see which piece Aki chooses:
          </Box>
          <CharacterImage character="Aki" sx={{ marginY: 2, marginX: 'auto' }} />
          <GraphContext.Provider
            value={{
              ...createScales({
                innerWidth: outputWidth,
                innerHeight: outputHeight,
                cakeSize,
              }),
              height: outputHeight,
              width: outputWidth,
              labels,
              cakeSize,
            }}
          >
            <ResultsGraphs
              preferences={[segments, akisPreferences]}
              results={algoResults}
              names={['You', 'Aki']}
              namesPossessive={['Your', "Aki's"]}
            />
          </GraphContext.Provider>

          <Box component="p" marginTop={6}>
            It turns out Aki likes strawberry even more than vanilla
            {algoResults[1].edges[0][0] === 0
              ? ' so she chose the left piece.'
              : ', yet despite that, the right part looks better to her.'}
          </Box>

          <p>
            She says her piece is worth{' '}
            {formatNumber(
              algoResults.find((portion: Portion) => portion.owner === 1)
                .percentValues[1] * 100,
              2
            )}
            % of the cake to her.
          </p>

          <p>Feel free to experiment with different values. </p>
          <Stack alignItems={'center'}>
            <Button variant="contained" disabled={!drawingComplete} onClick={redoMarking}>
              <ReplayIcon sx={{ marginRight: 1 / 2 }} />
              Reset
            </Button>
          </Stack>
        </>
      ) : null}
      {/* polygon(0 0, 50% 0%, 50% 100%, 0 100%) */}
    </>
  )
}
const Recap1 = () => {
  return (
    <>
      <h2>Part 1 Recap</h2>

      <p>Let's go over a few of the terms we've learned:</p>
      <dl>
        <dt>Fair Division</dt>
        <dd>Dividing a resource fairly between all people involved. </dd>

        <dt>Proportionally fair</dt>
        <dd>
          A definition of fairness. For every n people, each person gets <sup>1</sup>
          &frasl;
          <sub>n</sub> of the resource value or more.
        </dd>

        <dt>Cut and Choose </dt>
        <dd>
          A method for two people to divide a resource in a proportionally fair way.
        </dd>
      </dl>
    </>
  )
}

const threePreferences = (
  <Box
    marginX="auto"
    marginBottom={8}
    display="grid"
    justifyItems="center"
    alignItems="center"
    gridTemplateColumns={{ xs: 'auto', sm: 'auto auto' }}
    maxWidth="600px"
    sx={{ gridRowGap: '16px' }}
  >
    <img src={cake3PrefAki} style={{ maxHeight: 200 }} />
    <Stack alignItems="center">
      <CharacterImage character="Aki" hideName />
      Aki likes vanilla
    </Stack>

    <img src={cake3PrefBruno} style={{ maxHeight: 200 }} />
    <Stack alignItems="center">
      <CharacterImage character="Bruno" hideName />
      Bruno likes chocolate
    </Stack>

    <img src={cake3PrefChloe} style={{ maxHeight: 200 }} />
    <Stack alignItems="center">
      <CharacterImage character="Chloe" hideName />
      Chloe likes both equally
    </Stack>
  </Box>
)

const OverlayText = ({ character, children, ...props }) => (
  <Stack alignItems="center" fontSize={16} {...props}>
    <CharacterImage character={character} hideName width={60} />
    <Box bgcolor={'rgba(255,255,255,0.6)'} border="1px solid black">
      {children}
    </Box>
  </Stack>
)

const EnterPlayer3 = () => {
  return (
    <>
      <h2>Enter Player 3</h2>
      <p>Here we have another cake.</p>
      <ImageContainer>
        <CakeImage flavor="vanilla" />
        <CakeImage flavor="chocolate" />
      </ImageContainer>

      <p>But we need to split it among 3 people this time.</p>
      <ImageContainer>
        <CharacterImage character="Aki" />
        <CharacterImage character="Bruno" />
        <CharacterImage character="Chloe" />
      </ImageContainer>

      <p>Here's how they value the flavors:</p>

      {threePreferences}
      <p>One simple way to split the cake is in thirds like this.</p>
      <Box position="relative" width="fit-content" marginX="auto">
        <Box
          component={'img'}
          src={simple3Results}
          //add alt
          alt=""
          maxHeight={400}
        />
        <Box
          position={{ xs: 'relative', sm: 'absolute' }}
          display="grid"
          gridAutoFlow="row"
          top={0}
          left={0}
          height="100%"
          width="100%"
          paddingX="10px"
          paddingBottom="70px"
          paddingTop="20px"
          sx={{ gridRowGap: '12px' }}
          textAlign="center"
        >
          <OverlayText justifySelf="flex-start" character="Aki">
            Aki gets the left third.
          </OverlayText>
          <OverlayText justifySelf="center" character="Bruno">
            Bruno gets the middle third,
            <br />
            which includes a part he doesn't value.
          </OverlayText>
          <OverlayText justifySelf="flex-end" character="Chloe">
            Chloe gets the right third.
          </OverlayText>
        </Box>
      </Box>
      <ul>
        <li>
          Aki's piece is worth <sup>2</sup>&frasl;
          <sub>3</sub> to her, lucky!
        </li>
        <li>
          Bruno's piece is worth <sup>1</sup>&frasl;
          <sub>3</sub> to him.
        </li>
        <li>
          Chloe's piece is worth <sup>1</sup>&frasl;
          <sub>3</sub> to her.
        </li>
      </ul>

      <p>
        This is a <strong>proportional solution</strong> because everyone gets at least{' '}
        <sup>1</sup>&frasl;
        <sub>3</sub>.
      </p>

      <p>
        <em>However,</em> this solution doesn't seem fair to Bruno. From his perspective,
        Chloe's piece is worth <sup>2</sup>&frasl;
        <sub>3</sub> while his own is only worth <sup>1</sup>&frasl;
        <sub>3</sub>.
      </p>
      <p>
        He <strong>envies</strong> her share and feels cheated.
        {/* tear drop image? */}
      </p>
    </>
  )
}
const EnvyFree = () => {
  return (
    <>
      <h2>Envy Free</h2>
      <p>
        It seems relying on <strong>proportional solutions</strong> leaves some people
        with hurt feelings.
      </p>
      <p>
        Another definition of fairness we can use is <strong>envy-freeness</strong>. A
        solution to a division problem is <strong>envy-free</strong> if no person envies
        another's piece.
      </p>
      <p>
        An envy-free solution is <strong>proportional</strong> as well. Logically, if a
        cake is split into <em>n</em> pieces, then the most valuable piece for each person
        must be worth at least <sup>1</sup>&frasl;
        <sub>n</sub> of the whole.
      </p>
      <p>
        This is easy with 2 people, but splitting a cake with 3 or more gets a bit tricky.
      </p>
    </>
  )
}
const SelfridgeConway = () => {
  return (
    <>
      <h2>The Selfridge-Conway Method</h2>
      <p>
        In the 1960s, <em>John Selfridge</em> and <em>John Conway</em> independently
        discovered a way of dividing a resource between 3 people in a way that's{' '}
        <strong>guaranteed to be envy-free</strong>.
      </p>
      <p>
        This method is now called the <strong>Selfridge-Conway Method.</strong>
      </p>
      <p>
        The steps of the method are a bit involved, but the simplified version looks like
        this:
      </p>
      <ol>
        <li>Person 1 divides the cake into 3 pieces they consider equal.</li>
        <li>
          Person 2 trims a bit off what they consider the largest piece until it matches
          the second largest.
        </li>
        <li>Person 3 chooses a piece to keep, then person 2, then person 1.</li>
        <li>
          Then, the remaining trimmings are divided up between everyone (there's a few
          more steps involved with this part).{' '}
        </li>
      </ol>

      <p>
        If you're curious, you can{' '}
        <Link href={Algorithms.selfridgeConway.link}>
          learn more about the Selfridge-Conway Method.
        </Link>
      </p>
      <p></p>
    </>
  )
}
const ThreeWayDivision = () => {
  return (
    <>
      <h2>Division with the Selfridge-Conway Method</h2>
      <p>Let's see how the Selfridge-Conway Method leads to a envy-free outcome.</p>
      <p>Here is the problem again:</p>

      {threePreferences}

      <p>The cake is split using the Selfridge-Conway Method.</p>

      <p>
        Due to the trimming step, the cake has been cut into more pieces than before.{' '}
      </p>

      <Box position="relative" width="fit-content" marginX="auto">
        <Box
          component="img"
          src={selfridgeResults}
          //add alt text
          alt=""
          maxHeight={500}
        />

        <Box
          position={{ xs: 'relative', sm: 'absolute' }}
          display="grid"
          top={0}
          left={0}
          height="100%"
          width="100%"
          paddingX="10px"
          paddingBottom="70px"
          paddingTop="20px"
          sx={{
            gridTemplateColumns: 'repeat(5,1fr)',
            gridTemplateRows: 'repeat(3,1fr)',
            gridTemplateAreas: `
              ". a a . ." 
              ". . b b b" 
              "c1 . . . c2"`,
            gridRowGap: '12px',
          }}
          textAlign="center"
        >
          <OverlayText justifySelf="flex-start" character="Aki" gridArea="a">
            Aki gets these two pieces
          </OverlayText>
          <OverlayText justifySelf="center" character="Bruno" gridArea="b">
            Bruno gets this one plus a sliver at the end
          </OverlayText>
          <OverlayText justifySelf="flex-end" character="Chloe" gridArea="c1">
            Chloe gets this piece
          </OverlayText>
          <OverlayText justifySelf="flex-end" character="Chloe" gridArea="c2">
            Chloe algo gets this piece
          </OverlayText>
        </Box>
      </Box>

      <p>
        Together, the pieces a person receives is called their <strong>portion</strong> or{' '}
        <strong>share</strong> of the cake.{' '}
      </p>
      <p>
        Although a bit more involved than before, this solution is{' '}
        <strong>both proportional and envy-free!</strong>
      </p>
      <p>But could there be an even better solution?</p>
    </>
  )
}

const ParetoOptimal = () => {
  return (
    <>
      <h2>Pareto-Optimal Solutions</h2>
      <p>
        Usually, being envy-free is <em>fair enough</em> to avoid hurt feelings. But what
        about <em>optimal</em> fairness?
      </p>
      <p>
        Although this solution to the last problem is fair by the envy-free definition, it
        could be even better.
      </p>
      <p>
        A solution where no change would give someone more value without taking value away
        from someone else is called <strong>Pareto-optimal</strong>.
      </p>
      <p>
        Unfortunately, <strong>Pareto-optimal solutions</strong> can be very difficult to
        calculate. For this reason, finding an envy-free solution is a much more realistic
        goal.
      </p>
      <p>
        For more info,{' '}
        <Link href={'https://en.wikipedia.org/wiki/Pareto_efficiency'}>
          read about Pareto-optimality.
        </Link>
      </p>
    </>
  )
}
const Recap2 = () => {
  return (
    <>
      <h2>Part 2 Recap</h2>
      <p>Let's review</p>
      <dl>
        <dt>Envy-free </dt>
        <dd>
          A definition of fairness. In an envy-free solution, no one envies another's
          portion.{' '}
        </dd>

        <dt>Selfridge-Conway Method</dt>
        <dd>A 3-person, envy-free method for fair division.</dd>

        <dt>Pareto-Optimal Solution</dt>
        <dd>
          A solution to a fair division problem where no change can increase the value for
          someone without taking value away from someone else.
        </dd>
      </dl>
    </>
  )
}

const Ending = () => {
  return (
    <>
      <h2>Your Turn</h2>
      <p>I've designed a visual tool for splitting divisible resources.</p>

      <Box
        component="img"
        src={toolExample}
        alt={
          'Visual division tool with a graph-like interface. Values are drawn for strawberry, vanilla, and chocolate. ' +
          'A toolbar at the top shows "Person 1", "Labels", "Add Person", and other options'
        }
        marginX="auto"
        maxWidth={600}
        display="block"
      />

      <p>Give it a try, experiment!</p>
      <p>
        Split a 10-flavor cake! Make a resource with 1000 increments! See if you can find
        better solutions than the algorithm can!
      </p>
      <p>
        The tool uses <strong>Cut and Choose</strong> for 2 people and{' '}
        <strong>the Selfridge-Conway Method</strong> for 3, other algorithms may be added
        in the future.
      </p>

      <Stack alignItems="center" marginY={2}>
        <ButtonLink variant="contained" href="/graph">
          Try the Resource Splitting Tool
        </ButtonLink>
      </Stack>
    </>
  )
}
