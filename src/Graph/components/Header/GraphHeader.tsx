
import {
  Button,
  Stack,
  Tooltip,
  IconButton,
} from '@mui/material'
import ArrowForwardIcon from '@mui/icons-material/ArrowForward'
import ArrowBackIcon from '@mui/icons-material/ArrowBack'
import PersonAddIcon from '@mui/icons-material/PersonAdd'
import CheckIcon from '@mui/icons-material/Check'
import AssessmentIcon from '@mui/icons-material/Assessment'
import EditIcon from '@mui/icons-material/Edit'
import { ExtraOptions } from './ExtraOptions'

import { MAX_AGENTS, getAgentColor, margin, innerWidth } from '../../constants'
import './GraphHeader.css'

interface GraphHeaderProps {
  isComplete: boolean
  currentAgent: number
  totalAgents: number
  onClickDone: VoidFunction
  onChangeIndex: (i: number) => void
  onClickCreateAgent: VoidFunction
  onClickCompare: VoidFunction
  compareMode: boolean
}

export const GraphHeader = ({
  isComplete,
  currentAgent,
  totalAgents,
  onClickDone,
  onChangeIndex,
  onClickCreateAgent,
  onClickCompare,
  compareMode,
}: GraphHeaderProps) => {
  const navigationDisabled = !isComplete || totalAgents === 1
  const cantAddMoreAgents = totalAgents === MAX_AGENTS

  return (
    <Stack
      marginLeft={margin.left + 'px'}
      marginRight={margin.right + 'px'}
      spacing={1}
      alignContent="center"
      maxWidth={innerWidth}
    >
      <SwitchAgent
        navigationDisabled={navigationDisabled}
        onChangeIndex={onChangeIndex}
        currentAgent={currentAgent}
        compareMode={compareMode}
      />

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
              disabled={!isComplete || totalAgents < 2}
              onClick={onClickCompare}
              startIcon={compareMode ? <EditIcon /> : <AssessmentIcon />}
            >
              {compareMode ? 'Edit' : 'Compare'}
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
                  onClick={() => {
                    if (compareMode) {
                      onClickCompare()
                    }
                    onClickCreateAgent()
                  }}
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

<ExtraOptions />
            
          </Stack>
        </Tooltip>
      </Stack>
    </Stack>
  )
}

interface SwitchAgentProps {
  navigationDisabled: boolean
  currentAgent: number
  onChangeIndex: (i: number) => void
  compareMode: boolean
}

const SwitchAgent = ({
  navigationDisabled,
  currentAgent,
  onChangeIndex,
  compareMode,
}: SwitchAgentProps) => {
  return (
    <div>
      <Stack
        spacing={1}
        justifyContent="center"
        alignItems="center"
        direction="row"
      >
        {compareMode ? null : (
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
        )}
        <h2
          className="GraphHeader__heading"
          style={{
            backgroundColor: compareMode
              ? '#d5d5d5'
              : getAgentColor(currentAgent),
          }}
        >
          {compareMode ? 'Compare View' : `Person ${currentAgent}`}
        </h2>

        {compareMode ? null : (
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
        )}
      </Stack>
      <div className="GraphHeader__helperText">
        {compareMode
          ? 'Viewing the values of all people'
          : `Indicate how person ${currentAgent} values each part`}
      </div>
    </div>
  )
}
