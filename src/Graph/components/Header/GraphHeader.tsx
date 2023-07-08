import { ReactNode } from 'react'
import { Stack, Tooltip, IconButton, Box, FormHelperText } from '@mui/material'
import ArrowBackIcon from '@mui/icons-material/ArrowBackIos'
import ArrowForwardIcon from '@mui/icons-material/ArrowForwardIos'
import { margin } from '../../graphConstants'
import { getAgentColor } from '../../../constants'

interface GraphHeaderProps {
  currentAgent: number
  totalAgents: number
  onChangeIndex: (i: number) => void
  compareMode: boolean
  buttons: ReactNode
}

export const GraphHeader = ({
  currentAgent,
  totalAgents,
  onChangeIndex,
  compareMode,
  buttons,
}: GraphHeaderProps) => {
  return (
    <Stack
      marginLeft={margin.left + 'px'}
      marginRight={margin.right + 'px'}
      paddingY={1}
      paddingX={2}
      spacing={1}
      alignContent="center"
      direction="row"
      maxWidth="100%"
      justifyContent="space-between"
      gap={10}
      sx={{
        backgroundColor: compareMode ? '#d5d5d5' : getAgentColor(currentAgent),
        position: 'relative',
        bottom: -20,
        borderTopLeftRadius: 8,
        borderTopRightRadius: 8,
        height: 70,
      }}
    >
      <SwitchAgent
        navigationDisabled={totalAgents < 2}
        onChangeIndex={onChangeIndex}
        currentAgent={currentAgent}
        compareMode={compareMode}
      />

      <Stack
        justifyContent="flex-end"
        alignItems="center"
        spacing={1}
        paddingRight={1}
        direction="row"
      >
        {buttons}
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
        paddingY={1}
        paddingX={2}
      >
        {compareMode ? null : (
          <Tooltip title="Previous person">
            <span>
              <IconButton
                aria-label="Previous person"
                onClick={() => onChangeIndex(-1)}
                disabled={navigationDisabled}
              >
                <ArrowBackIcon />
              </IconButton>
            </span>
          </Tooltip>
        )}

        <h2>{compareMode ? 'Compare View' : `Person ${currentAgent + 1}`}</h2>
        
        {compareMode ? null : (
          <Tooltip title="Next person">
            <span>
              <IconButton
                aria-label="Next person"
                onClick={() => onChangeIndex(1)}
                disabled={navigationDisabled}
              >
                <ArrowForwardIcon />
              </IconButton>
            </span>
          </Tooltip>
        )}
      </Stack>
    </Stack>
  )
}
