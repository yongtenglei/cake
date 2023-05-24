import React, { useState, useContext } from 'react'
import TextField from '@mui/material/TextField'
import Button from '@mui/material/Button'
import { innerHeight as bottom, width } from '../../spacing'
import { Segment } from '../../types'
import { GraphContext } from '../../GraphContext'
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
    <foreignObject x={0} y={bottom+20} width={width} height="100">
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
  const { xScale } = useContext(GraphContext)
  const [editing, setEditing] = useState(false)
  const slicesize = x2 - x1
  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    if (value === '') {
      setSegmentLength(id, 0)
    }
    const newSliceSize = parseInt(value)
    if (!isNaN(newSliceSize)) {
      setSegmentLength(id, newSliceSize)
    }
  }
  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' || e.key === 'Escape') {
      exitEditing()
    }
  }
  const exitEditing = () => {
    if(slicesize === 0) {
      setSegmentLength(id, -1) // remove zero-size segment only on exit
    }
    setEditing(false)
  }
  return (
    <>
      <div
        style={{
          left: xScale(x1),
          width: 'min-content', //Math.max(slicesize, 80),
          position: 'absolute',
          zIndex: editing ? 10 : 0,
        }}
      >
        <Bracket width={xScale(slicesize)} />

        <div className='backetInputContainer'>
          {editing ? (
            <TextField
              label={`Part ${segNumber}`}
              type="number"
              autoFocus
              value={slicesize}
              onBlur={exitEditing}
              onKeyDown={handleKeyPress}
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
              aria-label={`Segment ${segNumber} has width ${slicesize}%, click to edit`}
            >
              {slicesize} %
            </Button>
          )}
        </div>
      </div>
    </>
  )
}
