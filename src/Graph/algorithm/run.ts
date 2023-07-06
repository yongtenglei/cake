import { AlgoName } from '../graphConstants'
import { Preferences, Slice } from '../../types'
import { validateSegments } from './validation'
import { cutAndChoose } from './cutAndChoose'
import { selfridgeConway } from './selfridgeConway'

export const runDivisionAlgorithm = (
  preferences: Preferences,
  algo: AlgoName,
  cakeSize
): Promise<Slice[]> => {
  console.log(`Running ${algo}...`)
  console.log('Cake size:', cakeSize)
  console.log('Preferences:', preferences)
  // simple error checking
  validateSegments(preferences, cakeSize)

  // do we need to do other checks? number munging?

  let result = null
  // run fair division method
  switch (algo) {
    case 'cutAndChoose':
      result = cutAndChoose(preferences, cakeSize)
      break
    case 'selfridgeConway':
      result = selfridgeConway(preferences, cakeSize)
      break
    default:
      throw new Error(`Algorithm not implemented: ${algo}`)
  }
  console.log('Results:', result)
  return result
}
