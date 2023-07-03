import { useState } from 'react'
import MoreHorizIcon from '@mui/icons-material/MoreHoriz'
import DownloadIcon from '@mui/icons-material/GetApp'
import UploadIcon from '@mui/icons-material/Publish'
import ExportImageIcon from '@mui/icons-material/Panorama'
import { IconButton, Menu, MenuItem, ListItemIcon, Box } from '@mui/material'
import {
  downloadScreenshot,
  downloadValueData,
  uploadValueData,
} from '../../../utils/export'
import { LoadingModal } from '../../../components/LoadingModal'
import { Preferences } from '../../../types'

interface ExtraOptionsProps {
  setNewData: (pref: Preferences) => void
  preferences: Preferences
}

export const ExtraOptions = ({
  setNewData,
  preferences,
}: ExtraOptionsProps) => {
  const [loading, setLoading] = useState<boolean>(false)
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)
  const open = Boolean(anchorEl)
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget)
  }
  const handleClose = () => setAnchorEl(null)

  const onClickExportImage = async () => {
    handleClose()
    setLoading(true)
    await downloadScreenshot()
    setLoading(false)
  }
  const onClickDownloadData = () => {
    handleClose()
    downloadValueData(preferences)
  }

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    handleClose()
    if (e.target.files) {
      console.log(e.target.files[0])
      try {
        setNewData(await uploadValueData(e.target.files[0]))
      } catch (e) {
        alert(
          'There was a problem with that file. Please check and try again.\n' +
            e.message
        )
      }
    }
  }

  return (
    <div>
      <LoadingModal open={loading} title="Exporting Image" />
      <IconButton
        aria-label="delete"
        id="options-menu-button"
        aria-controls={open ? 'options-menu' : undefined}
        aria-haspopup="true"
        aria-expanded={open ? 'true' : undefined}
        onClick={handleClick}
      >
        <MoreHorizIcon />
      </IconButton>
      <Menu
        id="options-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          'aria-labelledby': 'options-menu-button',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'center',
        }}
      >
        <MenuItem component="label" htmlFor="uploadFile">
          <Box
            component="input"
            id="uploadFile"
            type="file"
            onChange={handleFileChange}
            accept=".csv"
            // @ts-ignore
            onClick={(event) => (event.target.value = null)}
            sx={{ display: 'none' }}
          />
          <ListItemIcon>
            <UploadIcon fontSize="small" />
          </ListItemIcon>
          Upload Inputs
        </MenuItem>
        <MenuItem onClick={onClickDownloadData}>
          <ListItemIcon>
            <DownloadIcon fontSize="small" />
          </ListItemIcon>
          Download Inputs
        </MenuItem>
        <MenuItem onClick={onClickExportImage}>
          <ListItemIcon>
            <ExportImageIcon fontSize="small" />
          </ListItemIcon>
          Export Image
        </MenuItem>
      </Menu>
    </div>
  )
}
