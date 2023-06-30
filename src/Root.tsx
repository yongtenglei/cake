import { Outlet } from 'react-router-dom'
import CakeRoundedIcon from '@mui/icons-material/CakeRounded';

export const Root = () => {
  return (
    <main>
      <header><CakeRoundedIcon /> navigation here</header>
      <Outlet />
    </main>
  )
}
