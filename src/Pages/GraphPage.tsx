import { Box, Stack } from '@mui/material'
import { ErrorBoundary } from 'react-error-boundary'
import { Graph } from '../Graph/Graph'
import { TextContainer } from '../Layouts'
import { Link } from '../components/Link'
import { SectionErrorDisplay } from '../components/SectionErrorDisplay'
import { CakeImage } from './LearningPage/Images'

export const GraphPage = () => {
  return (
    <>
      <h1>Resource Splitting Tool</h1>
      <Stack direction={{ xs: 'column-reverse', sm: 'row' }}>
        <TextContainer>
          <p>
            Welcome to our innovative <strong>Visual Fair Division Tool</strong>, the
            first of its kind! Using this tool you can visually express the value you
            assign to each part of a resource, which our intelligent algorithm will then
            split evenly among all users.
          </p>
          <p>
            Using this tool, you can split a resource fairly based on the preferences of
            each person. This tool works with divisible resources, allowing you to fairly
            divide a tasty cake, allocate timeslots, or apportion land.
          </p>
          <p>
            Currently, our algorithms support up to 3 participants. In the future we plan
            to introduce new algorithms for undividable items and for more participants.
          </p>
          <p>
            Explore our{' '}
            <strong>
              <Link href="/learn">Interactive Learning Path</Link>
            </strong>{' '}
            to understand how fair division works.
          </p>
        </TextContainer>
        <Box marginX={6}>
          <Stack direction="row" justifyContent="center" flexWrap="wrap" gap="20px">
            <CakeImage flavor="vanilla" width={140} />
            <CakeImage flavor="chocolate" width={140} />
            <CakeImage flavor="strawberry" width={140} />
          </Stack>
        </Box>
      </Stack>
      <Box marginTop={10} marginBottom={20} id="graph-content">
        <ErrorBoundary FallbackComponent={SectionErrorDisplay}>
          <Graph />
        </ErrorBoundary>
      </Box>
    </>
  )
}
