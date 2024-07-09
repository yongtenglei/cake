import ArrowBackIcon from '@mui/icons-material/ArrowBackIos'
import ArrowForwardIcon from '@mui/icons-material/ArrowForwardIos'
import PersonAddIcon from '@mui/icons-material/PersonAdd'
import {IconButton, Stack, Tooltip} from '@mui/material'
import {MenuButton} from '../../../components/MenuButton'
import {Preferences} from '../../../types'
import {maxAgents} from '../../graphConstants'

interface SwitchAgentHeaderProps {
  currentAgent: number
  onChangeIndex: (i: number) => void
  onClickCreateAgent: VoidFunction
  preferences: Preferences
}

export const SwitchAgentHeader = ({
                                    currentAgent,
                                    onClickCreateAgent,
                                    onChangeIndex,
                                    preferences,
                                  }: SwitchAgentHeaderProps) => {
  const navigationDisabled = preferences.length < 2
  const canAddAgents = preferences.length < maxAgents
  return (
    <Stack direction="column">
      <Stack
        spacing={1}
        justifyContent="center"
        alignItems="center"
        direction="row"
        marginY={1}
      >
        <Tooltip title="Previous person">
          <span>
            <IconButton
              aria-label="Previous person"
              onClick={() => onChangeIndex(-1)}
              disabled={navigationDisabled}
            >
              <ArrowBackIcon/>
            </IconButton>
          </span>
        </Tooltip>

        <h2 style={{minWidth: 100}}>{`Person ${currentAgent + 1}`}</h2>

        <Tooltip title="Next person">
          <span>
            <IconButton
              aria-label="Next person"
              onClick={() => onChangeIndex(1)}
              disabled={navigationDisabled}
            >
              <ArrowForwardIcon/>
            </IconButton>
          </span>
        </Tooltip>

        <Tooltip
          title={canAddAgents ? null : `Cannot add more than ${maxAgents} people`}
        >
          <div>
            <MenuButton
              disabled={!canAddAgents}
              onClick={onClickCreateAgent}
            >
              <PersonAddIcon/>
              Add Person
            </MenuButton>
          </div>
        </Tooltip>
      </Stack>
    </Stack>
  )
}
