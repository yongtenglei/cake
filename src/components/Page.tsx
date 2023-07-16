import { useEffect } from 'react'

export const Page = ({title, children}) => {
  useEffect(() => {
    document.title = 'Fair Slice' + (title ? ' - ' + title : '')
  }, [title])
  return children
}
