import { Box } from '@mui/material'
import { uploadValueData } from '../utils/export'
import { Preferences } from '../types'

interface UpdateDataButtonProps {
  onUpload: (pref: Preferences) => void
}

export const UpdateDataInput = ({ onUpload }: UpdateDataButtonProps) => {
  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      console.log(e.target.files[0])
      try {
        onUpload(await uploadValueData(e.target.files[0]))
      } catch (e) {
        alert(
          'There was a problem with that file. Please check and try again.\n' + e.message
        )
      }
    }
  }

  return (
    <Box
      component="input"
      id="uploadFile"
      type="file"
      onChange={handleFileChange}
      accept=".csv"
      // @ts-ignore. This fixes weird UX where selecting the same file a second time does nothing
      onClick={(event) => (event.target.value = null)}
      display="none"
    />
  )
}
