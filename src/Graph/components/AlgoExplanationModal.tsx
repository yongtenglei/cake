import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  DialogContentText,
  Button,
} from '@mui/material'
import { Algorithms } from '../algorithm/types'
import { Link } from '../../components/Link'

export const AlgoExplanationModal = ({ open, onClose }) => {
  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Method Explanation</DialogTitle>
      <DialogContent>
        <DialogContentText component="div">
          <p>
            Since the 1940s researchers have developed hundreds of methods for dividing
            resources fairly. Only a few of these are implemented here.
          </p>
          <p>
            Each implementation has trade offs, such as only working for a set certain of
            participants.
          </p>
          {Object.values(Algorithms).map((algo) => (
            <div key={algo.key}>
              <h3>{algo.name}</h3>
              <p>{algo.shortDescription}</p>

              <Link href={algo.link} forceNewTab>Learn about this method</Link>
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
