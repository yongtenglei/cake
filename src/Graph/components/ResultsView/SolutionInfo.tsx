import CircleCheckIcon from '@mui/icons-material/CheckCircle'
import CodeIcon from '@mui/icons-material/Code'
import ContentCutIcon from '@mui/icons-material/ContentCut'
import WarningIcon from '@mui/icons-material/Warning'
import { Box, Stack, SvgIconProps } from '@mui/material'
import { Portion } from '../../../types'
import { AlgoName, Algorithms } from '../../graphConstants'
import { Link } from '../../../components/Link'

interface SolutionInfoProps {
  algoUsed: AlgoName
  results: Portion[]
}

export const SolutionInfo = ({ algoUsed, results }: SolutionInfoProps) => {
  const numPeople = results.length
  const numSections = results.reduce((acc, result) => acc + result.edges.length, 0)
  const numCuts = numSections - 1
  const algo = Algorithms[algoUsed]
  return (
    <Box
      component={'section'}
      sx={{ border: '1px solid black', maxWidth: 900, borderRadius: 8 }}
      padding={6}
    >
      <h2 style={{ marginTop: 0 }}>Solution Info</h2>
      <Stack
        component="ul"
        padding={0}
        marginBottom={0}
        sx={{ listStyle: 'none', fontSize: 18 }}
      >
        <BulletPoint
          icon={<CodeIcon fontSize="large" />}
          title={algo.name}
          text={<Link href={algo.link}>Learn about the {algo.name} method.</Link>}
        />
        <BulletPoint
          icon={<ContentCutIcon fontSize="large" />}
          title={'Cuts'}
          text={`The resource was divided in ${numCuts} location(s).`}
        />
        <BulletPoint
          icon={<CircleCheckIcon color="success" fontSize="large" />}
          title={'Proportional'}
          text={
            <>
              All {numPeople} people receive at least <sup>1</sup>&frasl;
              <sub>{numPeople}</sub> of the total value.
            </>
          }
        />
        <BulletPoint
          icon={<CircleCheckIcon color="success" fontSize="large" />}
          title={'Envy free'}
          text={'No person values another portion more than their own.'}
        />
        <BulletPoint
          icon={<WarningIcon color="warning" fontSize="large" />}
          title={'Optimal'}
          text={
            <>
              A better solution may exist.{' '}
              <Link href="https://en.wikipedia.org/wiki/Pareto_efficiency">
                Learn about Pareto optimal Solutions.
              </Link>
            </>
          }
        />
      </Stack>
    </Box>
  )
}

interface BulletPointProps {
  icon: React.ReactElement<SvgIconProps>
  title: string
  text: React.ReactNode
}

const BulletPoint = ({ icon, title, text }: BulletPointProps) => {
  return (
    <li>
      <Stack direction="row" spacing={1} alignItems="center">
        {icon}
        <div>
          <strong>{title}</strong> - {text}
        </div>
      </Stack>
    </li>
  )
}
