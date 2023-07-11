import React from 'react'
import ReactDOM from 'react-dom/client'
import { Outlet } from 'react-router-dom'
import { CssBaseline } from '@mui/material'
import { createTheme, ThemeProvider } from '@mui/material/styles'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { PageLayout } from './Layouts'
import { ErrorPage } from './Pages/ErrorPage'
import { PrivacyPolicyPage } from './Pages/PrivacyPolicyPage'
import { TutorialPage } from './Pages/TutorialPage'
import { LandingPage } from './Pages/LandingPage'
import { GraphPage } from './Pages/GraphPage'
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
    success: {
      main: '#8bc34a',
    }
  },
})

export const router = createBrowserRouter([
  // Landing page uses a custom `PageLayout`
  { path: '/', element: <LandingPage />, errorElement: <ErrorPage /> },
  {
    path: '/',
    element: (
      <PageLayout>
        <Outlet />
      </PageLayout>
    ),
    errorElement: <ErrorPage />,
    children: [
      {
        path: '/',
        element: <LandingPage />,
      },
      {
        path: '/graph',
        element: <GraphPage />,
      },
      {
        path: '/learn',
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
