import { DrawnSegment } from '../../../types'
import { innerHeight } from '../../constants'
import './ResizeHandles.css'

interface HorizontalResizeHandlesProps {
  segments: DrawnSegment[]
  setXMovingId: (id: number) => void
  xMovingId: number | null
}

export const HorizontalResizeHandles = ({
  segments,
  setXMovingId,
  xMovingId,
}: HorizontalResizeHandlesProps) => {
  return (
    <>
      {segments.map((seg, i) => {
        if (i === segments.length - 1) {
          return null
        } else {
          return (
            <line
              tabIndex={0}
              className={'ResizeHandle'}
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
