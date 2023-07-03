import { Outlet } from 'react-router-dom'
import { Navigation } from './components/Navigation'
import { Footer } from './components/Footer'
import './MainLayout.css'

export const MainLayout = () => {
  return (
    <div className="PageWrapper">
      <Navigation />
      
      <main className="main">
        <div className='content'>
        <Outlet />
        </div>
      </main>
      <Footer />
    </div>
  )
}
