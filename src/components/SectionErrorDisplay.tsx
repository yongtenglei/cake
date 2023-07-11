import React from 'react'
import ErrorIcon from '@mui/icons-material/Error'
import { Stack } from '@mui/material'

export const SectionErrorDisplay = ({ error }) => {
  return (
    <Stack
      padding={6}
      alignItems={'center'}
      spacing={2}
      role="alert"
      sx={{ border: '1px solid red' }}
    >
      <ErrorIcon color="error" fontSize="large" />
      <h2>Error</h2>

      <p>Sorry, an error occurred in this part of the page.</p>
      <code>{error.message}</code>
    </Stack>
  )
}
