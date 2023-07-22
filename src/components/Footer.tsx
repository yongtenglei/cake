import { Link } from './Link'
import { LayoutContainer } from '../Layouts'
import './Footer.css'

export const Footer = () => {
  return (
    <footer className="Footer">
      <LayoutContainer sx={{color: 'white'}}>
 
        <ol className="Footer__links">
          <li className="Footer__link">
            <Link href={'/graph'}>Resource Splitting Tool</Link>
          </li>
          <li className="Footer__link">
            <Link href={'/learn'}>Learn</Link>
          </li>
          <li className="Footer__link">
            <Link href={'/help'}>Help</Link>
          </li>
          <li className="Footer__link">
            <Link href={'/privacy-policy'}>Privacy policy</Link>
          </li>
        </ol>
        <div className="Footer__copyright">
          © Andy Ernst {new Date().getFullYear()}. MIT license.
        </div>
      </LayoutContainer>
    </footer>
  )
}
