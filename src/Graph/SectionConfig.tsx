import AddCircleIcon from '@mui/icons-material/AddCircle'
import RemoveIcon from '@mui/icons-material/Remove'
import { Box, Button, FormControlLabel, Stack, Switch, TextField } from '@mui/material'
import { MuiColorInput } from 'mui-color-input'
import { useState } from 'react'

import { InteractionContainer } from '../Layouts'
import { labelColors } from '../colors'
import { MenuButton } from '../components/MenuButton'
import { SectionLabel } from '../types'
import { margin } from './graphConstants'
import { sampleLabels3Flavor } from './sampleData'

interface TempSection {
  name: string
  width: string // keeping this as a numerical string when editing allows users to clear the field
  color: string
}

const convertSectionToEditableSection = (sections: SectionLabel[]): TempSection[] =>
  sections.map((sec) => ({ ...sec, width: String(sec.end - sec.start) }))

const HelperText = ({ children }) => (
  <Box sx={{ color: '#666', fontSize: 14 }}>{children}</Box>
)

interface SectionConfigProps {
  initialSections: SectionLabel[]
  onCompleteSetup: (sectionLabels: SectionLabel[], cakeSize?: number) => void
  cakeSize: number
}

export const SectionConfig = ({
  initialSections,
  onCompleteSetup,
  cakeSize,
}: SectionConfigProps) => {
  // Either the cake has section labels and the size is derived from that,
  // or the cake has no labels and the size is set manually.
  const [size, setSize] = useState<number>(cakeSize)
  const [hasSections, setHasSections] = useState(!!initialSections.length)
  const [sectionLabels, setSectionLabels] = useState<TempSection[]>(
    convertSectionToEditableSection(initialSections)
  )

  // Use a simplified version of the sections until the form is submitted
  const createNewSection = () => {
    setSectionLabels([
      ...sectionLabels,
      {
        name: '',
        width: '1',
        // cycle through colors
        color: labelColors[sectionLabels.length % labelColors.length],
      },
    ])
  }
  const setDemo = () => {
    setHasSections(true)
    setSectionLabels(convertSectionToEditableSection(sampleLabels3Flavor))
  }
  const removeSection = (i: number) => {
    setSectionLabels(sectionLabels.filter((_, index) => i !== index))
  }

  const changeField = (index: number, field: string, newValue) => {
    setSectionLabels(
      sectionLabels.map((sec, i) => ({
        ...sec,
        [field]: index === i ? newValue : sec[field],
      }))
    )
  }

  const onClickDone = () => {
    if (hasSections) {
      let currentWidth = 0
      // transform into real section objects
      onCompleteSetup(
        sectionLabels.map((sec, i) => {
          const newSec = {
            id: i,
            name: sec.name,
            color: sec.color,
            start: currentWidth,
            end: currentWidth + Number(sec.width),
          }
          currentWidth = newSec.end
          return newSec
        })
      )
    } else {
      onCompleteSetup([], size)
    }
  }

  return (
    <InteractionContainer
      marginLeft={margin.left + 'px'}
      marginRight={margin.right + 'px'}
    >
      <Stack justifyContent="space-between" direction="row">
        <h2>Resource Setup</h2>
        <Button onClick={setDemo}>Use Sample Values</Button>
      </Stack>

      <Stack flexGrow={1} marginTop={2}>
        <FormControlLabel
          control={
            <Switch checked={hasSections} onChange={() => setHasSections(!hasSections)} />
          }
          label="Sections"
        />
        <HelperText>
          Does the resource have logical sections?
          <br />
          Example: A cake with chocolate, vanilla, and strawberry sections.
        </HelperText>

        {hasSections ? (
          <>
            <Stack spacing={2} marginY={2}>
              {sectionLabels.map((label, i) => (
                <Box
                  component="fieldset"
                  sx={{ border: '1px solid #666', borderRadius: '4px' }}
                  key={i}
                >
                  <legend>Section {i + 1}</legend>

                  <Stack direction={{ xs: 'column', md: 'row' }} spacing={2}>
                    <TextField
                      InputLabelProps={{ shrink: true }}
                      label={'Name'}
                      value={sectionLabels[i].name}
                      placeholder={`Section ${i + 1}`}
                      onChange={(e) => changeField(i, 'name', e.target.value)}
                    />
                    {/* Needs accessiblity work. The focus indicator on the color is imperceptible */}
                    <MuiColorInput
                      InputLabelProps={{ shrink: true }}
                      label="Color"
                      value={label.color}
                      format="hex"
                      isAlphaHidden
                      onChange={(newColor) => changeField(i, 'color', newColor)}
                    />

                    <TextField
                      sx={{ flexShrink: 0 }}
                      InputLabelProps={{ shrink: true }}
                      label="Size"
                      type="number"
                      value={label.width}
                      inputProps={{ min: 1, max: 100 }}
                      onChange={(e) =>
                        changeField(
                          i,
                          'width',
                          Number(e.target.value) > 100 ? 100 : e.target.value
                        )
                      }
                    />

                    <Box textAlign={'end'} flexGrow={1}>
                      <MenuButton onClick={() => removeSection(i)}>
                        <RemoveIcon />
                        Remove
                      </MenuButton>
                    </Box>
                  </Stack>
                </Box>
              ))}
            </Stack>

            <Stack justifyContent={'space-between'} direction="row">
              <Box>
                Total resource size:{' '}
                {sectionLabels.reduce((acc, sec) => acc + Number(sec.width), 0)}
              </Box>
              <MenuButton onClick={createNewSection}>
                <AddCircleIcon />
                Add section
              </MenuButton>
            </Stack>
          </>
        ) : (
          <Stack direction="row" justifyContent={'space-between'} marginTop={2}>
            <div>
              <h4>Resource Size</h4>
              <TextField
                type="number"
                InputLabelProps={{ shrink: true }}
                label="Size"
                value={size}
                onChange={(e) => setSize(Number(e.target.value))}
              />
              <HelperText>
                A larger number means greater granularity when assigning values.
                <br />
                100 is a good default value because it can represent a percentage.
              </HelperText>
            </div>
          </Stack>
        )}

        <Stack alignItems="flex-end" marginTop={4}>
          <Button variant="contained" onClick={onClickDone}>
            Done
          </Button>
        </Stack>
      </Stack>
    </InteractionContainer>
  )
}
