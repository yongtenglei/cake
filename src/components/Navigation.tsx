import { NavLink } from 'react-router-dom'
import CakeRoundedIcon from '@mui/icons-material/CakeRounded'
import './Navigation.css'

export const Navigation = () => {
  return (
    <nav className="Navigation ">
      <div className="LayoutBody">
        <div className="Navigation__link">
          <NavLink
            className="Navigation__homeIcon "
            to={'/'}
            aria-label={'home'}
          >
            <CakeRoundedIcon />
          </NavLink>
        </div>
        <ol className="Navigation__links">
          <li className="Navigation__link">
            <NavLink to={'/graph'}>Tool</NavLink>
          </li>
          <li className="Navigation__link">
            <NavLink to={'/tutorial'}>Tutorial</NavLink>
          </li>
        </ol>
      </div>
    </nav>
  )
}
