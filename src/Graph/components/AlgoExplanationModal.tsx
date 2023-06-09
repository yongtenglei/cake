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
import { Algorithms } from '../constants'
import { Link } from '../../components/Link'

export const AlgoExplanationModal = ({ open, onClose }) => {
  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Method Explanation</DialogTitle>
      <DialogContent>
        <DialogContentText component="div">
          <p>
            Since the 1940s people have developed over a hundred methods for
            dividing resources fairly. Only a few of these are implemented here.
          </p>
          <p>
            Each implementation has certain trade offs, such as only working for
            a set certain of participants.
          </p>
          {Object.values(Algorithms).map((algo) => (
            <div key={algo.key}>
              <h3>{algo.name}</h3>
              <p>
                <Link href={algo.link}>Learn about this method</Link>
              </p>
            </div>
          ))}
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Close</Button>
      </DialogActions>
    </Dialog>
  )
}
