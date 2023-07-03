import { forwardRef } from 'react'
import { Stack, Box, Button, useTheme } from '@mui/material'
import { C_DARK_BG } from '../constants'
import { Link } from '../components/Link'
import { LayoutBase } from '../MainLayout'
import title from '../components/title.svg'

export const LandingPage = () => {
  return (
    <LayoutBase contained={false}>
      <Box sx={{ backgroundColor: 'C_DARK_BG' }}>
        <HeroImage />
      </Box>
    </LayoutBase>
  )
}

const HeroImage = () => {
  const theme = useTheme()
  return (
    <article>
      <Stack direction="row">
        <Stack
          sx={{
            backgroundColor: C_DARK_BG,
            flexBasis: '50%',
            flexGrow: 0,
            justifyContent: 'center',
            padding: 6,
          }}
        >
          <img
            src="https://creazilla-store.fra1.digitaloceanspaces.com/emojis/53176/birthday-cake-emoji-clipart-md.png"
            style={{ width: '100%' }}
          />
          <div style={{position: 'relative', top: '-200px', textAlign: 'center', fontSize: 40}}>PLACEHOLDER</div>
        </Stack>
        <Stack sx={{ backgroundColor: theme.palette.primary.dark, padding: 3 }}>
          <Box component="h1" sx={{ maxWidth: '300px' }}>
            <img src={title} />
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
                <Link {...props}/>
              ))}
              variant="outlined"
              color="inherit"
              href={'/graph'}
            >
              Splitting Tool
            </Button>

            <Button
              component={forwardRef((props, ref) => (
                <Link {...props} ref={ref as any} />
              ))}
              color="secondary"
              variant="contained"
              href={'/tutorial'}
            >
              Learn
            </Button>
          </Stack>
        </Stack>
      </Stack>
    </article>
  )
}
