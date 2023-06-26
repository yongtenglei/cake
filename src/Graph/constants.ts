export const MAX_AGENTS = 3

// Same as the Material UI default theme colors
export const C_PRIMARY = '#42a5f5'
export const C_SECONDARY = '#ba68c8'
export const C_ERROR = '#ef5350'
export const C_WARNING = '#ff9800'
export const C_SUCCESS = '#4caf50'
const agentColors = [C_PRIMARY, C_SUCCESS, C_SECONDARY]
export const getAgentColor = (agent: number) => agentColors[agent - 1] ?? ''

// Spacing
export const width = 960
export const height = 500
// Unfortunately, the graph code draws things inside its own margin,
// so `bottom` and `left` are larger to accomodate
export const margin = { top: 20, right: 15, bottom: 120, left: 100 }
export const xAxisLabelOffset = 118
export const yAxisLabelOffset = 50
export const innerHeight = height - margin.top - margin.bottom
export const innerWidth = width - margin.left - margin.right
export const tickOffset = 7
export const defaultCakeSize = 100


// Algorithms
export type AlgoName = 'divideAndChoose' | 'selfridgeConway'

export interface Algorithm {
  key: AlgoName
  name: string
  numAgentsText: string
  minAgents: number
  maxAgents: number
  shortDescription: string
  link: string
}

export const Algorithms: Record<AlgoName, Algorithm> = {
  divideAndChoose: {
    key: 'divideAndChoose',
    name: 'Divide and Choose',
    numAgentsText: '2 people',
    minAgents: 2,
    maxAgents: 2,
    shortDescription: 'A simple method for envy-free division between two people. One divides, the other chooses.',
    link: 'https://en.wikipedia.org/wiki/Divide_and_choose',
  },
  selfridgeConway: {
    key: 'selfridgeConway',
    name: 'Selfridge Conway',
    numAgentsText: '3 people',
    minAgents: 3,
    maxAgents: 3,
    shortDescription: 'A method for envy-free division between three people. Maximum of five cucts.',
    link: 'https://en.wikipedia.org/wiki/Selfridge%E2%80%93Conway_procedure',
  },
}
