import { SectionLabel, Preferences } from '../types'
import { Result } from './algorithm/types'

export const sampleLabels2Flavor: SectionLabel[] = [
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

export const sample3PersonResults: Result = {
  solution: [
    {
      owner: 0,
      percentValues: [0.37777777777777777, 0.4074074074074074, 0.3481481481481481],
      edges: [
        [0, 0.08888888888888886],
        [0.6666666666666666, 1.3333333333333333],
      ],
    },
    {
      owner: 1,
      percentValues: [0.24444444444444446, 0.4074074074074074, 0.08148148148148147],
      edges: [
        [0.17777777777777773, 0.2666666666666666],
        [0.2666666666666666, 0.6666666666666666],
      ],
    },
    {
      owner: 2,
      percentValues: [0.3777777777777778, 0.18518518518518517, 0.5703703703703705],
      edges: [
        [0.08888888888888886, 0.17777777777777773],
        [1.3333333333333333, 2],
      ],
    },
  ],
  steps: [
    {
      actor: 0,
      action: 'divides the resource into thirds at 33.3% and 66.7%',
      pieces: [
        {
          start: 0,
          end: 0.6666666666666666,
          values: [3.333333333333333, 6.666666666666666, 1.3333333333333333],
          id: 1,
        },
        {
          start: 0.6666666666666666,
          end: 1.3333333333333333,
          values: [3.333333333333333, 4, 3.999999999999999],
          id: 2,
        },
        {
          start: 1.3333333333333333,
          end: 2,
          values: [3.333333333333334, 1.3333333333333335, 6.666666666666668],
          id: 3,
        },
      ],
      assign: false,
    },
    {
      actor: 1,
      action:
        'trims off part of piece 1 to make it the same value as piece 2. The trimmings are set aside',
      pieces: [
        {
          start: 0,
          end: 0.2666666666666666,
          values: [1.333333333333333, 2.666666666666666, 0.5333333333333332],
          note: 'trimming',
          id: 4,
        },
        {
          start: 0.2666666666666666,
          end: 0.6666666666666666,
          values: [1.333333333333333, 2.666666666666666, 0.5333333333333332],
          note: 'trimmed',
          id: 1,
        },
      ],
      assign: false,
    },
    {
      actor: 2,
      action: 'chooses piece 3',
      pieces: [
        {
          start: 1.3333333333333333,
          end: 2,
          values: [3.333333333333334, 1.3333333333333335, 6.666666666666668],
          id: 3,
        },
      ],
      assign: true,
    },
    {
      actor: 1,
      action: 'trimmed piece 1 earlier, because it still remains they must choose it',
      pieces: [
        {
          start: 0.2666666666666666,
          end: 0.6666666666666666,
          values: [2, 4, 0.8],
          note: 'trimmed',
          id: 1,
        },
      ],
      assign: true,
    },
    {
      actor: 0,
      action: 'chooses remaining piece',
      pieces: [
        {
          start: 0.6666666666666666,
          end: 1.3333333333333333,
          values: [3.333333333333333, 4, 3.999999999999999],
          id: 2,
        },
      ],
      assign: true,
    },
    {
      actor: 2,
      action: 'did not choose the trimmed piece earlier so gets to divide the trimmings',
      pieces: [
        {
          start: 0,
          end: 0.2666666666666666,
          values: [1.333333333333333, 2.666666666666666, 0.5333333333333332],
          note: 'trimming',
          id: 4,
        },
      ],
      assign: false,
    },
    {
      actor: 2,
      action: 'divides the trimmings into thirds at 4.44% and 8.89%',
      pieces: [
        {
          start: 0,
          end: 0.08888888888888886,
          values: [0.4444444444444443, 0.8888888888888886, 0.17777777777777773],
          note: 'trimming',
          id: 1,
        },
        {
          start: 0.08888888888888886,
          end: 0.17777777777777773,
          values: [0.4444444444444443, 0.8888888888888886, 0.17777777777777773],
          note: 'trimming',
          id: 2,
        },
        {
          start: 0.17777777777777773,
          end: 0.2666666666666666,
          values: [0.4444444444444444, 0.8888888888888888, 0.17777777777777776],
          note: 'trimming',
          id: 3,
        },
      ],
      assign: false,
    },
    {
      actor: 1,
      action: 'chooses trimming 3',
      pieces: [
        {
          start: 0.17777777777777773,
          end: 0.2666666666666666,
          values: [0.4444444444444444, 0.8888888888888888, 0.17777777777777776],
          note: 'trimming',
          id: 3,
        },
      ],
      assign: true,
    },
    {
      actor: 0,
      action: 'chooses trimming 1',
      pieces: [
        {
          start: 0,
          end: 0.08888888888888886,
          values: [0.4444444444444443, 0.8888888888888886, 0.17777777777777773],
          note: 'trimming',
          id: 1,
        },
      ],
      assign: true,
    },
    {
      actor: 2,
      action: 'chooses remaining trimming',
      pieces: [
        {
          start: 0.08888888888888886,
          end: 0.17777777777777773,
          values: [0.4444444444444443, 0.8888888888888886, 0.17777777777777773],
          note: 'trimming',
          id: 2,
        },
      ],
      assign: true,
    },
  ],
}
