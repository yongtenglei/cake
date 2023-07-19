import DownloadIcon from '@mui/icons-material/GetApp'
import MoreHorizIcon from '@mui/icons-material/MoreHoriz'
import ExportImageIcon from '@mui/icons-material/Panorama'
import UploadIcon from '@mui/icons-material/Publish'
import HelpIcon from '@mui/icons-material/HelpOutline'
import { IconButton, ListItemIcon, Menu, MenuItem } from '@mui/material'
import { useState } from 'react'
import { LoadingModal } from '../../../components/LoadingModal'
import { UpdateDataInput } from '../../../components/UploadDataInput'
import { Preferences } from '../../../types'
import { downloadScreenshot, downloadValueData } from '../../../utils/export'
import { Link } from '../../../components/Link'

interface ExtraOptionsProps {
  uploadInput: (pref: Preferences) => void
  preferences: Preferences
}

export const ExtraOptions = ({ uploadInput, preferences }: ExtraOptionsProps) => {
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
    await downloadScreenshot('graph-content')
    setLoading(false)
  }
  const onClickDownloadData = () => {
    handleClose()
    downloadValueData(preferences)
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
          <UpdateDataInput
            onUpload={(newData) => {
              handleClose()
              uploadInput(newData)
            }}
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
        <MenuItem href="/help" component={Link} forceNewTab>
          <ListItemIcon>
            <HelpIcon fontSize="small" />
          </ListItemIcon>
          Help
        </MenuItem>
      </Menu>
    </div>
  )
}
