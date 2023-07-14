import { Box, Button, Stack, useTheme } from '@mui/material'
import EditIcon from '@mui/icons-material/Edit'
import ArrowBackIcon from '@mui/icons-material/ArrowBackIos'
import ArrowForwardIcon from '@mui/icons-material/ArrowForwardIos'
import { Link as RRLink } from 'react-router-dom'

import { Routes, Route, useParams } from 'react-router-dom'
import { ButtonLink, Link } from '../../components/Link'
import { TextContainer } from '../../Layouts'
import { InteractionContainer } from '../../components/InteractionContainer'
import { Algorithms } from '../../Graph/graphConstants'
import { useState } from 'react'

export const LearningPath = () => {
  const theme = useTheme()
  const { step } = useParams()
  let stepNum = Number(step)
  if (isNaN(stepNum)) {
    stepNum = 1
  }
  const steps = [
    null, // step 0
    WhatLearn,
    FairDivision,
    SimpleCakeDivision,
    MeaningOfFair,
    TwoFlavorCake,
    BetterThanHalf,
    CutAndChoose,
    MeasuringPreference,
    Recap1,
    EnterPlayer3,
    EnvyFree,
    SelfridgeConway,
    ThreeWayDivision,
    Recap2,
    Ending,
  ]
  return (
    <InteractionContainer minHeight={500} display="flex" flexDirection="column">
      Step is {stepNum}
      <Box flexGrow={1}>{steps[stepNum || 1]()}</Box>
      {/* Previous/Next buttons and pagination dots */}
      <Box
        marginTop={4}
        display="grid"
        gridAutoFlow="column"
        gridTemplateColumns="1fr 4fr 1fr"
        alignItems="center"
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
        <Box order={3}>
          {stepNum >= steps.length - 1 ? null : (
            <ButtonLink
              variant="outlined"
              href={'/learn/' + (stepNum + 1)}
              sx={{ justifySelf: 'flex-end' }}
            >
              Next
              <ArrowForwardIcon fontSize="small" />
            </ButtonLink>
          )}
        </Box>
        <Stack order={2} direction="row" spacing={1} justifySelf="center">
          {steps.map((_, i) => {
            const current = stepNum === i
            return i === 0 ? null : (
              <Link
                key={i}
                href={`/learn/${i}`}
                aria-label={`Step ${i}${current ? ', current page' : ''}`}
                sx={{
                  borderRadius: '50%',
                  backgroundColor: current ? theme.palette.secondary.main : '#666',
                  height: 12,
                  width: 12,
                }}
              />
            )
          })}
        </Stack>
      </Box>
    </InteractionContainer>
  )
}

const WhatLearn = () => (
  <>
    <h2>Learn about Fair Division with this interactive tutorial</h2>
    {/* flavor image here */}
    <p>Time: about 10 minutes</p>
    <h3>What you'll learn</h3>
    <ol>
      <li>What is fair division?</li>
      <li>Divisible vs indivisible resources</li>
      <li>Proportional fairness and envy-free fairness</li>
      <li>The cut and choose method</li>
      <li>The Selfridge-Conway Method</li>
    </ol>
    Let's begin.
  </>
)

const FairDivision = () => {
  return (
    <>
      <h2>Fair Division</h2>
      <p>
        <strong>Fair division</strong> means dividing a resource in a way that everyone
        believes is fair.
      </p>
      <p>
        For this discussion there are two types of resources: divisible and indivisible.
      </p>
      <p>
        <strong>Divisible resources</strong> are resources which can be divided any number
        of times, in any number of ways. This could be land, time, airwaves, or anything
        else arbitrarily divisible. When speaking abstractly, we usually refer to a
        divisible resouces as a <strong>cake</strong>. Cakes are a good example because
        can be cut at any place, as many times as necessary, and you usually share them
        equally.
      </p>

      <p>
        In contrast, <strong>indivisible resources</strong> can't be split. This could be
        a laptop or a car, the kind of thing you really shouldn't cut in half.
      </p>
      <p>
        For this discussion, we'll focus on <strong>divisible resources</strong>. Let's
        explore an example.
      </p>
    </>
  )
}

