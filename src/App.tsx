import React from 'react'
import {
  extent,
  scaleLinear,
  timeFormat,
  scaleTime,
} from 'd3'
import { useData } from './hooks/useData'
import { AxisLeft, AxisBottom } from './components/Axes'
import { height, width, innerHeight, innerWidth, margin } from './spacing'
import { DrawingLayer} from './components/DrawingLayer'


export const App = () => {
  const data = useData()

  if (!data) {
    return <pre>Loading...</pre>
  }

  const yScale = scaleLinear()
    .domain([0, 10])
    .range([innerHeight, 0])
    .nice()

  const xScale = scaleLinear()
    .domain([0, 100])
    .range([0, innerWidth])
    .nice()

  return (
    <>
      <svg width={width} height={height}>
        <g transform={`translate(${margin.left},${margin.top})`}>
          <AxisBottom xScale={xScale} />
          <AxisLeft yScale={yScale} />
          {/* <Marks
            data={data}
            xScale={xScale}
            yScale={yScale}
            xValue={xValue}
            yValue={yValue}
            tooltipFormat={xAxisTickFormat}
          /> */}
          <DrawingLayer yScale={yScale} />
        </g>
      </svg>
    </>
  )
}
