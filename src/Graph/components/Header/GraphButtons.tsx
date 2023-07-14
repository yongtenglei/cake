import CheckIcon from '@mui/icons-material/Check'
import CompareIcon from '@mui/icons-material/Compare'
import EditIcon from '@mui/icons-material/Edit'
import LoopIcon from '@mui/icons-material/Loop'
import PersonAddIcon from '@mui/icons-material/PersonAdd'
import { Tooltip } from '@mui/material'
import { ComponentProps } from 'react'

import { MenuButton } from '../../../components/MenuButton'
import { maxAgents } from '../../graphConstants'
import { ExtraOptions } from './ExtraOptions'

type ExtraOptionsProps = ComponentProps<typeof ExtraOptions>

type SharedProps = ExtraOptionsProps & {
  onClickDone: VoidFunction
  totalAgents: number
  isComplete: boolean
}

type DrawingHeaderButtonsProps = SharedProps & {
  onClickCreateAgent: VoidFunction
  onClickCompare: VoidFunction
}

export const DrawingHeaderButtons = ({
  onClickDone,
  onClickCreateAgent,
  onClickCompare,
  totalAgents,
  isComplete,
  preferences,
  uploadInput,
}: DrawingHeaderButtonsProps) => {
  const cantAddMoreAgents = totalAgents === maxAgents

  return (
    <>
      <Tooltip
        title={
          cantAddMoreAgents ? `Cannot add more than ${maxAgents} people` : 'Add Person'
        }
      >
        <span>
          <MenuButton
            disabled={!isComplete || cantAddMoreAgents}
            onClick={onClickCreateAgent}
          >
            <PersonAddIcon />
            Add Person
          </MenuButton>
        </span>
      </Tooltip>

      <MenuButton disabled={!isComplete || totalAgents < 2} onClick={onClickCompare}>
        <CompareIcon />
        Compare
      </MenuButton>

      <MenuButton disabled={!isComplete || totalAgents < 2} onClick={onClickDone}>
        <CheckIcon />
        Done
      </MenuButton>

      <ExtraOptions uploadInput={uploadInput} preferences={preferences} />
    </>
  )
}

type CompareHeaderButtonsProps = SharedProps & {
  onClickEdit: (agent?: number) => void
}

export const CompareHeaderButtons = ({
  onClickEdit,
  onClickDone,
  uploadInput,
  preferences,
  totalAgents,
  isComplete,
}: CompareHeaderButtonsProps) => {
  return (
    <>
      <MenuButton onClick={() => onClickEdit()}>
        <EditIcon />
        Edit
      </MenuButton>

      <MenuButton onClick={onClickDone} disabled={!isComplete || totalAgents < 2}>
        <CheckIcon />
        Done
      </MenuButton>

      <ExtraOptions uploadInput={uploadInput} preferences={preferences} />
    </>
  )
}

type ResultsButtonsProps = ExtraOptionsProps & {
  resetInput: VoidFunction
  onClickEdit: (agent?: number) => void
}

export const ResultsButtons = ({
  preferences,
  uploadInput,
  resetInput,
  onClickEdit,
}: ResultsButtonsProps) => {
  return (
    <>
      <MenuButton onClick={() => onClickEdit()}>
        <EditIcon />
        Edit
      </MenuButton>
      <MenuButton onClick={resetInput}>
        <LoopIcon />
        Reset
      </MenuButton>

      <ExtraOptions uploadInput={uploadInput} preferences={preferences} />
    </>
  )
}
