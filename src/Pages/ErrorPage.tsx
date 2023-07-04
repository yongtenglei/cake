import { Stack } from '@mui/material'
import { ReactSVG } from 'react-svg'
import { useRouteError, isRouteErrorResponse } from 'react-router-dom'
import { LayoutBase } from '../MainLayout'
import cakeOutline from '../images/cake_outline.svg'

import './ErrorPage.css'

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
        <h1>Sorry, it's not always a piece of cake</h1>
        <ReactSVG src={cakeOutline}  className="ErrorCake" />
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
