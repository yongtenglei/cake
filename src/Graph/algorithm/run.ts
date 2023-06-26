import { AlgoName } from '../constants'
import { Segment, Division } from '../../types'
import { divideAndChoose } from './divideAndChoose'
import { selfridgeConway } from './selfridgeConway'

export const runDivisionAlgorithm = (
  preferences: Segment[][],
  algo: AlgoName
): Division[] => {
  switch (algo) {
    case 'divideAndChoose':
      return divideAndChoose(preferences)
    case 'selfridgeConway':
      return selfridgeConway(preferences)
    default:
      throw new Error(`Algorithm not implemented: ${algo}`)
  }
}
