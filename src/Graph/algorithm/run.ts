import { AlgoName } from '../graphConstants'
import { Preferences, Division } from '../../types'
import {  validateSegments } from './validation'
import { cutAndChoose } from './cutAndChoose'
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
    case 'cutAndChoose':
      return cutAndChoose(preferences, cakeSize)
    case 'selfridgeConway':
      return selfridgeConway(preferences, cakeSize)
    default:
      throw new Error(`Algorithm not implemented: ${algo}`)
  }
}
