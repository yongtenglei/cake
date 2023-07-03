import { Stack } from '@mui/material'
import { useRouteError, isRouteErrorResponse } from 'react-router-dom'
import { LayoutBase } from '../MainLayout'

export const ErrorPage = () => {
  const error = useRouteError()
  console.error(error)

  const routingError = isRouteErrorResponse(error)
  let errorMessage
  if (routingError) {
    // error is type `ErrorResponse`
    errorMessage = error.error?.message || error.statusText
  } else if (error instanceof Error) {
    errorMessage = error.message
  } else if (typeof error === 'string') {
    errorMessage = error
  } else {
    console.error(error)
    errorMessage = 'Unknown error'
  }

  return (
    <LayoutBase>
      <Stack component="main" alignItems="center" padding={4}>
        <h1>This doesn't look right...</h1>
        <p>
          {routingError
            ? "This page doesn't exist."
            : 'Sorry, an unexpected error has occurred.'}
        </p>
        <p>
          <i>{errorMessage}</i>
        </p>
      </Stack>
    </LayoutBase>
  )
}
