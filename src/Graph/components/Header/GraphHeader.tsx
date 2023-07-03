import { Button, Stack, Tooltip, IconButton, Box } from '@mui/material'
import ArrowBackIcon from '@mui/icons-material/ArrowBackIos'
import ArrowForwardIcon from '@mui/icons-material/ArrowForwardIos'
import PersonAddIcon from '@mui/icons-material/PersonAdd'
import CheckIcon from '@mui/icons-material/Check'
import AssessmentIcon from '@mui/icons-material/Assessment'
import EditIcon from '@mui/icons-material/Edit'
import { MAX_AGENTS, margin, innerWidth } from '../../graphConstants'
import { getAgentColor } from '../../../constants'
import { Preferences } from '../../../types'
import { ExtraOptions } from './ExtraOptions'

interface GraphHeaderProps {
  isComplete: boolean
  currentAgent: number
  totalAgents: number
  onClickDone: VoidFunction
  onChangeIndex: (i: number) => void
  onClickCreateAgent: VoidFunction
  onClickCompare: VoidFunction
  compareMode: boolean
  setNewData: (pref: Preferences) => void
  preferences: Preferences
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
  setNewData,
  preferences,
}: GraphHeaderProps) => {
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
        navigationDisabled={totalAgents < 2}
        onChangeIndex={onChangeIndex}
        currentAgent={currentAgent}
        compareMode={compareMode}
      />

      <Stack direction="row" width="100%" justifyContent="flex-end">
        <Stack spacing={1} paddingRight={1} direction="row">
        <div>
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
          </div>
          <div>
            <Button
              variant="contained"
              disabled={!isComplete || totalAgents < 2}
              onClick={onClickCompare}
              startIcon={compareMode ? <EditIcon /> : <AssessmentIcon />}
            >
              {compareMode ? 'Edit' : 'Compare'}
            </Button>
          </div>

          <div>
            <Button
              variant="contained"
              disabled={!isComplete || totalAgents < 2}
              onClick={onClickDone}
              startIcon={<CheckIcon />}
            >
              Finish
            </Button>
          </div>
        </Stack>
        <ExtraOptions setNewData={setNewData} preferences={preferences} />
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
    <Stack direction="column">
      <Stack
        spacing={1}
        justifyContent="center"
        alignItems="center"
        direction="row"
        sx={{
          backgroundColor: compareMode
            ? '#d5d5d5'
            : getAgentColor(currentAgent),
          paddingY: 1,
          paddingX: 2,
          borderRadius: '4px',
          display: 'inline-flex',
          margin: 'auto',
          height: 60,
        }}
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
        <h2>{compareMode ? 'Compare View' : `Person ${currentAgent}`}</h2>

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
      <Box sx={{ textAlign: 'center' }}>
        {compareMode
          ? 'Viewing the values of all people'
          : `Draw how person ${currentAgent} values each part`}
      </Box>
    </Stack>
  )
}
