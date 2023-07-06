
// Agent colors
export const C_GREEN = '#A1DE93'
export const C_YELLOW = '#e9e661'
export const C_LIGHT_BLUE = '#2497cc'
export const C_PINK = '#E8A2CF'
export const C_BLUE = '#0d77b0'
export const C_RED = '#F47C7C'
export const C_LIGHT_PURPLE = '#bc8fea'
export const C_GRAY = '#676768'
export const C_ORANGE = '#676768'
const agentColors = [C_GREEN, C_YELLOW, C_RED, C_BLUE,  C_PINK, C_GRAY,  C_ORANGE,  C_LIGHT_BLUE,  C_LIGHT_PURPLE,]
export const getAgentColor = (agent: number) => agentColors[agent] ?? ''

// General colors
export const C_DARK_BG = '#333'

