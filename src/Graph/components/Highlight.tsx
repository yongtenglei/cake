import React, { useContext } from 'react'
import { GraphContext } from '../GraphContext'
import { DrawnSegment } from '../../types'
import { getInnerHeight } from '../graphConstants'
import './highlights.css'

interface HighlightProps {
  segments: DrawnSegment[]
  handle: null | number
}

/**
 *  Four highlights per segment organized into 3 handle groups:
 *  0 - middle
 *  1 - left and right corners
 *  2 - right borders
 **/
const size = 36
const halfSize = size / 2
export const Highlight = ({ handle, segments }: HighlightProps) => {
  const { height } = useContext(GraphContext)
  if (handle == null || !segments.length) {
    return null
  }

  return (
    <>
      {segments.map((seg) => {
        if (handle === 0 && seg.y1 === seg.y2) {
          const x = seg.x1 + (seg.x2 - seg.x1) / 2
          return (
            <foreignObject
              x={x - halfSize}
              y={seg.y1 - halfSize}
              width={size}
              height={size}
              key={seg.id + '-' + handle}
            >
              <div className="circle ping" />
            </foreignObject>
          )
        }
        if (handle === 1) {
          return (
            <g key={seg.id + '-' + handle}>
              <foreignObject
                x={seg.x1 - halfSize}
                y={seg.y1 - halfSize}
                width={size}
                height={size}
              >
                <div className="circle ping" />
              </foreignObject>
              <foreignObject
                x={seg.x2 - halfSize}
                y={seg.y2 - halfSize}
                width={size}
                height={size}
              >
                <div className="circle ping" />
              </foreignObject>
            </g>
          )
        }
        if (handle === 2) {
          const width = 12
          return (
            <foreignObject
              x={seg.x2 - width/2}
              y={0}
              width={width}
              height={getInnerHeight(height)}
              key={seg.id + '-' + handle}
            >
              <div className="horz ping" />
            </foreignObject>
          )
        }
      })}
    </>
  )
}
