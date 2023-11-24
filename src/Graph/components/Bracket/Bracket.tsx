import './Bracket.css'

interface BracketProps {
  width: number
}

/*
 *  The curly brace that brackets a segment.
 *  See the CSS file for details on how the styling works.
 */
export const Bracket = ({ width }: BracketProps) => {
  if (width < 40) {
    // too small a space to show a bracket so render a line instead
    return (
      <div className="bracketContainer" style={{ width }}>
        <div className="bracketLine" />
      </div>
    )
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
