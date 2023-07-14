import { forwardRef, ForwardedRef, ComponentProps } from 'react'
import { Link as RRLink, NavLink as RRNavLink } from 'react-router-dom'
import { Link as MuiLink, Button } from '@mui/material'
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
  const extraProps = isExternal ? { target: '_blank', rel: 'noopener' } : {}
  return (
    <MuiLink
      {...props}
      // @ts-ignore
      ref={innerRef}
      component={RRLink}
      to={href}
      {...extraProps}
    >
      {children}
      {isExternal ? <LaunchIcon sx={{ fontSize: 'inherit' }} /> : null}
    </MuiLink>
  )
}

/**
 * A link that looks like a button. 
 * While Button does support links natively, it doesn't support React Router links.
 * 
 * Have to work around a weird `ref` issue in Material UI's button.
 */
export const ButtonLink = (props: ComponentProps<typeof Button>) => (
  <Button
    component={forwardRef((props, ref) => (
      <Link {...props} innerRef={ref as any} />
    ))}
    {...props}
  />
)
