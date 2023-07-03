import html2canvas from 'html2canvas'
import { csvParse, autoType } from 'd3'
import { Segment, Preferences } from '../types'

// Using strict types for the CSV headers so any change to `Segment` will
// cause a type error unless it's updated here as well
type Fields = keyof Segment
type SegmentWithExtraFields = Segment & { [personField]: number }

const personField = 'person'
const SegmentFields: Fields[] = ['start', 'end', 'startValue', 'endValue']
const SerializedSegmentFields = [...SegmentFields, personField]
const CSV_HEADER_FIELDS = SerializedSegmentFields.join(',')

/*
 * Helpers
 */
const convertPreferencesToCsv = (preferences: Preferences) => {
  const data = [CSV_HEADER_FIELDS]
  // Can't use the d3 csv format method here because we need to flatted the data 
  // and save the index in the `person` column
  preferences.forEach((pref, personIndex) => {
    pref.forEach((seg) => {
      const prefData = SegmentFields.map((field) => seg[field])
      prefData.push(personIndex + 1) // people are 1-indexed
      data.push(prefData.join(','))
    })
  })
  return data.join('\n')
}

const validateSegment = (
  obj: object,
  i: number
): obj is SegmentWithExtraFields => {
  for (let field of SerializedSegmentFields) {
    if (obj[field] === null) {
      throw new Error(`Data in line ${i + 2} column "${field}" is missing`) // i + 2 to account for header row and 1vs0 indexing
    }
    if (typeof obj[field] !== 'number') {
      throw new Error(
        `Data in line ${i + 2} column "${field}" is not recognizable`
      )
    }
  }
  return true
}

/*
 * Upload/download functions 
 */
export const downloadValueData = (preferences: Preferences) => {
  const saveLink = document.createElement('a')
  saveLink.download = 'cake division input.csv'
  const strData =
    'data:text/csv;charset=utf-8,' + convertPreferencesToCsv(preferences)
  saveLink.href = strData
  saveLink.click()
}

export const uploadValueData = async (file: File): Promise<Preferences> => {
  const contents = await file.text()
  // d3's utils for parsing CSV strings to objects and inferring type info.
  const parsed = csvParse(contents, autoType)

  const results = parsed.reduce<Preferences>((acc, data, i) => {
    // Error check for missing fields or incorrect data types
    if (validateSegment(data, i)) {
      const person = data.person
      delete data.person

      if (!acc[person - 1]) {
        acc[person - 1] = []
      }
      acc[person - 1].push(data)
      return acc
    }
  }, [])
  console.log('Uploaded data', results)
  return results.length ? results : [[]]
}

export const downloadScreenshot = async (selector = 'main') => {
  const canvas = await html2canvas(document.querySelector(selector))

  var strData = canvas
    .toDataURL('image/png')
    .replace('image/png', 'image/octet-stream')
  const saveLink = document.createElement('a')
  saveLink.download = 'cake division.png'
  saveLink.href = strData
  saveLink.click()
}

