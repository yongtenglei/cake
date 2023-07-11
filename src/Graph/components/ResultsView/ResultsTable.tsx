import { styled } from '@mui/material/styles'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import { Preferences, Slice } from '../../../types'

interface ResultsTableProps {
  preferences: Preferences
  results: Slice[]
}

export const ResultsTable = ({ preferences, results }: ResultsTableProps) => {
  const numPeople = preferences.length

  const portionValues = results.reduce((acc, slice) => {
    if(!acc[slice.owner]) {
      acc[slice.owner] = []
    }
    return acc
  }, Array(numPeople))

  
  return (
    <Table>
      <TableHead>
        <TableRow>
          <TableCell colSpan={2}>{}</TableCell>
          <TableCell colSpan={numPeople}>{}</TableCell>
        </TableRow>
        <TableRow>
          <TableCell colSpan={2}>{}</TableCell>
          {preferences.map((segments, i) => {
            return (
              <TableCell>
                <TinyChart />
              </TableCell>
            )
          })}
        </TableRow>
      </TableHead>
      <TableBody>
        {preferences.map((_, rowAgent) => {
          return (
            <TableRow>
              {rowAgent === 0 ? <TableCell rowSpan={numPeople} /> : null}
              <TableCell>Person {rowAgent+1}</TableCell>
              {preferences.map((segments, colAgent) => {
                return <TableCell>{}</TableCell>
              })}
            </TableRow>
          )
        })}
      </TableBody>
    </Table>
  )
}

const getTotalValOfPortion = () => {}

const TinyChart = () => {
  return null
}
