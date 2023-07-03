import { Outlet } from 'react-router-dom'
import { Navigation } from './components/Navigation'
import { Footer } from './components/Footer'
import './Main.css'

export const Main = () => {
  return (
    <div className="PageWrapper">
      <Navigation />
      <main className="content">
        <Outlet />
      </main>
      <Footer />
    </div>
  )
}
