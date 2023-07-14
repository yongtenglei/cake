import { Stack, Tooltip, IconButton } from '@mui/material'
import ArrowBackIcon from '@mui/icons-material/ArrowBackIos'
import ArrowForwardIcon from '@mui/icons-material/ArrowForwardIos'

interface SwitchAgentHeaderProps {
  navigationDisabled: boolean
  currentAgent: number
  onChangeIndex: (i: number) => void
}

export const SwitchAgentHeader = ({
  navigationDisabled,
  currentAgent,
  onChangeIndex,
}: SwitchAgentHeaderProps) => {
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
              <ArrowBackIcon />
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
              <ArrowForwardIcon />
            </IconButton>
          </span>
        </Tooltip>
      </Stack>
    </Stack>
  )
}
