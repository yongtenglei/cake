import { Box, Button, Stack, Tooltip, IconButton } from '@mui/material'
import ArrowForwardIcon from '@mui/icons-material/ArrowForward'
import ArrowBackIcon from '@mui/icons-material/ArrowBack'
import PersonAddIcon from '@mui/icons-material/PersonAdd'
import CheckIcon from '@mui/icons-material/Check'
import AssessmentIcon from '@mui/icons-material/Assessment'
import { MAX_AGENTS, getAgentColor, margin } from '../../constants'
import './GraphHeader.css'

interface GraphHeaderProps {
  isComplete: boolean
  currentAgent: number
  totalAgents: number
  onClickDone: VoidFunction
  onChangeIndex: (i: number) => void
  onClickCreateAgent: VoidFunction
  onClickCompare: VoidFunction
}

export const GraphHeader = ({
  isComplete,
  currentAgent,
  totalAgents,
  onClickDone,
  onChangeIndex,
  onClickCreateAgent,
  onClickCompare,
}: GraphHeaderProps) => {
  const navigationDisabled = !isComplete || totalAgents === 1
  const cantAddMoreAgents = totalAgents === MAX_AGENTS

  return (
    <Stack marginX={margin.right + 'px'} spacing={1} alignContent="center">
      <Stack spacing={1} justifyContent="center" alignItems="center" direction="row">
        <Tooltip title="Previous person">
          <span>
            <IconButton
              aria-label="Previous person"
              onClick={() => onChangeIndex(-1)}
              disabled={navigationDisabled}
              sx={{ color: 'black' }}
            >
              <ArrowBackIcon />
            </IconButton>
          </span>
        </Tooltip>

        <h2
          className="GraphHeader__heading"
          style={{
            backgroundColor: getAgentColor(currentAgent),
          }}
        >
          Person {currentAgent}
        </h2>

        <Tooltip title="Next person">
          <span>
            <IconButton
              aria-label="Next person"
              onClick={() => onChangeIndex(1)}
              disabled={navigationDisabled}
              sx={{ color: 'black' }}
            >
              <ArrowForwardIcon />
            </IconButton>
          </span>
        </Tooltip>
      </Stack>
      
      <div className='GraphHeader__helperText'>
        Indicate how person {currentAgent} values each part
      </div>

      <Stack direction="row" width="100%" justifyContent="flex-end">
        <Tooltip
          title={
            isComplete
              ? null
              : `Mark the values for person ${currentAgent} before continuing`
          }
        >
          <Stack spacing={1} direction="row">
          <Button
              variant="contained"
              disabled={!isComplete}
              onClick={onClickCompare}
              startIcon={<AssessmentIcon />}
            >
              Compare
            </Button>

            <Tooltip
              title={
                cantAddMoreAgents
                  ? `This tool supports up to ${MAX_AGENTS} people`
                  : null
              }
            >
              <span>
                <Button
                  variant="contained"
                  disabled={!isComplete || cantAddMoreAgents}
                  onClick={onClickCreateAgent}
                  startIcon={<PersonAddIcon />}
                >
                  Add Person
                </Button>
              </span>
            </Tooltip>

            <Button
              variant="contained"
              disabled={!isComplete}
              onClick={onClickDone}
              startIcon={<CheckIcon />}
            >
              Finish
            </Button>
          </Stack>
        </Tooltip>
      </Stack>
    </Stack>
  )
}
