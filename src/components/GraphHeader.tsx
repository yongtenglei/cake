import { Button, Stack, Tooltip } from '@mui/material'

interface GraphHeaderProps {
  isComplete: boolean
}

export const GraphHeader = ({ isComplete }: GraphHeaderProps) => {
  return (
    <Stack marginX={3}>
      <h2>Mark Values for Player 1</h2>
      <Stack direction="row" width="100%" justifyContent="flex-end">
        <Tooltip title={isComplete ? null : `Mark the values for person 1 before continuing`}>
          <Stack spacing={1} direction="row">
            <Button variant="contained" disabled={!isComplete}>
              Next Person
            </Button>
            <Button variant="contained" disabled={!isComplete}>
              Finish
            </Button>
          </Stack>
        </Tooltip>
      </Stack>
    </Stack>
  )
}
