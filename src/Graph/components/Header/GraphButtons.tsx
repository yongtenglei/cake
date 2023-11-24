import CheckIcon from '@mui/icons-material/Check'
import CompareIcon from '@mui/icons-material/Compare'
import ControlCameraIcon from '@mui/icons-material/ControlCamera'
import EditIcon from '@mui/icons-material/Edit'
import LoopIcon from '@mui/icons-material/Loop'
import { Box } from '@mui/material'
import { ComponentProps } from 'react'
import { ReactSVG } from 'react-svg'

import { MenuButton } from '../../../components/MenuButton'
import sectionIcon from '../../../images/icons/section config.svg'
import { isAllInputComplete } from '../../graphUtils'
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
  onClickCompare: VoidFunction
  onClickShowHandles: VoidFunction
  currentAgent: number
  cakeSize: number
  highlightedHandle: boolean
}

export const DrawingHeaderButtons = ({
  onClickSetLabels,
  onClickDone,
  onClickCompare,
  onClickShowHandles,
  highlightedHandle,
  preferences,
  uploadInput,
  currentAgent,
  cakeSize,
  resetInput,
}: DrawingHeaderButtonsProps) => {
  const totalAgents = preferences.length

  const allComplete = isAllInputComplete(preferences, cakeSize)
  return (
    <>
      <MenuButton
        onClick={onClickShowHandles}
        disabled={preferences[currentAgent].length === 0}
      >
        <ControlCameraIcon />
        {highlightedHandle ? 'Hide Handles' : 'Show Handles'}
      </MenuButton>

      <MenuButton onClick={onClickSetLabels}>
        <SectionIcon />
        Set Sections
      </MenuButton>

      <MenuButton disabled={!allComplete || totalAgents < 2} onClick={onClickCompare}>
        <CompareIcon />
        Compare
      </MenuButton>

      <MenuButton disabled={!allComplete || totalAgents < 2} onClick={onClickDone}>
        <CheckIcon />
        Split
      </MenuButton>

      <ExtraOptions
        uploadInput={uploadInput}
        preferences={preferences}
        resetInput={resetInput}
      />
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

      <MenuButton disabled={totalAgents < 2} onClick={onClickDone}>
        <CheckIcon />
        Split
      </MenuButton>

      <ExtraOptions
        uploadInput={uploadInput}
        preferences={preferences}
        resetInput={resetInput}
      />
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

      <ExtraOptions
        uploadInput={uploadInput}
        preferences={preferences}
        resetInput={resetInput}
      />
    </>
  )
}
