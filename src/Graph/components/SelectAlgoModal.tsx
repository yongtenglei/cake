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
} from '@mui/material'
import { Algorithms, AlgoName } from '../constants'
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
  const bestOption = Algorithms.divideAndChoose.key
  const [selectedAlgo, setSelectedAlgo] = useState<AlgoName>(bestOption)
  const [algoExplainOpen, setAlgoExplainOpen] = useState(false)

  return (
    <>
      <Dialog open={open} onClose={onCancel}>
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
            <RadioGroup
              aria-labelledby="algo-select"
              name="radio-buttons-group"
            >
              {Object.values(Algorithms).map((algo) => (
                <FormControlLabel
                  key={algo.key}
                  value={algo.key}
                  control={
                    <Radio
                      onChange={(e) =>
                        setSelectedAlgo(e.target.value as AlgoName)
                      }
                    />
                  }
                  label={algo.name}
                  checked={algo.key === selectedAlgo}
                  disabled={
                    totalAgents < algo.minAgents || totalAgents > algo.maxAgents
                  }
                  // algo.numAgentsText
                />
              ))}
            </RadioGroup>
            <DialogContentText>
              <Button onClick={() => setAlgoExplainOpen(true)}>
                What do these mean?
              </Button>
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={onCancel}>Cancel</Button>
            <Button type="submit" variant="contained">
              Solve
            </Button>
          </DialogActions>
        </form>
      </Dialog>

      <AlgoExplanationModal
        open={algoExplainOpen}
        onClose={() => setAlgoExplainOpen(false)}
      />
    </>
  )
}
