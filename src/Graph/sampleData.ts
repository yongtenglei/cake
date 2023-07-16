import { SectionLabel, Preferences } from '../types'

const sampleLabels2Flavor: SectionLabel[] = [
  {
    id: 0,
    name: 'vanilla',
    color: '#F2F1A1',
    start: 0,
    end: 1,
  },
  {
    id: 1,
    name: 'chocolate',
    color: '#A57C52',
    start: 1,
    end: 2,
  },
]

export const sampleLabels3Flavor: SectionLabel[] = [
  {
    name: 'Strawberry',
    start: 0,
    end: 1,
    color: '#F2CADF',
    id: 1,
  },
  {
    name: 'Vanilla',
    start: 1,
    end: 2,
    color: '#F2F1A1',
    id: 2,
  },
  {
    name: 'Chocolate',
    start: 2,
    end: 3,
    color: '#A57C52',
    id: 3,
  },
]

export const samplePrefs2Flavor2People: Preferences = [
  [
    {
      start: 0,
      startValue: 5,
      end: 1,
      endValue: 5,
      id: 5,
    },
    {
      start: 1,
      startValue: 0.000001,
      end: 2,
      endValue: 0.000001,
      id: 6,
    },
  ],
  [
    {
      start: 0,
      startValue: 0.000001,
      end: 1,
      endValue: 0.000001,
      id: 7,
    },
    {
      start: 1,
      startValue: 5,
      end: 2,
      endValue: 5,
      id: 8,
    },
  ],
  [
    {
      start: 0,
      startValue: 5,
      end: 2,
      endValue: 5,
      id: 9,
    },
  ],
]
