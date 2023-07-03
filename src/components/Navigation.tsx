import { Button } from '@mui/material'
import CakeRoundedIcon from '@mui/icons-material/CakeRounded'
import { Link, NavLink } from './Link'
import './Navigation.css'

export const Navigation = () => {
  return (
    <div className="Navigation">
      <div className="LayoutBody Navigation__body">
        <Link
          className="Navigation__link Navigation__homeIcon"
          href={'/'}
          aria-label={'home'}
        >
          <CakeRoundedIcon />
          Fair Slice
        </Link>

        <div style={{display: 'flex'}}>
          <ol className="Navigation__links">
            <li>
              <NavLink href={'/graph'} className="Navigation__link">
                Splitting Tool
              </NavLink>
            </li>
          </ol>

          <Button
            component={Link}
            color="secondary"
            variant="contained"
            href={'/tutorial'}
          >
            Learn
          </Button>
        </div>
      </div>
    </div>
  )
}
