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
  "solution": [
    {
      "owner": 0,
      "percentValues": [0.37777777777777777, 0.4074074074074074, 0.3481481481481481],
      "edges": [
        [0, 0.08888888888888886],
        [0.6666666666666666, 1.3333333333333333]
      ]
    },
    {
      "owner": 1,
      "percentValues": [0.24444444444444446, 0.4074074074074074, 0.08148148148148147],
      "edges": [
        [0.17777777777777773, 0.2666666666666666],
        [0.2666666666666666, 0.6666666666666666]
      ]
    },
    {
      "owner": 2,
      "percentValues": [0.3777777777777778, 0.18518518518518517, 0.5703703703703705],
      "edges": [
        [0.08888888888888886, 0.17777777777777773],
        [1.3333333333333333, 2]
      ]
    }
  ],
  "steps": [
    [
      0,
      "divides the resource into thirds at 33.3% and 66.7%",
      [
        {
          "start": 0,
          "end": 0.6666666666666666,
          "values": [3.333333333333333, 6.666666666666666, 1.3333333333333333],
          "id": 1
        },
        {
          "start": 0.6666666666666666,
          "end": 1.3333333333333333,
          "values": [3.333333333333333, 4, 3.999999999999999],
          "id": 2
        },
        {
          "start": 1.3333333333333333,
          "end": 2,
          "values": [3.333333333333334, 1.3333333333333335, 6.666666666666668],
          "id": 3
        }
      ]
    ],
    [
      1,
      "trims off part of piece 1 to make it the same value as piece 2",
      [
        {
          "start": 0,
          "end": 0.2666666666666666,
          "values": [1.333333333333333, 2.666666666666666, 0.5333333333333332],
          "note": "trimming",
          "id": 4
        }
      ]
    ],
    [
      2,
      "chooses piece 3",
      [
        {
          "start": 1.3333333333333333,
          "end": 2,
          "values": [3.333333333333334, 1.3333333333333335, 6.666666666666668],
          "id": 3
        }
      ]
    ],
    [
      1,
      "must choose the trimmed piece so takes piece 1",
      [
        {
          "start": 0.2666666666666666,
          "end": 0.6666666666666666,
          "values": [2, 4, 0.8],
          "note": "trimmed",
          "id": 1
        }
      ]
    ],
    [
      0,
      "chooses remaining piece",
      [
        {
          "start": 0.6666666666666666,
          "end": 1.3333333333333333,
          "values": [3.333333333333333, 4, 3.999999999999999],
          "id": 2
        }
      ]
    ],
    [
      2,
      "did not choose the trimmed piece earlier so gets to divide the trimmings",
      [
        {
          "start": 0,
          "end": 0.2666666666666666,
          "values": [1.333333333333333, 2.666666666666666, 0.5333333333333332],
          "note": "trimming",
          "id": 4
        }
      ]
    ],
    [
      2,
      "divides the trimmings into thirds at 4.44% and 8.89%",
      [
        {
          "start": 0,
          "end": 0.08888888888888886,
          "values": [0.4444444444444443, 0.8888888888888886, 0.17777777777777773],
          "note": "trimming",
          "id": 1
        },
        {
          "start": 0.08888888888888886,
          "end": 0.17777777777777773,
          "values": [0.4444444444444443, 0.8888888888888886, 0.17777777777777773],
          "note": "trimming",
          "id": 2
        },
        {
          "start": 0.17777777777777773,
          "end": 0.2666666666666666,
          "values": [0.4444444444444444, 0.8888888888888888, 0.17777777777777776],
          "note": "trimming",
          "id": 3
        }
      ]
    ],
    [
      1,
      "chooses trimming 3",
      [
        {
          "start": 0.17777777777777773,
          "end": 0.2666666666666666,
          "values": [0.4444444444444444, 0.8888888888888888, 0.17777777777777776],
          "note": "trimming",
          "id": 3
        }
      ]
    ],
    [
      0,
      "chooses trimming 1",
      [
        {
          "start": 0,
          "end": 0.08888888888888886,
          "values": [0.4444444444444443, 0.8888888888888886, 0.17777777777777773],
          "note": "trimming",
          "id": 1
        }
      ]
    ],
    [
      2,
      "chooses remaining trimming",
      [
        {
          "start": 0.08888888888888886,
          "end": 0.17777777777777773,
          "values": [0.4444444444444443, 0.8888888888888886, 0.17777777777777773],
          "note": "trimming",
          "id": 2
        }
      ]
    ]
  ]
}
