import React from 'react'
import ReactDOM from 'react-dom/client'
import { createTheme, ThemeProvider } from '@mui/material/styles'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { ErrorPage } from './Pages/ErrorPage'
import { MainLayout } from './MainLayout'
import { Graph } from './Graph/Graph'
import { PrivacyPolicyPage } from './Pages/PrivacyPolicyPage'
import { TutorialPage } from './Pages/TutorialPage'
import { LandingPage } from './Pages/LandingPage'
import CssBaseline from '@mui/material/CssBaseline'
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
    },
  },
})

export const router = createBrowserRouter([
  { path: '/', element: <LandingPage /> },
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
