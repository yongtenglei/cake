import { Link as MuiLink } from '@mui/material'
import LaunchIcon from '@mui/icons-material/Launch'

type Props = React.ComponentProps<typeof MuiLink>

// Abstraction over MUI's Link.
// External links will automatically open in a new window and have an "external" icon
export const Link = ({ children, ...props }: Props) => {
  const isExternal = !props.href.startsWith('/')
  return (
    <MuiLink {...props} target={isExternal ? '_blank' : null}>
      {children}
      {isExternal ? (
        <>
          {' '}
          <LaunchIcon sx={{ fontSize: 'inherit' }} />
        </>
      ) : null}
    </MuiLink>
  )
}
