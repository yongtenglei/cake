import { Outlet, Link } from 'react-router-dom'

export const LandingPage = () => {
  return (
    <article>
      <h1>Welcome</h1>
      <p>some stuff here</p>
      <ul>
        <li>
          <Link to={'graph/'}>Graph</Link>
        </li>

        <li>
          <Link to={'privacy-policy/'}>Privacy Policy</Link>
        </li>
      </ul>
    </article>
  )
}