const SimpleCakeDivision = () => {
  return (
    <>
      <h2>Simple Cake Division</h2>
      <p>
        You and your friend Alexis have a small chocolate cake. She's divided it into two
        pieces. Which piece do you want?
      </p>
      {/*  */}
      <p>
        Because the cake is just one flavor it <em>doesn't really matter</em> which one
        you choose.{' '}
      </p>
      <p>
        This resource-splitting solution is fair because both of you got <sup>1</sup>
        &frasl;
        <sub>2</sub> of the cake.
      </p>
    </>
  )
}

const MeaningOfFair = () => {
  return (
    <>
      <h2>The Meaning of Fair</h2>
      <p>
        What does <em>“fair”</em> really mean?
      </p>
      <p>
        One way to define fair is <strong>proportionality</strong>. A solution to a
        division problem is <strong>proportional</strong> if for <em>n</em> people, each
        person receives <sup>1</sup>&frasl;<sub>n</sub> of the resource.
      </p>
      <p>
        So for 2 people, each get <sup>1</sup>&frasl;
        <sub>2</sub> of the resource, for 3 people, each get <sup>1</sup>&frasl;
        <sub>3</sub>.
      </p>
    </>
  )
}

const TwoFlavorCake = () => {
  const [flavor, setFlavor] = useState<'chocolate' | 'vanilla' | null>(null)
  return (
    <>
      <h2>2-Flavor Cake</h2>
      <p>
        This cake is <strong>heterogenous</strong> (has multiple parts).
      </p>
      <p>
        One half is chocolate, and one half is vanilla. Alexis has divided the cake into
        two pieces. <em>Which piece do you want?</em>
      </p>
      <p>
        So you prefer {null}? Alexis is happy as well because she likes both flavors
        equally.
      </p>
      <p>
        This solution is <strong>proportional</strong> because Alexis got a piece worth{' '}
        <sup>1</sup>&frasl;
        <sub>2</sub> of the cake and you got a piece worth <sup>1</sup>&frasl;
        <sub>2</sub> of the cake.
      </p>
    </>
  )
}

const BetterThanHalf = () => {
  return (
    <>
      <h2>Better Than Half</h2>
      <p>
        Alexis likes chocolate and vanilla equally, so she values both pieces of the cake
        at <sup>1</sup>&frasl;
        <sub>2</sub> of the cake's total value.
      </p>
      <p>
        However, if you like {null} more than {null}, the piece you received is worth{' '}
        <em>
          more than <sup>1</sup>&frasl;
          <sub>2</sub> the cake's value
        </em>
        .
      </p>
      <p>
        This solution is still <strong>proportionally fair</strong> to Alexis because she
        only expected to receive <sup>1</sup>&frasl;
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
          One person <strong>cuts</strong> the resource into two portions{' '}
          <strong>they judge to have equal value</strong>. As both portions are equal to
          them, they will accept either one.
        </li>
        <li>
          The second person <strong>chooses</strong> which piece they personally prefer.
          This piece may be worth more to them than <sup>1</sup>&frasl;
          <sub>2</sub> of cake.
        </li>
      </ol>
      <p>
        Cut and Choose is <strong>proportionally fair</strong> to both people. However,
        the chooser may receive a portion worth more than <sup>1</sup>&frasl;
        <sub>2</sub> of the cake, so it's better to be the chooser.
      </p>
    </>
  )
}

