import { Stack, Box, Button, useTheme } from '@mui/material'
import { C_DARK_BG } from '../constants'
import { Link } from '../components/Link'

export const LandingPage = () => {
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
        </Stack>
        <Stack sx={{ backgroundColor: theme.palette.primary.main, padding: 3 }}>
          <Box component="h1" sx={{ fontSize: '48px', margin: 0 }}>
            Fair Slice
          </Box>
          <Box sx={{ fontSize: '24px' }}>
            <p>Sharing is Caring.</p>
            <p>Learn about provably fair resource splitting.</p>
          </Box>

          <Stack direction="row" alignItems="center" spacing={2}>
            <Link
              href={'/graph'}
              color={'#fff'}
              underline="hover"
              sx={[
                { textDecoration: 'none' }
              ]}
            >
              Splitting Tool
            </Link>

            <Button
              component={Link}
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
