import CheckIcon from '@mui/icons-material/Check'
import CompareIcon from '@mui/icons-material/Compare'
import EditIcon from '@mui/icons-material/Edit'
import LoopIcon from '@mui/icons-material/Loop'
import PersonAddIcon from '@mui/icons-material/PersonAdd'
import { Box, Tooltip } from '@mui/material'
import { ComponentProps } from 'react'
import { ReactSVG } from 'react-svg'

import { MenuButton } from '../../../components/MenuButton'
import sectionIcon from '../../../images/icons/section config.svg'
import { maxAgents } from '../../graphConstants'
import { isAllInputComplete, isDrawingComplete } from '../../graphUtils'
import { ExtraOptions } from './ExtraOptions'

const SectionIcon = () => (
  <Box width={24} height={24}>
    <ReactSVG src={sectionIcon} />
  </Box>
)

type ExtraOptionsProps = ComponentProps<typeof ExtraOptions>

type SharedProps = ExtraOptionsProps & {
  onClickSetLabels: VoidFunction
  onClickDone: VoidFunction
  resetInput: VoidFunction
}

type DrawingHeaderButtonsProps = SharedProps & {
  onClickCreateAgent: VoidFunction
  onClickCompare: VoidFunction
  currentAgent: number
  cakeSize: number
}

export const DrawingHeaderButtons = ({
  onClickSetLabels,
  onClickDone,
  onClickCreateAgent,
  onClickCompare,
  preferences,
  uploadInput,
  currentAgent,
  cakeSize,
  resetInput,
}: DrawingHeaderButtonsProps) => {
  const totalAgents = preferences.length
  const cantAddMoreAgents = totalAgents === maxAgents

  const drawingComplete = isDrawingComplete(preferences[currentAgent], cakeSize)
  const allComplete = isAllInputComplete(preferences, cakeSize)
  return (
    <>
      <MenuButton onClick={onClickSetLabels}>
        <SectionIcon />
        Set Sections
      </MenuButton>
      <Tooltip
        title={
          cantAddMoreAgents ? `Cannot add more than ${maxAgents} people` : null
        }
      >
        <span>
          <MenuButton
            disabled={!drawingComplete || cantAddMoreAgents}
            onClick={onClickCreateAgent}
          >
            <PersonAddIcon />
            Add Person
          </MenuButton>
        </span>
      </Tooltip>

      <MenuButton disabled={!allComplete || totalAgents < 2} onClick={onClickCompare}>
        <CompareIcon />
        Compare
      </MenuButton>

      <MenuButton disabled={!allComplete || totalAgents < 2} onClick={onClickDone}>
        <CheckIcon />
        Done
      </MenuButton>

      <ExtraOptions uploadInput={uploadInput} preferences={preferences} resetInput={resetInput}/>
    </>
  )
}

type CompareHeaderButtonsProps = SharedProps & {
  onClickEdit: (agent?: number) => void
}

export const CompareHeaderButtons = ({
  onClickSetLabels,
  onClickEdit,
  onClickDone,
  uploadInput,
  preferences,
  resetInput,
}: CompareHeaderButtonsProps) => {
  const totalAgents = preferences.length
  return (
    <>
      <MenuButton onClick={onClickSetLabels}>
      <SectionIcon />
        Set Labels
      </MenuButton>
      <MenuButton onClick={() => onClickEdit()}>
        <EditIcon />
        Edit
      </MenuButton>

      <MenuButton onClick={onClickDone} disabled={totalAgents < 2}>
        <CheckIcon />
        Done
      </MenuButton>

      <ExtraOptions uploadInput={uploadInput} preferences={preferences} resetInput={resetInput}/>
    </>
  )
}

type ResultsButtonsProps = ExtraOptionsProps & {
  onClickEdit: (agent?: number) => void
}

export const ResultsButtons = ({
  preferences,
  uploadInput,
  onClickEdit,
  resetInput,
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

      <ExtraOptions uploadInput={uploadInput} preferences={preferences} resetInput={resetInput} />
    </>
  )
}
