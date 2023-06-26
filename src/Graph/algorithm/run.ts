import { AlgoName, defaultCakeSize } from '../constants'
import { Segment, Division } from '../../types'
import { divideAndChoose } from './divideAndChoose'
import { selfridgeConway } from './selfridgeConway'

export const runDivisionAlgorithm = (
  preferences: Segment[][],
  algo: AlgoName,
  cakeSize,
): Division[] => {
  switch (algo) {
    case 'divideAndChoose':
      return divideAndChoose(preferences, cakeSize)
    case 'selfridgeConway':
      return selfridgeConway(preferences, cakeSize)
    default:
      throw new Error(`Algorithm not implemented: ${algo}`)
  }
}