const MeasuringPreference = () => {
  return (
    <>
      <h2>Measuring Preference</h2>
      <p>
        This time you cut and Alexis chooses. First,{' '}
        <em>mark how much you like each flavor</em>. A higher number means you like that
        flavor more.
      </p>
      <p>
        [After marking strawberry and chocolate cake] :: based on your preferences, this
        is where you should cut the cake so that each piece is worth <sup>1</sup>&frasl;
        <sub>2</sub> the cake to you.{' '}
      </p>
      <p>
        [After click cutline] :: It turns out Alexis likes strawberry even more than
        chocolate. She chooses this piece because it's worth the most to her.
      </p>
    </>
  )
}
const Recap1 = () => {
  return (
    <>
      <h2>Recap</h2>

      <p>Let's go over what we've learned so far</p>
      <dl>
        <dt>Fair Division </dt>
        <dd>Dividing a resource between all people by some definition of fair. </dd>

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
const EnterPlayer3 = () => {
  return (
    <>
      <h2>Enter Player 3</h2>
      <p>
        Here we have a cake to split between 3 people. Here's how they feel about the
        flavors.{' '}
      </p>
      {/* description for each? */}
      <p>One way to split the cake looks like this.</p>
      {/* image */}
      <ul>
        <li>
          Alexis values her piece as <sup>2</sup>&frasl;
          <sub>3</sub> of the whole, lucky!
        </li>
        <li>
          Bruno values his piece as <sup>1</sup>&frasl;
          <sub>3</sub>.
        </li>
        <li>
          Cora values her piece as <sup>1</sup>&frasl;
          <sub>3</sub>.
        </li>
      </ul>

      <p>
        This is a <strong>proportional solution</strong>, everyone gets at least{' '}
        <sup>1</sup>&frasl;
        <sub>3</sub>. <em>However,</em> this solution doesn't seem fair to Bruno. From his
        perspective, Cora's piece is worth <sup>2</sup>&frasl;
        <sub>3</sub> while his own is only worth <sup>1</sup>&frasl;
        <sub>3</sub>. <em>He envies her share and feels cheated.</em>
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
        Another definition of fairness is <strong>envy-freeness</strong>. A solution to a
        division problem is <strong>envy-free</strong> if no person envies anothers
        portion.
      </p>
      <p>
        An envy-free solution is <strong>proportional</strong> as well. Logically, if a
        cake is split into <em>n</em> pieces, then there must at least one piece worth{' '}
        <sup>1</sup>&frasl;
        <sub>n</sub> or more for each person.
      </p>
      <p>However, splitting a cake with 3 or more people gets a bit tricky.</p>
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
        <strong>guaranteed to be envy-free</strong>. This method is now called the{' '}
        <strong>Selfridge-Conway Method.</strong>
      </p>
      <p>The method is a bit involved, but the simple version looks like this:</p>
      <ol>
        <li>Person 1 divides the cake into 3 pieces they consider equal.</li>
        <li>
          Person 2 trims a bit off what they consider the largest piece until it matches
          the second largest.
        </li>
        <li>Person 3 chooses from the pieces, then person 2, then person 1.</li>
        <li>
          The remaining trimmings are then divided up between everyone (with a few more
          steps).{' '}
        </li>
      </ol>

      <p>
        If you're curious, you can{' '}
        <Link href={Algorithms.selfridgeConway.link}>
          learn more about the Selfridge-Conway Method
        </Link>
        .
      </p>
      <p></p>
    </>
  )
}
const ThreeWayDivision = () => {
  return (
    <>
      <h2>Division with the Selfridge-Conway Method</h2>
      <p>Here is the 3-person example again.</p>
      <p>These are the preferences for each person.</p>
      {/* preference descriptions? */}
      <p>Let's see how the cake is split using the Selfridge-Conway Method.</p>
      {/* image of result */}
      <p>
        Due to the trimming step in the method, the cake has been cut into more pieces.{' '}
      </p>
      <p>
        Each person receives multiple pieces. The pieces a person receives is their{' '}
        <strong>portion</strong> of the cake.{' '}
      </p>
      <p>
        Although a bit more involved than before, this solution is{' '}
        <strong>both proportional and envy-free!</strong>
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

        <dt>Selfridge-Conway Method </dt>
        <dd>A 3-person, envy-free method for fair division.</dd>
      </dl>
    </>
  )
}

const Ending = () => {
  return (
    <>
      <h2>Your Turn</h2>
      <p>We've developed a visual fair splitting tool for divisible resources.</p>
      {/* image */}

      <p>
        Please give it a try, experiment! Split a 10-flavor cake. Make a resource with
        1000 increments. See if you can figure out why the algorithm gives which portion
        to each person.
      </p>
      <p>
        The tool uses <strong>Cut and Choose</strong> for 2 people and{' '}
        <strong>the Selfridge-Conway Method</strong> for 3, but we may add more algorithms
        in the future.
      </p>

      <Link href="/graph">Splitting Tool</Link>
    </>
  )
}
