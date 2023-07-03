import { Preferences, Division } from '../../types'
import { getValueForInterval } from './getValue'
import { defaultCakeSize } from '../graphConstants'

export const selfridgeConway = (preferences: Preferences, cakeSize = defaultCakeSize): Promise<Division[]> => {
  if (preferences.length !== 3) {
    throw 'Divide and choose only works with three agents'
  }

  // P1 divides
  // P2 if two largest are equal, pick slickes P3 then P2 then P1 DONE

  // ELSE
  // P2 trims so the two largest slices are equal, trimmings set aside
  // P3 takes a slice 
  //  - if trimmed piece, set `choseTrimmed` to `true` else `false`
  // P2 takes a slice 
  //  - must be trimmed piece if available, 
  //  - if trimmed piece, set `choseTrimmed` to `true` else `false`
  // P1 takes a slice
  //  - note, `choseTrimmed` is not set for this person

  // `choseTrimmed=false` person cuts trimming into three pieces
  // `choseTrimmed=true`  person takes a slice
  // P1 takes a slice
  // `choseTrimmed=false` person takes a slice
  throw 'not implemented'
}