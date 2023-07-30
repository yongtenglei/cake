export const maxAgents = 3
export const defaultCakeSize = 100

// Spacing

// Graph sizes and margin are used too widely and in things besides graphs, not good.
export const defaultGraphWidth = 940
export const defaultGraphHeight = 420
// Unfortunately, the graph svg needs margin for labels and drawing things
// a bit outside the normal graph area. We have to calculate for this in many places.
// `left` is large to allow for the y-axis label.
// `top` is large to allow for section labels.
export const margin = { top: 40, right: 18, bottom: 19, left: 60 }
export const yAxisLabelOffset = 30
export const getInnerHeight = (height: number) => height - margin.top - margin.bottom
export const getInnerWidth = (width: number) => width - margin.left - margin.right

export const tickOffset = 7
