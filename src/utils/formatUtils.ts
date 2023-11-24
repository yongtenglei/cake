import { Preferences, Portion } from '../types'

export const makePercentage = (num: number, precision = 8): string =>
  formatNumber(num * 100, precision) + '%'

export const formatNumber = (num: number, precision = 8): string => {
  num = isNaN(num) || !isFinite(num) ? 0 : num
  const numLength = String(num).match(/\d/g).length
  return numLength < precision ? String(num) : num.toPrecision(precision)
}

export const getOrdinalEnding = (num: number) => {
  switch (num % 10) {
    case 1:
      return 'st'
    case 2:
      return 'nd'
    case 3:
      return 'rd'
    default:
      return 'th'
  }
}

// stub data for prototyping quickly
const testPreferences: Preferences = [
  [
    {
      start: 0,
      startValue: 6.5,
      end: 47,
      endValue: 6.5,
      id: 1,
    },
    {
      start: 47,
      startValue: 8.4,
      end: 100,
      endValue: 8.4,
      id: 2,
    },
  ],
  [
    {
      start: 0,
      startValue: 4.6,
      end: 41,
      endValue: 4.6,
      id: 3,
    },
    {
      start: 41,
      startValue: 7.1,
      end: 100,
      endValue: 7.1,
      id: 4,
    },
  ],
]

const testPreferences2: Preferences = [
  [
    {
      start: 0,
      startValue: 8.8,
      end: 2,
      endValue: 8.8,
      id: 1,
    },
    {
      start: 2,
      startValue: 7.1,
      end: 3,
      endValue: 7.1,
      id: 2,
    },
  ],
  [
    {
      start: 0,
      startValue: 4.5,
      end: 2,
      endValue: 4.5,
      id: 3,
    },
    {
      start: 2,
      startValue: 8.6,
      end: 3,
      endValue: 8.6,
      id: 4,
    },
  ],
  [
    {
      start: 0,
      startValue: 3.1,
      end: 1,
      endValue: 3.1,
      id: 1,
    },
    {
      start: 1,
      startValue: 7.9,
      end: 2,
      endValue: 7.9,
      id: 2,
    },
    {
      start: 2,
      startValue: 2.3,
      end: 3,
      endValue: 2.3,
      id: 3,
    },
  ],
]
const testResults: Portion[] = [
  {
    owner: 0,
    percentValues: [0.40170573291170686, 0.3427328965249336, 0.2729967316105627],
    edges: [
      [0, 0.9356060606060607],
      [1.9636776582427158, 2.1928396707213698],
    ],
  },
  {
    owner: 1,
    percentValues: [0.2320177464728046, 0.39440788817023975, 0.13958411709329693],
    edges: [
      [2.510438689217759, 3],
      [2.1928396707213698, 2.510438689217759],
    ],
  },
  {
    owner: 2,
    percentValues: [0.36627652061548843, 0.2628592153048266, 0.5874191512961403],
    edges: [
      [0.9356060606060607, 1.8712121212121213],
      [1.8712121212121213, 1.9636776582427158],
    ],
  },
]
