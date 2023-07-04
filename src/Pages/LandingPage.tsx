import { forwardRef } from 'react'
import { Stack, Box, Button, useTheme } from '@mui/material'
import { C_DARK_BG } from '../constants'
import { Link } from '../components/Link'
import { LayoutBase } from '../MainLayout'
import title from '../images/title.svg'
import edgeImage from '../images/edge.svg'
import { ReactSVG } from 'react-svg'

export const LandingPage = () => {
  const theme = useTheme()
  return (
    <LayoutBase contained={false}>
      <Box sx={{ backgroundColor: theme.palette.secondary.dark }}>
        <HeroImage />
      </Box>
    </LayoutBase>
  )
}

const HeroImage = () => {
  const theme = useTheme()
  return (
    <article>
      <Stack direction="row" sx={{height: 600}}>
        <Stack sx={{ paddingY: 12, paddingX: 6, backgroundColor: theme.palette.secondary.dark }}>
          <Box component="h1" sx={{ maxWidth: '250px' }}>
            {/* <img src={title} /> */}
            <ReactSVG src={title} style={{ fill: 'white', height: '100%' }} title="Fair Slice"  />
          </Box>
          <Box sx={{ fontSize: '24px' }}>
            <p>Sharing is Caring.</p>
            <p>Learn about provably fair resource splitting.</p>
          </Box>

          <Stack direction="row" alignItems="center" spacing={2}>
            {/* <Link href={'/graph'} color={'#fff'} underline="hover">
              Splitting Tool
            </Link> */}
            <Button
              component={forwardRef((props, ref) => (
                <Link {...props} innerRef={ref as any} />
              ))}
              variant="outlined"
              color="inherit"
              href={'/graph'}
            >
              Splitting Tool
            </Button>

            <Button
              component={forwardRef((props, ref) => (
                <Link {...props} innerRef={ref as any} />
              ))}
              color="secondary"
              variant="contained"
              href={'/tutorial'}
            >
              Learn
            </Button>
          </Stack>
        </Stack>

        <img src={edgeImage} style={{ height: '100%' }} />
        <Stack
          sx={{
            flexBasis: '50%',
            flexGrow: 0,
            justifyContent: 'center',
            alignItems: 'center',
            padding: 6,
          }}
        >
          <img
            src="https://creazilla-store.fra1.digitaloceanspaces.com/emojis/53176/birthday-cake-emoji-clipart-md.png"
            style={{ width: '100%', maxWidth: 500 }}
            alt=""
          />
          <div
            style={{
              position: 'relative',
              top: '-200px',
              textAlign: 'center',
              fontSize: 40,
            }}
          >
            PLACEHOLDER
          </div>
        </Stack>
      </Stack>
    </article>
  )
}
