import { ReactNode } from 'react'
import { Outlet } from 'react-router-dom'
import { Navigation } from './components/Navigation'
import { Footer } from './components/Footer'
import './MainLayout.css'

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
}

export const LayoutBase = ({ children, contained = true }: LayoutBaseProps) => {
  return (
    <div className="PageWrapper">
      <Navigation />
      <main className="main">
        <div className={contained ? 'content' : ''}>{children}</div>
      </main>
      <Footer />
    </div>
  )
}
