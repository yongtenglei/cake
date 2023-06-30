import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { ErrorPage } from './Pages/ErrorPage'
import { Root } from './Root'
import { Graph } from './Graph/Graph'
import { PrivacyPolicyPage } from './Pages/PrivacyPolicyPage'
import { LandingPage } from './Pages/LandingPage'

export const router = createBrowserRouter([
  {
    path: '/',
    element: <Root />,
    errorElement: <ErrorPage />,
    children: [
      {
        path:'/',
        element: <LandingPage />
      },
      {
        path: 'graph/',
        element: <Graph />,
      },
      {
        path: 'privacy-policy/',
        element: <PrivacyPolicyPage />
      }
    ],
  },
])

export const Router = () => <RouterProvider router={router} />
