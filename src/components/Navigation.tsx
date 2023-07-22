import { forwardRef } from 'react'
import { Button } from '@mui/material'
import { Link, NavLink } from './Link'
import title from '../images/title.svg'
import { LayoutContainer } from '../Layouts'
import './Navigation.css'

export const Navigation = () => {
  return (
    <div className="Navigation">
      <LayoutContainer>
        <div className="Navigation__body">
          <Link className="Navigation__homeIcon" href={'/'} aria-label={'home'}>
            <img
              src="https://creazilla-store.fra1.digitaloceanspaces.com/emojis/53176/birthday-cake-emoji-clipart-md.png"
              style={{ width: '40px' }}
            />
            <img src={title} alt="Fair Slice" />
          </Link>

          <div style={{ display: 'flex' }}>
            <ol className="Navigation__links">
              <li>
                <NavLink href={'/graph'} className="Navigation__link">
                  Resource Splitting
                </NavLink>
              </li>
              <li>
                <NavLink href={'/help'} className="Navigation__link">
                 Help
                </NavLink>
              </li>
            </ol>

            <Button
              component={forwardRef((props, ref) => (
                <Link {...props} innerRef={ref} />
              ))}
              color="secondary"
              variant="contained"
              href={'/learn'}
              sx={{ marginY: 1 }}
            >
              Learn
            </Button>
          </div>
        </div>
      </LayoutContainer>
    </div>
  )
}
