import React from 'react'
import ReactDOM from 'react-dom/client'
import { createTheme, ThemeProvider } from '@mui/material/styles'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { ErrorPage } from './Pages/ErrorPage'
import { Main } from './Main'
import { Graph } from './Graph/Graph'
import { PrivacyPolicyPage } from './Pages/PrivacyPolicyPage'
import { TutorialPage } from './Pages/TutorialPage'
import { LandingPage } from './Pages/LandingPage'
import './index.css'

const theme = createTheme({
  typography: {
    fontFamily: 'Poppins, "Segoe UI", sans-serif',
  },
  palette: {
    primary: {
      main: '#ffa726',
      dark: '#f57d00',
    },
    secondary: {
      main: '#00b0ff',
    }
  },
})

export const router = createBrowserRouter([
  {
    path: '/',
    element: <Main />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: '/',
        element: <LandingPage />,
      },
      {
        path: '/graph',
        element: <Graph />,
      },
      {
        path: '/tutorial',
        element: <TutorialPage />,
      },
      {
        path: '/privacy-policy',
        element: <PrivacyPolicyPage />,
      },
    ],
  },
])

const root = ReactDOM.createRoot(document.getElementById('root'))
root.render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <RouterProvider router={router} />
    </ThemeProvider>
  </React.StrictMode>
)
