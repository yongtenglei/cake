import AddCircleIcon from '@mui/icons-material/AddCircle'
import ArrowBackIcon from '@mui/icons-material/ArrowBackIos'
import RemoveIcon from '@mui/icons-material/Remove'
import { Box, Button, IconButton, Stack, TextField } from '@mui/material'
import { MuiColorInput } from 'mui-color-input'
import { useState } from 'react'

import { InteractionContainer } from '../Layouts'
import { labelColors } from '../colors'
import { MenuButton } from '../components/MenuButton'
import { Preferences, SectionLabel } from '../types'
import { margin } from './graphConstants'
import { sampleLabels3Flavor } from './sampleData'

// Note, this is the older one, currently at /graph2

// TODO: add transitions here
// It's not as easy as dropping in a MUI Slide or Fade
const SetupStep = ({ children, ...props }) => {
  return (
    <Box {...props}>
      <div>{children}</div>
    </Box>
  )
}

const HelperText = ({ children }) => (
  <Box sx={{ color: '#666', fontSize: 14 }}>{children}</Box>
)

const QuestionText = ({ children }) => (
  <Box margin={0} component="h3">
    {children}
  </Box>
)

const StepBody = ({ children }) => (
  <Stack direction="row" justifyContent="center" spacing={2} marginY={6}>
    {children}
  </Stack>
)

type CompleteFunction = (sectionLabels: SectionLabel[], cakeSize?: number) => void
interface SetupProps {
  onCompleteSetup: CompleteFunction
  setNewData: (pref: Preferences) => void
}

type States =
  | 'intro'
  | 'sections?'
  | 'sameSizeSections'
  | 'numSections'
  | 'configSections'
  | 'cakeSize'

export const Setup = ({ onCompleteSetup, setNewData }: SetupProps) => {
  const [states, setStates] = useState<States[]>(['intro'])
  const currentState = states[states.length - 1]
  const [sameSizeSections, setSameSizeSections] = useState(false)

  return (
    <InteractionContainer
      marginLeft={margin.left + 'px'}
      marginRight={margin.right + 'px'}
    >
      <h2>Resource Setup</h2>
      <Stack justifyContent={'space-between'} flexGrow={1} marginTop={2}>
        {currentState === 'intro' ? (
          <SetupStep>
            Quick setup for the fair division tool
            <Stack
              alignItems={'flex-start'}
              justifyContent={'center'}
              spacing={2}
              marginTop={4}
              direction="row"
            >
              {/* import button doesn't make much sense UX-wise with this set up */}
              {/* <Button variant="outlined" component="label" htmlFor="uploadFile">
                <UpdateDataInput
                  onUpload={(newData) => {
                    onCompleteSetup([])
                    setNewData(newData)
                  }}
                />
                Import
              </Button> */}
              <Button onClick={() => onCompleteSetup(sampleLabels3Flavor)} variant="outlined">
                Demo Setup
              </Button>

              <Button
                onClick={() => setStates([...states, 'sections?'])}
                variant="contained"
              >
                Start
              </Button>
            </Stack>
            {/* <Box textAlign="center">
              <HelperText>Note: Import doesn't support sections</HelperText>
            </Box> */}
          </SetupStep>
        ) : null}

        {currentState === 'sections?' ? (
          <SetupStep>
            <QuestionText>Does the resource have logic sections?</QuestionText>
            <HelperText>
              Example: A cake with chocolate, vanilla, and strawberry parts
            </HelperText>
            <StepBody>
              <Button
                variant="contained"
                onClick={() => setStates([...states, 'cakeSize'])}
              >
                No
              </Button>
              <Button
                variant="contained"
                onClick={() => setStates([...states, 'sameSizeSections'])}
              >
                Yes
              </Button>
            </StepBody>
          </SetupStep>
        ) : null}

        {currentState === 'sameSizeSections' ? (
          <SetupStep>
            <QuestionText>Are the sections the same size?</QuestionText>
            <StepBody>
              <Button
                variant="contained"
                onClick={() => {
                  setSameSizeSections(false)
                  setStates([...states, 'configSections'])
                }}
              >
                No
              </Button>
              <Button
                variant="contained"
                onClick={() => {
                  setSameSizeSections(true)
                  setStates([...states, 'configSections'])
                }}
              >
                Yes
              </Button>
            </StepBody>
          </SetupStep>
        ) : null}
        {currentState === 'cakeSize' ? (
          <SetupStep>
            <CakeSizeEdit onCompleteSetup={onCompleteSetup} />
          </SetupStep>
        ) : null}
        {currentState === 'configSections' ? (
          <SetupStep>
            <SectionEdit fixedSize={sameSizeSections} onFinishSections={onCompleteSetup} />
          </SetupStep>
        ) : null}

        {currentState === 'intro' ? null : (
          <Stack alignItems="flex-start">
            <IconButton
              onClick={() => {
                states.pop()
                setStates([...states])
              }}
            >
              <ArrowBackIcon />
            </IconButton>
          </Stack>
        )}
      </Stack>
    </InteractionContainer>
  )
}

interface CakeSizeEditProps {
  onCompleteSetup: CompleteFunction
}
const CakeSizeEdit = ({ onCompleteSetup }: CakeSizeEditProps) => {
  const [increments, setIncrements] = useState<number>(100)
  return (
    <>
      <QuestionText>How many increments should the resource have?</QuestionText>
      <HelperText>
        An increment is the smallest section that a person can have an opinion about.
      </HelperText>
      <HelperText>
        100 is a good number, it's easy use as a percent.
      </HelperText>
      <StepBody>
        <TextField
          type="number"
          InputLabelProps={{ shrink: true }}
          label="Increments"
          value={increments}
          onChange={(e) => setIncrements(Number(e.target.value))}
        />
      </StepBody>
      <Stack alignItems="flex-end" marginTop={4}>
        <Button
          variant="contained"
          onClick={() => {
            onCompleteSetup([], increments)
          }}
        >
          Done
        </Button>
      </Stack>
    </>
  )
}

interface SectionEditProps {
  onFinishSections: CompleteFunction
  fixedSize: boolean
}

interface TempSection {
  name: string
  width: string // keeping this as a string when editing allows users to clear the field
  color: string
}

const SectionEdit = ({ onFinishSections, fixedSize }: SectionEditProps) => {
  const [sectionLabels, setSectionLabels] = useState<TempSection[]>([
    {
      name: '',
      width: '1',
      color: labelColors[0],
    },
  ])

  // Use a simple version of the labels to make the form easy to deal with
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
    let currentWidth = 0
    // transform into real section objects
    onFinishSections(
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
  }

  return (
    <>
      <QuestionText>Define the sections</QuestionText>

      <Stack spacing={2} marginBottom={2}>
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
                placeholder={`Section ${i+1}`}
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
              {fixedSize ? null : (
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
              )}
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
      <Stack direction="row" justifyContent={'space-between'}>
        {fixedSize ? (
          <div />
        ) : (
          <Box>
            Total resource size:{' '}
            {sectionLabels.reduce((acc, sec) => acc + Number(sec.width), 0)}
          </Box>
        )}
        <MenuButton onClick={createNewSection}>
          <AddCircleIcon />
          Add section
        </MenuButton>
      </Stack>

      <Stack alignItems="flex-end" marginTop={4}>
        <Button variant="contained" onClick={onClickDone}>
          Done
        </Button>
      </Stack>
    </>
  )
}
