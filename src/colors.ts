/**
 * There are a LOT of colors here. 
 * Agents, labels, and generally UI all need to have distinct colors, 
 * but some may be too similar or clash.
 */

// Agent colors
const C_GREEN = '#A1DE93'
const C_YELLOW = '#e9e661'
const C_LIGHT_BLUE = '#2497cc'
const C_PINK = '#E8A2CF'
const C_BLUE = '#0d77b0'
const C_RED = '#F47C7C'
const C_LIGHT_PURPLE = '#bc8fea'
const C_GRAY = '#676768'
const C_ORANGE = '#676768'
const agentColors = [
  C_GREEN,
  C_YELLOW,
  C_RED,
  C_BLUE,
  C_PINK,
  C_GRAY,
  C_ORANGE,
  C_LIGHT_BLUE,
  C_LIGHT_PURPLE,
]
export const getAgentColor = (agent: number) => agentColors[agent] ?? ''

// Label colors
export const C_STRAWBERRY = '#F2CADF'
export const C_VANILLA = '#F2F1A1'
export const C_CHOCOLATE = '#A57C52'
export const C_AVACADO = '#3a5a40'
export const C_LAVENDER = '#967aa1'
export const C_CARROT = '#ffa200'
export const C_RED_VELVET = '#bc4749'
export const labelColors = [
  C_STRAWBERRY,
  C_VANILLA,
  C_CHOCOLATE,
  C_AVACADO,
  C_LAVENDER,
  C_CARROT,
  C_RED_VELVET,
]

// General colors
export const C_DARK_BG = '#333'
export const C_SUCCESS = '#8bc34a'

export const C_PRIMARY = '#0d77b0'
export const C_PRIMARY_LIGHT = '#8ECAE6'
export const C_PRIMARY_DARK = '#02405f'

export const C_SECONDARY = '#FFB703'
export const C_SECONDARY_LIGHT = '#ffde8b'
export const C_SECONDARY_DARK = '#FB8500'
