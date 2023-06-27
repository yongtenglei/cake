import { DrawnSegment } from '../../types'
import { innerHeight } from '../constants'
import './ResizeHandles.css'

interface ResizeHandlesProps {
  segments: DrawnSegment[]
  setXMovingId: (id: number) => void
  xMovingId: number | null
}

export const ResizeHandles = ({
  segments,
  setXMovingId,
  xMovingId,
}: ResizeHandlesProps) => {
  return (
    <>
      {segments.map((seg, i) => {
        if (i === segments.length - 1) {
          return null
        } else {
          let className = 'ResizeHandle'
          if (xMovingId === seg.id) {
            // this keeps the handle consistently "solid" when moving
            className += ' ResizeHandle__moving'
          }
          return (
            <line
              className={className}
              key={seg.id}
              x1={seg.x2}
              x2={seg.x2}
              y1={innerHeight}
              y2={0}
              onMouseDown={() => setXMovingId(seg.id)}
            />
          )
        }
      })}
    </>
  )
}
