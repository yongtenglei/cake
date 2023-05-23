import React, { useState } from 'react'
import TextField from '@mui/material/TextField'
import Button from '@mui/material/Button'
import { innerHeight as bottom, width } from '../../spacing'
import { Segment } from '../../types'
import { Bracket } from './Bracket'
import './ValueBracket.css'

interface ValueBracketsProps {
  segments: Segment[]
  setSegmentLength: (id: number, innerWidth: number) => void
}

export const ValueBrackets = ({
  segments,
  setSegmentLength,
}: ValueBracketsProps) => {
  return (
    <foreignObject x={0} y={bottom} width={width} height="100">
      {segments.map((seg, i) => (
        <ValueBracket
          segment={seg}
          key={seg.id}
          segNumber={i + 1}
          setSegmentLength={setSegmentLength}
        />
      ))}
    </foreignObject>
  )
}

interface ValueBracketProps {
  segment: Segment
  setSegmentLength: (id: number, innerWidth: number) => void
  segNumber: number
}

export const ValueBracket = ({
  segment: { x1, x2, id },
  setSegmentLength,
  segNumber,
}: ValueBracketProps) => {
  const [editing, setEditing] = useState(false)
  const start = x1
  const width = x2 - x1
  const onChange = (e) => {
    const newWidth = parseInt(e.target.value)
    if (!isNaN(newWidth)) {
      setSegmentLength(id, newWidth)
    }
  }
  return (
    <>
      <div
        style={{
          left: start,
          width: Math.max(width, 100),
          position: 'absolute',
          zIndex: editing ? 10 : 0,
        }}
      >
        <Bracket start={start} width={width} />

        <div className={'backetInputContainer'}>
          {editing ? (
            <TextField
              label={`Segment ${segNumber}`}
              type="number"
              autoFocus
              value={width}
              onBlur={() => setEditing(false)}
              onChange={onChange}
              variant="outlined"
              size="small"
              autoComplete="off"
              InputLabelProps={{ shrink: true }}
            />
          ) : (
            <Button
              onClick={() => setEditing(true)}
              variant="outlined"
              aria-label={`Segment ${segNumber} has width ${width}%, click to edit`}
            >
              {width} %
            </Button>
          )}
        </div>
      </div>
    </>
  )
}
