import React, { useContext } from 'react'
import { Division } from "../types"
import { height, width, margin, innerHeight, innerWidth, getAgentColor } from './constants'
import { GraphContext } from './GraphContext'

interface CakeSliceResultsProps {
  results: Division[]
}

export const CakeSliceResults = ({results}: CakeSliceResultsProps) => {
  const { yScale, currentAgent } = useContext(GraphContext)

  return (
  null
  )
}