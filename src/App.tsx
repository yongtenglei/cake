import React from 'react'
import { scaleLinear } from 'd3'
import { AxisLeft, AxisBottom } from './components/Axes'
import { height, width, innerHeight, innerWidth, margin } from './spacing'
import { DrawingLayer } from './components/DrawingLayer'
import { GraphContext } from './GraphContext'
// import CakeRoundedIcon from '@material-ui/icons/CakeRounded';

export const App = () => {
  const yScale = scaleLinear().domain([0, 10]).range([innerHeight, 0]).nice()
  
  const xScale = scaleLinear().domain([0, 100]).range([0, innerWidth]).nice()

  return (
    <GraphContext.Provider value={{ yScale, xScale }}>
      <svg width={width} height={height}>
        <g transform={`translate(${margin.left},${margin.top})`}>
          <AxisBottom />
          <AxisLeft />
          <DrawingLayer />
        </g>
      </svg>
    </GraphContext.Provider>
  )
}
