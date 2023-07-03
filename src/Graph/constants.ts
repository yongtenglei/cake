export const MAX_AGENTS = 3

export const C_GREEN = '#A1DE93'
export const C_YELLOW = '#F7F48B'
export const C_LIGHT_BLUE = '#2497cc'
export const C_PINK = '#E8A2CF'
export const C_PURPLE = '#8575BF'
export const C_RED = '#F47C7C'
export const C_DARKER_BLUE = '#6f7099'
export const C_GRAY = '#676768'
export const C_ORANGE = '#676768'
const agentColors = [C_GREEN,  C_LIGHT_BLUE, C_RED, C_YELLOW,  C_DARKER_BLUE, C_PINK, C_GRAY, C_PURPLE, C_ORANGE]
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
