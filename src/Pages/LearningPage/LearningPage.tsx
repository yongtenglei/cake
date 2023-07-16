import { Box } from '@mui/material'
import { LearningPath } from './LearningPath'

export const LearningPage = () => {
  return (
    <article>
      <Box component="h1" marginBottom={4}>Learning Path</Box>
      <LearningPath />
    </article>
  )
}
