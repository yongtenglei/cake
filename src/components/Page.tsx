import { ReactNode, useEffect } from 'react'
import { useLocation } from 'react-router-dom'

interface PageProps {
  title: string
  children: ReactNode
  scroll?: boolean
}

export const Page = ({ title, children, scroll = true }: PageProps) => {
  const { pathname } = useLocation()

  useEffect(() => {
    if (scroll) {
      window.scrollTo(0, 0)
    }
  }, [pathname])

  useEffect(() => {
    document.title = 'Fair Slice' + (title ? ' - ' + title : '')
  }, [title])
  
  return <>{children}</>
}
