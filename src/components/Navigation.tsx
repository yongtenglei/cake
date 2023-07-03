import { NavLink } from 'react-router-dom'
import { Link, Button } from '@mui/material'
import CakeRoundedIcon from '@mui/icons-material/CakeRounded'
import './Navigation.css'

export const Navigation = () => {
  return (
    <div className="Navigation">
      <div className="LayoutBody Navigation__body">
        <NavLink
          className="Navigation__link Navigation__homeIcon"
          to={'/'}
          aria-label={'home'}
        >
          <CakeRoundedIcon />
        </NavLink>

        <ol className="Navigation__links">
          <li>
            <NavLink to={'/graph'} className="Navigation__link">
              Tool
            </NavLink>
          </li>
          <li></li>
        </ol>

        <Button component={Link} color="secondary" variant="contained" href={'/tutorial'}>
          Learn
        </Button>
      </div>
    </div>
  )
}
