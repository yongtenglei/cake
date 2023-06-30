import { useState } from 'react'
import MoreHorizIcon from '@mui/icons-material/MoreHoriz'
import DownloadIcon from '@mui/icons-material/GetApp'
import UploadIcon from '@mui/icons-material/Publish'
import ExportImageIcon from '@mui/icons-material/Panorama'
import { IconButton, Menu, MenuItem, ListItemIcon } from '@mui/material'
import { downloadScreenshot } from '../../../utils/export'
import { LoadingModal } from '../../../components/LoadingModal'

export const ExtraOptions = () => {
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
        <MenuItem onClick={handleClose}>
          <ListItemIcon>
            <UploadIcon fontSize="small" />
          </ListItemIcon>
          Upload
        </MenuItem>
        <MenuItem onClick={handleClose}>
          <ListItemIcon>
            <DownloadIcon fontSize="small" />
          </ListItemIcon>
          Download
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
