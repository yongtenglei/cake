import { ReactNode } from 'react'
import { Stack } from '@mui/material'
import { margin } from '../../graphConstants'

interface GraphHeaderProps {
  color: string
  heading: ReactNode
  buttons: ReactNode
}

export const GraphHeader = ({ color, heading, buttons }: GraphHeaderProps) => {
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
        backgroundColor: color,
        borderTopLeftRadius: 8,
        borderTopRightRadius: 8,
        height: 70,
      }}
    >
      {heading}

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
