import { Stack, Tooltip, IconButton } from '@mui/material'
import PersonAddIcon from '@mui/icons-material/PersonAdd'
import CheckIcon from '@mui/icons-material/Check'
import CompareIcon from '@mui/icons-material/Compare'
import EditIcon from '@mui/icons-material/Edit'
import { Preferences } from '../../../types'
import { maxAgents, margin } from '../../graphConstants'
import { ExtraOptions } from './ExtraOptions'

const ButtonText = ({ children }) => (
  <Stack
    alignItems="center"
    sx={{ fontSize: 12, textTransform: 'uppercase', minWidth: 40 }}
  >
    {children}
  </Stack>
)

interface SharedProps {
  onClickCompare: VoidFunction
  onClickDone: VoidFunction
  preferences: Preferences
  setNewData: (pref: Preferences) => void
  totalAgents: number
  isComplete: boolean
}

type DrawingHeaderButtonsProps = SharedProps & {
  onClickCreateAgent: VoidFunction
  compareMode: boolean
}

export const DrawingHeaderButtons = ({
  onClickDone,
  onClickCreateAgent,
  onClickCompare,
  totalAgents,
  compareMode,
  isComplete,
  preferences,
  setNewData,
}: DrawingHeaderButtonsProps) => {
  const cantAddMoreAgents = totalAgents === maxAgents

  return (
    <>
      <Tooltip
        title={
          cantAddMoreAgents
            ? `Cannot add more than ${maxAgents} people`
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

      <ExtraOptions setNewData={setNewData} preferences={preferences} />
    </>
  )
}

type CompareHeaderButtonsProps = SharedProps

export const CompareHeaderButtons = ({
  onClickCompare,
  onClickDone,
  setNewData,
  preferences,
  totalAgents,
  isComplete,
}: CompareHeaderButtonsProps) => {
  return (
    <>
      <IconButton aria-label={'Edit'} onClick={onClickCompare}>
        <ButtonText>
          <EditIcon />
          Edit
        </ButtonText>
      </IconButton>

      <IconButton
        aria-label={'Done'}
        onClick={onClickDone}
        disabled={!isComplete || totalAgents < 2}
      >
        <ButtonText>
          <CheckIcon />
          Done
        </ButtonText>
      </IconButton>

      <ExtraOptions setNewData={setNewData} preferences={preferences} />
    </>
  )
}
