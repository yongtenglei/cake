import { Stack, IconButton } from '@mui/material'
import React, { ComponentProps } from 'react'

type MenuButtonProps = ComponentProps<typeof IconButton>

export const MenuButton = ({ children, ...props }: MenuButtonProps) => {
  return (
    <IconButton {...props}>
      <Stack
        alignItems="center"
        sx={{ fontSize: 12, textTransform: 'uppercase', minWidth: 40 }}
      >
        {children}
      </Stack>
    </IconButton>
  )
}
