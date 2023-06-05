import React, { useState } from 'react'
import { scaleLinear } from 'd3'
import { innerHeight, innerWidth, margin } from './spacing'
import { DrawingLayer } from './components/DrawingLayer'
import { GraphHeader } from './components/GraphHeader'
import { GraphContext } from './GraphContext'
import { Segment } from '../types'
import { isDrawingComplete } from './graphUtils'
// import CakeRoundedIcon from '@material-ui/icons/CakeRounded';

export const App = () => {
  const yScale = scaleLinear().domain([0, 10]).range([innerHeight, 0]).nice()
  const xScale = scaleLinear().domain([0, 100]).range([0, innerWidth]).nice()
  const [segments, setSegments] = useState<Segment[]>([])
  const isComplete = isDrawingComplete(segments)

  return (
    <GraphContext.Provider
      value={{
        yScale,
        xScale,
      }}
    >
      <GraphHeader isComplete={isComplete} />
      <DrawingLayer segments={segments} setSegments={setSegments} />
    </GraphContext.Provider>
  )
}
