import { Box, Stack } from '@mui/material'
import InfoIcon from '@mui/icons-material/Info'
import { ReactSVG } from 'react-svg'
import handIcon from '../../images/icons/hand.svg'

// Info box
export const Info = ({ children }) => (
  <Container icon={<InfoIcon fontSize="large" />} color="#555">
    {children}
  </Container>
)
// Action instruction box
export const Action = ({ children }) => {
  return (
    <Container icon={<ReactSVG src={handIcon} />} color={'#555'}>
      {children}
    </Container>
  )
}

const Container = ({ children, icon, color }) => (
  <Stack
    direction="row"
    marginY={4}
    spacing={2}
    color={color}
    padding={2}
    border="2px solid"
    borderRadius="8px"
    sx={{ backgroundColor: '#eee' }}
  >
    <Box width={24} height={24} flexShrink={0}>
      {icon}
    </Box>
    <Box component="p" flexGrow={1} paddingTop={1 / 2} color="black">
      {children}
    </Box>
  </Stack>
)
