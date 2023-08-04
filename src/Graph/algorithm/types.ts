import { Portion, Slice } from "../../types";

export type AlgoName = 'cutAndChoose' | 'selfridgeConway';

export interface Algorithm {
  key: AlgoName
  name: string
  numAgentsText: string
  minAgents: number
  maxAgents: number
  shortDescription: string
  link: string
}

export type Result = { solution: Portion[], steps: Step[]}

// The form of a step is [agent number (0-indexed), action taken]
export type Step  = [number, string] | [number, string, Slice[]] | [number, string, Slice[], boolean]

export const Algorithms: Record<AlgoName, Algorithm> = {
  cutAndChoose: {
    key: 'cutAndChoose',
    name: 'Cut and Choose',
    numAgentsText: '2 people',
    minAgents: 2,
    maxAgents: 2,
    shortDescription:
      'A simple method for envy-free division between two people. One divides, the other chooses.',
    link: 'https://en.wikipedia.org/wiki/Divide_and_choose',
  },
  selfridgeConway: {
    key: 'selfridgeConway',
    name: 'Selfridge-Conway',
    numAgentsText: '3 people',
    minAgents: 3,
    maxAgents: 3,
    shortDescription:
      'A method for envy-free division between three people. Maximum of five cucts.',
    link: 'https://en.wikipedia.org/wiki/Selfridge%E2%80%93Conway_procedure',
  },
}
