import React, { useState, useCallback, useEffect } from 'react'
import {
  csv,
  arc,
  pie,
  extent,
  scaleLinear,
  timeFormat,
  max,
  min,
  format,
  scaleTime,
} from 'd3'
import { useData } from './hooks/useData'
import { AxisLeft, AxisBottom } from './components/Axes'
import { Marks } from './components/Marks'
import { height, width, innerHeight, innerWidth, margin } from './spacing'
import { DrawingLayer} from './components/DrawingLayer'


export const App = () => {
  const data = useData()

  if (!data) {
    return <pre>Loading...</pre>
  }

  const yValue = (d): number => d.temperature
  const xValue = (d): Date => d.time

  const xAxisTickFormat = timeFormat('%a')

  const yScale = scaleLinear()
    .domain(extent(data, yValue))
    .range([innerHeight, 0])
    .nice()

  const xScale = scaleTime()
    .domain(extent(data, xValue))
    .range([0, innerWidth])
    .nice()

  return (
    <>
      <svg width={width} height={height}>
        <g transform={`translate(${margin.left},${margin.top})`}>
          <AxisBottom xScale={xScale} tickFormat={xAxisTickFormat} />
          <AxisLeft yScale={yScale} />
          <Marks
            data={data}
            xScale={xScale}
            yScale={yScale}
            xValue={xValue}
            yValue={yValue}
            tooltipFormat={xAxisTickFormat}
          />
          <DrawingLayer />
        </g>
      </svg>
    </>
  )
}
