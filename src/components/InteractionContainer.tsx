import { Box, useTheme } from '@mui/material'
import { ComponentProps } from 'react'
import { defaultGraphWidth, getInnerWidth } from '../Graph/graphConstants'

export const InteractionContainer = ({ sx, ...props }: ComponentProps<typeof Box>) => {
  const theme = useTheme()
  return (
    <Box
      component="section"
      padding={4}
      minHeight={300}
      maxWidth={getInnerWidth(defaultGraphWidth)}
      sx={{
        border: '2px solid ' + theme.palette.primary.main,
        borderRadius: '8px',
        ...sx,
      }}
      {...props}
    />
  )
}
