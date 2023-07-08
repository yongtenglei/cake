import { Button, Stack, Tooltip, IconButton, Box, FormHelperText } from '@mui/material'
import ArrowBackIcon from '@mui/icons-material/ArrowBackIos'
import ArrowForwardIcon from '@mui/icons-material/ArrowForwardIos'
import PersonAddIcon from '@mui/icons-material/PersonAdd'
import CheckIcon from '@mui/icons-material/Check'
import AssessmentIcon from '@mui/icons-material/Assessment'
import CompareIcon from '@mui/icons-material/Compare'
import EditIcon from '@mui/icons-material/Edit'
import { MAX_AGENTS, margin } from '../../graphConstants'
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

// align-items: center;
// display: grid;
// grid-template-columns: 6fr 1fr auto;
// grid-gap: 10px;

const ButtonText = ({ children }) => (
  <FormHelperText>
    <Stack alignItems="center" sx={{ textTransform: 'uppercase' }}>{children}</Stack>
  </FormHelperText>
)

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
      maxWidth={'100%'}
      sx={{
        backgroundColor: compareMode ? '#d5d5d5' : getAgentColor(currentAgent),
        position: 'relative',
        bottom: -20,
        borderTopLeftRadius: 8,
        borderTopRightRadius: 8,
        paddingY: 1,
      }}
    >
      <Stack gap={10} justifyContent={"space-between"} direction="row" paddingX={2}>
        <SwitchAgent
          navigationDisabled={totalAgents < 2}
          onChangeIndex={onChangeIndex}
          currentAgent={currentAgent}
          compareMode={compareMode}
        />
        <Stack justifyContent="flex-end" alignItems="center" direction={'row'}>
          <Stack spacing={1} paddingRight={1} direction="row">
            {compareMode ? null : (
              <Tooltip title="Previous person">
                <span>
                  <IconButton
                    aria-label="Previous person"
                    onClick={() => onChangeIndex(-1)}
                    disabled={totalAgents < 2}
                    sx={{ color: 'black' }}
                  >
                    <ButtonText>
                      <ArrowBackIcon />
                      Previous
                    </ButtonText>
                  </IconButton>
                </span>
              </Tooltip>
            )}
            {compareMode ? null : (
              <Tooltip title="Next person">
                <span>
                  <IconButton
                    aria-label="Next person"
                    onClick={() => onChangeIndex(1)}
                    disabled={totalAgents < 2}
                    sx={{ color: 'black' }}
                  >
                    <ButtonText>
                      <ArrowForwardIcon />
                      Next
                    </ButtonText>
                  </IconButton>
                </span>
              </Tooltip>
            )}
            <div>
              <Tooltip
                title={
                  cantAddMoreAgents
                    ? `This tool supports up to ${MAX_AGENTS} people`
                    : 'Add Person'
                }
              >
                <span>
                  <IconButton
                    aria-label="add person"
                    disabled={!isComplete || cantAddMoreAgents}
                    onClick={() => {
                      if (compareMode) {
                        onClickCompare()
                      }
                      onClickCreateAgent()
                    }}
                  >
                    <ButtonText>
                      <PersonAddIcon />
                      Add Person
                    </ButtonText>
                  </IconButton>
                </span>
              </Tooltip>
            </div>
            <div>
              <IconButton
                aria-label={compareMode ? 'Edit' : 'Compare'}
                disabled={!isComplete || totalAgents < 2}
                onClick={onClickCompare}
              >
                <ButtonText>
                  {compareMode ? <EditIcon /> : <CompareIcon />}
                  {compareMode ? 'Edit' : 'Compare'}
                </ButtonText>
              </IconButton>
            </div>

            <div>
              <IconButton
                aria-label={'Done'}
                disabled={!isComplete || totalAgents < 2}
                onClick={onClickDone}
              >
                <ButtonText>
                  <CheckIcon />
                  Done
                </ButtonText>
              </IconButton>
            </div>
          </Stack>
          <ExtraOptions setNewData={setNewData} preferences={preferences} />
        </Stack>
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
          backgroundColor: compareMode ? '#d5d5d5' : getAgentColor(currentAgent),
          paddingY: 1,
          paddingX: 2,
          borderRadius: '4px',
          margin: 'auto',
          height: 60,
        }}
      >
        <h2>{compareMode ? 'Compare View' : `Person ${currentAgent + 1}`}</h2>
      </Stack>
    </Stack>
  )
}
