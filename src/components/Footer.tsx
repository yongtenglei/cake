import { Link } from './Link'
import './Footer.css'

export const Footer = () => {
  return (
    <footer className="Footer">
      <section className="Footer__Body LayoutBody">
        <ol className="Footer__links">
          <li className="Footer__link">
            <Link href={'/graph'}>Fair Division Tool</Link>
          </li>
          <li className="Footer__link">
            <Link href={'/tutorial'}>Fair Division Tutorial</Link>
          </li>
          <li className="Footer__link">
            <Link href={'/privacy-policy'}>Privacy policy</Link>
          </li>
        </ol>
        <div className='Footer__copyright'>
          Developed in coordination with the University of Edinburgh.<br />
        © Andy Ernst, {(new Date()).getFullYear()}. All rights reserved.
        </div>
      </section>
    </footer>
  )
}
