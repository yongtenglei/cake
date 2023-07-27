import { Box, Stack } from '@mui/material'
import { ErrorBoundary } from 'react-error-boundary'
import { Graph } from '../Graph/Graph'
import { TextContainer } from '../Layouts'
import { Link } from '../components/Link'
import { SectionErrorDisplay } from '../components/SectionErrorDisplay'
import cake from '../images/cake/cake divided.png'

export const GraphPage = (props) => {
  return (
    <>
      <h1>Resource Splitting Tool</h1>
      <Stack direction={{ xs: 'column-reverse', sm: 'row' }}>
        <TextContainer>
          <p>
            Welcome to our visual <strong>Resource Splitting Tool</strong>, the first of
            its kind! Using this tool you can visually express the value you assign to
            parts of a resource, which our intelligent <strong>algorithm</strong> will
            then split evenly among all users.
          </p>
          <p>
            Using this tool, you can split a resource fairly based on the preferences of
            each person. This tool works with <strong>divisible resources</strong>,
            allowing you to fairly divide a tasty cake, allocate time slots, or apportion
            land.
          </p>

          <p>
            Currently, our algorithms support 2-3 participants. In the future we plan to
            introduce new algorithms for indivisible items and for more participants.
          </p>
          <p>
            This is primarily an <strong>educational tool</strong>, but the concepts you
            will learn about fairness can help in real life too.
          </p>
          <p>
            Explore our{' '}
            <strong>
              <Link href="/learn">Interactive Course</Link>
            </strong>{' '}
            to understand how fair division works.
          </p>
        </TextContainer>
        <Box marginX={6}>
          <Box
            component="img"
            src={cake}
            alt="A cartoon cake with dividing lines through it"
            maxWidth={250}
            width={'100%'}
            minWidth={200}
          />
        </Box>
      </Stack>

      <Box marginTop={10} marginBottom={10} id="graph-content">
        <ErrorBoundary FallbackComponent={SectionErrorDisplay}>
          <Graph {...props} />
        </ErrorBoundary>
      </Box>

      <h3>Feeling Lost?</h3>
      <p>
        See the <Link href="/learn">Interactive Course</Link> for an introduction to fair
        division or the <Link href="/help">Help Page</Link> for clarification on how this
        tool works.
      </p>
    </>
  )
}
