import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  FormControlLabel,
  FormLabel,
  Radio,
  RadioGroup
} from '@mui/material'
import { useState } from 'react'
import { AlgoName, Algorithm, Algorithms } from '../algorithm/types'
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
  return (
    <>
      <Dialog open={open} onClose={onCancel} maxWidth={'sm'} fullWidth>
        <SelectAlgoModalGuts
          totalAgents={totalAgents}
          onCancel={onCancel}
          onConfirm={(algo: AlgoName) => {
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
    Object.values(Algorithms).find(algoIsSelectable)?.key ?? Algorithms.cutAndChoose.key

  const [selectedAlgo, setSelectedAlgo] = useState<AlgoName>(bestOption)

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault()
        onConfirm(selectedAlgo)
      }}
    >
      <DialogTitle>Select how to divide the resource</DialogTitle>
      <DialogContent>
        <FormLabel id="algo-select">Method: </FormLabel>
        <RadioGroup aria-labelledby="algo-select" name="radio-buttons-group">
          {Object.values(Algorithms).map((algo) => (
            <FormControlLabel
              key={algo.key}
              value={algo.key}
              control={
                <Radio onChange={(e) => setSelectedAlgo(e.target.value as AlgoName)} />
              }
              label={algo.name + ' - ' + algo.numAgentsText}
              checked={algo.key === selectedAlgo}
              disabled={!algoIsSelectable(algo)}
            />
          ))}
        </RadioGroup>
        <DialogContentText>
          <Button onClick={openAlgoExplainModal}>What do these mean?</Button>
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={onCancel}>Cancel</Button>
        <Button type="submit" variant="contained" autoFocus>
          Find Solution
        </Button>
      </DialogActions>
    </form>
  )
}
