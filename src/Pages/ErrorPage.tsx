import { Stack } from '@mui/material'
import { isRouteErrorResponse, useRouteError } from 'react-router-dom'
import { ReactSVG } from 'react-svg'
import { PageLayout } from '../Layouts'
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
    <PageLayout>
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
    </PageLayout>
  )
}
