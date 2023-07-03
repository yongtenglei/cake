import { AlgoName } from '../graphConstants'
import { Preferences, Division } from '../../types'
import {  validateSegments } from './validation'
import { divideAndChoose } from './divideAndChoose'
import { selfridgeConway } from './selfridgeConway'

export const runDivisionAlgorithm = (
  preferences: Preferences,
  algo: AlgoName,
  cakeSize,
): Promise<Division[]> => {
  
  console.log(`Running ${algo}...`)
  console.log('Cake size:', cakeSize)
  console.log('Preferences:', preferences)
  // simple error checking
  validateSegments(preferences, cakeSize)


  // do we need to do other checks or number munging here?

  // run fair division method
  switch (algo) {
    case 'divideAndChoose':
      return divideAndChoose(preferences, cakeSize)
    case 'selfridgeConway':
      return selfridgeConway(preferences, cakeSize)
    default:
      throw new Error(`Algorithm not implemented: ${algo}`)
  }
}
