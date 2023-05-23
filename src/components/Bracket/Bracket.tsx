import { innerHeight as bottom } from '../../spacing'
import './Bracket.css'

interface BracketProps {
  start: number
  width: number
}

/*
 *  The curly brace that brackets a segment.
 *  See the CSS file for details on how the styling works.
 */
export const Bracket = ({ start, width }: BracketProps) => {
  if (width < 40) {
    // too small to render anything useful, so keep just this to maintain the height.
    return <div className="bracketContainer" />
  }
  return (
    <div className="bracketContainer" style={{ width }}>
      <div className="bracket topBracket leftBracket"></div>
      <div className="bracket topBracket rightBracket"></div>
      <div className="bracket bottomBracket bottomLeftBracket"></div>
      <div className="bracket bottomBracket bottomRightBracket"></div>
    </div>
  )
}
