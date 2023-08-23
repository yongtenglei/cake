import { Box, Stack } from '@mui/material'
import { ReactSVG } from 'react-svg'
import { LayoutContainer, PageLayout } from '../Layouts'
import { ButtonLink } from '../components/Link'
import edgeImage from '../images/edge.svg'
import title from '../images/title.svg'
import cakeL from '../images/splash/splash_cakeL.png'
import cakeR from '../images/splash/splash_cakeR.png'
import clockL from '../images/splash/splash_clockL.png'
import clockR from '../images/splash/splash_clockR.png'
import landL from '../images/splash/splash_landL.png'
import landR from '../images/splash/splash_landR.png'
import './LandingPage.css'

// Needs more work to be pretty on small screen sizes
export const LandingPage = () => {
  return (
    <PageLayout
      contained={false}
      sx={{ backgroundColor: (theme) => theme.palette.primary.dark, flexGrow: 1 }}
    >
      <Box component="article" sx={{ position: 'relative' }}>
        <Box
          sx={{
            position: 'absolute',
            backgroundColor: 'white',
            width: '45%',
            height: '100%',
            right: 0,
            display: {
              xs: 'none',
              md: 'block',
            },
          }}
        >
          <img
            src={edgeImage}
            style={{
              height: '100%',
              transform: 'translateX(-100%) scale(-1, -1)',
              position: 'absolute',
              left: 0,
              top: 0,
            }}
          />
        </Box>

        <LayoutContainer
          sx={{
            position: 'relative',
            zIndex: '1',
            display: 'flex',
            color: 'white',
            backgroundColor: 'transparent',
            overflowX: 'hidden'
          }}
        >
          <Stack
            direction={{ xs: 'column', md: 'row' }}
            width="100%"
          >
            <Stack maxWidth={{ md: '500px' }} marginY={12}>
              <Box component="h1" sx={{ maxWidth: '250px' }}>
                <ReactSVG
                  src={title}
                  style={{ fill: 'white', height: '100%' }}
                  title="Fair Slice"
                />
              </Box>

              <Box sx={{ fontSize: '24px' }}>
                <p>Sharing is Caring.</p>
                <p>Learn the science of provably fair resource splitting.</p>
              </Box>

              <Stack direction="row" alignItems="center" spacing={2}>
                <ButtonLink variant="outlined" color="inherit" href={'/graph'}>
                  Splitting Tool
                </ButtonLink>

                <ButtonLink variant="contained" href={'/learn'}>
                  Learn
                </ButtonLink>
              </Stack>
            </Stack>

            <Stack
              sx={{
                paddingBottom: 6,
                paddingTop: { xs: 0, md: 6 },
                paddingLeft: {
                  xs: 4,
                  sm: 9,
                  md: 22,
                },
              }}
              alignItems="center"
              justifyContent="center"
              direction="column"
            >
              <div className="graphicContainer">
              <div className="land container">
                  <img src={landL} alt="" className="splashImg left" />
                  <img src={landR} alt="" className="splashImg right" />
                </div>
                <div className="clock container">
                  <img src={clockL} alt="" className="splashImg left" />
                  <img src={clockR} alt="" className="splashImg right" />
                </div>
     
                <div className="cake container">
                  <img src={cakeL} alt="" className="splashImg left" />
                  <img src={cakeR} alt="" className="splashImg right" />
                </div>
              </div>
            </Stack>
          </Stack>
        </LayoutContainer>
      </Box>
    </PageLayout>
  )
}
