import { ForwardedRef } from 'react'
import { Link as RRLink, NavLink as RRNavLink } from 'react-router-dom'
import { Link as MuiLink } from '@mui/material'
import LaunchIcon from '@mui/icons-material/Launch'

/**
 * These components should be used instead of the Material UI ones.
 * These use react router and will navigation *within* the single page app rather than reload it.
 */

type NavLinkProps = React.ComponentProps<typeof MuiLink>

export const NavLink = ({ href, ...props }: NavLinkProps) => (
  <MuiLink {...props} component={RRNavLink} to={href} />
)

// Abstraction over MUI's Link.
// External links will automatically open in a new window and have an "external" icon
type LinkProps = React.ComponentProps<typeof MuiLink> & {
  innerRef?: ForwardedRef<unknown>
}

export const Link = ({ children, href, innerRef, ...props }: LinkProps) => {
  const isExternal = !href.startsWith('/')
  return (
    <MuiLink
      {...props}
      // @ts-ignore
      ref={innerRef}
      component={RRLink}
      to={href}
      target={isExternal ? '_blank' : null}
      rel="noopener"
    >
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
