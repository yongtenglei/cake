import { Stack, Box } from '@mui/material'
import { BodyContainer, TextContainer } from '../Layouts'
import { Graph } from '../Graph/Graph'
import { Link } from '../components/Link'

export const GraphPage = () => {
  return (
    <>
      <Stack direction="row">
        <TextContainer>
          <h1>Resource Splitting Tool</h1>
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
        <Box padding={6}>
          <img
            src="https://creazilla-store.fra1.digitaloceanspaces.com/emojis/53176/birthday-cake-emoji-clipart-md.png"
            style={{ width: '100%', maxWidth: 500 }}
            alt=""
          />
        </Box>
      </Stack>
      <Box marginY={10}>
        <Graph />
      </Box>
    </>
  )
}
