import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { ErrorPage } from './Pages/ErrorPage'
import { Main } from './Main'
import { Graph } from './Graph/Graph'
import { PrivacyPolicyPage } from './Pages/PrivacyPolicyPage'
import { TutorialPage } from './Pages/TutorialPage'
import { LandingPage } from './Pages/LandingPage'

export const router = createBrowserRouter([
  {
    path: '/',
    element: <Main />,
    errorElement: <ErrorPage />,
    children: [
      {
        path:'/',
        element: <LandingPage />
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
        element: <PrivacyPolicyPage />
      }
    ],
  },
])

export const Router = () => <RouterProvider router={router} />
