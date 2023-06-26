import React from 'react'
import { Box } from '@mui/material'
import { innerHeight as bottom, width } from '../../constants'
import { Segment } from '../../../types'
import { EditableBracket } from './EditableBracket'
import { BracketContainer } from './BracketContainer'

interface ValueBracketsProps {
  segments: Segment[]
}

export const ValueBrackets = ({ segments }: ValueBracketsProps) => {
  return (
    <foreignObject x={0} y={bottom + 20} width={width} height="100">
      {segments.map((seg, i) => (
        <BracketContainer focused={false} segment={seg} key={i}>
          <Box
            sx={{
              textAlign: 'center',
            }}
          >
            {seg.end - seg.start} %
          </Box>
        </BracketContainer>
      ))}
    </foreignObject>
  )
}

interface EditableValueBracketsProps {
  segments: Segment[]
  setSegmentLength?: (id: number, innerWidth: number) => void
}

export const EditableValueBrackets = ({
  segments,
  setSegmentLength,
}: EditableValueBracketsProps) => {
  return (
    <foreignObject x={0} y={bottom + 20} width={width} height="100">
      {segments.map((seg, i) => (
        <EditableBracket
          segment={seg}
          key={seg.id}
          segNumber={i + 1}
          setSegmentLength={setSegmentLength}
        />
      ))}
    </foreignObject>
  )
}
