import { useState } from 'react'
import {
  Radio,
  RadioGroup,
  FormControlLabel,
  FormLabel,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  DialogContentText,
  Button,
  CircularProgress,
  Box,
} from '@mui/material'
import { Algorithms, Algorithm, AlgoName } from '../graphConstants'
import { AlgoExplanationModal } from './AlgoExplanationModal'

interface SelectAlgoModalProps {
  open: boolean
  onCancel: VoidFunction
  onConfirm: (algo: string) => void
  totalAgents: number
}

export const SelectAlgoModal = ({
  open,
  onCancel,
  onConfirm,
  totalAgents,
}: SelectAlgoModalProps) => {
  const [algoExplainOpen, setAlgoExplainOpen] = useState(false)
  const [running, setIsRunning] = useState(false)
  return (
    <>
      <Dialog open={open} onClose={onCancel}>
        <SelectAlgoModalGuts
          totalAgents={totalAgents}
          onCancel={onCancel}
          onConfirm={(algo: AlgoName) => {
            setIsRunning(true)
            onConfirm(algo)
          }}
          openAlgoExplainModal={() => setAlgoExplainOpen(true)}
        />
      </Dialog>

      <AlgoExplanationModal
        open={algoExplainOpen}
        onClose={() => setAlgoExplainOpen(false)}
      />
    </>
  )
}

interface SelectAlgoModalGutsProps {
  onCancel: VoidFunction
  onConfirm: (algo: string) => void
  totalAgents: number
  openAlgoExplainModal: VoidFunction
}

// separate wrapper from guts so "best algo" func only runs when it first opens
const SelectAlgoModalGuts = ({
  totalAgents,
  onCancel,
  onConfirm,
  openAlgoExplainModal,
}: SelectAlgoModalGutsProps) => {
  const algoIsSelectable = (algo: Algorithm) =>
    totalAgents >= algo.minAgents && totalAgents <= algo.maxAgents

  const bestOption =
    Object.values(Algorithms).find(algoIsSelectable)?.key ??
    Algorithms.divideAndChoose.key

  const [selectedAlgo, setSelectedAlgo] = useState<AlgoName>(bestOption)

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault()
        onConfirm(selectedAlgo)
      }}
    >
      <DialogTitle>Select Method</DialogTitle>
      <DialogContent>
        <DialogContentText>
          Select which method to use to divide the resource between people.
        </DialogContentText>

        <br />
        <FormLabel id="algo-select">Method: </FormLabel>
        <RadioGroup aria-labelledby="algo-select" name="radio-buttons-group">
          {Object.values(Algorithms).map((algo) => (
            <FormControlLabel
              key={algo.key}
              value={algo.key}
              control={
                <Radio
                  onChange={(e) => setSelectedAlgo(e.target.value as AlgoName)}
                />
              }
              label={algo.name}
              checked={algo.key === selectedAlgo}
              disabled={!algoIsSelectable(algo)}
              // algo.numAgentsText
            />
          ))}
        </RadioGroup>
        <DialogContentText>
          <Button onClick={openAlgoExplainModal}>What do these mean?</Button>
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={onCancel}>Cancel</Button>
        <Button type="submit" variant="contained">
          Solve
        </Button>
      </DialogActions>
    </form>
  )
}
