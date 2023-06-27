import { Segment } from '../../types'

// Simple start/end test, could be modified to check for continuity if needed
export const validateSegments = (preferences: Segment[][], cakeSize: number) => {
  preferences.forEach((segs, i) => {
    const hasEnd = segs.some((seg) => seg.end === cakeSize)
    const hasBeginning = segs.some((seg) => seg.start === 0)
    if(!hasEnd) {
      throw `Agent ${i+1} has no ending segment in their value function`
    }
    if(!hasBeginning) {
      throw `Agent ${i+1} has no starting segment in their value function`
    }
  })
}