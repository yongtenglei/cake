import React, { useState } from 'react'
import { Stack, Box } from '@mui/material'
import { defaultGraphHeight, defaultGraphWidth, margin } from '../graphConstants'
import { getAgentColor } from '../../constants'
import { AxisLeft, AxisBottom } from './Axes'
import { Segments } from './Segments'
import { useConvertSegToPixels } from '../graphUtils'
import { Preferences } from '../../types'
import { ValueBrackets } from './Bracket/ValueBrackets'
import { ValueBubbles } from './ResizeHandles'

interface CompareViewGraphProps {
  preferences: Preferences
}

export const _CompareViewGraph = ({ preferences }: CompareViewGraphProps) => {
  const convertToPixels = useConvertSegToPixels()
  const [focused, setFocused] = useState<number | null>(null)
  const isActive = (i: number) => focused === null || focused === i

  const focusedPreference = preferences[focused] ?? []

  return (
    <Stack direction="row" spacing={1}>
      <div>
        <svg width={defaultGraphWidth} height={defaultGraphHeight}>
          <g transform={`translate(${margin.left},${margin.top})`}>
            <AxisBottom />
            <AxisLeft />

            {/* render all users' preferences except focused user */}
            {preferences.map((segments, i) =>
              i === focused ? null : (
                <Segments
                  key={i}
                  segments={segments.map(convertToPixels)}
                  // graying out the background looks good only when `partial` is false
                  // color={isActive(i) ? getAgentColor(i) : '#999'}
                  color={getAgentColor(i)}
                  // partial
                />
              )
            )}
            {/* put focused graph on top for best visibility */}
            {focused === null ? null : (
              <Segments
                segments={focusedPreference.map(convertToPixels)}
                color={getAgentColor(focused)}
              />
            )}

            <ValueBubbles segments={focusedPreference.map(convertToPixels)} />
          </g>
        </svg>
        <ValueBrackets segments={focusedPreference} />
      </div>

      <Box component="section">
        <Stack
          sx={{
            borderRadius: '4px',
            border: '1px solid black',
            padding: 2,
            marginTop: margin.top + 'px',
          }}
        >
          {preferences.map((segments, i) => (
            <Stack
              key={i}
              direction="row"
              alignItems="center"
              spacing={1}
              // Support both keyboard focus and mouse hover
              tabIndex={0}
              onFocus={() => setFocused(i)}
              onBlur={() => setFocused(null)}
              onMouseOver={() => setFocused(i)}
              onMouseOut={() => setFocused(null)}
              sx={{
                opacity: isActive(i) ? 1 : 0.5,
                cursor: 'default',
                paddingY: 0.5,
              }}
            >
              <Box
                sx={{
                  width: 15,
                  height: 15,
                  backgroundColor: getAgentColor(i),
                }}
              />
              <div>Person {i + 1}</div>
            </Stack>
          ))}
        </Stack>
      </Box>
    </Stack>
  )
}
