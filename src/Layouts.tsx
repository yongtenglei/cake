import { ReactNode, ComponentProps } from 'react'
import { Outlet } from 'react-router-dom'
import { Box } from '@mui/material'

import { Navigation } from './components/Navigation'
import { Footer } from './components/Footer'
import './Layouts.css'

export const MainLayout = () => {
  return (
    <LayoutBase>
      <Outlet />
    </LayoutBase>
  )
}

interface LayoutBaseProps {
  children: ReactNode
  contained?: boolean
  sx?: ComponentProps<typeof Box>['sx']
}

export const LayoutBase = ({
  children,
  contained = true,
  sx,
}: LayoutBaseProps) => {
  return (
    <div className="PageWrapper">
      <Navigation />
      <main className="main">
        <Box className={contained ? 'bodyContainer' : ''} sx={sx}>
          {children}
        </Box>
      </main>
      <Footer />
    </div>
  )
}

interface BodyContainerProps {
  children: ReactNode
  sx?: ComponentProps<typeof Box>['sx']
}

export const BodyContainer = ({ children, sx }: BodyContainerProps) => {
  return <Box className="bodyContainer" sx={sx}>{children}</Box>
}
