import React from 'react'
import { DrawnSegment } from '../../../types'
import { ValueBubble } from './ValueBubble'
import './ResizeHandles.css'

const noop = () => {}

interface ValueBubblesProps {
  segments: DrawnSegment[]
}
// Just a wrappper around VerticalResizeHandles which removes the interactivity
export const ValueBubbles = ({ segments }: ValueBubblesProps) => (
  <VerticalResizeHandles
    segments={segments}
    setMovingCornerId={noop}
    setYMovingId={noop}
    isDrawing={false}
    editable={false}
  />
)

interface VerticalResizeHandlesProps {
  segments: DrawnSegment[]
  setMovingCornerId: (corner: [number, number]) => void
  setYMovingId: (id: number) => void
  isDrawing: boolean
  editable: boolean
}

export const VerticalResizeHandles = ({
  segments,
  setMovingCornerId,
  setYMovingId,
  isDrawing,
  editable,
}: VerticalResizeHandlesProps) => {
  return (
    <>
      {segments.map(({ id, x1, x2, y1, y2 }, i) => {
        // don't create grab handles on segment currently being drawn
        if (isDrawing && i === segments.length - 1) {
          return null
        }
        const sloped = y1 !== y2
        const cornerClass = 'ResizeCornerHandle' + (sloped ? ' visible' : '')
        return (
          <React.Fragment key={id}>
            <ValueBubble
              className={cornerClass}
              editable={editable}
              onMouseDown={() => setMovingCornerId([id, 1])}
              x={x1}
              y={y1}
            />
            {sloped ? null : (
              <ValueBubble
                className="ResizeVerticalHandle"
                editable={editable}
                onMouseDown={() => setYMovingId(id)}
                x={x1 + (x2 - x1) / 2}
                y={y1}
              />
            )}
            <ValueBubble
              className={cornerClass}
              editable={editable}
              onMouseDown={() => setMovingCornerId([id, 2])}
              x={x2}
              y={y2}
            />
          </React.Fragment>
        )
      })}
    </>
  )
}
