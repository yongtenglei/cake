import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  DialogContentText,
  Button,
  CircularProgress,
  Box,
} from '@mui/material'

interface LoadingModalProps {
  title?: string
  open: boolean
}

export const LoadingModal = ({open, title = 'Loading'}: LoadingModalProps) => {
  return (
    <Dialog open={open}>
      <DialogTitle>{title}</DialogTitle>
      <DialogContent>
        <Box margin={4} textAlign={'center'} minWidth={200}>
          <CircularProgress size={100} />
        </Box>
      </DialogContent>
    </Dialog>
  )
}
