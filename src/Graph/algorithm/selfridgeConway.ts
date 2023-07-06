import { Preferences, Slice } from '../../types'
import { getValueForInterval, getTotalValue, cutSlice, findCutLine } from './getValue'
import { defaultCakeSize } from '../graphConstants'

export const selfridgeConway = (preferences: Preferences, cakeSize = defaultCakeSize): Promise<Slice[]> => {
  if (preferences.length !== 3) {
    throw 'Divide and choose only works with three agents'
  }

  const [p1Prefs, p2Prefs, p3Prefs] = preferences
  // P1 divides
  const firstCut = findCutLine(p1Prefs, 1/3)
  const secondCut = findCutLine(p1Prefs, 2/3)
  const p2s1 = getValueForInterval(p2Prefs, 0, firstCut)
  const p2s2 = getValueForInterval(p2Prefs, firstCut, secondCut)
  const p2s3 = getValueForInterval(p2Prefs, secondCut, cakeSize)
  // P2 if two largest are equal, pick slices P3 then P2 then P1 DONE


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