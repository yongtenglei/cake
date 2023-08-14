import { useContext } from 'react'
import HeightIcon from '@mui/icons-material/Height'
// import HeightIcon from '@mui/icons-material/DragHandle'
import { DrawnSegment } from '../../../types'
import { GraphContext } from '../../GraphContext'
import { getInnerHeight } from '../../graphConstants'
import './ResizeHandles.css'

interface HorizontalResizeHandlesProps {
  segments: DrawnSegment[]
  setXMovingId: (id: number) => void
  isDrawing: boolean
  highlight: boolean
}

export const HorizontalResizeHandles = ({
  segments,
  setXMovingId,
  isDrawing,
  highlight,
}: HorizontalResizeHandlesProps) => {
  const { height } = useContext(GraphContext)
  return (
    <>
      {segments.map((seg, i) => {
        if (isDrawing && i === segments.length - 1) {
          return null
        } else {
          const onMouseDown = () => setXMovingId(seg.id)
          return (
            <g key={seg.id}>
              <line
                tabIndex={0}
                className={'HorizontalHandle' + (highlight ? ' visible' : '')}
                x1={seg.x2}
                x2={seg.x2}
                y1={getInnerHeight(height)}
                y2={0}
                onMouseDown={onMouseDown}
                onFocus={onMouseDown}
              />
              {/* WIP, currently issues with stacking order with Vertical handles 
                 and SVG doesn't let you set stacking order */}
              {/* <foreignObject
                className="ResizeHandleIndicator HorizontalHandle"
                x={seg.x2}
                y={getInnerHeight(height) / 2}
              /> */}
            </g>
          )
        }
      })}
    </>
  )
}
