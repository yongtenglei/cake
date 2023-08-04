import { useContext } from 'react'
import { GraphContext } from '../GraphContext'
import HeightIcon from '@mui/icons-material/Height'
import { DrawnSegment } from '../../types'
import './highlights.css'

interface HighlightProps {
  segments: DrawnSegment[]
  handle: null | number
}

// Four highlights per segment.
// 1 - left corner (vertical resize)
// 2 - middle (vertical resize)
// 3 - right corner (vertical resize)
// 4 - right side (horizontal resize)
const size = 40

export const Highlight = ({ handle, segments }: HighlightProps) => {
  const { height } = useContext(GraphContext)
  const nextSegment = segments[Math.floor(handle / 4)]
  if (handle == null || !segments.length || !nextSegment) {
    return null
  }
  const getCoords = (num, seg) => {
    switch (num) {
      case 0:
        return [seg.x1, seg.y1]
      case 1:
        // don't show unactionable middle when segment is sloped
        return seg.y1 === seg.y2 ? [seg.x1 + (seg.x2 - seg.x1) / 2, seg.y1] : [null, null]
      case 2:
        return [seg.x2, seg.y2]
      case 3:
        return [seg.x2, height / 2 -20]
      default:
        return [null, null]
    }
  }

  const [x, y] = getCoords(handle % 4, nextSegment)

  if (x === null) {
    return null
  }
  return (
    <foreignObject x={x - size / 2} y={y - size / 2} width={size} height={size}>
      <div
        style={{
          background: 'rgba(255,255,255,0.6)',
          height: '100%',
          width: '100%',
          borderRadius: '50%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <HeightIcon
          className={'highlight ' + (handle % 4 === 3 ? 'horizontal' : '')}
          fontSize="large"
        />
      </div>
    </foreignObject>
  )
}
