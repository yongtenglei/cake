import { ReactNode, ComponentProps } from 'react'
import { Box } from '@mui/material'

import { Navigation } from './components/Navigation'
import { Footer } from './components/Footer'
import './Layouts.css'

interface LayoutBaseProps {
  children: ReactNode
  contained?: boolean
  sx?: ComponentProps<typeof Box>['sx']
}

/**
 * Wrapper component providing the navigation and footer.
 */
export const PageLayout = ({ children, contained = true, sx }: LayoutBaseProps) => {
  const Body = contained ? BodyContainer : Box
  return (
    <div className="PageWrapper">
      <Navigation />
      <main className="main">
        <Body sx={sx}>{children}</Body>
      </main>
      <Footer />
    </div>
  )
}

interface LayoutProps {
  children: ReactNode
  sx?: ComponentProps<typeof Box>['sx']
}
/**
 * Wrapper component that constrains contents to the layout width and applies standard padding.
 */
export const LayoutContainer = ({ children, sx }: LayoutProps) => {
  return (
    <Box className="layoutContainer" sx={sx}>
      {children}
    </Box>
  )
}
/**
 * Same as LayoutContainer but with top/bottom margin
 */
export const BodyContainer = ({ children, sx }: LayoutProps) => {
  return (
    <Box className="layoutContainer bodyContainer" sx={sx}>
      {children}
    </Box>
  )
}

/**
 * TextContainer provides a decent max width for fitting 75-80 characters per line, 
 * which aids readibility.
 */
export const TextContainer = ({ children, sx }: LayoutProps) => {
  return <Box sx={{ maxWidth: 600, ...sx }}>{children}</Box>
}
