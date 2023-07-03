
// Agent colors
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

// General colors
export const C_DARK_BG = '#333'

