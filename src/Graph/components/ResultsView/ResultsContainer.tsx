import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
import { Accordion, AccordionDetails, AccordionSummary, Box } from '@mui/material'
import { ErrorBoundary } from 'react-error-boundary'
import { SectionErrorDisplay } from '../../../components/SectionErrorDisplay'
import React from 'react'

interface ResultsContainerProps {
  title: string
  id: string
  children: React.ReactNode
}

export const ResultsContainer = ({ title, id, children }: ResultsContainerProps) => {
  return (
    <ErrorBoundary FallbackComponent={SectionErrorDisplay}>
      <Box component={'section'}>
        <Accordion defaultExpanded>
          <AccordionSummary
            sx={{ borderRadius: 0 }}
            expandIcon={<ExpandMoreIcon />}
            aria-controls={id + 'content'}
            id={id + '-header'}
          >
            <h2 style={{ margin: 0 }}>{title}</h2>
          </AccordionSummary>
          <AccordionDetails>{children}</AccordionDetails>
        </Accordion>
      </Box>
    </ErrorBoundary>
  )
}
