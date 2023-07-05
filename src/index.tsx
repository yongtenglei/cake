import React from 'react'
import ReactDOM from 'react-dom/client'
import { CssBaseline }from '@mui/material'
import { createTheme, ThemeProvider } from '@mui/material/styles'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { ErrorPage } from './Pages/ErrorPage'
import { MainLayout } from './Layouts'
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
      light: '#8ECAE6',
      main: '#0d77b0',
      dark: '#02405f',
    },
    secondary: {
      light: '#ffde8b',
      main: '#FFB703',
      dark: '#FB8500',
    },
  },
})

export const router = createBrowserRouter([
  // Landing page doesn't use the main layout
  { path: '/', element: <LandingPage />,     errorElement: <ErrorPage /> },
  {
    path: '/',
    element: <MainLayout />,
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
      <CssBaseline />
      <RouterProvider router={router} />
    </ThemeProvider>
  </React.StrictMode>
)
